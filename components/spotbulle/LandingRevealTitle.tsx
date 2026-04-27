"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export default function LandingRevealTitle({
  line1,
  line2,
  line3,
}: {
  line1: string;
  line2: string;
  line3: string;
}) {
  const rootRef = useRef<HTMLParagraphElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  function renderFallingChars(line: string, lineIndex: number) {
    return (
      <span className={`landing-reveal-line landing-reveal-line-${lineIndex + 1} block`}>
        {Array.from(line).map((char, charIndex) => {
          const seed = (lineIndex + 1) * 71 + (charIndex + 1) * 37;
          const baseDelay = lineIndex === 0 ? 0.2 : 0.9;
          const delay = `${baseDelay + charIndex * 0.18}s`;
          const cycle = "6.2s";
          const dropDistance = `${58 + (seed % 16)}px`;
          const impactX = `${((seed % 7) - 3) * 0.9}px`;
          const impactRot = `${((seed % 11) - 5) * 1.2}deg`;
          const restX = `${((seed % 5) - 2) * 0.22}px`;
          const startX = `${((seed % 9) - 4) * 0.35}px`;

          return (
            <span
              key={`${lineIndex}-${charIndex}-${char}`}
              className="landing-reveal-char"
              style={
                {
                  "--char-delay": delay,
                  "--char-cycle": cycle,
                  "--char-drop-distance": dropDistance,
                  "--char-impact-x": impactX,
                  "--char-impact-rot": impactRot,
                  "--char-rest-x": restX,
                  "--char-start-x": startX,
                } as CSSProperties
              }
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <p
      ref={rootRef}
      className={`landing-reveal-title select-none text-center text-[72px] font-bold leading-[0.9] text-white/40 md:text-[120px] ${
        isVisible ? "is-visible" : ""
      }`}
    >
      {renderFallingChars(line1, 0)}
      {renderFallingChars(line2, 1)}
      <span className="landing-reveal-line landing-reveal-line-3 block">{line3}</span>
    </p>
  );
}
