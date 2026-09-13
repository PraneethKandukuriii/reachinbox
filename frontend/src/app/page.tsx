"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030407] text-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes heroGlow {
          0%,
          100% {
            transform: translate3d(-50%, -50%, 0) scale(1);
            opacity: 0.4;
          }

          50% {
            transform: translate3d(-50%, -50%, 0) scale(1.12);
            opacity: 0.75;
          }
        }

        @keyframes heroGlowTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(35px, -25px, 0) scale(1.08);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(18px, -14px, 0);
          }
        }

        @keyframes drift {
          0% {
            transform: translate3d(-10%, 0, 0) rotate(8deg);
          }

          50% {
            transform: translate3d(8%, -15px, 0) rotate(10deg);
          }

          100% {
            transform: translate3d(-10%, 0, 0) rotate(8deg);
          }
        }

        @keyframes driftReverse {
          0% {
            transform: translate3d(10%, 0, 0) rotate(188deg);
          }

          50% {
            transform: translate3d(-8%, 12px, 0) rotate(184deg);
          }

          100% {
            transform: translate3d(10%, 0, 0) rotate(188deg);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        @keyframes revealUp {
          from {
            opacity: 0;
            transform: translate3d(0, 35px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .hero-glow {
          animation: heroGlow 8s ease-in-out infinite;
        }

        .hero-glow-two {
          animation: heroGlowTwo 10s ease-in-out infinite;
        }

        .floating-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }

        .glow-line-one {
          animation: drift 14s ease-in-out infinite;
        }

        .glow-line-two {
          animation: driftReverse 17s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .reveal-up {
          animation: revealUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .section-heading {
          font-size: clamp(4rem, 8vw, 7rem);
          line-height: 0.9;
          letter-spacing: -0.075em;
          font-weight: 500;
        }

        .section-heading-gradient {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 45%,
            #a5cfff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[45%] h-[650px] w-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[180px] hero-glow" />

        <div className="pointer-events-none absolute left-[5%] top-[20%] h-[300px] w-[400px] rounded-full bg-blue-500/[0.07] blur-[150px] hero-glow-two" />

        <div className="pointer-events-none absolute bottom-[-10%] right-[5%] h-[400px] w-[500px] rounded-full bg-violet-500/[0.08] blur-[160px] hero-glow-two" />

        <GlowLine className="glow-line-one left-[-10%] top-[20%]" />

        <GlowLine className="glow-line-two right-[-10%] top-[55%]" />

        <FloatingDot
          className="left-[14%] top-[31%]"
          delay="0s"
        />

        <FloatingDot
          className="right-[16%] top-[35%]"
          delay="1.2s"
        />

        <FloatingDot
          className="left-[25%] bottom-[24%]"
          delay="2.4s"
        />

        <FloatingDot
          className="right-[29%] bottom-[21%]"
          delay="3.2s"
        />

        <header className="absolute left-0 right-0 top-0 z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <Link
            href="/"
            className="text-xl font-medium tracking-[-0.04em] transition-opacity duration-300 hover:opacity-70"
          >
            Reach<span className="text-violet-400">Inbox</span>
          </Link>

          <nav className="hidden items-center rounded-xl border border-white/[0.08] bg-black/40 p-1 backdrop-blur-xl md:flex">
            <NavLink href="#features">
              Features
            </NavLink>

            <NavLink href="#how-it-works">
              How it works
            </NavLink>

            <NavLink href="#why-reachinbox">
              Why ReachInbox
            </NavLink>

            <NavLink href="#faq">
              FAQ
            </NavLink>
          </nav>

          <Link
            href="/compose"
            className="group rounded-lg border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-sm text-white/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
          >
            Schedule your campaign
            <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </header>

        <div className="relative z-10 flex w-full items-center justify-center px-6">
          <div className="mx-auto w-full max-w-6xl text-center">
            <div className="mx-auto max-w-5xl">
              <h1 className="text-[clamp(4rem,10.5vw,10rem)] font-medium leading-[0.82] tracking-[-0.085em]">
                <span className="reveal-up inline-block">
                  Email outreach
                </span>

                <br />

                <span className="reveal-up delay-200 inline-block bg-gradient-to-r from-white via-white/90 to-violet-400 bg-clip-text text-transparent">
                  on autopilot.
                </span>
              </h1>

              <p className="reveal-up delay-300 mx-auto mt-10 max-w-2xl text-base leading-7 text-white/40 md:text-xl">
                Schedule campaigns. Control delivery. Let ReachInbox handle
                the queue.
              </p>

              <div className="reveal-up delay-400 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/compose"
                  className="group relative overflow-hidden rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_45px_rgba(255,255,255,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(139,92,246,0.22)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-violet-300/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                  <span className="relative">
                    Schedule your campaign

                    <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>

                <a
                  href="#how-it-works"
                  className="rounded-xl border border-white/[0.1] bg-white/[0.025] px-7 py-3.5 text-sm text-white/55 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.06] hover:text-white"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="reveal-up delay-500 relative mx-auto mt-20 max-w-4xl">
              <div className="absolute left-1/2 top-1/2 h-44 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[110px]" />

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-700 hover:-translate-y-1 hover:border-violet-400/20">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

                <div className="grid sm:grid-cols-3">
                  <PreviewStat
                    value="10k+"
                    label="Emails scheduled"
                  />

                  <PreviewStat
                    value="99.9%"
                    label="Queue reliability"
                  />

                  <PreviewStat
                    value="24/7"
                    label="Automated delivery"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection
        id="features"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-white/[0.05] px-6 py-28 lg:px-10"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.06] blur-[150px]" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
              Features
            </p>

            <h2 className="section-heading mt-6">
              Less manual work.
              <br />
              More conversations.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white/45 md:text-lg">
              Everything you need to schedule, control, and deliver your email
              campaigns from one place.
            </p>
          </div>

          <div className="mx-auto mt-20 grid max-w-5xl gap-5 md:grid-cols-3">
            <AnimatedCard delay={100}>
              <Feature
                number="01"
                title="Smart scheduling"
                description="Choose exactly when your campaign begins and how much time passes between emails."
                symbol="◫"
              />
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <Feature
                number="02"
                title="Controlled sending"
                description="Set hourly limits and minimum delays to keep your outreach predictable."
                symbol="ϟ"
              />
            </AnimatedCard>

            <AnimatedCard delay={300}>
              <Feature
                number="03"
                title="Persistent delivery"
                description="Your scheduled jobs remain safe through restarts with Redis and BullMQ."
                symbol="◉"
              />
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="how-it-works"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-white/[0.05] px-6 py-28 lg:px-10"
      >
        <GlowLine className="glow-line-one left-[-15%] top-[20%]" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
              How it works
            </p>

            <h2 className="section-heading section-heading-gradient mt-6">
              From list to inbox.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white/45 md:text-lg">
              Three simple steps. Everything else happens in the background.
            </p>
          </div>

          <div className="relative mx-auto mt-28 max-w-5xl">
            <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent md:block">
              <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_15px_rgba(167,139,250,1)]" />

              <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_15px_rgba(167,139,250,1)]" />
            </div>

            <div className="grid gap-16 md:grid-cols-3 md:gap-8">
              <AnimatedCard delay={100}>
                <Step
                  number="01"
                  title="Create"
                  description="Add your recipients, subject, message, sender, and campaign settings."
                />
              </AnimatedCard>

              <AnimatedCard delay={250}>
                <Step
                  number="02"
                  title="Schedule"
                  description="Choose your start time, delivery delay, and hourly sending limit."
                />
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <Step
                  number="03"
                  title="Relax"
                  description="The persistent queue handles scheduling and delivery while you focus elsewhere."
                />
              </AnimatedCard>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="why-reachinbox"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-white/[0.05] px-6 py-28 lg:px-10"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.06] blur-[160px]" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-20 md:grid-cols-2">
          <div className="relative h-[430px]">
            <CampaignCard
              className="left-[5%] top-[8%]"
              title="Campaign queued"
              value="1,250 emails"
              icon="×"
            />

            <CampaignCard
              className="left-[18%] top-[38%]"
              title="Sending"
              value="320 / 1,250"
              icon="≋"
              delay="1s"
            />

            <CampaignCard
              className="left-[8%] top-[68%]"
              title="Delivered"
              value="930 emails"
              icon="✓"
              delay="2s"
            />

            <div className="absolute left-[8%] top-[25%] h-56 w-56 rounded-full bg-violet-600/20 blur-[90px]" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
              Why ReachInbox
            </p>

            <h2 className="section-heading mt-6">
              Your outreach.
              <br />
              Always moving.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/45 md:text-lg">
              Build the campaign once. ReachInbox keeps the delivery moving
              according to the rules you define.
            </p>

            <div className="mt-10 h-px w-24 bg-gradient-to-r from-violet-400/70 to-transparent" />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="faq"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-white/[0.05] px-6 py-28 lg:px-10"
      >
        <div className="pointer-events-none absolute left-1/2 top-[22%] h-[330px] w-[650px] -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[130px] hero-glow" />

        <div className="pointer-events-none absolute left-1/2 top-[20%] h-[180px] w-[420px] -translate-x-1/2 rounded-full bg-blue-400/[0.05] blur-[100px]" />

        <FloatingDot
          className="right-[17%] top-[22%]"
          delay="1s"
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="section-heading section-heading-gradient">
              Good to know.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white md:text-lg">
              We've answered some of the questions you might have.
            </p>
          </div>

          <div className="mx-auto mt-20 grid max-w-6xl gap-5 md:grid-cols-2">
            <AnimatedCard delay={100}>
              <FaqCard
                question="Can scheduled emails survive a restart?"
                answer="Yes. Scheduled jobs are persisted through BullMQ and Redis rather than relying on in-memory timers."
              />
            </AnimatedCard>

            <AnimatedCard delay={180}>
              <FaqCard
                question="How does email scheduling work?"
                answer="Choose a start time, set the delay between emails, and ReachInbox handles the delivery queue automatically."
              />
            </AnimatedCard>

            <AnimatedCard delay={260}>
              <FaqCard
                question="Can I control sending speed?"
                answer="Yes. Campaigns support minimum delays between emails and configurable hourly sending limits."
              />
            </AnimatedCard>

            <AnimatedCard delay={340}>
              <FaqCard
                question="Can I use multiple senders?"
                answer="Yes. ReachInbox supports multiple sender accounts and tracks delivery for each sender."
              />
            </AnimatedCard>

            <AnimatedCard delay={420}>
              <FaqCard
                question="What happens when the rate limit is reached?"
                answer="The email is rescheduled instead of being dropped, allowing the campaign to continue safely."
              />
            </AnimatedCard>

            <AnimatedCard delay={500}>
              <FaqCard
                question="Can I track scheduled and sent emails?"
                answer="Yes. The dashboard separates scheduled and sent emails so you can easily monitor your campaigns."
              />
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden border-t border-white/[0.05] px-6 py-28 text-center lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.1] blur-[160px] hero-glow" />

        <GlowLine className="glow-line-one left-[-15%] top-[35%]" />

        <GlowLine className="glow-line-two right-[-15%] bottom-[20%]" />

        <AnimatedSection className="relative mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
            Get started
          </p>

          <h2 className="section-heading section-heading-gradient mt-6">
            Let your outreach
            <br />
            run itself.
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/40 md:text-lg">
            Create your campaign. Set the rules. Let ReachInbox take it from
            there.
          </p>

          <Link
            href="/compose"
            className="group relative mt-10 inline-flex overflow-hidden rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_50px_rgba(139,92,246,0.1)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(139,92,246,0.22)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-violet-300/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <span className="relative">
              Schedule your campaign

              <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </AnimatedSection>
      </section>

      <footer className="border-t border-white/[0.05] px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-white/25 sm:flex-row">
          <span className="text-sm font-medium text-white/50">
            ReachInbox
          </span>

          <div className="flex gap-6">
            <a
              href="#features"
              className="transition hover:text-white/60"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-white/60"
            >
              How it works
            </a>

            <a
              href="#faq"
              className="transition hover:text-white/60"
            >
              FAQ
            </a>
          </div>

          <span>© 2026 ReachInbox</span>
        </div>
      </footer>
    </main>
  );
}

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      } ${className}`}
    >
      {children}
    </section>
  );
}

function AnimatedCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let timer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => {
            setVisible(true);
          }, delay);

          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function FloatingDot({
  className,
  delay,
}: {
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-10 h-1.5 w-1.5 rounded-full bg-violet-300 ${className}`}
      style={{
        animation: `floatSlow 6s ease-in-out ${delay} infinite`,
        boxShadow: "0 0 18px rgba(167,139,250,0.9)",
      }}
    />
  );
}

function GlowLine({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute h-[280px] w-[700px] opacity-40 ${className}`}
    >
      <svg
        viewBox="0 0 700 280"
        fill="none"
        className="h-full w-full"
      >
        <path
          d="M0 210C120 20 260 20 350 140C440 260 570 260 700 70"
          stroke="url(#reachinbox-glow)"
          strokeWidth="1"
          strokeDasharray="8 14"
        />

        <circle
          cx="350"
          cy="140"
          r="3"
          fill="#A78BFA"
          className="pulse-glow"
        />

        <defs>
          <linearGradient
            id="reachinbox-glow"
            x1="0"
            y1="0"
            x2="700"
            y2="280"
          >
            <stop
              stopColor="#7C3AED"
              stopOpacity="0"
            />

            <stop
              offset="0.5"
              stopColor="#A78BFA"
              stopOpacity="0.65"
            />

            <stop
              offset="1"
              stopColor="#60A5FA"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="rounded-lg px-4 py-2 text-xs text-white/40 transition-all duration-300 hover:bg-white/[0.05] hover:text-white/80"
    >
      {children}
    </a>
  );
}

function PreviewStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="group border-white/[0.06] px-7 py-7 transition-all duration-500 hover:bg-white/[0.025] sm:border-r sm:last:border-r-0">
      <p className="text-3xl font-medium tracking-tight transition-transform duration-500 group-hover:-translate-y-0.5">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/30">
        {label}
      </p>
    </div>
  );
}

function Feature({
  number,
  title,
  description,
  symbol,
}: {
  number: string;
  title: string;
  description: string;
  symbol: string;
}) {
  return (
    <div className="group min-h-[310px] rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 transition-all duration-700 hover:-translate-y-2 hover:border-violet-400/20 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_rgba(139,92,246,0.08)] md:p-10">
      <div className="flex items-center justify-between">
        <span className="text-xs text-violet-400">
          {number}
        </span>

        <span className="text-lg text-white/15 transition-all duration-500 group-hover:scale-125 group-hover:text-violet-300/60">
          {symbol}
        </span>
      </div>

      <div className="mt-20">
        <h3 className="text-xl font-medium">
          {title}
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-white/35">
          {description}
        </p>
      </div>

      <div className="mt-8 h-px w-10 bg-gradient-to-r from-violet-400/60 to-transparent transition-all duration-700 group-hover:w-24" />
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/30 bg-[#050506] text-sm text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all duration-700 group-hover:scale-110 group-hover:border-violet-300/60 group-hover:shadow-[0_0_45px_rgba(139,92,246,0.25)]">
        {number}
      </div>

      <h3 className="mt-7 text-xl font-medium">
        {title}
      </h3>

      <p className="mt-3 max-w-xs text-sm leading-7 text-white/35">
        {description}
      </p>
    </div>
  );
}

function CampaignCard({
  className,
  title,
  value,
  icon,
  delay = "0s",
}: {
  className: string;
  title: string;
  value: string;
  icon: string;
  delay?: string;
}) {
  return (
    <div
      className={`floating-slow absolute z-10 w-[260px] rounded-2xl border border-white/[0.08] bg-[#09090c]/80 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl ${className}`}
      style={{
        animationDelay: delay,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-400/[0.08] text-violet-300">
          {icon}
        </div>

        <div>
          <p className="text-xs text-white/35">
            {title}
          </p>

          <p className="mt-1 text-sm font-medium text-white/80">
            {value}
          </p>
        </div>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-violet-300" />
      </div>
    </div>
  );
}

function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      className="group w-full rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 text-left transition-all duration-700 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.035] hover:shadow-[0_20px_70px_rgba(139,92,246,0.06)] md:p-7"
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-base font-medium text-white/90 md:text-lg">
          {question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-300/30 text-xl font-light text-blue-200 transition-all duration-500 ${
            open
              ? "rotate-45 border-violet-300/60 bg-violet-400/[0.08]"
              : "group-hover:border-violet-300/50 group-hover:bg-violet-400/[0.05]"
          }`}
        >
          +
        </span>
      </div>

      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pt-5 text-sm leading-7 text-white/55">
            {answer}
          </p>
        </div>
      </div>
    </button>
  );
}