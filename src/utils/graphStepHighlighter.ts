import type { AnalysisStep, CurveSpec, PointSpec } from '../types/math';
import { evaluateCurveY, formatNum } from './mathEngine';

export interface VerticalShiftGuide {
  x: number;
  yFrom: number;
  yTo: number;
  label: string;
}

export interface GraphStepHighlights {
  activeCurveIndices: number[];
  mutedCurveIndices: number[];
  highlightAxisOfSymmetry: boolean;
  highlightVertex: boolean;
  highlightRoots: boolean;
  highlightPolygons: boolean;
  highlightPointIndices: number[];
  synthesizedFocusPoints: PointSpec[];
  verticalShiftGuide?: VerticalShiftGuide;
  calloutLabel?: string;
}

export interface ComputeGraphHighlightsInput {
  step: AnalysisStep | null;
  stepNumber: number; // 0 = no step revealed yet
  totalSteps: number;
  curves: CurveSpec[];
  points: PointSpec[];
  xRange: [number, number];
  yRange: [number, number];
  showAxisOfSymmetry?: number;
  showVertex?: { x: number; y: number; label?: string };
  showRoots?: number[];
  hasPolygons?: boolean;
}

function parseExplicitCoordinates(text: string): { x: number; y: number }[] {
  const coords: { x: number; y: number }[] = [];
  const re = /\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const x = Number(m[1]);
    const y = Number(m[2]);
    if (Number.isFinite(x) && Number.isFinite(y)) {
      if (!coords.some((c) => Math.abs(c.x - x) < 1e-6 && Math.abs(c.y - y) < 1e-6)) {
        coords.push({ x, y });
      }
    }
  }
  return coords;
}

function curveMatchesStepText(curve: CurveSpec, idx: number, haystack: string): boolean {
  const label = curve.label ?? '';
  if (idx === 1) {
    if (/\bG\b(?:\s*=|\s*:|\s+cuts|\s+has|\s+does|\b)/.test(haystack)) return true;
    if (/f\(x\)\s*-\s*\d+|vertical shift|translate|shift/i.test(haystack)) return true;
    if (curve.kind === 'linear' && /line\s*L|L:\s*y\s*=/.test(haystack)) return true;
  }
  if (label) {
    const fnNameMatch = label.match(/^([a-zA-Z])\(/);
    if (fnNameMatch && new RegExp(`\\b${fnNameMatch[1]}\\(`).test(haystack)) {
      return true;
    }
    const lhsMatch = label.match(/^([A-Z])\s*=/);
    if (lhsMatch && new RegExp(`\\b${lhsMatch[1]}\\b`).test(haystack)) {
      return true;
    }
  }
  return false;
}

export function computeGraphStepHighlights(
  input: ComputeGraphHighlightsInput
): GraphStepHighlights {
  const {
    step,
    stepNumber,
    curves,
    points,
    xRange,
    yRange,
    showAxisOfSymmetry,
    showVertex,
    showRoots,
    hasPolygons,
  } = input;

  if (!step || stepNumber <= 0) {
    return {
      activeCurveIndices: curves.map((_, i) => i),
      mutedCurveIndices: [],
      highlightAxisOfSymmetry: false,
      highlightVertex: false,
      highlightRoots: false,
      highlightPolygons: false,
      highlightPointIndices: [],
      synthesizedFocusPoints: [],
    };
  }

  const haystack = `${step.title} ${step.math} ${step.explanation}`;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  // 1. Axis of symmetry
  const mentionsAxis =
    /\baxis\b|symmetr/i.test(haystack) ||
    (typeof showAxisOfSymmetry === 'number' &&
      new RegExp(`x\\s*=\\s*${formatNum(showAxisOfSymmetry, 2)}\\b`).test(haystack));
  const highlightAxisOfSymmetry =
    mentionsAxis && typeof showAxisOfSymmetry === 'number' && Number.isFinite(showAxisOfSymmetry);

  // 2. Vertex / extremum
  const mentionsVertex =
    /vertex|\bmin(?:imum)?\b|\bmax(?:imum)?\b|turning|complete\s+the\s+square|h\s*=\s*-?\d/i.test(
      haystack
    );
  const highlightVertex =
    mentionsVertex && Boolean(showVertex && Number.isFinite(showVertex.x) && Number.isFinite(showVertex.y));

  // 3. Roots / x-intercepts / discriminant
  const mentionsRoots =
    /x-intercept|cuts?\s+(?:the\s+)?x-axis|touch(?:es)?\s+(?:the\s+)?x-axis|intersect(?:s)?\s+(?:the\s+)?x-axis|\broots?\b|Δ|discriminant|equal roots/i.test(
      haystack
    );
  const highlightRoots = mentionsRoots && Boolean(showRoots && showRoots.length > 0);

  // 4. Polygons / geometric area
  const highlightPolygons =
    Boolean(hasPolygons) && /\barea\b|△|triangle|rhombus|quadrilateral|rectangle/i.test(haystack);

  // 5. Curve emphasis (for multi-curve plots)
  let activeCurveIndices: number[] = curves.map((_, i) => i);
  let mutedCurveIndices: number[] = [];
  if (curves.length >= 2) {
    const matched = curves
      .map((c, idx) => (curveMatchesStepText(c, idx, haystack) ? idx : -1))
      .filter((idx) => idx >= 0);

    if (matched.length === 1) {
      activeCurveIndices = matched;
      mutedCurveIndices = curves.map((_, i) => i).filter((i) => !matched.includes(i));
    } else if (
      matched.length === 0 &&
      curves[0]?.label?.startsWith('f(') &&
      !/\bG\b/.test(haystack) &&
      stepNumber === 1
    ) {
      activeCurveIndices = [0];
      mutedCurveIndices = curves.slice(1).map((_, i) => i + 1);
    }
  }

  // 6. Vertical shift detection between curves[0] and curves[1]
  let verticalShiftGuide: VerticalShiftGuide | undefined;
  if (
    curves.length >= 2 &&
    activeCurveIndices.includes(1) &&
    curves[0].kind === 'quadratic' &&
    curves[1].kind === 'quadratic' &&
    Math.abs(curves[0].a - curves[1].a) < 1e-6 &&
    Math.abs(curves[0].b - curves[1].b) < 1e-6 &&
    Math.abs(curves[0].c - curves[1].c) > 1e-6
  ) {
    const c0 = curves[0];
    const c1 = curves[1];
    const delta = c1.c - c0.c;
    const midX = (xMin + xMax) / 2;
    const xProbe = xMin <= 0 && xMax >= 0 ? 0 : midX;
    const yFrom = evaluateCurveY(c0, xProbe);
    const yTo = evaluateCurveY(c1, xProbe);
    if (
      yFrom !== null &&
      yTo !== null &&
      yFrom >= yMin &&
      yFrom <= yMax &&
      yTo >= yMin &&
      yTo <= yMax
    ) {
      verticalShiftGuide = {
        x: xProbe,
        yFrom,
        yTo,
        label: delta < 0 ? `${formatNum(delta, 2)}` : `+${formatNum(delta, 2)}`,
      };
    }
  }

  // 7. Highlight matching plotted points & synthesize focus points mentioned in step
  const explicitCoords = parseExplicitCoordinates(haystack);
  const highlightPointIndices: number[] = [];
  const synthesizedFocusPoints: PointSpec[] = [];

  for (const coord of explicitCoords) {
    const existingIdx = points.findIndex(
      (pt) => Math.abs(pt.x - coord.x) < 0.15 && Math.abs(pt.y - coord.y) < 0.15
    );
    if (existingIdx >= 0) {
      if (!highlightPointIndices.includes(existingIdx)) {
        highlightPointIndices.push(existingIdx);
      }
    } else if (
      coord.x >= xMin &&
      coord.x <= xMax &&
      coord.y >= yMin &&
      coord.y <= yMax
    ) {
      // Avoid duplicating vertex or roots already highlighted
      const nearVertex =
        showVertex &&
        Math.abs(showVertex.x - coord.x) < 0.15 &&
        Math.abs(showVertex.y - coord.y) < 0.15;
      if (!nearVertex) {
        synthesizedFocusPoints.push({
          x: coord.x,
          y: coord.y,
          label: `(${formatNum(coord.x, 2)}, ${formatNum(coord.y, 2)})`,
          color: '#38bdf8',
        });
      }
    }
  }

  // Also check y-intercept mention
  if (/y-intercept|f\(0\)|g\(0\)|cuts?\s+(?:the\s+)?y-axis/i.test(haystack)) {
    const yIntIdx = points.findIndex((pt) => Math.abs(pt.x) < 1e-6);
    if (yIntIdx >= 0) {
      if (!highlightPointIndices.includes(yIntIdx)) {
        highlightPointIndices.push(yIntIdx);
      }
    } else if (xMin <= 0 && xMax >= 0) {
      const targetCurveIdx = activeCurveIndices[activeCurveIndices.length - 1] ?? 0;
      const targetCurve = curves[targetCurveIdx];
      if (targetCurve) {
        const y0 = evaluateCurveY(targetCurve, 0);
        if (
          y0 !== null &&
          y0 >= yMin &&
          y0 <= yMax &&
          !synthesizedFocusPoints.some((p) => Math.abs(p.x) < 1e-6 && Math.abs(p.y - y0) < 0.15)
        ) {
          synthesizedFocusPoints.push({
            x: 0,
            y: y0,
            label: `(0, ${formatNum(y0, 2)})`,
            color: '#f59e0b',
          });
        }
      }
    }
  }

  // 8. Build concise callout badge
  const tags: string[] = [];
  if (verticalShiftGuide) tags.push(`Shift ${verticalShiftGuide.label}`);
  if (highlightAxisOfSymmetry && typeof showAxisOfSymmetry === 'number') {
    tags.push(`Axis x = ${formatNum(showAxisOfSymmetry, 2)}`);
  }
  if (highlightVertex) tags.push('Vertex');
  if (highlightRoots) tags.push('x-intercepts');
  if (highlightPointIndices.length > 0 || synthesizedFocusPoints.length > 0) {
    tags.push('Key Point');
  }
  if (highlightPolygons) tags.push('Area');

  const calloutLabel =
    tags.length > 0 ? `Focus: ${tags.join(' · ')}` : `Step ${stepNumber}: ${step.title}`;

  return {
    activeCurveIndices,
    mutedCurveIndices,
    highlightAxisOfSymmetry,
    highlightVertex,
    highlightRoots,
    highlightPolygons,
    highlightPointIndices,
    synthesizedFocusPoints,
    verticalShiftGuide,
    calloutLabel,
  };
}
