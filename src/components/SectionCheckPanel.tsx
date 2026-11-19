import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import type { SectionCheckItem } from '../types/math';
import { MathText } from './MathText';
import { QuestionVisualizer } from './visualizers/QuestionVisualizer';

interface SectionCheckPanelProps {
  exerciseCode: string;
  items: SectionCheckItem[];
}

export const SectionCheckPanel: React.FC<SectionCheckPanelProps> = ({
  exerciseCode,
  items,
}) => {
  const [responses, setResponses] = useState<Record<string, boolean>>({});

  const answeredCount = Object.keys(responses).length;
  const correctCount = items.filter((item) => responses[item.id] === item.isCorrect).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-4 space-y-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {exerciseCode} Section Check — True or False Concept Drill
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Verify fundamental definitions and common misconceptions before practicing the exercises
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-tabular text-xs font-semibold text-slate-700 dark:text-slate-200">
            Score: {correctCount} / {items.length} ({answeredCount} checked)
          </span>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => setResponses({})}
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => {
          const picked = responses[item.id];
          const hasAnswered = typeof picked === 'boolean';
          const isRight = hasAnswered && picked === item.isCorrect;

          return (
            <div
              key={item.id}
              className="rounded-lg border border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60 p-3 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-mono-tabular text-xs font-bold text-sky-700 dark:text-sky-400 mt-0.5">
                    {item.label.startsWith('(') ? item.label : `(${item.label})`}
                  </span>
                  <MathText
                    text={item.statement}
                    className="text-sm text-slate-900 dark:text-slate-100 leading-snug"
                  />
                </div>

                {item.visual && hasAnswered && (
                  <div className="pt-1">
                    <QuestionVisualizer questionId={`sc-${item.id}`} visual={item.visual} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setResponses((prev) => ({ ...prev, [item.id]: true }))}
                    className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      picked === true
                        ? 'border-sky-600 bg-sky-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    True (✓)
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponses((prev) => ({ ...prev, [item.id]: false }))}
                    className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      picked === false
                        ? 'border-sky-600 bg-sky-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    False (✗)
                  </button>
                </div>

                {hasAnswered && (
                  <div
                    className={`flex items-start gap-2 rounded-md border px-2.5 py-2 text-xs ${
                      isRight
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200'
                        : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200'
                    }`}
                  >
                    {isRight ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-semibold">
                        {isRight ? 'Correct' : `Incorrect (Answer: ${item.isCorrect ? 'True' : 'False'})`}
                        :{' '}
                      </span>
                      <MathText text={item.explanation} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
