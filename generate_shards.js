const cols = 5;
const rows = 4;
const shards = [];

// Create grid points
const points = [];
for (let y = 0; y <= rows; y++) {
  const row = [];
  for (let x = 0; x <= cols; x++) {
    // base percentage
    let px = (x / cols) * 100;
    let py = (y / rows) * 100;
    
    // Add jitter to interior points
    if (x > 0 && x < cols) px += (Math.random() - 0.5) * 15;
    if (y > 0 && y < rows) py += (Math.random() - 0.5) * 15;
    
    row.push({ x: px, y: py });
  }
  points.push(row);
}

// Create triangles
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const p1 = points[y][x];
    const p2 = points[y][x+1];
    const p3 = points[y+1][x];
    const p4 = points[y+1][x+1];
    
    // Triangle 1: p1, p2, p3
    // Triangle 2: p2, p4, p3
    
    const pushTri = (a, b, c) => {
      // bounding box
      const minX = Math.min(a.x, b.x, c.x);
      const maxX = Math.max(a.x, b.x, c.x);
      const minY = Math.min(a.y, b.y, c.y);
      const maxY = Math.max(a.y, b.y, c.y);
      
      const cx = (a.x + b.x + c.x) / 3;
      const cy = (a.y + b.y + c.y) / 3;
      
      // Fall trajectory based on position from center
      const fallX = (cx - 50) * 8 + (Math.random() - 0.5) * 100;
      const fallY = 800 + (Math.random() * 400); // mostly fall down
      const fallRot = (Math.random() - 0.5) * 90;
      
      // Relativize points to bounding box (0-100%)
      const rx = (pt) => ((pt.x - minX) / (maxX - minX)) * 100;
      const ry = (pt) => ((pt.y - minY) / (maxY - minY)) * 100;
      
      const clip = \`polygon(\${rx(a).toFixed(1)}% \${ry(a).toFixed(1)}%, \${rx(b).toFixed(1)}% \${ry(b).toFixed(1)}%, \${rx(c).toFixed(1)}% \${ry(c).toFixed(1)}%)\`;
      
      shards.push({
        x: Number(minX.toFixed(2)),
        y: Number(minY.toFixed(2)),
        w: Number((maxX - minX).toFixed(2)),
        h: Number((maxY - minY).toFixed(2)),
        fallX: Number(fallX.toFixed(2)),
        fallY: Number(fallY.toFixed(2)),
        fallRot: Number(fallRot.toFixed(2)),
        clip: clip
      });
    };
    
    pushTri(p1, p2, p3);
    pushTri(p2, p4, p3);
  }
}

console.log(JSON.stringify(shards, null, 2));
