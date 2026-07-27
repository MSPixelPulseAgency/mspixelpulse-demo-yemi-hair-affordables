import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoopingVideo({ src, poster, label, className = "" }) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className={`looping-video ${className}`.trim()}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button className="video-toggle" type="button" onClick={togglePlayback} aria-label={`${paused ? "Play" : "Pause"} video: ${label}`}>
        {paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
      </button>
    </div>
  );
}

export function VideoFeature({
  src,
  poster,
  label,
  eyebrow = "Hair in motion",
  title,
  text,
  href,
  cta = "Explore the edit",
  compact = false,
  dark = false
}) {
  return (
    <section className={`page-video ${compact ? "page-video--compact" : ""} ${dark ? "page-video--dark" : ""}`.trim()}>
      <div className="container page-video__grid">
        <LoopingVideo src={src} poster={poster} label={label} />
        <div className="page-video__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
          {href ? <Link className="text-link" to={href}>{cta} <ArrowRight size={16} /></Link> : null}
          <small>Inspiration footage from Pexels; it does not depict a customer order or a specific item.</small>
        </div>
      </div>
    </section>
  );
}
