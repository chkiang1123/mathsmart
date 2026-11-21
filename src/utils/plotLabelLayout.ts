export type PlotLabelCategory =
  | 'interactive'
  | 'vertex'
  | 'point'
  | 'root'
  | 'polygon'
  | 'synth';

export interface PlotRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PlotLabelInput {
  id: string;
  px: number;
  py: number;
  text: string;
  color: string;
  category: PlotLabelCategory;
  fontSize?: number;
  fontWeight?: string;
}

export interface PlacedPlotLabel {
  id: string;
  anchorX: number;
  anchorY: number;
  box: PlotRect;
  textX: number;
  textY: number;
  textAnchor: 'start' | 'middle' | 'end';
  text: string;
  color: string;
  category: PlotLabelCategory;
  fontSize: number;
  fontWeight: string;
  leaderLine?: { x1: number; y1: number; x2: number; y2: number };
}

export interface PlotLayoutOptions {
  bounds: PlotRect; // Clipped plotting area: { x: pad.left, y: pad.top, w: plotW, h: plotH }
  obstacles?: PlotRect[]; // Static axis labels, tick labels, top callouts
  dotCenters?: { x: number; y: number }[]; // All point/root/vertex dot markers
  curveSamples?: { x: number; y: number }[]; // Decimated curve points in pixel coords
  axisX?: number | null; // Pixel X of visible y-axis (or null if hidden)
  axisY?: number | null; // Pixel Y of visible x-axis (or null if hidden)
}

const CATEGORY_PRIORITY: Record<PlotLabelCategory, number> = {
  interactive: 6,
  vertex: 5,
  point: 4,
  synth: 3,
  root: 2,
  polygon: 1,
};

function charWidthFactor(ch: string): number {
  if ('iIl|!.,:;'.includes(ch)) return 0.34;
  if ('()[]{}1fjrt '.includes(ch)) return 0.44;
  if ('mwMW@#%&QGO'.includes(ch)) return 0.72;
  if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(ch)) return 0.64;
  return 0.58;
}

export function estimateLabelSize(text: string, fontSize = 10.5): { w: number; h: number } {
  let widthUnits = 0;
  for (let i = 0; i < text.length; i++) {
    widthUnits += charWidthFactor(text[i]);
  }
  const w = Math.max(16, Math.ceil(widthUnits * fontSize) + 8);
  const h = Math.ceil(fontSize + 5);
  return { w, h };
}

export function rectsOverlapArea(a: PlotRect, b: PlotRect, margin = 0): number {
  const xOverlap = Math.max(0, Math.min(a.x + a.w + margin, b.x + b.w) - Math.max(a.x - margin, b.x));
  if (xOverlap <= 0) return 0;
  const yOverlap = Math.max(0, Math.min(a.y + a.h + margin, b.y + b.h) - Math.max(a.y - margin, b.y));
  return xOverlap * yOverlap;
}

function normalizeLabelRoot(text: string): string {
  const trimmed = text.trim();
  const prefixMatch = trimmed.match(/^([A-Za-z])[₀₁₂₃₄₅₆₇₈₉0-9']*(?:\s*\(|$)/);
  if (prefixMatch) return prefixMatch[1].toUpperCase();
  return trimmed.replace(/\s+/g, '');
}

function shouldMergeCoincident(a: PlotLabelInput, b: PlotLabelInput): boolean {
  if (Math.hypot(a.px - b.px, a.py - b.py) > 3.5) return false;
  const ta = a.text.trim();
  const tb = b.text.trim();
  if (ta === tb) return true;
  if (ta.replace(/\s+/g, '') === tb.replace(/\s+/g, '')) return true;

  const ra = normalizeLabelRoot(ta);
  const rb = normalizeLabelRoot(tb);
  if (ra.length === 1 && ra === rb) return true;

  // Root / vertex coordinate label vs named point at same coordinates
  if (
    (a.category === 'root' || a.category === 'vertex' || a.category === 'synth') &&
    (b.category === 'point' || b.category === 'vertex' || b.category === 'root')
  ) {
    return true;
  }
  if (
    (b.category === 'root' || b.category === 'vertex' || b.category === 'synth') &&
    (a.category === 'point' || a.category === 'vertex' || a.category === 'root')
  ) {
    return true;
  }

  return false;
}

function pickPreferredLabel(a: PlotLabelInput, b: PlotLabelInput): PlotLabelInput {
  const pa = CATEGORY_PRIORITY[a.category];
  const pb = CATEGORY_PRIORITY[b.category];
  // Prefer point with coordinates over bare polygon vertex letter
  if (a.category === 'polygon' && b.category === 'point') return b;
  if (b.category === 'polygon' && a.category === 'point') return a;
  if (pa !== pb) return pa > pb ? a : b;
  return b.text.length > a.text.length ? b : a;
}

export function deduplicateCoincidentLabels(inputs: PlotLabelInput[]): PlotLabelInput[] {
  const kept: PlotLabelInput[] = [];
  for (const item of inputs) {
    if (!item.text || !Number.isFinite(item.px) || !Number.isFinite(item.py)) continue;
    const matchIdx = kept.findIndex((existing) => shouldMergeCoincident(existing, item));
    if (matchIdx >= 0) {
      kept[matchIdx] = pickPreferredLabel(kept[matchIdx], item);
    } else {
      kept.push(item);
    }
  }
  return kept;
}

interface CandidateSpec {
  dx: number;
  dy: number;
  anchor: 'start' | 'middle' | 'end';
  baseCost: number;
}

const CANDIDATE_OFFSETS: CandidateSpec[] = [
  // Primary 4 diagonal quadrants (cleanest next to dots)
  { dx: 8, dy: -8, anchor: 'start', baseCost: 0 },
  { dx: -8, dy: -8, anchor: 'end', baseCost: 2 },
  { dx: 8, dy: 9, anchor: 'start', baseCost: 5 },
  { dx: -8, dy: 9, anchor: 'end', baseCost: 7 },
  // Cardinal directions
  { dx: 0, dy: -10, anchor: 'middle', baseCost: 9 },
  { dx: 0, dy: 11, anchor: 'middle', baseCost: 11 },
  { dx: 11, dy: 0, anchor: 'start', baseCost: 13 },
  { dx: -11, dy: 0, anchor: 'end', baseCost: 14 },
  // Secondary mid-distance rings (triggers short leader line if picked)
  { dx: 14, dy: -22, anchor: 'start', baseCost: 24 },
  { dx: -14, dy: -22, anchor: 'end', baseCost: 25 },
  { dx: 14, dy: 24, anchor: 'start', baseCost: 27 },
  { dx: -14, dy: 24, anchor: 'end', baseCost: 28 },
  { dx: 0, dy: -28, anchor: 'middle', baseCost: 30 },
  { dx: 0, dy: 30, anchor: 'middle', baseCost: 32 },
  { dx: 24, dy: -10, anchor: 'start', baseCost: 34 },
  { dx: -24, dy: -10, anchor: 'end', baseCost: 35 },
  { dx: 24, dy: 14, anchor: 'start', baseCost: 36 },
  { dx: -24, dy: 14, anchor: 'end', baseCost: 37 },
  // Outer fallback ring for very dense clusters
  { dx: 0, dy: -46, anchor: 'middle', baseCost: 55 },
  { dx: 0, dy: 48, anchor: 'middle', baseCost: 56 },
  { dx: 34, dy: -32, anchor: 'start', baseCost: 60 },
  { dx: -34, dy: -32, anchor: 'end', baseCost: 61 },
  { dx: 34, dy: 34, anchor: 'start', baseCost: 62 },
  { dx: -34, dy: 34, anchor: 'end', baseCost: 63 },
];

function buildCandidateBox(
  px: number,
  py: number,
  w: number,
  h: number,
  spec: CandidateSpec,
  bounds: PlotRect,
  clampToBounds: boolean
): { box: PlotRect; anchor: 'start' | 'middle' | 'end' } {
  let x: number;
  if (spec.anchor === 'start') {
    x = px + spec.dx;
  } else if (spec.anchor === 'end') {
    x = px + spec.dx - w;
  } else {
    x = px + spec.dx - w / 2;
  }

  let y: number;
  if (spec.dy < 0) {
    y = py + spec.dy - h;
  } else if (spec.dy > 0) {
    y = py + spec.dy;
  } else {
    y = py - h / 2;
  }

  if (clampToBounds) {
    const minX = bounds.x + 2;
    const maxX = Math.max(minX, bounds.x + bounds.w - w - 2);
    const minY = bounds.y + 2;
    const maxY = Math.max(minY, bounds.y + bounds.h - h - 2);
    x = Math.min(maxX, Math.max(minX, x));
    y = Math.min(maxY, Math.max(minY, y));
  }

  return { box: { x, y, w, h }, anchor: spec.anchor };
}

function computeBoxScore(
  box: PlotRect,
  anchorX: number,
  anchorY: number,
  baseCost: number,
  bounds: PlotRect,
  placedBoxes: PlotRect[],
  obstacles: PlotRect[],
  dotBoxes: PlotRect[],
  curveSamples: { x: number; y: number }[],
  axisX: number | null | undefined,
  axisY: number | null | undefined
): number {
  let score = baseCost;

  // 1. Out-of-bounds penalty (clip prevention)
  const clipLeft = Math.max(0, bounds.x + 2 - box.x);
  const clipRight = Math.max(0, box.x + box.w - (bounds.x + bounds.w - 2));
  const clipTop = Math.max(0, bounds.y + 2 - box.y);
  const clipBottom = Math.max(0, box.y + box.h - (bounds.y + bounds.h - 2));
  const totalClip = clipLeft + clipRight + clipTop + clipBottom;
  if (totalClip > 0) {
    score += 25000 + totalClip * 600;
  }

  // 2. Overlap with already-placed point/root/vertex/polygon labels
  for (const other of placedBoxes) {
    const area = rectsOverlapArea(box, other, 2);
    if (area > 0) {
      score += 12000 + area * 35;
    }
  }

  // 3. Overlap with static axis / tick / title obstacles
  for (const obs of obstacles) {
    const area = rectsOverlapArea(box, obs, 2);
    if (area > 0) {
      score += 8000 + area * 25;
    }
  }

  // 4. Overlap with point markers (dots)
  for (const dot of dotBoxes) {
    const area = rectsOverlapArea(box, dot, 0);
    if (area > 0) {
      score += 4500 + area * 20;
    }
  }

  // 5. Crossing visible main axes
  if (typeof axisX === 'number' && box.x < axisX + 2 && box.x + box.w > axisX - 2) {
    score += 420;
  }
  if (typeof axisY === 'number' && box.y < axisY + 2 && box.y + box.h > axisY - 2) {
    score += 420;
  }

  // 6. Soft penalty for sitting directly on sampled curve strokes
  let curveHits = 0;
  for (let i = 0; i < curveSamples.length; i++) {
    const pt = curveSamples[i];
    if (pt.x >= box.x - 2 && pt.x <= box.x + box.w + 2 && pt.y >= box.y - 2 && pt.y <= box.y + box.h + 2) {
      curveHits++;
    }
  }
  score += curveHits * 160;

  // 7. Distance from anchor point (keep closely attached when possible)
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  score += Math.hypot(cx - anchorX, cy - anchorY) * 0.45;

  return score;
}

function closestPointOnRect(px: number, py: number, box: PlotRect): { x: number; y: number } {
  const x = Math.max(box.x, Math.min(px, box.x + box.w));
  const y = Math.max(box.y, Math.min(py, box.y + box.h));
  return { x, y };
}

export function computePlotLabelLayout(
  rawInputs: PlotLabelInput[],
  options: PlotLayoutOptions
): PlacedPlotLabel[] {
  const {
    bounds,
    obstacles = [],
    dotCenters = [],
    curveSamples = [],
    axisX,
    axisY,
  } = options;

  const deduped = deduplicateCoincidentLabels(rawInputs);
  if (deduped.length === 0) return [];

  const dotBoxes: PlotRect[] = dotCenters.map((d) => ({
    x: d.x - 6,
    y: d.y - 6,
    w: 12,
    h: 12,
  }));

  // Order placement: highest priority first, and among equal priority, edge-constrained labels first
  const ordered = [...deduped].sort((a, b) => {
    const priDiff = CATEGORY_PRIORITY[b.category] - CATEGORY_PRIORITY[a.category];
    if (priDiff !== 0) return priDiff;
    const distEdgeA = Math.min(
      a.px - bounds.x,
      bounds.x + bounds.w - a.px,
      a.py - bounds.y,
      bounds.y + bounds.h - a.py
    );
    const distEdgeB = Math.min(
      b.px - bounds.x,
      bounds.x + bounds.w - b.px,
      b.py - bounds.y,
      bounds.y + bounds.h - b.py
    );
    return distEdgeA - distEdgeB;
  });

  const placedBoxes: PlotRect[] = [];
  const results: PlacedPlotLabel[] = [];

  for (const item of ordered) {
    const fontSize = item.fontSize ?? (item.category === 'vertex' ? 10.5 : 10.5);
    const fontWeight =
      item.fontWeight ?? (item.category === 'vertex' || item.category === 'synth' ? '700' : '600');
    const { w, h } = estimateLabelSize(item.text, fontSize);

    let bestBox: PlotRect | null = null;
    let bestScore = Infinity;

    // Evaluate both unclamped radial candidates and clamped boundary candidates
    for (const clamp of [false, true]) {
      for (const spec of CANDIDATE_OFFSETS) {
        const { box } = buildCandidateBox(item.px, item.py, w, h, spec, bounds, clamp);
        const penalty = clamp ? spec.baseCost + 18 : spec.baseCost;
        const score = computeBoxScore(
          box,
          item.px,
          item.py,
          penalty,
          bounds,
          placedBoxes,
          obstacles,
          dotBoxes,
          curveSamples,
          axisX,
          axisY
        );
        if (score < bestScore) {
          bestScore = score;
          bestBox = box;
        }
      }
    }

    // If still overlapping in very crowded plots, test expanded vertical/horizontal grid shifts
    if (bestScore >= 8000) {
      const extraShifts: [number, number][] = [];
      for (const dy of [-40, 40, -58, 58, -76, 76]) {
        for (const dx of [0, -32, 32, -64, 64]) {
          extraShifts.push([dx, dy]);
        }
      }
      for (const [dx, dy] of extraShifts) {
        const minX = bounds.x + 2;
        const maxX = Math.max(minX, bounds.x + bounds.w - w - 2);
        const minY = bounds.y + 2;
        const maxY = Math.max(minY, bounds.y + bounds.h - h - 2);
        const bx = Math.min(maxX, Math.max(minX, item.px + dx - w / 2));
        const by = Math.min(maxY, Math.max(minY, item.py + dy - h / 2));
        const box: PlotRect = { x: bx, y: by, w, h };
        const score = computeBoxScore(
          box,
          item.px,
          item.py,
          85,
          bounds,
          placedBoxes,
          obstacles,
          dotBoxes,
          curveSamples,
          axisX,
          axisY
        );
        if (score < bestScore) {
          bestScore = score;
          bestBox = box;
        }
      }
    }

    const finalBox = bestBox ?? {
      x: Math.min(bounds.x + bounds.w - w - 2, Math.max(bounds.x + 2, item.px + 6)),
      y: Math.min(bounds.y + bounds.h - h - 2, Math.max(bounds.y + 2, item.py - h - 4)),
      w,
      h,
    };

    placedBoxes.push(finalBox);

    const edge = closestPointOnRect(item.px, item.py, finalBox);
    const gap = Math.hypot(edge.x - item.px, edge.y - item.py);

    results.push({
      id: item.id,
      anchorX: item.px,
      anchorY: item.py,
      box: finalBox,
      textX: finalBox.x + finalBox.w / 2,
      textY: finalBox.y + finalBox.h / 2 + fontSize * 0.34,
      textAnchor: 'middle',
      text: item.text,
      color: item.color,
      category: item.category,
      fontSize,
      fontWeight,
      leaderLine:
        gap > 16
          ? {
              x1: item.px,
              y1: item.py,
              x2: edge.x,
              y2: edge.y,
            }
          : undefined,
    });
  }

  return results;
}
