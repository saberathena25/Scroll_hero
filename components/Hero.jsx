"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";
import { content } from "@/content";

gsap.registerPlugin(ScrollTrigger);

// How many viewport-heights of scrolling the drive lasts while the hero is pinned.
const SCROLL_LENGTH_VH = 3.2;

export default function Hero() {
  const root = useRef(null);
  const honkCount = useRef(0);
  const audio = useRef(null);

  /* ---------------------------------------------------------------
   * 1. Intro (time-based, plays once) + 2. Scroll drive (scrub-based)
   * Each layer animates its own wrapper element, so the two never
   * fight over the same transform.
   * ------------------------------------------------------------- */
  useEffect(() => {
    const el = root.current;
    const q = gsap.utils.selector(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let scrollCtx;
    let resizeTimer;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    const stats = content.stats;
    const numberEls = q(".stat-num");

    // ---------- Intro ----------
    const introCtx = gsap.context(() => {
      gsap.set(q(".stat-bar"), { scaleX: 0 });

      if (reduce) {
        gsap.set(q("[data-in]"), { opacity: 1 });
        gsap.set(q(".stat-body"), { opacity: 1 });
        gsap.set(q(".stat-bar"), { scaleX: 1 });
        return;
      }

      numberEls.forEach((n) => (n.textContent = "0%"));

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(q(".road-bg"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0)
        .fromTo(
          q(".car-intro"),
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
          0.15
        )
        .fromTo(
          q(".ch"),
          { yPercent: 70, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.055 },
          0.35
        )
        .fromTo(q(".sub"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 1.25)
        .fromTo(
          q(".stat"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.2 },
          1.0
        )
        .fromTo(q(".cone"), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power1.inOut" }, 1.4)
        .fromTo(q(".hint"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.8 }, 2.1);

      // Numbers count up as each stat arrives.
      stats.forEach((s, i) => {
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: s.value,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              numberEls[i].textContent = Math.round(counter.v) + s.suffix;
            },
          },
          1.0 + i * 0.2
        );
      });
    }, el);

    // ---------- Scroll drive ----------
    const build = () => {
      scrollCtx?.revert();
      if (reduce) return;

      scrollCtx = gsap.context(() => {
        const stage = el.querySelector(".stage");
        const carIntro = el.querySelector(".car-intro");

        // offsetTop/offsetHeight ignore transforms, so these are stable mid-animation.
        const carTop = carIntro.offsetTop;
        const carH = carIntro.offsetHeight;
        const distance = stage.offsetHeight - carTop; // car travels until fully off the bottom
        const carCenter0 = carTop + carH / 2;
        const vh = window.innerHeight;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=" + vh * SCROLL_LENGTH_VH,
            pin: true,
            scrub: 1, // 1s of catch-up smoothing between scroll position and animation
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // The car: translateY driven by progress, with a gentle sway as it "steers".
        tl.to(q(".car-scroll"), { y: distance, duration: 1 }, 0);
        tl.to(
          q(".car-scroll"),
          { keyframes: { rotation: [0, 1.6, -1.6, 1.6, 0], easeEach: "sine.inOut" }, duration: 1 },
          0
        );

        // The headline lets go: letters drift apart and dim as the car leaves.
        const letters = q(".ch-i");
        const mid = (letters.length - 1) / 2;
        tl.to(
          letters,
          { x: (i) => (i - mid) * 12, y: -24, opacity: 0.2, duration: 0.55, ease: "power1.in" },
          0
        );
        tl.to(q(".sub-i"), { opacity: 0, duration: 0.08 }, 0);
        tl.to(q(".hint-i"), { opacity: 0, duration: 0.06 }, 0);
        tl.fromTo(q(".progress"), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

        // Each stat lights up at the moment the car drives past it.
        // (The wrapper's `top` is the stat's vertical centre; offsetTop ignores the CSS centring shift.)
        q(".stat-wrap").forEach((wrap) => {
          const statMid = wrap.offsetTop - stage.offsetTop;
          const t = gsap.utils.clamp(0.06, 0.93, (statMid - carCenter0) / distance);
          tl.to(wrap.querySelector(".stat-bar"), { scaleX: 1, duration: 0.1 }, t - 0.05);
          tl.to(wrap.querySelector(".stat-body"), { opacity: 1, duration: 0.1 }, t - 0.05);
        });
      }, el);
    };

    build();

    // Rebuild distances when the layout actually changes (ignore mobile URL-bar height jitter).
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const widthChanged = w !== lastW;
        const heightChanged = h !== lastH && !ScrollTrigger.isTouch;
        if (widthChanged || heightChanged) {
          lastW = w;
          lastH = h;
          build();
          ScrollTrigger.refresh();
        }
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      scrollCtx?.revert();
      introCtx.revert();
    };
  }, []);

  /* ---------------------------------------------------------------
   * Human touch: the car leans toward your cursor.
   * ------------------------------------------------------------- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePointer) return;

    const svg = root.current.querySelector(".car-svg");
    const rotateTo = gsap.quickTo(svg, "rotation", { duration: 0.9, ease: "power3" });
    const slideTo = gsap.quickTo(svg, "x", { duration: 0.9, ease: "power3" });

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      rotateTo(nx * 10);
      slideTo(nx * 14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(svg);
    };
  }, []);

  /* ---------------------------------------------------------------
   * Human touch: click the car and it honks.
   * ------------------------------------------------------------- */
  const honk = () => {
    const el = root.current;
    const svg = el.querySelector(".car-svg");
    const bubble = el.querySelector(".bubble");
    const text = content.honks[honkCount.current++ % content.honks.length];

    bubble.textContent = text;
    gsap.killTweensOf(bubble);
    gsap
      .timeline()
      .fromTo(
        bubble,
        { opacity: 0, scale: 0.5, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(2.5)" }
      )
      .to(bubble, { opacity: 0, y: -6, duration: 0.4, ease: "power1.in" }, "+=1.2");

    gsap.fromTo(
      svg,
      { scale: 1 },
      { scale: 1.06, duration: 0.1, yoyo: true, repeat: 3, ease: "sine.inOut" }
    );

    // A tiny two-note beep, kept quiet on purpose.
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audio.current = audio.current || new AC();
      const ctx = audio.current;
      [0, 0.18].forEach((delay, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t0 = ctx.currentTime + delay;
        osc.type = "square";
        osc.frequency.value = i === 0 ? 330 : 392;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.04, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.16);
      });
    } catch {
      /* sound is a bonus; ignore failures */
    }
  };

  /* ---------------------------------------------------------------
   * Markup
   * ------------------------------------------------------------- */
  const words = content.headline.split(" ");

  return (
    <section ref={root} className="relative h-[100svh] w-full overflow-hidden bg-paper">
      {/* Scroll progress, a thin ember line along the top */}
      <div className="progress absolute left-0 top-0 z-30 h-[3px] w-full origin-left scale-x-0 bg-ember" />

      {/* Headline + tagline */}
      <div className="absolute inset-x-0 top-[5.5vh] z-20 flex flex-col items-center px-4 text-center">
        <h1
          aria-label={content.headline}
          className="flex flex-wrap justify-center gap-x-[1.8em] gap-y-1 text-[clamp(1.05rem,3.4vw,3rem)] font-semibold uppercase text-ink"
        >
          {words.map((word, wi) => (
            <span key={wi} aria-hidden="true" className="flex gap-[0.55em]">
              {[...word].map((char, ci) => (
                <span key={ci} data-in className="ch inline-block opacity-0">
                  <span className="ch-i inline-block">{char}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p data-in className="sub mt-2 opacity-0">
          <span className="sub-i hand block text-[clamp(0.9rem,1.6vw,1.25rem)] text-ember">
            {content.tagline}
          </span>
        </p>
      </div>

      {/* Stage: the road, the car and everything that rides with it. Clipped at the road's start. */}
      <div className="stage absolute inset-x-0 bottom-0 overflow-hidden" style={{ top: "var(--road-top)" }}>
        <div
          data-in
          className="road-bg road-surface absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-t-[2rem] opacity-0"
          style={{ width: "var(--road-w)" }}
        />

        {/* car-intro: entrance only. car-scroll: scroll drive only. car-svg: cursor tilt + honk only. */}
        <div
          data-in
          className="car-intro absolute inset-x-0 flex justify-center opacity-0"
          style={{ top: "calc(var(--car-top) - var(--road-top))", height: "var(--car-h)" }}
        >
          <div className="car-scroll relative h-full will-change-transform" style={{ aspectRatio: "120 / 290" }}>
            <span className="tyre-mark" style={{ left: "13%" }} />
            <span className="tyre-mark" style={{ right: "13%" }} />

            <button
              type="button"
              onClick={honk}
              aria-label="Honk the horn"
              className="relative block h-full w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
            >
              <Car />
            </button>

            <div
              data-in
             className="hint pointer-events-none absolute right-[calc(100%+8rem)] top-[4%] w-[8rem] opacity-0"
            >
              <p className="hint-i hand -rotate-3 text-right text-[0.95rem] leading-tight text-ink">
                {content.hint}
              </p>
            </div>

            <div
              className="bubble hand pointer-events-none absolute left-[calc(100%+0.4rem)] top-[10%] whitespace-nowrap rounded-2xl rounded-bl-sm bg-paper px-3 py-1.5 text-base text-ink opacity-0 shadow-md ring-1 ring-ink/10"
              aria-live="polite"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      {/* stat-wrap only handles vertical centring (CSS); .stat is what GSAP animates. */}
      {content.stats.map((s, i) => (
        <div
          key={i}
          className={
            "stat-wrap absolute z-20 max-w-[31vw] -translate-y-1/2 sm:max-w-[16rem] " +
            (s.side === "left" ? "left-[3vw] text-left sm:left-[6vw]" : "right-[3vw] text-right sm:right-[6vw]")
          }
          style={{ top: s.top }}
        >
          <div data-in className="stat opacity-0">
            <div className="stat-body opacity-40">
              <div className="stat-num font-display text-[clamp(2rem,6vw,4.25rem)] font-semibold leading-none tabular-nums text-ink">
                {s.value}
                {s.suffix}
              </div>
              <p className="mt-2 text-[0.72rem] leading-snug text-ink/75 sm:text-sm">{s.label}</p>
            </div>
            <div
              className={
                "stat-bar mt-3 h-[3px] w-16 bg-ember " +
                (s.side === "left" ? "origin-left" : "ml-auto origin-right")
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}
