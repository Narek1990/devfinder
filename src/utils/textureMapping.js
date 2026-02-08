/**
 * Texture mapping helpers for Canvas2D.
 *
 * NOTE: CanvasRenderingContext2D only supports affine transforms. We approximate
 * mapping an image into an arbitrary quad by subdividing into a grid and
 * mapping each cell as two triangles (exact affine per triangle).
 */
 
export function applyAffineToPoint(m, p) {
  return {
    x: m.a * p.x + m.c * p.y + m.e,
    y: m.b * p.x + m.d * p.y + m.f,
  };
}
 
/**
 * Compute affine transform mapping srcTri -> dstTri.
 * Each tri is [{x,y},{x,y},{x,y}] in their respective coordinate spaces.
 *
 * Returns {a,b,c,d,e,f} usable with ctx.setTransform(a,b,c,d,e,f).
 */
export function computeAffineTransform(srcTri, dstTri) {
  const [s0, s1, s2] = srcTri;
  const [d0, d1, d2] = dstTri;
 
  const x0 = s0.x,
    y0 = s0.y;
  const x1 = s1.x,
    y1 = s1.y;
  const x2 = s2.x,
    y2 = s2.y;
 
  const X0 = d0.x,
    Y0 = d0.y;
  const X1 = d1.x,
    Y1 = d1.y;
  const X2 = d2.x,
    Y2 = d2.y;
 
  const denom = x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1);
  if (!Number.isFinite(denom) || Math.abs(denom) < 1e-12) {
    throw new Error("Degenerate source triangle (cannot compute transform).");
  }
 
  // For x mapping: X = a*x + c*y + e
  const a = (X0 * (y1 - y2) + X1 * (y2 - y0) + X2 * (y0 - y1)) / denom;
  const c = (X0 * (x2 - x1) + X1 * (x0 - x2) + X2 * (x1 - x0)) / denom;
  const e =
    (X0 * (x1 * y2 - x2 * y1) +
      X1 * (x2 * y0 - x0 * y2) +
      X2 * (x0 * y1 - x1 * y0)) /
    denom;
 
  // For y mapping: Y = b*x + d*y + f
  const b = (Y0 * (y1 - y2) + Y1 * (y2 - y0) + Y2 * (y0 - y1)) / denom;
  const d = (Y0 * (x2 - x1) + Y1 * (x0 - x2) + Y2 * (x1 - x0)) / denom;
  const f =
    (Y0 * (x1 * y2 - x2 * y1) +
      Y1 * (x2 * y0 - x0 * y2) +
      Y2 * (x0 * y1 - x1 * y0)) /
    denom;
 
  return { a, b, c, d, e, f };
}
 
function lerp(a, b, t) {
  return a + (b - a) * t;
}
 
export function bilinearPoint(quad, s, t) {
  const [tl, tr, br, bl] = quad;
  const x =
    tl.x * (1 - s) * (1 - t) +
    tr.x * s * (1 - t) +
    br.x * s * t +
    bl.x * (1 - s) * t;
  const y =
    tl.y * (1 - s) * (1 - t) +
    tr.y * s * (1 - t) +
    br.y * s * t +
    bl.y * (1 - s) * t;
  return { x, y };
}
 
export function drawTexturedTriangle(ctx, img, srcTri, dstTri) {
  const m = computeAffineTransform(srcTri, dstTri);
 
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(dstTri[0].x, dstTri[0].y);
  ctx.lineTo(dstTri[1].x, dstTri[1].y);
  ctx.lineTo(dstTri[2].x, dstTri[2].y);
  ctx.closePath();
  ctx.clip();
 
  ctx.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}
 
/**
 * Draw a CanvasImageSource into a quad (tl,tr,br,bl) using grid subdivision.
 * `img` may be HTMLImageElement or HTMLCanvasElement.
 */
export function drawImageToQuad(ctx, img, quad, gridX = 24, gridY = 24) {
  const w = img.width;
  const h = img.height;
 
  if (!w || !h) return;
 
  for (let gy = 0; gy < gridY; gy++) {
    const t0 = gy / gridY;
    const t1 = (gy + 1) / gridY;
    for (let gx = 0; gx < gridX; gx++) {
      const s0 = gx / gridX;
      const s1 = (gx + 1) / gridX;
 
      const p00 = bilinearPoint(quad, s0, t0);
      const p10 = bilinearPoint(quad, s1, t0);
      const p11 = bilinearPoint(quad, s1, t1);
      const p01 = bilinearPoint(quad, s0, t1);
 
      const u00 = lerp(0, w, s0);
      const v00 = lerp(0, h, t0);
      const u10 = lerp(0, w, s1);
      const v10 = lerp(0, h, t0);
      const u11 = lerp(0, w, s1);
      const v11 = lerp(0, h, t1);
      const u01 = lerp(0, w, s0);
      const v01 = lerp(0, h, t1);
 
      // Triangle 1: (00,10,11)
      drawTexturedTriangle(
        ctx,
        img,
        [
          { x: u00, y: v00 },
          { x: u10, y: v10 },
          { x: u11, y: v11 },
        ],
        [p00, p10, p11]
      );
 
      // Triangle 2: (00,11,01)
      drawTexturedTriangle(
        ctx,
        img,
        [
          { x: u00, y: v00 },
          { x: u11, y: v11 },
          { x: u01, y: v01 },
        ],
        [p00, p11, p01]
      );
    }
  }
}
