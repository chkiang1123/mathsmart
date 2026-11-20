import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Flag,
  Lightbulb,
  LineChart,
  Pause,
  Play,
  Repeat,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import type { AnalysisStep, QuestionItem } from '../types/math';
import { MathText } from './MathText';

export interface StepProgressState {
  revealed: number;
  total: number;
  step?: AnalysisStep | null;
}

interface StepAnalyzerProps {
  question: QuestionItem;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  hasGivenGraph: boolean;
  showHintGraph: boolean;
  onToggleHintGraph: () => void;
  onStepProgressChange?: (progress: StepProgressState) => void;
  onStartDrill?: () => void;
  isDrillMode?: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;
const STEP_PLAY_INTERVAL_MS = 1650;

export const StepAnalyzer: React.FC<StepAnalyzerProps> = ({
  question,
  isCompleted,
  onToggleComplete,
  hasGivenGraph,
  showHintGraph,
  onToggleHintGraph,
  onStepProgressChange,
  onStartDrill,
  isDrillMode = false,
}) => {
  const [activePartIdx, setActivePartIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0); // 0 = hidden; 1..totalSteps = only this step shown
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setActivePartIdx(0);
    setActiveStep(0);
    setDirection(1);
    setIsPlaying(false);
    setSelectedOption(null);
  }, [question.id]);

  const currentPart = question.parts[activePartIdx] ?? question.parts[0];
  const totalSteps = currentPart.steps.length;
  const isLastStep = activeStep >= totalSteps && totalSteps > 0;
  const currentStepObj =
    activeStep >= 1 && activeStep <= totalSteps ? currentPart.steps[activeStep - 1] : null;

  useEffect(() => {
    onStepProgressChange?.({
      revealed: activeStep,
      total: totalSteps,
      step: currentStepObj,
    });
  }, [activeStep, totalSteps, currentStepObj, onStepProgressChange]);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeStep >= totalSteps) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setDirection(1);
      setActiveStep((prev) => Math.min(totalSteps, prev + 1));
    }, STEP_PLAY_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, activeStep, totalSteps]);

  const handleSelectPart = (idx: number) => {
    setActivePartIdx(idx);
    setActiveStep(0);
    setDirection(1);
    setIsPlaying(false);
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setDirection(-1);
    setActiveStep((c) => Math.max(0, c - 1));
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setDirection(1);
    setActiveStep((c) => Math.min(totalSteps, c + 1));
  };

  const handleJumpToStep = (stepNum: number) => {
    setIsPlaying(false);
    setDirection(stepNum >= activeStep ? 1 : -1);
    setActiveStep(stepNum);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setDirection(1);
    if (isLastStep || activeStep === 0) {
      setActiveStep(1);
      if (totalSteps > 1) {
        setIsPlaying(true);
      }
      return;
    }
    setIsPlaying(true);
  };

  const handleJumpToAnswer = () => {
    setIsPlaying(false);
    setDirection(1);
    setActiveStep(totalSteps);
  };

  const handleResetSteps = () => {
    setIsPlaying(false);
    setDirection(-1);
    setActiveStep(0);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs flex flex-col">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {isDrillMode ? 'Drill Hints & Step-by-Step Solution' : 'Hints & Step-by-Step Solutions'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Focused single-step view — advancing replaces the previous step without scrolling
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!isDrillMode && onStartDrill && (
            <button
              type="button"
              onClick={onStartDrill}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-800 hover:bg-indigo-100 dark:border-indigo-500/60 dark:bg-indigo-950/60 dark:text-indigo-200 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
            >
              <Repeat className="h-3.5 w-3.5" />
              Drill Similar
            </button>
          )}
          {!isDrillMode && (
            <button
              type="button"
              onClick={() => onToggleComplete(question.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                isCompleted
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700/70 dark:bg-emerald-950/50 dark:text-emerald-200 dark:hover:bg-emerald-900/60'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              {isCompleted ? 'Completed' : 'Mark Completed'}
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Interactive MCQ selector when question has options */}
        {question.options && question.options.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Select Your Answer
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {question.options.map((optText, idx) => {
                const letter = OPTION_LETTERS[idx] ?? String.fromCharCode(65 + idx);
                const isPicked = selectedOption === letter;
                const isCorrect = question.correctOption === letter;
                let btnStyle =
                  'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-800';
                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyle =
                      'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-100';
                  } else if (isPicked && !isCorrect) {
                    btnStyle =
                      'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-700 dark:bg-rose-950/50 dark:text-rose-100';
                  }
                }
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => setSelectedOption(letter)}
                    className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-mono-tabular font-bold text-xs mt-0.5 text-slate-600 dark:text-slate-300">
                      {letter}.
                    </span>
                    <MathText
                      text={optText.replace(/^[A-D]\.\s*/, '')}
                      className="text-sm leading-snug"
                    />
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && question.correctOption && (
              <div
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${
                  selectedOption === question.correctOption
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200'
                    : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200'
                }`}
              >
                {selectedOption === question.correctOption ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Correct — Option {question.correctOption} matches the textbook key.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span>
                      Incorrect — You picked {selectedOption}; the textbook answer is{' '}
                      {question.correctOption}. Follow the steps below to see why.
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Subpart Tabs */}
        {question.parts.length > 1 && (
          <div
            className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3"
            role="tablist"
          >
            {question.parts.map((part, idx) => (
              <button
                key={part.label + idx}
                type="button"
                role="tab"
                aria-selected={idx === activePartIdx}
                onClick={() => handleSelectPart(idx)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  idx === activePartIdx
                    ? 'border-sky-600 bg-sky-600 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Part {part.label}
              </button>
            ))}
          </div>
        )}

        {/* Active Part Prompt, Hint & Visual Hint Trigger */}
        <div className="space-y-2.5">
          {currentPart.prompt && (
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              {question.parts.length > 1 && (
                <span className="font-mono-tabular font-bold text-sky-700 dark:text-sky-400 mr-1.5">
                  {currentPart.label}
                </span>
              )}
              <MathText text={currentPart.prompt} />
            </div>
          )}

          {(currentPart.strategy || !hasGivenGraph) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-lg border border-amber-200 bg-amber-50/80 dark:border-amber-700/50 dark:bg-amber-950/35 px-3 py-2.5 text-xs text-amber-950 dark:text-amber-100">
              <div className="flex items-start gap-2 min-w-0">
                <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  {currentPart.strategy ? (
                    <>
                      <span className="font-semibold">Hint / Key Strategy: </span>
                      <MathText text={currentPart.strategy} />
                    </>
                  ) : (
                    <span>
                      <span className="font-semibold">Visual Hint: </span>
                      Open the interactive graph on the left if you want help visualizing this problem.
                    </span>
                  )}
                </div>
              </div>

              {!hasGivenGraph && (
                <button
                  type="button"
                  onClick={onToggleHintGraph}
                  aria-pressed={showHintGraph}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                    showHintGraph
                      ? 'border-sky-500/60 bg-sky-600 text-white hover:bg-sky-700'
                      : 'border-amber-300 bg-white text-amber-900 hover:bg-amber-100 dark:border-amber-600/60 dark:bg-slate-900 dark:text-amber-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {showHintGraph ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Hide Graph Hint</span>
                    </>
                  ) : (
                    <>
                      <LineChart className="h-3.5 w-3.5" />
                      <span>Show Graph Hint</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Step Controls & Animated Pipeline */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-3 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono-tabular text-xs font-semibold text-slate-700 dark:text-slate-200">
              {activeStep === 0
                ? `0 of ${totalSteps} steps shown`
                : `Viewing Step ${activeStep} of ${totalSteps}`}
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                disabled={activeStep <= 0}
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev Step
              </button>

              <button
                type="button"
                disabled={isLastStep}
                onClick={handleNextStep}
                className="inline-flex items-center gap-1 rounded-md border border-sky-600 bg-sky-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                {activeStep === 0 ? 'Show Step 1' : 'Next Step'}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              {totalSteps > 1 && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isPlaying
                      ? 'border-amber-500 bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'border-indigo-500/60 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 dark:border-indigo-500/50 dark:bg-indigo-950/60 dark:text-indigo-200 dark:hover:bg-indigo-900/60'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      Pause
                    </>
                  ) : isLastStep ? (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      Replay Steps
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      Animate Steps
                    </>
                  )}
                </button>
              )}

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={handleJumpToAnswer}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                >
                  <Flag className="h-3.5 w-3.5" />
                  Final Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResetSteps}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Hide Step
                </button>
              )}
            </div>
          </div>

          {/* Clickable Step Pipeline (1 → 2 → 3) */}
          {totalSteps > 1 && (
            <div className="flex items-center gap-1 pt-0.5" aria-label="Step progression timeline">
              {currentPart.steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isVisited = stepNum < activeStep;
                const isCurrent = stepNum === activeStep;
                return (
                  <React.Fragment key={idx}>
                    <button
                      type="button"
                      onClick={() => handleJumpToStep(stepNum)}
                      title={`View Step ${stepNum}: ${step.title}`}
                      aria-label={`Step ${stepNum}: ${step.title}`}
                      className={`h-6 min-w-6 px-1.5 rounded-full font-mono-tabular text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? 'bg-sky-600 text-white ring-2 ring-sky-400/50 scale-105'
                          : isVisited
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-sky-800'
                            : 'border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-300'
                      }`}
                    >
                      {stepNum}
                    </button>
                    {idx < totalSteps - 1 && (
                      <div className="relative h-1 flex-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-sky-500"
                          initial={false}
                          animate={{ width: activeStep >= stepNum + 1 ? '100%' : '0%' }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* Single-Step Focused Card Viewport (prevents vertical growth & scrolling) */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {activeStep === 0 || !currentStepObj ? (
              <motion.div
                key={`empty-${question.id}-${activePartIdx}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/50 p-5 text-center space-y-3"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Try solving first — steps are hidden
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Click{' '}
                    <span className="font-semibold text-sky-600 dark:text-sky-400">Show Step 1</span>{' '}
                    when ready. Advancing replaces the previous step in-place and highlights the graph.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-sky-700 cursor-pointer transition-colors"
                  >
                    Show Step 1
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  {totalSteps > 1 && (
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/60 bg-indigo-50 dark:bg-indigo-950/50 dark:border-indigo-500/50 px-3.5 py-2 text-xs font-semibold text-indigo-800 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 cursor-pointer transition-colors"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Animate Steps (1 → {totalSteps})
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`active-${question.id}-${activePartIdx}-step-${activeStep}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -24, scale: 0.985 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-sky-400 bg-sky-50/45 ring-1 ring-sky-500/25 dark:border-sky-500/70 dark:bg-sky-950/25 p-3.5 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex h-6 min-w-6 px-1.5 shrink-0 items-center justify-center rounded-md bg-sky-600 font-mono-tabular text-xs font-bold text-white">
                      {activeStep}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      <MathText text={currentStepObj.title} />
                    </span>
                  </div>

                  {activeStep > 1 && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white/90 dark:border-sky-800 dark:bg-slate-900 px-2 py-0.5 font-mono-tabular text-[11px] font-semibold text-sky-700 dark:text-sky-300 shrink-0">
                      Step {activeStep - 1}
                      <ArrowRight className="h-3 w-3" />
                      Step {activeStep}
                    </span>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="rounded-lg border border-sky-200/90 bg-white dark:border-sky-800/70 dark:bg-slate-900 px-3.5 py-2.5 text-sm sm:text-base font-medium text-slate-900 dark:text-slate-50 overflow-x-auto"
                >
                  <MathText text={currentStepObj.math} />
                </motion.div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <MathText text={currentStepObj.explanation} />
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Answer Box (appears cleanly below final single step) */}
        <AnimatePresence>
          {isLastStep && (
            <motion.div
              key={`answer-${question.id}-${activePartIdx}`}
              initial={{ opacity: 0, y: 8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/40 px-3.5 py-3 space-y-1"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Final Solution Answer
                  </div>
                  <div className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
                    <MathText text={currentPart.answer} />
                  </div>
                </div>
                {!isDrillMode && onStartDrill && (
                  <button
                    type="button"
                    onClick={onStartDrill}
                    className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-slate-900 dark:text-emerald-200 dark:hover:bg-emerald-900/40 cursor-pointer shrink-0 transition-colors"
                  >
                    <Repeat className="h-3.5 w-3.5" />
                    Practice Similar Drill
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
