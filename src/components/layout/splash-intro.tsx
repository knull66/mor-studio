"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/lib/i18n/language-provider";

const STORAGE_KEY = "mor-splash";
const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "boot" | "play" | "exit" | "gone";

export function SplashIntro() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("boot");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "done") {
      setPhase("gone");
      return;
    }
    if (reduce) {
      sessionStorage.setItem(STORAGE_KEY, "done");
      setPhase("gone");
      return;
    }
    setPhase("play");
  }, [reduce]);

  useEffect(() => {
    if (phase !== "play" && phase !== "boot") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "play") return;
    const hold = window.setTimeout(() => setPhase("exit"), 2800);
    return () => window.clearTimeout(hold);
  }, [phase]);

  function finish() {
    sessionStorage.setItem(STORAGE_KEY, "done");
    setPhase("gone");
  }

  function skip() {
    setPhase("exit");
  }

  if (phase === "gone") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
      role="dialog"
      aria-label={t.splash.title}
      aria-modal="true"
      initial={false}
      animate={phase === "exit" ? { opacity: 0, y: "-8%" } : { opacity: 1, y: 0 }}
      transition={{ duration: phase === "exit" ? 0.85 : 0, ease }}
      onAnimationComplete={() => {
        if (phase === "exit") finish();
      }}
      onClick={skip}
    >
      {phase === "play" ? (
        <div className="pointer-events-none flex flex-col items-center px-6 text-center">
          <motion.span
            className="h-px w-10 bg-taupe"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease }}
          />
          <motion.p
            className="mt-8 font-serif text-5xl tracking-[0.18em] text-ink sm:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            {t.splash.title}
          </motion.p>
          <motion.p
            className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-taupe-dark sm:text-[0.72rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
          >
            {t.splash.subtitle}
          </motion.p>
          <motion.p
            className="mt-3 text-[0.62rem] uppercase tracking-[0.28em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
          >
            {t.splash.location}
          </motion.p>
          <motion.span
            className="mt-8 h-px w-10 bg-taupe"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2, ease }}
          />
        </div>
      ) : null}
      {phase === "play" ? (
        <button
          type="button"
          className="absolute right-5 bottom-5 text-[0.62rem] uppercase tracking-[0.22em] text-muted/80 transition hover:text-ink"
          onClick={(event) => {
            event.stopPropagation();
            skip();
          }}
        >
          {t.splash.skip}
        </button>
      ) : null}
    </motion.div>
  );
}
