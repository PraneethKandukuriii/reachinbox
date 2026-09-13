import redis from "../config/redis.js";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

export async function checkEmailRateLimit(
  senderId: string,
  campaignId: string,
  senderLimit: number,
  campaignLimit: number,
): Promise<RateLimitResult> {
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;

  const currentHour = Math.floor(now / hourMs);

  const senderKey =
    `email:rate-limit:sender:${senderId}:${currentHour}`;

  const campaignKey =
    `email:rate-limit:campaign:${campaignId}:${currentHour}`;

  const retryAfterMs = hourMs - (now % hourMs);

  const script = `
    local senderCount = redis.call("GET", KEYS[1])
    local campaignCount = redis.call("GET", KEYS[2])

    if not senderCount then
      senderCount = 0
    else
      senderCount = tonumber(senderCount)
    end

    if not campaignCount then
      campaignCount = 0
    else
      campaignCount = tonumber(campaignCount)
    end

    local senderLimit = tonumber(ARGV[1])
    local campaignLimit = tonumber(ARGV[2])
    local ttl = tonumber(ARGV[3])

    if senderCount >= senderLimit then
      return {0, senderLimit - senderCount}
    end

    if campaignCount >= campaignLimit then
      return {0, campaignLimit - campaignCount}
    end

    senderCount = redis.call(
      "INCR",
      KEYS[1]
    )

    campaignCount = redis.call(
      "INCR",
      KEYS[2]
    )

    redis.call(
      "PEXPIRE",
      KEYS[1],
      ttl
    )

    redis.call(
      "PEXPIRE",
      KEYS[2],
      ttl
    )

    local senderRemaining =
      senderLimit - senderCount

    local campaignRemaining =
      campaignLimit - campaignCount

    local remaining =
      math.min(
        senderRemaining,
        campaignRemaining
      )

    return {1, remaining}
  `;

  const result = await redis.eval(
    script,
    2,
    senderKey,
    campaignKey,
    senderLimit.toString(),
    campaignLimit.toString(),
    retryAfterMs.toString(),
  );

  if (!Array.isArray(result) || result.length !== 2) {
    throw new Error("Invalid rate limit response");
  }

  return {
    allowed: Number(result[0]) === 1,
    remaining: Number(result[1]),
    retryAfterMs,
  };
}