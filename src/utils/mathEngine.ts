import type { CurveSpec } from '../types/math';

export interface QuadraticAnalysis {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  vertex: { x: number; y: number };
  axisOfSymmetry: number;
  opens: 'upwards' | 'downwards';
  roots: number[];
  rootCount: 0 | 1 | 2;
}

export function roundTo(val: number, decimals = 4): number {
  const factor = Math.pow(10, decimals);
  return Math.round((val + Number.EPSILON) * factor) / factor;
}

export function formatNum(val: number, decimals = 2): string {
  if (!Number.isFinite(val)) return 'undefined';
  const r = roundTo(val, decimals);
  if (Object.is(r, -0) || Math.abs(r) < 1e-9) return '0';
  return Number.isInteger(r) ? String(r) : String(r);
}

export function analyzeQuadratic(a: number, b: number, c: number): QuadraticAnalysis {
  if (Math.abs(a) < 1e-12) {
    throw new Error('Coefficient a cannot be zero for a quadratic function.');
  }
  const discriminant = b * b - 4 * a * c;
  const vx = -b / (2 * a);
  const vy = a * vx * vx + b * vx + c;

  let roots: number[] = [];
  let rootCount: 0 | 1 | 2 = 0;

  if (discriminant > 1e-9) {
    const sqrtD = Math.sqrt(discriminant);
    const r1 = (-b - sqrtD) / (2 * a);
    const r2 = (-b + sqrtD) / (2 * a);
    roots = [r1, r2].sort((p, q) => p - q);
    rootCount = 2;
  } else if (Math.abs(discriminant) <= 1e-9) {
    roots = [vx];
    rootCount = 1;
  }

  return {
    a,
    b,
    c,
    discriminant: roundTo(discriminant, 6),
    vertex: { x: roundTo(vx, 6), y: roundTo(vy, 6) },
    axisOfSymmetry: roundTo(vx, 6),
    opens: a > 0 ? 'upwards' : 'downwards',
    roots: roots.map((r) => roundTo(r, 6)),
    rootCount,
  };
}

export function evaluateCurveY(curve: CurveSpec, x: number): number | null {
  switch (curve.kind) {
    case 'linear':
      return curve.m * x + curve.c;
    case 'quadratic': {
      if (curve.domain && (x < curve.domain[0] || x > curve.domain[1])) {
        return null;
      }
      return curve.a * x * x + curve.b * x + curve.c;
    }
    case 'cubic':
      return curve.a * x * x * x + curve.b * x * x + curve.c * x + curve.d;
    case 'rational': {
      const den = curve.den[0] * x * x + curve.den[1] * x + curve.den[2];
      if (Math.abs(den) < 1e-6) return null;
      const num = curve.num[0] * x * x + curve.num[1] * x + curve.num[2];
      return num / den;
    }
    case 'sqrt': {
      const inner = curve.a * x + curve.b;
      if (inner < -1e-9) return null;
      return Math.sqrt(Math.max(0, inner));
    }
    case 'exp2':
      return curve.k * Math.pow(2, x);
    case 'relation-y2':
    case 'vertical':
      return null;
  }
}

export function evaluateVerticalIntersections(curve: CurveSpec, x: number): number[] {
  if (curve.kind === 'vertical') {
    return Math.abs(x - curve.x) < 0.15 ? [-4, -2, 0, 2, 4] : [];
  }
  if (curve.kind === 'relation-y2') {
    const rhs = curve.m * x + curve.c;
    if (rhs < -1e-9) return [];
    if (Math.abs(rhs) <= 1e-9) return [0];
    const sq = Math.sqrt(rhs);
    return [-sq, sq];
  }
  const y = evaluateCurveY(curve, x);
  return y === null ? [] : [y];
}

export function sampleCurvePoints(
  curve: CurveSpec,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  steps = 220
): { x: number; y: number }[][] {
  if (curve.kind === 'vertical') {
    return [
      [
        { x: curve.x, y: yMin },
        { x: curve.x, y: yMax },
      ],
    ];
  }

  if (curve.kind === 'relation-y2') {
    // Sample parameterized by y from yMin to yMax
    const pts: { x: number; y: number }[] = [];
    const dy = (yMax - yMin) / steps;
    for (let i = 0; i <= steps; i++) {
      const y = yMin + i * dy;
      const x = (y * y - curve.c) / curve.m;
      if (x >= xMin - 2 && x <= xMax + 2) {
        pts.push({ x, y });
      }
    }
    return pts.length > 1 ? [pts] : [];
  }

  const segments: { x: number; y: number }[][] = [];
  let current: { x: number; y: number }[] = [];
  const dx = (xMax - xMin) / steps;
  const ySpan = yMax - yMin;

  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const y = evaluateCurveY(curve, x);
    if (y === null || !Number.isFinite(y) || y < yMin - ySpan * 0.5 || y > yMax + ySpan * 0.5) {
      if (current.length > 1) segments.push(current);
      current = [];
      continue;
    }
    if (current.length > 0) {
      const prev = current[current.length - 1];
      // Break asymptote jumps for rational curves
      if (Math.abs(y - prev.y) > ySpan * 0.85) {
        if (current.length > 1) segments.push(current);
        current = [];
      }
    }
    current.push({ x, y });
  }
  if (current.length > 1) segments.push(current);
  return segments;
}

export function niceStep(range: number, targetTicks = 6): number {
  const rough = range / targetTicks;
  if (rough <= 0 || !Number.isFinite(rough)) return 1;
  const pow10 = Math.pow(10, Math.floor(Math.log10(rough)));
  const fraction = rough / pow10;
  let nice = 1;
  if (fraction <= 1.2) nice = 1;
  else if (fraction <= 2.5) nice = 2;
  else if (fraction <= 5) nice = 5;
  else nice = 10;
  return nice * pow10;
}

export function generateTicks(min: number, max: number, targetTicks = 6): number[] {
  const step = niceStep(max - min, targetTicks);
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 1e-6; v += step) {
    const rounded = roundTo(v, 6);
    if (Math.abs(rounded) > 1e-9) {
      ticks.push(rounded);
    }
  }
  return ticks;
}
