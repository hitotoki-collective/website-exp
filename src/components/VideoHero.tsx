"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Full-viewport video hero. The film is decorative (the hero text carries
 * the content), muted, and looped. Playback starts via JS so users with
 * prefers-reduced-motion get the poster frame instead, and a pause control
 * satisfies WCAG 2.2.2 for auto-playing motion.
 */
export default function VideoHero() {
  const t = useTranslations("home");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    video.play().catch(() => {
      // Autoplay refused (e.g. battery saver): the poster stays.
    });
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
    // State follows the video's own play/pause events, which also covers
    // pauses forced by the browser (hidden tab, battery saver).
  };

  return (
    <section className="vhero">
      <video
        ref={videoRef}
        className="vhero__video"
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        poster="/media/hero-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>
      <div className="vhero__scrim" aria-hidden="true" />
      <div className="wrap vhero__content">
        <p className="kicker vhero__kicker">{t("kicker")}</p>
        <h1 className="vhero__title">{t("heroTitle")}</h1>
        <p className="vhero__lede">{t("heroLede")}</p>
        <div className="hero__actions">
          <Link href="/performances" className="btn btn--primary">
            {t("ctaTraces")}
          </Link>
          <Link href="/philosophy" className="btn btn--ghost">
            {t("ctaPhilosophy")}
          </Link>
        </div>
      </div>
      <button
        type="button"
        className="vhero__toggle"
        onClick={toggle}
        aria-label={playing ? t("videoPause") : t("videoPlay")}
      >
        {playing ? (
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <rect x="3" y="2.5" width="3.4" height="11" fill="currentColor" />
            <rect x="9.6" y="2.5" width="3.4" height="11" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M4.5 2.5 L13 8 L4.5 13.5 Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </section>
  );
}
