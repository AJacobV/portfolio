import { useEffect, useState, useRef } from 'react';

function CursorTracer({ active }) {
  const [trail, setTrail] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    if (!active) {
      setTrail([]);
      return;
    }

    let currentTrail = [];
    let lastPoint = null;
    let timeStamp = 0;

    const handlePointerMove = (event) => {
      const currentPoint = { x: event.clientX, y: event.clientY };
      
      if (lastPoint) {
        const dx = currentPoint.x - lastPoint.x;
        const dy = currentPoint.y - lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Fill gaps if mouse moves fast
        const spacing = 4; // Adjust density of trail (lower = more dense)
        const steps = Math.max(1, Math.floor(distance / spacing));
        
        for (let i = 1; i <= steps; i++) {
          timeStamp++;
          currentTrail.push({
            x: lastPoint.x + (dx * i) / steps,
            y: lastPoint.y + (dy * i) / steps,
            id: timeStamp,
            timestamp: Date.now()
          });
        }
      } else {
        timeStamp++;
        currentTrail.push({
          x: currentPoint.x,
          y: currentPoint.y,
          id: timeStamp,
          timestamp: Date.now()
        });
      }
      
      lastPoint = currentPoint;
    };

    const handlePointerLeave = () => {
      lastPoint = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    const updateTrail = () => {
      const now = Date.now();
      // Keep points that are less than 350ms old
      currentTrail = currentTrail.filter(p => now - p.timestamp < 350);
      setTrail([...currentTrail]);
      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, [active]);

  if (!active || trail.length === 0) {
    return null;
  }

  return (
    <div className="cursor-tracer" aria-hidden="true">
      {trail.map((point) => {
        const age = Date.now() - point.timestamp;
        const progress = Math.min(age / 350, 1);
        const scale = 1 - progress * 0.7; // Shrinks from 1 to 0.3
        const opacity = Math.max(0, 1 - progress);

        return (
          <span
            key={point.id}
            className="cursor-tracer-point"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              transform: `translate(-50%, -50%) rotate(-28deg) scale(${scale})`,
              opacity: opacity
            }}
          />
        );
      })}
    </div>
  );
}

export default CursorTracer;