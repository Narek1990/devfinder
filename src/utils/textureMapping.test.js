import { applyAffineToPoint, computeAffineTransform } from "./textureMapping";
 
function approxEqual(a, b, eps = 1e-6) {
  return Math.abs(a - b) <= eps;
}
 
describe("textureMapping", () => {
  test("computeAffineTransform maps the source triangle vertices to destination vertices", () => {
    const srcTri = [
      { x: 10, y: 20 },
      { x: 110, y: 25 },
      { x: 40, y: 140 },
    ];
    const dstTri = [
      { x: 200, y: 180 },
      { x: 520, y: 220 },
      { x: 260, y: 610 },
    ];
 
    const m = computeAffineTransform(srcTri, dstTri);
 
    for (let i = 0; i < 3; i++) {
      const mapped = applyAffineToPoint(m, srcTri[i]);
      expect(approxEqual(mapped.x, dstTri[i].x, 1e-5)).toBe(true);
      expect(approxEqual(mapped.y, dstTri[i].y, 1e-5)).toBe(true);
    }
  });
});

