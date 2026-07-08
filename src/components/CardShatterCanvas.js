import { useEffect, useRef, useMemo } from 'react';

function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

function generateCardShards(cols, rows) {
  const rand = mulberry32(54321); // different seed from loading screen
  const shards = [];
  const points = [];

  for (let y = 0; y <= rows; y++) {
    const row = [];
    for (let x = 0; x <= cols; x++) {
      let px = (x / cols) * 100;
      let py = (y / rows) * 100;

      if (x > 0 && x < cols) px += (rand() - 0.5) * (100 / cols) * 0.8;
      if (y > 0 && y < rows) py += (rand() - 0.5) * (100 / rows) * 0.8;

      row.push({ x: px, y: py });
    }
    points.push(row);
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const p1 = points[y][x];
      const p2 = points[y][x + 1];
      const p3 = points[y + 1][x];
      const p4 = points[y + 1][x + 1];

      const createTri = (a, b, c) => {
        const minX = Math.min(a.x, b.x, c.x);
        const maxX = Math.max(a.x, b.x, c.x);
        const minY = Math.min(a.y, b.y, c.y);
        const maxY = Math.max(a.y, b.y, c.y);
        
        if (maxX - minX === 0 || maxY - minY === 0) return;

        const cx = (a.x + b.x + c.x) / 3;

        // Fall trajectory logic
        const fallX = (cx - 50) * 6 + (rand() - 0.5) * 100;
        const fallY = 600 + (rand() * 400); // fall down
        const fallRot = (rand() - 0.5) * 90;

        const rx = (pt) => ((pt.x - minX) / (maxX - minX)) * 100;
        const ry = (pt) => ((pt.y - minY) / (maxY - minY)) * 100;

        const clip = `polygon(${rx(a).toFixed(2)}% ${ry(a).toFixed(2)}%, ${rx(b).toFixed(2)}% ${ry(b).toFixed(2)}%, ${rx(c).toFixed(2)}% ${ry(c).toFixed(2)}%)`;

        shards.push({
          x: minX, y: minY, w: maxX - minX, h: maxY - minY,
          fallX, fallY, fallRot, clip,
          startRotate: (rand() - 0.5) * 10
        });
      };

      createTri(p1, p2, p3);
      createTri(p2, p4, p3);
    }
  }

  return shards;
}

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

function CardShatterCanvas({ sourceRect, onDone }) {
  const canvasRef = useRef(null);
  const allShards = useMemo(() => generateCardShards(4, 4), []);

  useEffect(() => {
    if (!sourceRect) return;

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

    window.addEventListener('resize', resize);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // sourceRect is the bounding client rect of the glass card
    // We map percentages to the sourceRect dimensions
    const particles = allShards.map((s) => ({
      x: sourceRect.left + (s.x / 100) * sourceRect.width,
      y: sourceRect.top + (s.y / 100) * sourceRect.height,
      w: (s.w / 100) * sourceRect.width,
      h: (s.h / 100) * sourceRect.height,
      rotation: s.startRotate,
      fallX: s.fallX,
      fallY: s.fallY,
      fallRot: s.fallRot,
      clip: s.clip,
    }));

    const duration = 1200; // ms for the fall
    let startTime = null;
    let animId;

    const drawShard = (p, t) => {
      const eased = t * t * t;

      const currentX = p.x + p.fallX * eased;
      const currentY = p.y + p.fallY * eased;
      const currentRot = p.rotation + p.fallRot * eased;
      const currentOpacity = Math.max(0, 1 - (t * 1.5));

      if (currentOpacity <= 0) return;

      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.translate(currentX + p.w / 2, currentY + p.h / 2);
      ctx.rotate((currentRot * Math.PI) / 180);

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

      // Glass edge highlight
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * currentOpacity})`;
      ctx.lineWidth = 1;
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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [sourceRect, allShards, onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1001,
        pointerEvents: 'none',
      }}
    />
  );
}

export default CardShatterCanvas;
