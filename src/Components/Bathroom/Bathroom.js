import React, { useEffect, useMemo, useRef, useState } from "react";
import "./style.css";
import { drawImageToQuad } from "../../utils/textureMapping";
 
function useImageFromFile(file) {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    if (!file) {
      setImg(null);
      setError(null);
      return;
    }
 
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setImg(image);
      setError(null);
    };
    image.onerror = () => {
      setImg(null);
      setError("Failed to load image.");
    };
    image.src = url;
 
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);
 
  return { img, error };
}
 
function makeTiledTextureCanvas(img, { tileSize = 1024, maxInputDim = 512 } = {}) {
  if (!img) return null;
 
  const inputW = img.naturalWidth || img.width;
  const inputH = img.naturalHeight || img.height;
  if (!inputW || !inputH) return null;
 
  const scale = Math.min(1, maxInputDim / Math.max(inputW, inputH));
  const scaledW = Math.max(1, Math.round(inputW * scale));
  const scaledH = Math.max(1, Math.round(inputH * scale));
 
  const base = document.createElement("canvas");
  base.width = scaledW;
  base.height = scaledH;
  const bctx = base.getContext("2d");
  bctx.imageSmoothingEnabled = true;
  bctx.imageSmoothingQuality = "high";
  bctx.drawImage(img, 0, 0, scaledW, scaledH);
 
  const tiled = document.createElement("canvas");
  tiled.width = tileSize;
  tiled.height = tileSize;
  const tctx = tiled.getContext("2d");
  const pattern = tctx.createPattern(base, "repeat");
  tctx.fillStyle = pattern;
  tctx.fillRect(0, 0, tileSize, tileSize);
 
  return tiled;
}
 
function quadPath(ctx, quad) {
  const [tl, tr, br, bl] = quad;
  ctx.beginPath();
  ctx.moveTo(tl.x, tl.y);
  ctx.lineTo(tr.x, tr.y);
  ctx.lineTo(br.x, br.y);
  ctx.lineTo(bl.x, bl.y);
  ctx.closePath();
}
 
function shadeQuad(ctx, quad, { from, to, alphaFrom = 0.0, alphaTo = 0.35 }) {
  ctx.save();
  quadPath(ctx, quad);
  ctx.clip();
  const g = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
  g.addColorStop(0, `rgba(0,0,0,${alphaFrom})`);
  g.addColorStop(1, `rgba(0,0,0,${alphaTo})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
 
function drawPlaceholderQuad(ctx, quad, fill, label) {
  ctx.save();
  quadPath(ctx, quad);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
 
  // label
  const center = quad.reduce(
    (acc, p) => ({ x: acc.x + p.x / 4, y: acc.y + p.y / 4 }),
    { x: 0, y: 0 }
  );
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, Ubuntu";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, center.x, center.y);
  ctx.restore();
}
 
function getRoomQuads(w, h) {
  const wallTop = Math.round(h * 0.11);
  const wallBottom = Math.round(h * 0.56);
 
  const backLeftX = Math.round(w * 0.36);
  const backRightX = Math.round(w * 0.64);
 
  const back = [
    { x: backLeftX, y: wallTop }, // tl
    { x: backRightX, y: wallTop }, // tr
    { x: backRightX, y: wallBottom }, // br
    { x: backLeftX, y: wallBottom }, // bl
  ];
 
  const side = [
    { x: Math.round(w * 0.18), y: wallTop }, // tl
    { x: backLeftX, y: wallTop }, // tr
    { x: backLeftX, y: wallBottom }, // br
    { x: Math.round(w * 0.08), y: wallBottom + Math.round(h * 0.09) }, // bl
  ];
 
  const floor = [
    { x: backLeftX, y: wallBottom }, // tl
    { x: backRightX, y: wallBottom }, // tr
    { x: Math.round(w * 0.92), y: h - Math.round(h * 0.08) }, // br
    { x: Math.round(w * 0.12), y: h - Math.round(h * 0.08) }, // bl
  ];
 
  return { back, side, floor };
}
 
export const Bathroom = ({ displayMode }) => {
  const canvasRef = useRef(null);
 
  const [santanaFile, setSantanaFile] = useState(null);
  const [darkWhiteFile, setDarkWhiteFile] = useState(null);
  const [woodFile, setWoodFile] = useState(null);
 
  const [backWallMaterial, setBackWallMaterial] = useState("santana");
  const [sideWallMaterial, setSideWallMaterial] = useState("darkWhite");
 
  const santana = useImageFromFile(santanaFile);
  const darkWhite = useImageFromFile(darkWhiteFile);
  const wood = useImageFromFile(woodFile);
 
  const textures = useMemo(() => {
    const santanaTex = makeTiledTextureCanvas(santana.img);
    const darkWhiteTex = makeTiledTextureCanvas(darkWhite.img);
    const woodTex = makeTiledTextureCanvas(wood.img);
    return { santanaTex, darkWhiteTex, woodTex };
  }, [santana.img, darkWhite.img, wood.img]);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    let ctx = null;
    try {
      ctx = canvas.getContext("2d");
    } catch (e) {
      // JSDOM (unit tests) does not implement Canvas2D. In that environment
      // `getContext` may throw; we just skip rendering.
      return;
    }
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
 
    // background
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = displayMode === "Dark" ? "#0e1626" : "#f2f4f8";
    ctx.fillRect(0, 0, w, h);
 
    // soft vignette
    const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.1, w / 2, h / 2, h * 0.9);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, displayMode === "Dark" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.12)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
 
    const { back, side, floor } = getRoomQuads(w, h);
 
    const materialCanvas = (key) => {
      if (key === "santana") return textures.santanaTex;
      if (key === "darkWhite") return textures.darkWhiteTex;
      if (key === "wood") return textures.woodTex;
      return null;
    };
 
    const backImg = materialCanvas(backWallMaterial);
    const sideImg = materialCanvas(sideWallMaterial);
    const floorImg = textures.woodTex;
 
    // floor first (under walls)
    if (floorImg) drawImageToQuad(ctx, floorImg, floor, 28, 28);
    else drawPlaceholderQuad(ctx, floor, "#8b6b4c", "Wood floor");
 
    if (sideImg) drawImageToQuad(ctx, sideImg, side, 26, 26);
    else drawPlaceholderQuad(ctx, side, "#b7b9bf", "Wall (Dark White)");
 
    if (backImg) drawImageToQuad(ctx, backImg, back, 26, 26);
    else drawPlaceholderQuad(ctx, back, "#2e6f63", "Wall (Santana)");
 
    // shading for depth
    shadeQuad(ctx, floor, { from: floor[0], to: floor[2], alphaFrom: 0.0, alphaTo: 0.35 });
    shadeQuad(ctx, side, { from: side[1], to: side[3], alphaFrom: 0.1, alphaTo: 0.35 });
    shadeQuad(ctx, back, { from: back[0], to: back[3], alphaFrom: 0.06, alphaTo: 0.22 });
 
    // edge lines
    ctx.save();
    ctx.strokeStyle = displayMode === "Dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
    ctx.lineWidth = 2;
    quadPath(ctx, back);
    ctx.stroke();
    quadPath(ctx, side);
    ctx.stroke();
    quadPath(ctx, floor);
    ctx.stroke();
    ctx.restore();
 
    // title
    ctx.save();
    ctx.fillStyle = displayMode === "Dark" ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.78)";
    ctx.font = "700 16px system-ui, -apple-system, Segoe UI, Roboto, Ubuntu";
    ctx.fillText("Bathroom preview — 4 m² (2m × 2m)", 18, 28);
    ctx.restore();
  }, [
    displayMode,
    textures.santanaTex,
    textures.darkWhiteTex,
    textures.woodTex,
    backWallMaterial,
    sideWallMaterial,
  ]);
 
  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "bathroom-4sqm-material-preview.png";
    a.click();
  };
 
  const hasAnyError = Boolean(santana.error || darkWhite.error || wood.error);
 
  return (
    <div className={`bathroom ${displayMode === "Dark" ? "bathroom--dark" : "bathroom--light"}`}>
      <div className="bathroom__controls">
        <div className="bathroom__title">
          <p className="bathroom__headline">Bathroom material render</p>
          <p className="bathroom__sub">
            Upload 3 images (Santana / Dark White / Wood). The preview is generated locally in your browser.
          </p>
        </div>
 
        <div className="bathroom__grid">
          <label className="bathroom__field">
            <span className="bathroom__label">1) Santana (cabin walls)</span>
            <input type="file" accept="image/*" onChange={(e) => setSantanaFile(e.target.files?.[0] || null)} />
          </label>
 
          <label className="bathroom__field">
            <span className="bathroom__label">2) Dark White (other walls)</span>
            <input type="file" accept="image/*" onChange={(e) => setDarkWhiteFile(e.target.files?.[0] || null)} />
          </label>
 
          <label className="bathroom__field">
            <span className="bathroom__label">3) Wooden (floor)</span>
            <input type="file" accept="image/*" onChange={(e) => setWoodFile(e.target.files?.[0] || null)} />
          </label>
 
          <label className="bathroom__field">
            <span className="bathroom__label">Back wall</span>
            <select value={backWallMaterial} onChange={(e) => setBackWallMaterial(e.target.value)}>
              <option value="santana">Santana</option>
              <option value="darkWhite">Dark White</option>
            </select>
          </label>
 
          <label className="bathroom__field">
            <span className="bathroom__label">Side wall</span>
            <select value={sideWallMaterial} onChange={(e) => setSideWallMaterial(e.target.value)}>
              <option value="darkWhite">Dark White</option>
              <option value="santana">Santana</option>
            </select>
          </label>
 
          <div className="bathroom__actions">
            <button className="bathroom__btn" onClick={downloadPng}>
              Download PNG
            </button>
            {hasAnyError ? <p className="bathroom__error">One or more images failed to load.</p> : null}
          </div>
        </div>
      </div>
 
      <div className="bathroom__preview">
        <canvas ref={canvasRef} width={960} height={640} className="bathroom__canvas" />
      </div>
    </div>
  );
};

