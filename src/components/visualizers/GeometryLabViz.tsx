import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { GeometryScenario, VisualConfig } from '../../types/math';
import { evaluateGeometryScenario } from '../../utils/geometryModels';
import { formatNum } from '../../utils/mathEngine';
import { CoordinatePlot } from './CoordinatePlot';
import { MathText } from '../MathText';
import type { StepProgressState } from '../StepAnalyzer';

type GeometryLabConfig = Extract<VisualConfig, { kind: 'geometry-lab' }>;
type NumberLineConfig = Extract<VisualConfig, { kind: 'number-line' }>;

const ScenarioBlueprintSvg: React.FC<{ scenario: GeometryScenario; x: number }> = ({
  scenario,
  x,
}) => {
  switch (scenario) {
    case 'river-fence': {
      const lengthAlong = Math.max(0.5, 30 - 2 * x);
      const wPx = Math.min(170, Math.max(35, (lengthAlong / 30) * 190));
      const hPx = Math.min(115, Math.max(25, (x / 15) * 110));
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <rect x="215" y="10" width="55" height="145" rx="4" fill="var(--tile-x2-fill)" stroke="#0ea5e9" strokeWidth="1" />
          <text x="242" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--tile-x2-text)">
            River
          </text>
          <rect
            x={215 - wPx}
            y={82 - hPx / 2}
            width={wPx}
            height={hPx}
            fill="var(--tile-corner-fill)"
            stroke="#10b981"
            strokeWidth="2.5"
          />
          <text x={215 - wPx / 2} y={82 - hPx / 2 - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--tile-corner-text)">
            30 - 2x = {lengthAlong.toFixed(1)} m
          </text>
          <text x={215 - wPx - 8} y={86} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--plot-label)">
            x = {x.toFixed(1)}m
          </text>
          <text x={215 - wPx / 2} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--tile-corner-text)">
            Area = {(x * lengthAlong).toFixed(1)} m²
          </text>
        </svg>
      );
    }

    case 'wire-squares': {
      const ySide = Math.max(0.5, (50 - 4 * x) / 3);
      const s1 = Math.min(95, Math.max(25, x * 8.5));
      const s2 = Math.min(95, Math.max(15, ySide * 8.5));
      const baseY = 135;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <rect x="45" y={baseY - s1} width={s1} height={s1} fill="var(--tile-x2-fill)" stroke="#0ea5e9" strokeWidth="2.2" />
          <rect x={45 + s1} y={baseY - s2} width={s2} height={s2} fill="var(--tile-wing-fill)" stroke="#f59e0b" strokeWidth="2.2" />
          <text x={45 + s1 / 2} y={baseY - s1 / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--tile-x2-text)">
            {x.toFixed(1)}²
          </text>
          <text x={45 + s1 + s2 / 2} y={baseY - s2 / 2 + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--tile-wing-text)">
            {ySide.toFixed(1)}²
          </text>
          <text x={45 + s1 / 2} y={baseY + 16} textAnchor="middle" fontSize="10" fill="var(--plot-label)">
            x = {x.toFixed(1)} cm
          </text>
          <text x={45 + s1 + s2 / 2} y={baseY + 16} textAnchor="middle" fontSize="10" fill="var(--tile-wing-text)">
            y = {ySide.toFixed(1)} cm
          </text>
        </svg>
      );
    }

    case 'string-grid-4':
    case 'string-grid-6': {
      const isSix = scenario === 'string-grid-6';
      const cols = isSix ? 3 : 2;
      const rows = 2;
      const totalH = isSix ? Math.max(1, (96 - 3 * x) / 4) : Math.max(1, (120 - 5 * x) / 2);
      const wPx = isSix ? Math.min(200, Math.max(40, (x / 32) * 200)) : Math.min(200, Math.max(40, (x / 24) * 200));
      const hPx = Math.min(105, Math.max(26, (totalH / (isSix ? 24 : 60)) * 105));
      const x0 = 140 - wPx / 2;
      const y0 = 82 - hPx / 2;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <rect x={x0} y={y0} width={wPx} height={hPx} fill="var(--tile-x2-fill)" stroke="#0ea5e9" strokeWidth="2.2" />
          {Array.from({ length: rows - 1 }, (_, i) => {
            const ry = y0 + ((i + 1) * hPx) / rows;
            return <line key={`r-${i}`} x1={x0} y1={ry} x2={x0 + wPx} y2={ry} stroke="#0ea5e9" strokeWidth="1.5" />;
          })}
          {Array.from({ length: cols - 1 }, (_, i) => {
            const cx = x0 + ((i + 1) * wPx) / cols;
            return <line key={`c-${i}`} x1={cx} y1={y0} x2={cx} y2={y0 + hPx} stroke="#0ea5e9" strokeWidth="1.5" />;
          })}
          <text x="140" y={y0 - 8} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--plot-label)">
            x = {x.toFixed(1)}
          </text>
          <text x={x0 - 8} y="85" textAnchor="end" fontSize="10" fill="var(--plot-tick)">
            h = {totalH.toFixed(1)}
          </text>
        </svg>
      );
    }

    case 'right-triangle-rect': {
      const scaleX = 16;
      const scaleY = 8;
      const Bx = 55;
      const By = 142;
      const Ax = Bx;
      const Ay = By - 15 * scaleY;
      const Cx = Bx + 8 * scaleX;
      const Cy = By;
      const db = Math.max(0.2, 15 - (15 / 8) * x);
      const rectW = x * scaleX;
      const rectH = db * scaleY;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <polygon points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`} fill="var(--plot-grid)" stroke="var(--plot-axis)" strokeWidth="2" />
          <rect
            x={Bx}
            y={By - rectH}
            width={rectW}
            height={rectH}
            fill="var(--tile-x2-fill)"
            stroke="#0ea5e9"
            strokeWidth="2"
          />
          <text x={Ax - 12} y={Ay + 4} fontSize="10.5" fontWeight="700" fill="var(--plot-label)">A</text>
          <text x={Bx - 12} y={By + 4} fontSize="10.5" fontWeight="700" fill="var(--plot-label)">B</text>
          <text x={Cx + 8} y={Cy + 4} fontSize="10.5" fontWeight="700" fill="var(--plot-label)">C</text>
          <text x={Bx + rectW / 2} y={By - rectH - 5} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--tile-x2-text)">
            DF = {x.toFixed(1)}
          </text>
          <text x={Bx + rectW + 8} y={By - rectH / 2} fontSize="10" fontWeight="600" fill="var(--tile-x2-text)">
            DB = {db.toFixed(1)}
          </text>
        </svg>
      );
    }

    case 'square-triangle-apq': {
      const s = 116;
      const x0 = 82;
      const y0 = 22;
      const scale = s / 12;
      const Ax = x0;
      const Ay = y0;
      const Px = x0 + s;
      const Py = y0 + (12 - x) * scale;
      const Qx = x0 + 2 * x * scale;
      const Qy = y0 + s;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <rect x={x0} y={y0} width={s} height={s} fill="var(--plot-grid)" stroke="var(--plot-axis)" strokeWidth="2" />
          <polygon
            points={`${Ax},${Ay} ${Px},${Py} ${Qx},${Qy}`}
            fill="var(--tile-x2-fill)"
            stroke="#0ea5e9"
            strokeWidth="2"
          />
          <text x={x0 - 12} y={y0 + 4} fontSize="10.5" fontWeight="700" fill="var(--plot-label)">A</text>
          <text x={x0 + s + 6} y={y0 + 4} fontSize="10.5" fontWeight="700" fill="var(--plot-label)">B</text>
          <text x={x0 + s + 6} y={y0 + s + 4} fontSize="10.5" fontWeight="700" fill="var(--plot-label)">C</text>
          <text x={x0 - 12} y={y0 + s + 4} fontSize="10.5" fontWeight="700" fill="var(--plot-label)">D</text>
          <text x={Px + 6} y={Py + 4} fontSize="10.5" fontWeight="700" fill="var(--tile-x2-text)">P</text>
          <text x={Qx - 4} y={Qy + 13} fontSize="10.5" fontWeight="700" fill="var(--tile-x2-text)">Q</text>
        </svg>
      );
    }

    case 'three-gardens': {
      const sA = Math.max(1, 42 - 5 * x);
      const sB = 3 * x;
      const sC = x;
      const scale = 3.2;
      const pA = Math.min(115, sA * scale);
      const pB = Math.min(95, sB * scale);
      const pC = Math.min(55, sC * scale);
      const baseY = 140;
      const xA = 35;
      const xB = xA + pA;
      const xC = xB + pB;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <rect x={xA} y={baseY - pA} width={pA} height={pA} fill="var(--tile-corner-fill)" stroke="#10b981" strokeWidth="2" />
          <rect x={xB} y={baseY - pB} width={pB} height={pB} fill="var(--tile-x2-fill)" stroke="#0ea5e9" strokeWidth="2" />
          <rect x={xC} y={baseY - pC} width={pC} height={pC} fill="var(--tile-wing-fill)" stroke="#f59e0b" strokeWidth="2" />
          <text x={xA + pA / 2} y={baseY - pA / 2 + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--tile-corner-text)">A</text>
          <text x={xB + pB / 2} y={baseY - pB / 2 + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--tile-x2-text)">B</text>
          <text x={xC + pC / 2} y={baseY - pC / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--tile-wing-text)">C</text>
        </svg>
      );
    }

    case 'park-road': {
      const ab = Math.min(72, Math.max(20, x * 3.2));
      const ad = Math.min(125, Math.max(25, (100 - 4 * x) * 1.4));
      const dr = Math.min(45, x * 1.8);
      const bp = 26;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <rect x={40} y={24} width={dr + ad} height={ab + bp} fill="var(--plot-grid)" stroke="var(--plot-axis)" strokeWidth="1.5" />
          <rect x={40 + dr} y={24} width={ad} height={ab} fill="var(--tile-corner-fill)" stroke="#10b981" strokeWidth="2" />
          <text x={40 + dr + ad / 2} y={24 + ab / 2 + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--tile-corner-text)">
            Park ABCD
          </text>
          <text x={40 + dr / 2} y={24 + (ab + bp) / 2} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--plot-label)">
            Road
          </text>
        </svg>
      );
    }

    case 'bubble-tea': {
      const pOld = -x * x + 108 * x - 1566;
      const pNew = -x * x + 100 * x - 1566;
      const h1 = Math.max(6, Math.min(110, (pOld / 1500) * 110));
      const h2 = Math.max(6, Math.min(110, (pNew / 1500) * 110));
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <line x1="35" y1="135" x2="245" y2="135" stroke="var(--plot-axis)" strokeWidth="1.5" />
          <rect x="65" y={135 - h1} width="54" height={h1} rx="3" fill="#0ea5e9" />
          <rect x="160" y={135 - h2} width="54" height={h2} rx="3" fill="#f59e0b" />
          <text x="92" y={135 - h1 - 6} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--tile-x2-text)">
            ${pOld.toFixed(0)}
          </text>
          <text x="187" y={135 - h2 - 6} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--tile-wing-text)">
            ${pNew.toFixed(0)}
          </text>
          <text x="92" y="150" textAnchor="middle" fontSize="10" fill="var(--plot-tick)">Original</text>
          <text x="187" y="150" textAnchor="middle" fontSize="10" fill="var(--plot-tick)">With Fee (-$8x)</text>
        </svg>
      );
    }

    case 'projectile-40':
    case 'projectile-55': {
      const is55 = scenario === 'projectile-55';
      const maxT = is55 ? 5.4 : 2.4;
      const maxH = is55 ? 80 : 8;
      const curH = is55 ? -5 * x * x + 15 * x + 62 : 12 * x - 5 * x * x;
      const px = 35 + (x / maxT) * 210;
      const py = 140 - Math.max(0, curH / maxH) * 112;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <line x1="25" y1="140" x2="255" y2="140" stroke="var(--plot-axis)" strokeWidth="2" />
          {is55 && <rect x="25" y={140 - (62 / maxH) * 112} width="22" height={(62 / maxH) * 112} fill="var(--plot-axis-muted)" />}
          <line x1={px} y1="140" x2={px} y2={py} stroke="var(--plot-tick)" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx={px} cy={py} r="7" fill="#ef4444" stroke="var(--plot-dot-bg)" strokeWidth="2" />
          <text x={Math.min(220, Math.max(60, px))} y={Math.max(18, py - 12)} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--plot-vertex-label)">
            h = {curH.toFixed(1)} m
          </text>
        </svg>
      );
    }

    case 'trapezium': {
      const top = Math.max(1, 13 - x);
      const bot = Math.max(1, 27 - 3 * x);
      const h = 10 + 2 * x;
      const scaleX = 6.5;
      const scaleY = 3.5;
      const bW = bot * scaleX;
      const tW = top * scaleX;
      const hPx = Math.min(105, h * scaleY);
      const xLeft = 140 - bW / 2;
      const yBot = 142;
      const yTop = yBot - hPx;
      const topLeft = 140 - tW / 2;
      return (
        <svg viewBox="0 0 280 165" style={{ backgroundColor: 'var(--plot-bg)' }} className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800">
          <polygon
            points={`${topLeft},${yTop} ${topLeft + tW},${yTop} ${xLeft + bW},${yBot} ${xLeft},${yBot}`}
            fill="var(--tile-x2-fill)"
            stroke="#0ea5e9"
            strokeWidth="2"
          />
          <text x="140" y={yTop - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--tile-x2-text)">
            Top = {top.toFixed(1)} cm
          </text>
          <text x="140" y={yBot + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--tile-x2-text)">
            Bottom = {bot.toFixed(1)} cm
          </text>
        </svg>
      );
    }
  }
};

export const GeometryLabViz: React.FC<{
  config: GeometryLabConfig;
  stepProgress?: StepProgressState;
}> = ({ config, stepProgress }) => {
  const [x, setX] = useState<number>(config.defaultX);
  const readout = useMemo(() => evaluateGeometryScenario(config.scenario, x), [config.scenario, x]);

  const currentY = readout.curveFn(x);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            <MathText text={config.title} />
          </h4>
          <span className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            <MathText text={readout.formulaText} />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <ScenarioBlueprintSvg scenario={config.scenario} x={x} />

          <div className="space-y-2 text-xs">
            <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-2.5">
              <div className="text-slate-500 dark:text-slate-400">{readout.primaryLabel}</div>
              <div className="font-mono-tabular text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {readout.primaryValue}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-2.5">
              <div className="text-slate-500 dark:text-slate-400">{readout.secondaryLabel}</div>
              <div className="font-mono-tabular text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {readout.secondaryValue}
              </div>
            </div>
            <div className="rounded-lg border border-sky-200 bg-sky-50 dark:border-sky-800/60 dark:bg-sky-950/40 p-2.5">
              <div className="text-sky-700 dark:text-sky-300 font-medium">{readout.optimalLabel}</div>
              <div className="font-mono-tabular text-sm font-bold text-sky-950 dark:text-sky-100 mt-0.5">
                {readout.optimalValue}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 px-3 py-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200">
            <label htmlFor="geometry-lab-slider">Adjust {readout.xLabel}</label>
            <span className="font-mono-tabular font-bold text-sky-700 dark:text-sky-300">
              {formatNum(x, 2)} {config.unit}
            </span>
          </div>
          <input
            id="geometry-lab-slider"
            type="range"
            min={config.minX}
            max={config.maxX}
            step={config.stepX}
            value={x}
            onChange={(e) => setX(parseFloat(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
        </div>

        {readout.threshold && (
          <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${
              readout.threshold.pass
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200'
                : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200'
            }`}
          >
            {readout.threshold.pass ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <span>
              {readout.threshold.label} —{' '}
              {readout.threshold.pass ? 'Condition met at current x' : 'Cannot satisfy claim'}
            </span>
          </div>
        )}
      </div>

      <CoordinatePlot
        curves={[]}
        curveFnOverlays={[
          {
            fn: readout.curveFn,
            color: '#38bdf8',
            label: readout.yLabel,
          },
        ]}
        xRange={readout.xRange}
        yRange={readout.yRange}
        xLabel={readout.xLabel}
        yLabel={readout.yLabel}
        showVertex={{
          x: readout.optPoint.x,
          y: readout.optPoint.y,
          label: `Opt (${formatNum(readout.optPoint.x, 2)}, ${formatNum(readout.optPoint.y, 2)})`,
        }}
        highlightPoints={[
          {
            x,
            y: currentY,
            label: `(${formatNum(x, 2)}, ${formatNum(currentY, 1)})`,
            color: '#34d399',
          },
        ]}
        horizontalThreshold={
          readout.threshold
            ? { y: readout.threshold.y, label: readout.threshold.label, color: '#ef4444' }
            : undefined
        }
        stepProgress={stepProgress}
      />
    </div>
  );
};

export const NumberLineViz: React.FC<{ config: NumberLineConfig }> = ({ config }) => {
  const width = 560;
  const height = 160;
  const padX = 36;
  const span = config.max - config.min || 1;
  const toX = (v: number) => padX + ((v - config.min) / span) * (width - 2 * padX);
  const ticks = useMemo(() => {
    const out: number[] = [];
    const step = span <= 14 ? 1 : span <= 30 ? 2 : 5;
    for (let v = Math.ceil(config.min); v <= Math.floor(config.max); v += step) {
      out.push(v);
    }
    return out;
  }, [config.min, config.max, span]);

  const baseAxisY = height - 42;

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-3.5 space-y-2.5">
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        <MathText text={config.title} />
      </h4>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ backgroundColor: 'var(--plot-bg)' }}
        className="w-full h-auto rounded-lg border border-slate-100 dark:border-slate-800"
        role="img"
        aria-label={config.title}
      >
        <line x1={padX - 10} y1={baseAxisY} x2={width - padX + 10} y2={baseAxisY} stroke="var(--plot-axis)" strokeWidth={2} />
        {ticks.map((t) => {
          const px = toX(t);
          return (
            <g key={t}>
              <line x1={px} y1={baseAxisY - 5} x2={px} y2={baseAxisY + 5} stroke="var(--plot-axis)" strokeWidth={1.5} />
              <text x={px} y={baseAxisY + 20} textAnchor="middle" fontSize="11" fill="var(--plot-label)">
                {t}
              </text>
            </g>
          );
        })}

        {config.inequalities.map((ineq, idx) => {
          const y = baseAxisY - 24 - idx * 28;
          const bx = toX(Math.min(config.max, Math.max(config.min, ineq.value)));
          const isRight = ineq.op === '>' || ineq.op === '>=';
          const isClosed = ineq.op === '>=' || ineq.op === '<=';
          const color = ineq.color || (idx === 0 ? '#38bdf8' : '#f59e0b');
          const endX = isRight ? width - padX + 6 : padX - 6;

          return (
            <g key={idx}>
              <line x1={bx} y1={y} x2={endX} y2={y} stroke={color} strokeWidth={3} />
              <line x1={bx} y1={y} x2={bx} y2={baseAxisY} stroke={color} strokeWidth={1} strokeDasharray="3 3" />
              <circle cx={bx} cy={y} r={5} fill={isClosed ? color : 'var(--plot-dot-bg)'} stroke={color} strokeWidth={2.2} />
              <text x={(bx + endX) / 2} y={y - 8} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={color}>
                {ineq.label}
              </text>
            </g>
          );
        })}

        {config.integerHighlight && (
          <g>
            <circle
              cx={toX(config.integerHighlight.value)}
              cy={baseAxisY}
              r={5.5}
              fill="#10b981"
              stroke="var(--plot-dot-bg)"
              strokeWidth={1.8}
            />
            <text
              x={toX(config.integerHighlight.value)}
              y={baseAxisY + 34}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="var(--plot-root-label)"
            >
              {config.integerHighlight.label}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
