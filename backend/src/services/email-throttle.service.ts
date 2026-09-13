import redis from "../config/redis.js";

export async function reserveSendSlot(
  senderId: string,
  requestedAt: number,
  minDelayMs: number,
): Promise<number> {
  const key = `email:throttle:next-send:${senderId}`;

  const now = Date.now();

  const effectiveRequestedAt = Math.max(
    requestedAt,
    now,
  );

  const script = `
    local nextAvailable = redis.call(
      "GET",
      KEYS[1]
    )

    if not nextAvailable then
      nextAvailable = 0
    else
      nextAvailable = tonumber(nextAvailable)
    end

    local requestedAt = tonumber(ARGV[1])
    local minDelayMs = tonumber(ARGV[2])

    local sendAt = math.max(
      requestedAt,
      nextAvailable
    )

    local nextSlot = sendAt + minDelayMs

    redis.call(
      "SET",
      KEYS[1],
      nextSlot
    )

    return sendAt
  `;

  const result = await redis.eval(
    script,
    1,
    key,
    effectiveRequestedAt.toString(),
    minDelayMs.toString(),
  );

  if (typeof result !== "number") {
    throw new Error("Invalid send slot response");
  }

  return result;
}