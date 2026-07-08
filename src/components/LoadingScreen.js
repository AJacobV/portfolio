import { useEffect, useRef, useState, useMemo } from 'react';

// Deterministic pseudo-random number generator to ensure the shatter pattern
// remains stable across the component's lifecycle if re-renders occur.
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

function generateFullPageShards(cols, rows) {
  const rand = mulberry32(12345); // Fixed seed for consistent shattering pattern
  const shards = [];
  const points = [];

  // 1. Generate grid of points spanning 0 to 100%
  for (let y = 0; y <= rows; y++) {
    const row = [];
    for (let x = 0; x <= cols; x++) {
      let px = (x / cols) * 100;
      let py = (y / rows) * 100;

      // Jitter interior points to make jagged glass edges
      if (x > 0 && x < cols) px += (rand() - 0.5) * (100 / cols) * 0.8;
      if (y > 0 && y < rows) py += (rand() - 0.5) * (100 / rows) * 0.8;

      row.push({ x: px, y: py });
    }
    points.push(row);
  }

  // 2. Create triangles from the grid points
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const p1 = points[y][x];
      const p2 = points[y][x + 1];
      const p3 = points[y + 1][x];
      const p4 = points[y + 1][x + 1];

      // Create two triangles per cell
      // Triangle A: p1, p2, p3
      // Triangle B: p2, p4, p3
      const createTri = (a, b, c) => {
        const minX = Math.min(a.x, b.x, c.x);
        const maxX = Math.max(a.x, b.x, c.x);
        const minY = Math.min(a.y, b.y, c.y);
        const maxY = Math.max(a.y, b.y, c.y);
        
        // Prevent flat/invalid triangles
        if (maxX - minX === 0 || maxY - minY === 0) return;

        const cx = (a.x + b.x + c.x) / 3;

        // Fall trajectory logic (scatter outward from center, fall down)
        const fallX = (cx - 50) * 8 + (rand() - 0.5) * 150;
        const fallY = 900 + (rand() * 500); // mostly fall down
        const fallRot = (rand() - 0.5) * 120; // random spin

        // Coordinates relative to the shard's bounding box (0-100%)
        const rx = (pt) => ((pt.x - minX) / (maxX - minX)) * 100;
        const ry = (pt) => ((pt.y - minY) / (maxY - minY)) * 100;

        const clip = `polygon(${rx(a).toFixed(2)}% ${ry(a).toFixed(2)}%, ${rx(b).toFixed(2)}% ${ry(b).toFixed(2)}%, ${rx(c).toFixed(2)}% ${ry(c).toFixed(2)}%)`;

        shards.push({
          x: minX,
          y: minY,
          w: maxX - minX,
          h: maxY - minY,
          fallX,
          fallY,
          fallRot,
          clip,
          // Start rotation slightly random for chaotic look when falling
          startRotate: (rand() - 0.5) * 10
        });
      };

      createTri(p1, p2, p3);
      createTri(p2, p4, p3);
    }
  }

  return shards;
}

function generateRandomSlices(count) {
  const slices = [];
  for (let i = 0; i < count; i++) {
    const x1 = 10 + Math.random() * 80;
    const y1 = 10 + Math.random() * 80;
    const angle = (Math.random() - 0.5) * 160;
    const lengthStr = `clamp(150px, ${15 + Math.random() * 20}vw, 400px)`;
    slices.push({ x1, y1, angle, length: lengthStr });
  }
  return slices;
}

function pickRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function LoadingScreen({ onDone }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'slash' | 'shatter' | 'done'

  // Generate 5x4 grid = 40 shards that tile perfectly
  const allShards = useMemo(() => generateFullPageShards(5, 4), []);
  
  // Generate 10 random aggressive slashes in a pool, then pick 7 to display
  const randomSlices = useMemo(() => {
    const pool = generateRandomSlices(10);
    return pickRandomItems(pool, 7);
  }, []);

  // --- Canvas-based 60fps glass shatter ---
  useEffect(() => {
    if (phase !== 'shatter') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Map percentage-based bounding boxes to pixel values
    const particles = allShards.map((s) => ({
      x: (s.x / 100) * vw,
      y: (s.y / 100) * vh,
      w: (s.w / 100) * vw,
      h: (s.h / 100) * vh,
      rotation: s.startRotate,
      fallX: s.fallX,
      fallY: s.fallY,
      fallRot: s.fallRot,
      clip: s.clip,
    }));

    const duration = 1600; // ms for the fall
    let startTime = null;
    let animId;

    const drawShard = (p, t) => {
      // Easing: cubic ease-in (starts slow, falls fast)
      const eased = t * t * t;

      const currentX = p.x + p.fallX * eased;
      const currentY = p.y + p.fallY * eased;
      const currentRot = p.rotation + p.fallRot * eased;
      const currentOpacity = Math.max(0, 1 - (t * 1.5));

      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.translate(currentX + p.w / 2, currentY + p.h / 2);
      ctx.rotate((currentRot * Math.PI) / 180);

      // Parse clip-path polygon and draw
      const points = parseClipPath(p.clip, p.w, p.h);
      ctx.beginPath();
      points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x - p.w / 2, pt.y - p.h / 2);
        else ctx.lineTo(pt.x - p.w / 2, pt.y - p.h / 2);
      });
      ctx.closePath();

      // Glass-like fill
      const grad = ctx.createLinearGradient(-p.w / 2, -p.h / 2, p.w / 2, p.h / 2);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(0.5, 'rgba(200, 200, 210, 0.12)');
      grad.addColorStop(1, 'rgba(18, 18, 22, 0.95)');
      ctx.fillStyle = grad;
      ctx.fill();

      // --- Draw Shattered Text ---
      ctx.save();
      ctx.clip(); // Restrict text drawing to the shard's polygon

      const minFontSize = 32; // 2rem
      const maxFontSize = 72; // 4.5rem
      const fontSize = Math.min(Math.max(vw * 0.06, minFontSize), maxFontSize);
      
      ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
      ctx.fillStyle = '#e10600';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if ('letterSpacing' in ctx) {
        ctx.letterSpacing = '0.22em';
      }
      
      ctx.shadowColor = `rgba(225, 6, 0, ${0.5 * currentOpacity})`;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Calculate global screen center relative to the shard's original local center
      const dx = vw / 2 - (p.x + p.w / 2);
      const dy = vh / 2 - (p.y + p.h / 2);
      const indentOffset = (0.22 * fontSize) / 2; // Match CSS text-indent visual centering
      
      ctx.fillText('AJAV', dx + indentOffset, dy);
      ctx.restore();
      // ---------------------------

      // Glass edge highlight
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * currentOpacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner glow
      ctx.strokeStyle = `rgba(180, 180, 190, ${0.2 * currentOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, vw, vh);

      particles.forEach((p) => drawShard(p, t));

      if (t < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        if (onDone) onDone();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, [phase, allShards, onDone]);

  // Phase progression logic
  useEffect(() => {
    if (phase === 'idle') {
      // Brief pause before slashes begin
      const timer = setTimeout(() => setPhase('slash'), 600);
      return () => clearTimeout(timer);
    } else if (phase === 'slash') {
      // Longer pause for the 7 slashes to complete before shattering
      const timer = setTimeout(() => setPhase('shatter'), 900);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="loading-screen" role="status" aria-label="Loading portfolio">
      
      {/* Full screen static glass background before it shatters */}
      {(phase === 'idle' || phase === 'slash') && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)), radial-gradient(circle at 50% 45%, rgba(200, 200, 210, 0.1), transparent 35%)',
            zIndex: 1
          }} 
        />
      )}

      {/* AJAV Text */}
      {(phase === 'idle' || phase === 'slash') && (
        <div className="loading-core">
          <span className="loading-core-text">AJAV</span>
        </div>
      )}

      {/* Aggressive Slash animations */}
      {phase === 'slash' && (
        <div className="loading-slices">
          {randomSlices.map((slice, i) => (
            <div
              key={i}
              className="loading-slice"
              style={{
                '--slice-x1': `${slice.x1}%`,
                '--slice-y1': `${slice.y1}%`,
                '--slice-angle': `${slice.angle}deg`,
                '--slice-length': slice.length,
                '--slice-delay': `${i * 60}ms`, // Adjusted spread for 7 slices
              }}
            />
          ))}
        </div>
      )}

      {/* Canvas for 60fps full-screen glass shatter */}
      {phase === 'shatter' && (
        <canvas
          ref={canvasRef}
          className="loading-shatter-canvas"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1001,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

/**
 * Parses a CSS clip-path polygon string into {x, y} points relative to width/height.
 */
function parseClipPath(clipPath, width, height) {
  const match = clipPath.match(/polygon\((.+)\)/);
  if (!match) return [];
  return match[1].split(',').map((pair) => {
    const [xStr, yStr] = pair.trim().split(/\s+/);
    return {
      x: (parseFloat(xStr) / 100) * width,
      y: (parseFloat(yStr) / 100) * height,
    };
  });
}

export default LoadingScreen;