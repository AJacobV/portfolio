import { useEffect, useRef, useState } from 'react';

function ParallaxSection({ children, speed = 0.5, className = '', style = {} }) {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) {
          ticking.current = false;
          return;
        }

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = vh / 2;
        const distance = elementCenter - viewportCenter;

        setOffset(distance * speed);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

export default ParallaxSection;
