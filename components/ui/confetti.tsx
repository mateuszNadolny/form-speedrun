'use client';

import { useEffect, useRef, useState } from 'react';

import confetti from 'canvas-confetti';

interface ConfettiTriggerProps {
  children: React.ReactNode;
}

export default function ConfettiTrigger({ children }: ConfettiTriggerProps) {
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          confetti({
            particleCount: 200,
            spread: 200,
            origin: { y: 0.6 }
          });
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [hasTriggered]);

  return <div ref={ref}>{children}</div>;
}
