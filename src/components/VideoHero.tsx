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
// Raw media elements don't get the Next basePath automatically.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function VideoHero() {
  const t = useTranslations("home");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    // Unmuting is a user gesture, so playback with sound is permitted;
    // make sure the film is actually running when sound comes on.
    if (!video.muted && video.paused) {
      void video.play();
    }
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
        poster={`${basePath}/media/hero-poster.jpg`}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={`${basePath}/media/hero.mp4`} type="video/mp4" />
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
      <div className="vhero__controls">
        <button
          type="button"
          className="vhero__toggle"
          onClick={toggleSound}
          aria-label={muted ? t("videoUnmute") : t("videoMute")}
        >
          {muted ? (
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M2 6 L5 6 L8.5 3 L8.5 13 L5 10 L2 10 Z" fill="currentColor" />
              <path
                d="M10.8 6.2 L14 9.8 M14 6.2 L10.8 9.8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M2 6 L5 6 L8.5 3 L8.5 13 L5 10 L2 10 Z" fill="currentColor" />
              <path
                d="M11 5.5 C 12 6.6, 12 9.4, 11 10.5 M12.8 4 C 14.4 5.8, 14.4 10.2, 12.8 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>
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
      </div>
    </section>
  );
}
