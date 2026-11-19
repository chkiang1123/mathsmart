import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import type { CircleSpec, CurveSpec, PointSpec, PolygonSpec } from '../../types/math';
import { formatNum, generateTicks, sampleCurvePoints } from '../../utils/mathEngine';
import { computeGraphStepHighlights } from '../../utils/graphStepHighlighter';
import type { StepProgressState } from '../StepAnalyzer';
import { MathText } from '../MathText';

interface CoordinatePlotProps {
  curves: CurveSpec[];
  points?: PointSpec[];
  polygons?: PolygonSpec[];
  circles?: CircleSpec[];
  xRange: [number, number];
  yRange: [number, number];
  showAxisOfSymmetry?: number;
  showVertex?: { x: number; y: number; label?: string };
  showRoots?: number[];
  extraVerticalLineX?: number;
  highlightPoints?: PointSpec[];
  horizontalThreshold?: { y: number; label?: string; color?: string };
  curveFnOverlays?: { fn: (x: number) => number; color?: string; label?: string; dashed?: boolean }[];
  interactiveX?: {
    min: number;
    max: number;
    step: number;
    defaultVal: number;
    curveIndex?: number;
    label?: string;
  };
  title?: string;
  note?: string;
  xLabel?: string;
  yLabel?: string;
  stepProgress?: StepProgressState;
}

const DEFAULT_CURVE_COLORS = ['#38bdf8', '#f59e0b', '#34d399', '#a78bfa', '#f87171'];

const AnimatedBeacon: React.FC<{
  cx: number;
  cy: number;
  color: string;
  axisX: number;
  axisY: number;
  showCrosshairs?: boolean;
}> = ({ cx, cy, color, axisX, axisY, showCrosshairs = true }) => (
  <g pointerEvents="none">
    {showCrosshairs && (
      <>
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy}
          animate={{ x2: cx, y2: axisY }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          stroke={color}
          strokeWidth={1.3}
          strokeDasharray="4 3"
          opacity={0.7}
        />
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy}
          animate={{ x2: axisX, y2: cy }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          stroke={color}
          strokeWidth={1.3}
          strokeDasharray="4 3"
          opacity={0.7}
        />
      </>
    )}
    <motion.circle
      cx={cx}
      cy={cy}
      r={6}
      fill="none"
      stroke={color}
      strokeWidth={2}
      initial={{ r: 5, opacity: 0.9 }}
      animate={{ r: 17, opacity: 0 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
    />
    <circle cx={cx} cy={cy} r={8.5} fill={color} opacity={0.18} />
  </g>
);

export const CoordinatePlot: React.FC<CoordinatePlotProps> = ({
  curves,
  points = [],
  polygons = [],
  circles = [],
  xRange,
  yRange,
  showAxisOfSymmetry,
  showVertex,
  showRoots,
  extraVerticalLineX,
  highlightPoints = [],
  horizontalThreshold,
  curveFnOverlays = [],
  interactiveX,
  title,
  note,
  xLabel = 'x',
  yLabel = 'y',
  stepProgress,
}) => {
  const width = 560;
  const height = 350;
  const pad = { left: 50, right: 24, top: 22, bottom: 38 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const [sliderX, setSliderX] = useState<number>(interactiveX?.defaultVal ?? 0);

  const toPxX = (x: number) => pad.left + ((x - xMin) / (xMax - xMin)) * plotW;
  const toPxY = (y: number) => pad.top + ((yMax - y) / (yMax - yMin)) * plotH;
  const fromPxX = (px: number) => xMin + ((px - pad.left) / plotW) * (xMax - xMin);
  const fromPxY = (py: number) => yMax - ((py - pad.top) / plotH) * (yMax - yMin);

  const xTicks = useMemo(() => generateTicks(xMin, xMax, 7), [xMin, xMax]);
  const yTicks = useMemo(() => generateTicks(yMin, yMax, 6), [yMin, yMax]);

  const xAxisVisible = yMin <= 0 && yMax >= 0;
  const yAxisVisible = xMin <= 0 && xMax >= 0;
  const axisY = xAxisVisible ? toPxY(0) : pad.top + plotH;
  const axisX = yAxisVisible ? toPxX(0) : pad.left;

  const sampledCurves = useMemo(() => {
    return curves.map((curve, idx) => {
      const segments = sampleCurvePoints(curve, xMin, xMax, yMin, yMax, 240);
      const color = curve.color || DEFAULT_CURVE_COLORS[idx % DEFAULT_CURVE_COLORS.length];
      const dashed = 'dashed' in curve ? Boolean(curve.dashed) : false;
      return { curve, segments, color, dashed, label: curve.label };
    });
  }, [curves, xMin, xMax, yMin, yMax]);

  const sampledOverlays = useMemo(() => {
    return curveFnOverlays.map((ov, idx) => {
      const pts: { x: number; y: number }[] = [];
      const steps = 200;
      const dx = (xMax - xMin) / steps;
      const span = yMax - yMin;
      for (let i = 0; i <= steps; i++) {
        const x = xMin + i * dx;
        const y = ov.fn(x);
        if (Number.isFinite(y) && y >= yMin - span * 0.5 && y <= yMax + span * 0.5) {
          pts.push({ x, y });
        }
      }
      return {
        pts,
        color: ov.color || DEFAULT_CURVE_COLORS[(curves.length + idx) % DEFAULT_CURVE_COLORS.length],
        label: ov.label,
        dashed: Boolean(ov.dashed),
      };
    });
  }, [curveFnOverlays, curves.length, xMin, xMax, yMin, yMax]);

  const interactivePoint = useMemo(() => {
    if (!interactiveX) return null;
    const idx = interactiveX.curveIndex ?? 0;
    const c = curves[idx];
    if (!c) return null;
    if (c.kind === 'linear') return { x: sliderX, y: c.m * sliderX + c.c };
    if (c.kind === 'quadratic') return { x: sliderX, y: c.a * sliderX * sliderX + c.b * sliderX + c.c };
    if (c.kind === 'cubic') return { x: sliderX, y: c.a * sliderX ** 3 + c.b * sliderX ** 2 + c.c * sliderX + c.d };
    if (c.kind === 'exp2') return { x: sliderX, y: c.k * Math.pow(2, sliderX) };
    if (c.kind === 'sqrt') {
      const inner = c.a * sliderX + c.b;
      return inner >= 0 ? { x: sliderX, y: Math.sqrt(inner) } : null;
    }
    if (c.kind === 'rational') {
      const den = c.den[0] * sliderX * sliderX + c.den[1] * sliderX + c.den[2];
      if (Math.abs(den) < 1e-6) return null;
      const num = c.num[0] * sliderX * sliderX + c.num[1] * sliderX + c.num[2];
      return { x: sliderX, y: num / den };
    }
    return null;
  }, [interactiveX, sliderX, curves]);

  const clipId = useMemo(
    () => `plot-clip-${Math.random().toString(36).slice(2, 9)}`,
    []
  );

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    const py = ((e.clientY - rect.top) / rect.height) * height;
    if (px >= pad.left && px <= pad.left + plotW && py >= pad.top && py <= pad.top + plotH) {
      setHoverCoord({ x: fromPxX(px), y: fromPxY(py) });
    } else {
      setHoverCoord(null);
    }
  };

  const legendItems = [
    ...sampledCurves.filter((c) => c.label).map((c) => ({ label: c.label!, color: c.color, dashed: c.dashed })),
    ...sampledOverlays.filter((o) => o.label).map((o) => ({ label: o.label!, color: o.color, dashed: o.dashed })),
  ];

  const allPoints = [...points, ...highlightPoints];

  const highlights = useMemo(
    () =>
      computeGraphStepHighlights({
        step: stepProgress?.step ?? null,
        stepNumber: stepProgress?.revealed ?? 0,
        totalSteps: stepProgress?.total ?? 0,
        curves,
        points: allPoints,
        xRange,
        yRange,
        showAxisOfSymmetry,
        showVertex,
        showRoots,
        hasPolygons: polygons.length > 0,
      }),
    [
      stepProgress?.step,
      stepProgress?.revealed,
      stepProgress?.total,
      curves,
      allPoints,
      xRange,
      yRange,
      showAxisOfSymmetry,
      showVertex,
      showRoots,
      polygons.length,
    ]
  );

  const stepNum = stepProgress?.revealed ?? 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-3 sm:p-4 shadow-xs">
      {(title || hoverCoord || (stepProgress && stepProgress.revealed > 0)) && (
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          {title && (
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              <MathText text={title} />
            </h4>
          )}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {highlights.calloutLabel && (
              <span className="rounded-md border border-amber-300/70 bg-amber-50 dark:border-amber-600/50 dark:bg-amber-950/50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-200">
                <MathText text={highlights.calloutLabel} />
              </span>
            )}
            {stepProgress && stepProgress.revealed > 0 && (
              <span className="rounded-md bg-sky-100 dark:bg-sky-900/50 px-2 py-0.5 font-mono-tabular text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                Step {Math.min(stepProgress.revealed, stepProgress.total)}/{stepProgress.total}
              </span>
            )}
            <span className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
              {hoverCoord
                ? `(${formatNum(hoverCoord.x, 2)}, ${formatNum(hoverCoord.y, 2)})`
                : 'Hover plot for coordinates'}
            </span>
          </div>
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ backgroundColor: 'var(--plot-bg)' }}
        className="w-full h-auto select-none touch-none rounded-lg border border-slate-100 dark:border-slate-800"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverCoord(null)}
        role="img"
        aria-label={title || 'Coordinate graph visualization'}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={pad.left} y={pad.top} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {xTicks.map((tx) => {
          const px = toPxX(tx);
          return (
            <line
              key={`gx-${tx}`}
              x1={px}
              y1={pad.top}
              x2={px}
              y2={pad.top + plotH}
              stroke="var(--plot-grid)"
              strokeWidth={1}
            />
          );
        })}
        {yTicks.map((ty) => {
          const py = toPxY(ty);
          return (
            <line
              key={`gy-${ty}`}
              x1={pad.left}
              y1={py}
              x2={pad.left + plotW}
              y2={py}
              stroke="var(--plot-grid)"
              strokeWidth={1}
            />
          );
        })}

        {/* Main Axes */}
        <line
          x1={pad.left}
          y1={axisY}
          x2={pad.left + plotW + 6}
          y2={axisY}
          stroke={xAxisVisible ? 'var(--plot-axis)' : 'var(--plot-axis-muted)'}
          strokeWidth={xAxisVisible ? 1.5 : 1}
        />
        <line
          x1={axisX}
          y1={pad.top + plotH}
          x2={axisX}
          y2={pad.top - 6}
          stroke={yAxisVisible ? 'var(--plot-axis)' : 'var(--plot-axis-muted)'}
          strokeWidth={yAxisVisible ? 1.5 : 1}
        />

        {/* Axis labels */}
        <text
          x={pad.left + plotW + 8}
          y={axisY + 4}
          fontSize="11"
          fontStyle="italic"
          fontWeight="600"
          fill="var(--plot-label)"
        >
          {xLabel}
        </text>
        <text
          x={axisX + 6}
          y={pad.top + 8}
          fontSize="11"
          fontStyle="italic"
          fontWeight="600"
          fill="var(--plot-label)"
        >
          {yLabel}
        </text>
        {xAxisVisible && yAxisVisible && (
          <text x={axisX - 12} y={axisY + 13} fontSize="10" fill="var(--plot-tick)">
            O
          </text>
        )}

        {/* Tick labels */}
        {xTicks.map((tx) => {
          const px = toPxX(tx);
          const labelY = Math.min(height - 10, Math.max(pad.top + 16, axisY + 14));
          return (
            <text
              key={`tx-${tx}`}
              x={px}
              y={labelY}
              textAnchor="middle"
              fontSize="10"
              fill="var(--plot-tick)"
            >
              {formatNum(tx, 1)}
            </text>
          );
        })}
        {yTicks.map((ty) => {
          const py = toPxY(ty);
          return (
            <text
              key={`ty-${ty}`}
              x={yAxisVisible ? axisX - 6 : pad.left - 6}
              y={py + 3}
              textAnchor="end"
              fontSize="10"
              fill="var(--plot-tick)"
            >
              {formatNum(ty, 1)}
            </text>
          );
        })}

        {/* Clipped geometric content */}
        <g clipPath={`url(#${clipId})`}>
          {polygons.map((poly, idx) => {
            const ptsStr = poly.points.map((p) => `${toPxX(p.x)},${toPxY(p.y)}`).join(' ');
            return (
              <g key={`poly-${idx}`}>
                <motion.polygon
                  points={ptsStr}
                  fill={poly.fill || 'rgba(56, 189, 248, 0.16)'}
                  stroke={poly.stroke || '#0284c7'}
                  animate={
                    highlights.highlightPolygons
                      ? {
                          strokeWidth: [2, 3.5, 2],
                          fillOpacity: [0.6, 1, 0.6],
                        }
                      : { strokeWidth: 2, fillOpacity: 1 }
                  }
                  transition={
                    highlights.highlightPolygons
                      ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.25 }
                  }
                />
                {poly.points.map((pt, pi) =>
                  pt.label ? (
                    <text
                      key={`pp-${pi}`}
                      x={toPxX(pt.x) + 6}
                      y={toPxY(pt.y) - 6}
                      fontSize="11"
                      fontWeight="600"
                      fill="var(--plot-point-label)"
                    >
                      {pt.label}
                    </text>
                  ) : null
                )}
              </g>
            );
          })}

          {circles.map((cir, idx) => {
            const rx = (cir.r / (xMax - xMin)) * plotW;
            const ry = (cir.r / (yMax - yMin)) * plotH;
            return (
              <ellipse
                key={`cir-${idx}`}
                cx={toPxX(cir.cx)}
                cy={toPxY(cir.cy)}
                rx={Math.abs(rx)}
                ry={Math.abs(ry)}
                fill="none"
                stroke={cir.stroke || '#38bdf8'}
                strokeWidth={2}
              />
            );
          })}

          {horizontalThreshold && (
            <line
              x1={pad.left}
              y1={toPxY(horizontalThreshold.y)}
              x2={pad.left + plotW}
              y2={toPxY(horizontalThreshold.y)}
              stroke={horizontalThreshold.color || '#ef4444'}
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
          )}

          {typeof showAxisOfSymmetry === 'number' && Number.isFinite(showAxisOfSymmetry) && (
            <g>
              {highlights.highlightAxisOfSymmetry && (
                <motion.line
                  key={`axis-glow-${stepNum}`}
                  x1={toPxX(showAxisOfSymmetry)}
                  y1={pad.top}
                  x2={toPxX(showAxisOfSymmetry)}
                  y2={pad.top + plotH}
                  stroke="#818cf8"
                  strokeWidth={8}
                  initial={{ opacity: 0.55 }}
                  animate={{ opacity: [0.15, 0.45, 0.15] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <motion.line
                key={highlights.highlightAxisOfSymmetry ? `axis-draw-${stepNum}` : 'axis-static'}
                x1={toPxX(showAxisOfSymmetry)}
                y1={pad.top}
                x2={toPxX(showAxisOfSymmetry)}
                y2={pad.top + plotH}
                initial={highlights.highlightAxisOfSymmetry ? { y2: pad.top } : false}
                animate={{ y2: pad.top + plotH }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                stroke="#818cf8"
                strokeWidth={highlights.highlightAxisOfSymmetry ? 2.5 : 1.5}
                strokeDasharray="5 4"
              />
            </g>
          )}

          {typeof extraVerticalLineX === 'number' && Number.isFinite(extraVerticalLineX) && (
            <line
              x1={toPxX(extraVerticalLineX)}
              y1={pad.top}
              x2={toPxX(extraVerticalLineX)}
              y2={pad.top + plotH}
              stroke="#f87171"
              strokeWidth={2}
              strokeDasharray="6 3"
            />
          )}

          {sampledCurves.map((sc, ci) => {
            const isMuted = highlights.mutedCurveIndices.includes(ci);
            const isEmphasized =
              stepNum > 0 && curves.length >= 2 && highlights.activeCurveIndices.includes(ci);
            return sc.segments.map((seg, si) => {
              const d = seg
                .map(
                  (pt, pi) =>
                    `${pi === 0 ? 'M' : 'L'} ${toPxX(pt.x).toFixed(2)} ${toPxY(pt.y).toFixed(2)}`
                )
                .join(' ');
              return (
                <g key={`curve-${ci}-${si}`}>
                  {isEmphasized && (
                    <motion.path
                      key={`halo-${ci}-${si}-${stepNum}`}
                      d={d}
                      fill="none"
                      stroke={sc.color}
                      strokeWidth={8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: 1, opacity: [0.16, 0.36, 0.16] }}
                      transition={{
                        pathLength: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    />
                  )}
                  <motion.path
                    key={isEmphasized ? `draw-${ci}-${si}-${stepNum}` : `base-${ci}-${si}`}
                    d={d}
                    fill="none"
                    stroke={sc.color}
                    strokeWidth={isEmphasized ? 3.2 : 2.5}
                    strokeDasharray={sc.dashed ? '6 4' : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: isEmphasized ? 0.05 : 0, opacity: 0.4 }}
                    animate={{ pathLength: 1, opacity: isMuted ? 0.28 : 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </g>
              );
            });
          })}

          {sampledOverlays.map((ov, oi) => {
            if (ov.pts.length < 2) return null;
            const d = ov.pts
              .map(
                (pt, pi) =>
                  `${pi === 0 ? 'M' : 'L'} ${toPxX(pt.x).toFixed(2)} ${toPxY(pt.y).toFixed(2)}`
              )
              .join(' ');
            return (
              <motion.path
                key={`ov-${oi}`}
                d={d}
                fill="none"
                stroke={ov.color}
                strokeWidth={2.5}
                strokeDasharray={ov.dashed ? '5 4' : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}

          {/* Animated Vertical Shift Arrow (e.g. G = f(x) - 17) */}
          {highlights.verticalShiftGuide &&
            (() => {
              const vg = highlights.verticalShiftGuide;
              const vx = toPxX(vg.x);
              const vy1 = toPxY(vg.yFrom);
              const vy2 = toPxY(vg.yTo);
              const down = vy2 > vy1;
              const tipY = vy2;
              const arrowBaseY = down ? tipY - 8 : tipY + 8;
              return (
                <g key={`vshift-${stepNum}`}>
                  <motion.line
                    x1={vx}
                    y1={vy1}
                    x2={vx}
                    y2={vy1}
                    animate={{ y2: arrowBaseY }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    strokeDasharray="4 2"
                  />
                  <motion.polygon
                    points={`${vx},${tipY} ${vx - 5},${arrowBaseY} ${vx + 5},${arrowBaseY}`}
                    fill="#f59e0b"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                  />
                  <motion.g
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                  >
                    <rect
                      x={vx + 8}
                      y={(vy1 + vy2) / 2 - 11}
                      width={42}
                      height={20}
                      rx={5}
                      fill="#f59e0b"
                    />
                    <text
                      x={vx + 29}
                      y={(vy1 + vy2) / 2 + 3}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#0f172a"
                    >
                      {vg.label}
                    </text>
                  </motion.g>
                </g>
              );
            })()}

          {showRoots?.map((r, ri) => {
            const rx = toPxX(r);
            const ry = toPxY(0);
            return (
              <g key={`root-${ri}`}>
                {highlights.highlightRoots && (
                  <AnimatedBeacon
                    cx={rx}
                    cy={ry}
                    color="#10b981"
                    axisX={axisX}
                    axisY={axisY}
                    showCrosshairs={false}
                  />
                )}
                <circle
                  cx={rx}
                  cy={ry}
                  r={highlights.highlightRoots ? 5.5 : 4.5}
                  fill="var(--plot-dot-bg)"
                  stroke="#10b981"
                  strokeWidth={highlights.highlightRoots ? 2.8 : 2.2}
                />
                <text
                  x={rx}
                  y={ry - 9}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--plot-root-label)"
                >
                  ({formatNum(r, 2)}, 0)
                </text>
              </g>
            );
          })}

          {showVertex &&
            Number.isFinite(showVertex.x) &&
            Number.isFinite(showVertex.y) &&
            (() => {
              const vx = toPxX(showVertex.x);
              const vy = toPxY(showVertex.y);
              return (
                <g>
                  {highlights.highlightVertex && (
                    <AnimatedBeacon
                      cx={vx}
                      cy={vy}
                      color="#ef4444"
                      axisX={axisX}
                      axisY={axisY}
                      showCrosshairs={true}
                    />
                  )}
                  <circle
                    cx={vx}
                    cy={vy}
                    r={highlights.highlightVertex ? 6 : 5}
                    fill="#ef4444"
                    stroke="var(--plot-dot-bg)"
                    strokeWidth={1.8}
                  />
                  <text
                    x={Math.min(pad.left + plotW - 60, Math.max(pad.left + 60, vx))}
                    y={vy > pad.top + 28 ? vy - 10 : vy + 16}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="700"
                    fill="var(--plot-vertex-label)"
                  >
                    {showVertex.label ||
                      `(${formatNum(showVertex.x, 2)}, ${formatNum(showVertex.y, 2)})`}
                  </text>
                </g>
              );
            })()}

          {allPoints
            .filter(
              (pt) =>
                !interactivePoint ||
                Math.hypot(pt.x - interactivePoint.x, pt.y - interactivePoint.y) > 0.05
            )
            .map((pt, pi) => {
              const px = toPxX(pt.x);
              const py = toPxY(pt.y);
              const color = pt.color || '#38bdf8';
              const isHighlighted = highlights.highlightPointIndices.includes(pi);
              return (
                <g key={`pt-${pi}`}>
                  {isHighlighted && (
                    <AnimatedBeacon
                      cx={px}
                      cy={py}
                      color={color}
                      axisX={axisX}
                      axisY={axisY}
                      showCrosshairs={true}
                    />
                  )}
                  <circle
                    cx={px}
                    cy={py}
                    r={isHighlighted ? 6 : 4.5}
                    fill={pt.hollow ? 'var(--plot-dot-bg)' : color}
                    stroke={color}
                    strokeWidth={isHighlighted ? 2.5 : 2}
                  />
                  {pt.label && (
                    <text
                      x={px + 7}
                      y={py - 7}
                      fontSize="10.5"
                      fontWeight={isHighlighted ? '700' : '600'}
                      fill="var(--plot-point-label)"
                    >
                      {pt.label}
                    </text>
                  )}
                </g>
              );
            })}

          {/* Dynamic focus points brought in by the active solution step */}
          {highlights.synthesizedFocusPoints.map((pt, fi) => {
            const px = toPxX(pt.x);
            const py = toPxY(pt.y);
            const color = pt.color || '#38bdf8';
            return (
              <motion.g
                key={`synth-${stepNum}-${fi}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <AnimatedBeacon
                  cx={px}
                  cy={py}
                  color={color}
                  axisX={axisX}
                  axisY={axisY}
                  showCrosshairs={true}
                />
                <circle
                  cx={px}
                  cy={py}
                  r={5.5}
                  fill={color}
                  stroke="var(--plot-dot-bg)"
                  strokeWidth={2}
                />
                <text
                  x={Math.min(pad.left + plotW - 55, Math.max(pad.left + 12, px + 8))}
                  y={Math.max(pad.top + 14, py - 8)}
                  fontSize="10.5"
                  fontWeight="700"
                  fill={color}
                >
                  {pt.label}
                </text>
              </motion.g>
            );
          })}

          {interactivePoint && (
            <g>
              <circle
                cx={toPxX(interactivePoint.x)}
                cy={toPxY(interactivePoint.y)}
                r={5.5}
                fill="#0ea5e9"
                stroke="var(--plot-dot-bg)"
                strokeWidth={2}
              />
              <text
                x={Math.min(pad.left + plotW - 55, toPxX(interactivePoint.x) + 8)}
                y={Math.max(pad.top + 14, toPxY(interactivePoint.y) - 8)}
                fontSize="11"
                fontWeight="700"
                fill="#38bdf8"
              >
                ({formatNum(interactivePoint.x, 2)}, {formatNum(interactivePoint.y, 2)})
              </text>
            </g>
          )}

          {hoverCoord && (
            <g opacity={0.55}>
              <line
                x1={toPxX(hoverCoord.x)}
                y1={pad.top}
                x2={toPxX(hoverCoord.x)}
                y2={pad.top + plotH}
                stroke="var(--plot-tick)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={pad.left}
                y1={toPxY(hoverCoord.y)}
                x2={pad.left + plotW}
                y2={toPxY(hoverCoord.y)}
                stroke="var(--plot-tick)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            </g>
          )}
        </g>

        {horizontalThreshold?.label && (
          <text
            x={pad.left + plotW - 6}
            y={Math.max(pad.top + 12, toPxY(horizontalThreshold.y) - 5)}
            textAnchor="end"
            fontSize="10"
            fontWeight="600"
            fill={horizontalThreshold.color || 'var(--plot-vertex-label)'}
          >
            {horizontalThreshold.label}
          </text>
        )}

        {typeof showAxisOfSymmetry === 'number' && Number.isFinite(showAxisOfSymmetry) && (
          <text
            x={Math.min(pad.left + plotW - 32, Math.max(pad.left + 32, toPxX(showAxisOfSymmetry)))}
            y={pad.top + 14}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--plot-sym-label)"
          >
            x = {formatNum(showAxisOfSymmetry, 2)}
          </text>
        )}
      </svg>

      {interactiveX && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70 px-3 py-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 mb-1">
            <span>{interactiveX.label || 'Explore point on graph (x)'}</span>
            <span className="font-mono-tabular text-sky-700 dark:text-sky-300">
              {interactivePoint
                ? `x = ${formatNum(interactivePoint.x, 2)} → y = ${formatNum(interactivePoint.y, 2)}`
                : `x = ${formatNum(sliderX, 2)} (undefined)`}
            </span>
          </div>
          <input
            type="range"
            aria-label={interactiveX.label || 'Explore point x'}
            min={interactiveX.min}
            max={interactiveX.max}
            step={interactiveX.step}
            value={sliderX}
            onChange={(e) => setSliderX(parseFloat(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
        </div>
      )}

      {(legendItems.length > 0 || note) && (
        <div className="mt-2.5 flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          {legendItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {legendItems.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200"
                >
                  <span
                    className="inline-block h-0.5 w-4"
                    style={{
                      backgroundColor: item.color,
                      borderTop: item.dashed ? `2px dashed ${item.color}` : undefined,
                    }}
                  />
                  <MathText text={item.label} />
                </span>
              ))}
            </div>
          )}
          {note && (
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <MathText text={note} />
            </p>
          )}
        </div>
      )}
    </div>
  );
};
