import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { VisualConfig } from '../../types/math';
import {
  evaluateCurveY,
  evaluateVerticalIntersections,
  formatNum,
} from '../../utils/mathEngine';
import { CoordinatePlot } from './CoordinatePlot';
import { MathText } from '../MathText';
import type { StepProgressState } from '../StepAnalyzer';

type VerticalLineTestConfig = Extract<VisualConfig, { kind: 'vertical-line-test' }>;
type FunctionMachineConfig = Extract<VisualConfig, { kind: 'function-machine' }>;

export const VerticalLineTestViz: React.FC<{ config: VerticalLineTestConfig }> = ({ config }) => {
  const [testX, setTestX] = useState<number>(config.defaultTestX);

  const intersections = useMemo(
    () => evaluateVerticalIntersections(config.curve, testX),
    [config.curve, testX]
  );

  const highlightPoints = useMemo(
    () =>
      intersections.map((y, idx) => ({
        x: testX,
        y,
        label: `y${intersections.length > 1 ? idx + 1 : ''} = ${formatNum(y, 2)}`,
        color: intersections.length > 1 ? '#f87171' : '#34d399',
      })),
    [intersections, testX]
  );

  return (
    <div className="space-y-3">
      <CoordinatePlot
        title={config.title}
        curves={[config.curve]}
        xRange={config.xRange}
        yRange={config.yRange}
        extraVerticalLineX={testX}
        highlightPoints={highlightPoints}
      />

      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor="vertical-test-slider"
            className="text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            Vertical Line Test Scanner:{' '}
            <span className="font-mono-tabular text-sky-700 dark:text-sky-300">
              x = {formatNum(testX, 2)}
            </span>
          </label>
          <span className="font-mono-tabular text-xs font-semibold text-slate-700 dark:text-slate-300">
            Intersections at this x: {intersections.length}
          </span>
        </div>

        <input
          id="vertical-test-slider"
          type="range"
          min={config.xRange[0]}
          max={config.xRange[1]}
          step={0.25}
          value={testX}
          onChange={(e) => setTestX(parseFloat(e.target.value))}
          className="w-full accent-sky-500 cursor-pointer"
        />

        <div
          className={`flex items-start gap-2.5 rounded-lg border p-2.5 text-xs ${
            config.isFunction
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200'
          }`}
        >
          {config.isFunction ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <XCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          )}
          <div>
            <p className="font-semibold">
              {config.isFunction
                ? 'Valid Function (every vertical line meets the graph at most once)'
                : 'Not a Function (vertical line can meet the graph more than once)'}
            </p>
            <p className="mt-0.5 opacity-90 leading-relaxed">
              <MathText text={config.reason} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FunctionMachineViz: React.FC<{
  config: FunctionMachineConfig;
  stepProgress?: StepProgressState;
}> = ({ config, stepProgress }) => {
  const [inputX, setInputX] = useState<number>(config.defaultX);

  const outputY = useMemo(() => evaluateCurveY(config.curve, inputX), [config.curve, inputX]);

  const highlightPoints = useMemo(() => {
    const pts = config.evalPoints
      .filter((ep) => outputY === null || Math.abs(ep.x - inputX) > 1e-6)
      .map((ep) => {
        const y = evaluateCurveY(config.curve, ep.x);
        if (y === null) return null;
        return {
          x: ep.x,
          y,
          label: ep.label,
          color: ep.color || '#94a3b8',
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);

    if (outputY !== null) {
      pts.push({
        x: inputX,
        y: outputY,
        label: `f(${formatNum(inputX, 2)}) = ${formatNum(outputY, 2)}`,
        color: '#38bdf8',
      });
    }
    return pts;
  }, [config.evalPoints, config.curve, inputX, outputY]);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            <MathText text={config.title} />
          </h4>
          <span className="font-mono-tabular text-xs font-medium text-slate-500 dark:text-slate-400">
            Interactive Input-Output Mapping
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.4fr_auto_1fr] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-3">
          <div className="rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 px-3 py-2 text-center">
            <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Input x
            </div>
            <div className="font-mono-tabular text-base font-bold text-slate-900 dark:text-slate-100">
              {formatNum(inputX, 2)}
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-slate-400 mx-auto rotate-90 sm:rotate-0" />

          <div className="rounded-md border border-sky-200 bg-sky-50 dark:border-sky-800/60 dark:bg-sky-950/40 px-3 py-2 text-center">
            <div className="text-[11px] font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300">
              Rule
            </div>
            <div className="text-sm font-semibold text-sky-950 dark:text-sky-100">
              <MathText text={config.formulaText} mode="math" />
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-slate-400 mx-auto rotate-90 sm:rotate-0" />

          <div className="rounded-md border border-emerald-200 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/40 px-3 py-2 text-center">
            <div className="text-[11px] font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Output y
            </div>
            <div className="font-mono-tabular text-base font-bold text-emerald-900 dark:text-emerald-200">
              {outputY === null ? 'Undefined' : formatNum(outputY, 2)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <label htmlFor="fn-machine-slider" className="font-medium">
              Drag x value
            </label>
            <span className="font-mono-tabular">
              Range: [{config.xRange[0]}, {config.xRange[1]}]
            </span>
          </div>
          <input
            id="fn-machine-slider"
            type="range"
            min={config.xRange[0]}
            max={config.xRange[1]}
            step={0.5}
            value={inputX}
            onChange={(e) => setInputX(parseFloat(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />

          {config.evalPoints.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Key values:</span>
              {config.evalPoints.map((ep, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputX(ep.x)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    Math.abs(inputX - ep.x) < 1e-6
                      ? 'border-sky-600 bg-sky-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <MathText text={`x = ${ep.x}`} mode="math" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <CoordinatePlot
        curves={[config.curve]}
        xRange={config.xRange}
        yRange={config.yRange}
        highlightPoints={highlightPoints}
        note={config.note}
        stepProgress={stepProgress}
      />
    </div>
  );
};
