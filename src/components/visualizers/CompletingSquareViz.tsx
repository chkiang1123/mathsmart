import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import type { VisualConfig } from '../../types/math';
import { analyzeQuadratic, formatNum } from '../../utils/mathEngine';
import type { StepProgressState } from '../StepAnalyzer';
import { CoordinatePlot } from './CoordinatePlot';
import { MathText } from '../MathText';

type CompletingSquareConfig = Extract<VisualConfig, { kind: 'completing-square' }>;
type DiscriminantExplorerConfig = Extract<VisualConfig, { kind: 'discriminant-explorer' }>;

export const CompletingSquareViz: React.FC<{
  config: CompletingSquareConfig;
  stepProgress?: StepProgressState;
}> = ({ config, stepProgress }) => {
  const [kVal, setKVal] = useState<number>(config.kParam?.defaultVal ?? 0);
  const stage = Math.min(3, stepProgress?.revealed ?? 0);

  const coeffs = useMemo(() => {
    if (!config.kParam) {
      return { a: config.a, b: config.b, c: config.c };
    }
    const evalPoly = (expr: [number, number, number], k: number) =>
      expr[0] + expr[1] * k + expr[2] * k * k;
    return {
      a: evalPoly(config.kParam.aExpr, kVal),
      b: evalPoly(config.kParam.bExpr, kVal),
      c: evalPoly(config.kParam.cExpr, kVal),
    };
  }, [config, kVal]);

  const isQuadratic = Math.abs(coeffs.a) > 1e-9;

  const analysis = useMemo(() => {
    if (!isQuadratic) return null;
    return analyzeQuadratic(coeffs.a, coeffs.b, coeffs.c);
  }, [coeffs.a, coeffs.b, coeffs.c, isQuadratic]);

  const computedRanges = useMemo(() => {
    if (config.xRange && config.yRange) {
      return { xRange: config.xRange, yRange: config.yRange };
    }
    if (!analysis) {
      return { xRange: [-6, 6] as [number, number], yRange: [-10, 10] as [number, number] };
    }
    const vx = analysis.vertex.x;
    const vy = analysis.vertex.y;
    const xSpan = 6;
    const xMin = Math.floor(vx - xSpan);
    const xMax = Math.ceil(vx + xSpan);
    const edgeY = Math.max(
      Math.abs(coeffs.a * xMin * xMin + coeffs.b * xMin + coeffs.c - vy),
      Math.abs(coeffs.a * xMax * xMax + coeffs.b * xMax + coeffs.c - vy),
      8
    );
    const padY = Math.min(40, Math.max(6, Math.ceil(edgeY * 0.4)));
    const yMin = coeffs.a > 0 ? Math.floor(vy - padY * 0.35) : Math.floor(vy - padY);
    const yMax = coeffs.a > 0 ? Math.ceil(vy + padY) : Math.ceil(vy + padY * 0.35);
    return {
      xRange: [xMin, xMax] as [number, number],
      yRange: [yMin, yMax] as [number, number],
    };
  }, [config.xRange, config.yRange, analysis, coeffs]);

  const completedText = useMemo(() => {
    if (!analysis) return 'Degenerate linear expression (a = 0)';
    const h = analysis.vertex.x;
    const k = analysis.vertex.y;
    const aStr =
      Math.abs(coeffs.a - 1) < 1e-9
        ? ''
        : Math.abs(coeffs.a + 1) < 1e-9
          ? '-'
          : `${formatNum(coeffs.a, 2)}`;
    const hTerm =
      Math.abs(h) < 1e-9
        ? 'x²'
        : h > 0
          ? `(x - ${formatNum(h, 2)})²`
          : `(x + ${formatNum(Math.abs(h), 2)})²`;
    const kTerm =
      Math.abs(k) < 1e-9
        ? ''
        : k > 0
          ? ` + ${formatNum(k, 2)}`
          : ` - ${formatNum(Math.abs(k), 2)}`;
    return `y = ${aStr}${hTerm}${kTerm}`;
  }, [analysis, coeffs.a]);

  const halfCoeff = isQuadratic ? coeffs.b / (2 * coeffs.a) : 0;

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            <MathText text={config.title} />
          </h4>
          <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">
            <MathText text={completedText} mode={analysis ? 'math' : 'auto'} />
          </span>
        </div>

        {config.kParam && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 px-3 py-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200">
              <span>
                Parameter <MathText text={config.kParam.name} mode="math" /> (
                <MathText text={config.kParam.displayFormula} />)
              </span>
              <span className="font-mono-tabular font-semibold text-sky-700 dark:text-sky-300">
                {config.kParam.name} = {formatNum(kVal, 2)}
              </span>
            </div>
            <input
              type="range"
              aria-label={`Adjust parameter ${config.kParam.name}`}
              min={config.kParam.min}
              max={config.kParam.max}
              step={config.kParam.step}
              value={kVal}
              onChange={(e) => setKVal(parseFloat(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>
        )}

        {stepProgress && stepProgress.total > 0 && (
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            {[
              { stage: 1, label: '1. Group x² & x' },
              { stage: 2, label: '2. Add (b/2a)²' },
              { stage: 3, label: '3. Vertex Form' },
            ].map((item) => {
              const activeStage = Math.min(3, stepProgress.revealed);
              const isDone = activeStage >= item.stage;
              const isCurrent = activeStage === item.stage;
              return (
                <div
                  key={item.stage}
                  className={`rounded-md border px-2 py-1 text-center font-semibold transition-all duration-300 ${
                    isCurrent
                      ? 'border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-200'
                      : isDone
                        ? 'border-emerald-300 bg-emerald-50/70 text-emerald-800 dark:border-emerald-700/60 dark:bg-emerald-950/30 dark:text-emerald-300'
                        : 'border-slate-200 bg-slate-50/60 text-slate-400 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-500'
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}

        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-3 items-center">
            <svg
              viewBox="0 0 260 150"
              style={{ backgroundColor: 'var(--plot-bg)' }}
              className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800"
              role="img"
              aria-label="Completing the square area decomposition diagram"
            >
              <motion.rect
                x="20"
                y="20"
                width="76"
                height="76"
                fill="var(--tile-x2-fill)"
                stroke="#0ea5e9"
                animate={{
                  strokeWidth: stage === 1 ? 3 : 1.5,
                  opacity: stage === 0 || stage >= 1 ? 1 : 0.45,
                }}
                transition={{ duration: 0.35 }}
              />
              <text x="58" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--tile-x2-text)">
                x²
              </text>
              <text x="58" y="14" textAnchor="middle" fontSize="10" fill="var(--plot-tick)">
                x
              </text>
              <text x="12" y="62" textAnchor="middle" fontSize="10" fill="var(--plot-tick)">
                x
              </text>

              <motion.rect
                x="100"
                y="20"
                width="38"
                height="76"
                fill="var(--tile-wing-fill)"
                stroke="#f59e0b"
                animate={{
                  strokeWidth: stage === 1 || stage === 2 ? 2.5 : 1.5,
                  opacity: stage === 0 || stage >= 1 ? 1 : 0.35,
                }}
                transition={{ duration: 0.35 }}
              />
              <text x="119" y="61" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--tile-wing-text)">
                {formatNum(halfCoeff, 2)}x
              </text>
              <text x="119" y="14" textAnchor="middle" fontSize="10" fill="var(--tile-wing-text)">
                {formatNum(Math.abs(halfCoeff), 2)}
              </text>

              <motion.rect
                x="20"
                y="100"
                width="76"
                height="34"
                fill="var(--tile-wing-fill)"
                stroke="#f59e0b"
                animate={{
                  strokeWidth: stage === 1 || stage === 2 ? 2.5 : 1.5,
                  opacity: stage === 0 || stage >= 1 ? 1 : 0.35,
                }}
                transition={{ duration: 0.35 }}
              />
              <text x="58" y="121" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--tile-wing-text)">
                {formatNum(halfCoeff, 2)}x
              </text>

              <motion.rect
                x="100"
                y="100"
                width="38"
                height="34"
                fill="var(--tile-corner-fill)"
                stroke="#10b981"
                strokeDasharray="3 2"
                animate={{
                  scale: stage === 2 ? [0.92, 1.04, 1] : 1,
                  strokeWidth: stage >= 2 ? 2.5 : 1.5,
                  opacity: stage === 0 || stage >= 2 ? 1 : 0.35,
                }}
                transition={{ duration: 0.45 }}
              />
              <text x="119" y="120" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--tile-corner-text)">
                +{formatNum(halfCoeff * halfCoeff, 2)}
              </text>
              {stage >= 3 && (
                <motion.rect
                  x="17"
                  y="17"
                  width="124"
                  height="120"
                  rx="4"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              <text x="154" y="44" fontSize="10.5" fontWeight="600" fill="var(--plot-label)">
                Complete Square:
              </text>
              <text x="154" y="64" fontSize="10" fill="var(--plot-point-label)">
                Half of {formatNum(coeffs.b / coeffs.a, 2)} = {formatNum(halfCoeff, 2)}
              </text>
              <text x="154" y="82" fontSize="10" fill="var(--tile-corner-text)" fontWeight="600">
                Add ({formatNum(halfCoeff, 2)})² = {formatNum(halfCoeff * halfCoeff, 2)}
              </text>
              <text x="154" y="106" fontSize="10" fill="var(--plot-tick)">
                Vertex: ({formatNum(analysis.vertex.x, 2)}, {formatNum(analysis.vertex.y, 2)})
              </text>
              <text x="154" y="124" fontSize="10" fill="var(--plot-tick)">
                {analysis.opens === 'upwards' ? 'Minimum' : 'Maximum'} y = {formatNum(analysis.vertex.y, 2)}
              </text>
            </svg>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-2.5">
                <div className="text-slate-500 dark:text-slate-400">Vertex</div>
                <div className="font-mono-tabular font-bold text-slate-900 dark:text-slate-100 mt-0.5 whitespace-nowrap">
                  ({formatNum(analysis.vertex.x, 2)}, {formatNum(analysis.vertex.y, 2)})
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-2.5">
                <div className="text-slate-500 dark:text-slate-400">Axis of Symmetry</div>
                <div className="font-mono-tabular font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  <MathText text={`x = ${formatNum(analysis.axisOfSymmetry, 2)}`} mode="math" />
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-2.5">
                <div className="text-slate-500 dark:text-slate-400">Optimum</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                  {analysis.opens === 'upwards' ? 'Min' : 'Max'} = {formatNum(analysis.vertex.y, 2)}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-2.5">
                <div className="text-slate-500 dark:text-slate-400">y-intercept</div>
                <div className="font-mono-tabular font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  (0, {formatNum(coeffs.c, 2)})
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CoordinatePlot
        curves={[
          isQuadratic
            ? {
                kind: 'quadratic',
                a: coeffs.a,
                b: coeffs.b,
                c: coeffs.c,
                label: completedText,
              }
            : {
                kind: 'linear',
                m: coeffs.b,
                c: coeffs.c,
                label: `y = ${formatNum(coeffs.b, 2)}x + ${formatNum(coeffs.c, 2)}`,
              },
        ]}
        xRange={computedRanges.xRange}
        yRange={computedRanges.yRange}
        showAxisOfSymmetry={analysis?.axisOfSymmetry}
        showVertex={analysis ? { x: analysis.vertex.x, y: analysis.vertex.y } : undefined}
        showRoots={analysis?.roots}
        stepProgress={stepProgress}
      />
    </div>
  );
};

export const DiscriminantExplorerViz: React.FC<{
  config: DiscriminantExplorerConfig;
  stepProgress?: StepProgressState;
}> = ({ config, stepProgress }) => {
  const [paramVal, setParamVal] = useState<number>(config.defaultVal);

  const a = config.aCoeff[0] + config.aCoeff[1] * paramVal;
  const b = config.bCoeff[0] + config.bCoeff[1] * paramVal;
  const c = config.cCoeff[0] + config.cCoeff[1] * paramVal;

  const isQuadratic = Math.abs(a) > 1e-9;
  const analysis = useMemo(() => {
    if (!isQuadratic) return null;
    return analyzeQuadratic(a, b, c);
  }, [a, b, c, isQuadratic]);

  const statusInfo = useMemo(() => {
    if (!analysis) {
      return {
        label: 'Degenerate linear graph (a = 0)',
        tone: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200',
      };
    }
    if (analysis.discriminant > 1e-6) {
      return {
        label: 'Δ > 0 · 2 distinct x-intercepts',
        tone: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200',
      };
    }
    if (Math.abs(analysis.discriminant) <= 1e-6) {
      return {
        label: 'Δ = 0 · 1 x-intercept (tangent to x-axis)',
        tone: 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-200',
      };
    }
    return {
      label: 'Δ < 0 · 0 x-intercepts (no real roots)',
      tone: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200',
    };
  }, [analysis]);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            <MathText text={config.title} />
          </h4>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            <MathText text={config.displayFormula} />
          </span>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 px-3 py-2.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200">
            <label htmlFor="discriminant-param-slider">
              Vary parameter <MathText text={config.paramName} mode="math" />
            </label>
            <span className="font-mono-tabular font-bold text-sky-700 dark:text-sky-300">
              {config.paramName} = {formatNum(paramVal, 2)}
            </span>
          </div>
          <input
            id="discriminant-param-slider"
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={paramVal}
            onChange={(e) => setParamVal(parseFloat(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span>
              Condition: <MathText text={config.conditionLabel} />
            </span>
            {analysis && (
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                <MathText
                  text={`Δ = ${formatNum(b, 2)}² - 4(${formatNum(a, 2)})(${formatNum(c, 2)}) = ${formatNum(analysis.discriminant, 2)}`}
                  mode="math"
                />
              </span>
            )}
          </div>
        </div>

        <div className={`rounded-lg border px-3 py-2 text-xs font-semibold ${statusInfo.tone}`}>
          <MathText text={statusInfo.label} />
        </div>
      </div>

      <CoordinatePlot
        curves={[
          isQuadratic
            ? {
                kind: 'quadratic',
                a,
                b,
                c,
                label: `y = ${formatNum(a, 2)}x² + (${formatNum(b, 2)})x + (${formatNum(c, 2)})`,
              }
            : {
                kind: 'linear',
                m: b,
                c,
                label: `y = ${formatNum(b, 2)}x + ${formatNum(c, 2)}`,
              },
        ]}
        xRange={config.xRange}
        yRange={config.yRange}
        showAxisOfSymmetry={analysis?.axisOfSymmetry}
        showVertex={analysis ? { x: analysis.vertex.x, y: analysis.vertex.y } : undefined}
        showRoots={analysis?.roots}
        stepProgress={stepProgress}
      />
    </div>
  );
};
