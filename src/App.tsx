import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  EyeOff,
  FolderPlus,
  LineChart,
  Moon,
  RefreshCw,
  Repeat,
  Search,
  Sun,
  XCircle,
} from 'lucide-react';
import { CHAPTERS } from './data/chapters';
import type { ExerciseId, QuestionItem } from './types/math';
import { MathText } from './components/MathText';
import { QuestionVisualizer } from './components/visualizers/QuestionVisualizer';
import { StepAnalyzer, type StepProgressState } from './components/StepAnalyzer';
import { SectionCheckPanel } from './components/SectionCheckPanel';
import { formatQuestionStatement } from './utils/statementFormatter';
import { hasGivenGraphInQuestion } from './utils/questionMeta';
import {
  checkDrillAnswer,
  findRelatedTextbookQuestions,
  generateDrillQuestion,
  type DrillQuestion,
} from './utils/drillGenerator';

const PROGRESS_STORAGE_KEY = 'mathsmart_ch4_completed_v1';
const THEME_STORAGE_KEY = 'mathsmart_theme_v1';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const [activeChapterId, setActiveChapterId] = useState<string>('ch4');
  const activeChapter = useMemo(
    () => CHAPTERS.find((c) => c.id === activeChapterId) ?? CHAPTERS.find((c) => c.status === 'active')!,
    [activeChapterId]
  );

  const [activeExerciseId, setActiveExerciseId] = useState<ExerciseId>('ex4_1');
  const [activeQuestionId, setActiveQuestionId] = useState<string>(
    CHAPTERS.find((c) => c.id === 'ch4')!.exercises[0].questions[0].id
  );
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSectionCheck, setShowSectionCheck] = useState<boolean>(false);
  const [showHintGraph, setShowHintGraph] = useState<boolean>(false);
  const [activeDrill, setActiveDrill] = useState<DrillQuestion | null>(null);
  const [drillSeedCounter, setDrillSeedCounter] = useState<number>(1);
  const [drillSolvedIds, setDrillSolvedIds] = useState<string[]>([]);
  const [drillAnswerInput, setDrillAnswerInput] = useState<string>('');
  const [drillCheckStatus, setDrillCheckStatus] = useState<'empty' | 'correct' | 'incorrect' | null>(null);
  const [stepProgress, setStepProgress] = useState<StepProgressState>({
    revealed: 0,
    total: 1,
    step: null,
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [completedIds]);

  const allChapterQuestions = useMemo(
    () => activeChapter.exercises.flatMap((g) => g.questions),
    [activeChapter]
  );

  const activeGroup = useMemo(() => {
    if (activeChapter.exercises.length === 0) return null;
    return (
      activeChapter.exercises.find((g) => g.id === activeExerciseId) ?? activeChapter.exercises[0]
    );
  }, [activeChapter, activeExerciseId]);

  const availableLevels = useMemo(() => {
    if (!activeGroup) return [];
    const levels = new Set<string>();
    let hasNF = false;
    for (const q of activeGroup.questions) {
      levels.add(q.level);
      if (q.isNonFoundation) hasNF = true;
    }
    const result = ['ALL', ...Array.from(levels)];
    if (hasNF) result.push('NF');
    return result;
  }, [activeGroup]);

  const filteredQuestions = useMemo(() => {
    if (!activeGroup) return [];
    const query = searchQuery.trim().toLowerCase();
    return activeGroup.questions.filter((q) => {
      if (levelFilter === 'NF' && !q.isNonFoundation) return false;
      if (levelFilter !== 'ALL' && levelFilter !== 'NF' && q.level !== levelFilter) return false;
      if (!query) return true;
      return (
        q.number.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        q.statement.toLowerCase().includes(query)
      );
    });
  }, [activeGroup, levelFilter, searchQuery]);

  const activeQuestion: QuestionItem | null = useMemo(() => {
    if (!activeGroup) return null;
    return (
      filteredQuestions.find((q) => q.id === activeQuestionId) ??
      activeGroup.questions.find((q) => q.id === activeQuestionId) ??
      filteredQuestions[0] ??
      activeGroup.questions[0] ??
      null
    );
  }, [filteredQuestions, activeGroup, activeQuestionId]);

  const activeQuestionIndexInFiltered = activeQuestion
    ? filteredQuestions.findIndex((q) => q.id === activeQuestion.id)
    : -1;

  const displayedQuestion = activeDrill ? activeDrill.question : activeQuestion;

  useEffect(() => {
    setActiveDrill(null);
    setDrillAnswerInput('');
    setDrillCheckStatus(null);
    setShowHintGraph(false);
    setStepProgress({
      revealed: 0,
      total: activeQuestion?.parts[0]?.steps.length ?? 1,
      step: null,
    });
  }, [activeQuestion?.id]);

  const handleStepProgressChange = useCallback((progress: StepProgressState) => {
    setStepProgress(progress);
  }, []);

  const formattedStatement = useMemo(
    () =>
      displayedQuestion
        ? formatQuestionStatement(displayedQuestion.statement, displayedQuestion.parts)
        : null,
    [displayedQuestion]
  );

  const hasGivenGraph = useMemo(
    () =>
      activeDrill
        ? false
        : activeQuestion
          ? hasGivenGraphInQuestion(activeQuestion)
          : false,
    [activeDrill, activeQuestion]
  );

  const isGraphVisible = hasGivenGraph || showHintGraph;

  const relatedQuestions = useMemo(
    () =>
      activeQuestion
        ? findRelatedTextbookQuestions(activeQuestion, allChapterQuestions, 4)
        : [],
    [activeQuestion, allChapterQuestions]
  );

  const exerciseCodeById = useMemo(() => {
    const map = new Map<ExerciseId, string>();
    for (const grp of activeChapter.exercises) {
      map.set(grp.id, grp.code);
    }
    return map;
  }, [activeChapter]);

  const handleStartDrill = () => {
    if (!activeQuestion) return;
    const nextCounter = drillSeedCounter + 1;
    const seed = Date.now() + nextCounter * 7919;
    const drill = generateDrillQuestion(activeQuestion, seed, 1);
    setDrillSeedCounter(nextCounter);
    setActiveDrill(drill);
    setDrillAnswerInput('');
    setDrillCheckStatus(null);
    setShowHintGraph(false);
    setStepProgress({
      revealed: 0,
      total: drill.question.parts[0]?.steps.length ?? 1,
      step: null,
    });
  };

  const handleNewDrillVariation = () => {
    if (!activeQuestion) return;
    const nextCounter = drillSeedCounter + 1;
    const nextVar = (activeDrill?.variationNumber ?? 0) + 1;
    const seed = Date.now() + nextCounter * 104729;
    const drill = generateDrillQuestion(activeQuestion, seed, nextVar);
    setDrillSeedCounter(nextCounter);
    setActiveDrill(drill);
    setDrillAnswerInput('');
    setDrillCheckStatus(null);
    setShowHintGraph(false);
    setStepProgress({
      revealed: 0,
      total: drill.question.parts[0]?.steps.length ?? 1,
      step: null,
    });
  };

  const handleExitDrill = () => {
    setActiveDrill(null);
    setDrillAnswerInput('');
    setDrillCheckStatus(null);
    setShowHintGraph(false);
    setStepProgress({
      revealed: 0,
      total: activeQuestion?.parts[0]?.steps.length ?? 1,
      step: null,
    });
  };

  const handleVerifyDrillAnswer = (overrideValue?: string) => {
    if (!activeDrill) return;
    const val = overrideValue ?? drillAnswerInput;
    if (overrideValue !== undefined) {
      setDrillAnswerInput(overrideValue);
    }
    const result = checkDrillAnswer(val, activeDrill.acceptableAnswers);
    setDrillCheckStatus(result.status);
    if (result.status === 'correct') {
      setDrillSolvedIds((prev) =>
        prev.includes(activeDrill.id) ? prev : [...prev, activeDrill.id]
      );
    }
  };

  const handleJumpToTextbookQuestion = (q: QuestionItem) => {
    setActiveDrill(null);
    setActiveExerciseId(q.exerciseId);
    setLevelFilter('ALL');
    setSearchQuery('');
    setActiveQuestionId(q.id);
    setShowSectionCheck(false);
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    const ch = CHAPTERS.find((c) => c.id === chapterId);
    if (ch && ch.exercises.length > 0) {
      setActiveExerciseId(ch.exercises[0].id);
      setActiveQuestionId(ch.exercises[0].questions[0].id);
    }
    setActiveDrill(null);
    setLevelFilter('ALL');
    setSearchQuery('');
    setShowSectionCheck(false);
  };

  const handleSelectExercise = (id: ExerciseId) => {
    const nextGroup = activeChapter.exercises.find((g) => g.id === id) ?? activeChapter.exercises[0];
    if (!nextGroup) return;
    setActiveExerciseId(id);
    setActiveQuestionId(nextGroup.questions[0].id);
    setActiveDrill(null);
    setLevelFilter('ALL');
    setSearchQuery('');
    setShowSectionCheck(false);
  };

  const handleToggleComplete = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStepQuestion = (delta: -1 | 1) => {
    if (!activeGroup || !activeQuestion) return;
    const list = filteredQuestions.length > 0 ? filteredQuestions : activeGroup.questions;
    const idx = list.findIndex((q) => q.id === activeQuestion.id);
    const nextIdx = Math.max(0, Math.min(list.length - 1, (idx === -1 ? 0 : idx) + delta));
    setActiveQuestionId(list[nextIdx].id);
  };

  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);
  const completedInGroup = activeGroup
    ? activeGroup.questions.filter((q) => completedSet.has(q.id)).length
    : 0;

  const metaParts = useMemo(() => {
    if (!activeGroup || !activeQuestion) return [];
    const pageLabel = activeQuestion.page.startsWith('p.')
      ? activeQuestion.page
      : `p. ${activeQuestion.page}`;
    return [
      activeGroup.code,
      ...(activeQuestion.level !== activeGroup.code ? [activeQuestion.level] : []),
      pageLabel,
      activeQuestion.topic,
      ...(activeQuestion.isNonFoundation ? ['Non-Foundation'] : []),
      ...(activeQuestion.examRef ? [activeQuestion.examRef] : []),
    ];
  }, [activeGroup, activeQuestion]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col transition-colors">
      {/* Sticky Single-Row Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-900/95 backdrop-blur-xs">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
                MathSmart Interactive — {activeChapter.number}: {activeChapter.title}
              </h1>
              <p className="hidden sm:block truncate text-[11px] text-slate-500 dark:text-slate-400">
                S.K.H. Bishop Baker Secondary School · LaTeX Solutions &amp; Visual Practice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {allChapterQuestions.length > 0 && (
              <span className="hidden md:inline-block font-mono-tabular text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                Progress: {completedIds.length} / {allChapterQuestions.length}
              </span>
            )}
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Night Mode'}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-sky-600" />
                  <span>Night Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Multi-Chapter Reservation Strip */}
        <div className="border-t border-slate-100 bg-slate-100/80 dark:border-slate-800/80 dark:bg-slate-950/70">
          <div className="mx-auto flex max-w-[1440px] items-center gap-1.5 overflow-x-auto px-4 py-1.5 sm:px-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 shrink-0">
              Chapters:
            </span>
            {CHAPTERS.map((ch) => {
              const isSelected = ch.id === activeChapterId;
              const isReserved = ch.status === 'reserved';
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-sky-500 bg-sky-600 text-white'
                      : isReserved
                        ? 'border-dashed border-slate-300 bg-transparent text-slate-500 hover:border-slate-400 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{ch.number}</span>
                  {isReserved && (
                    <span className="text-[10px] font-normal opacity-75">· Reserved</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Exercise Division Bar (shown when active chapter has exercises) */}
        {activeChapter.exercises.length > 0 && (
          <nav
            aria-label="Exercise sections"
            className="border-t border-slate-100 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <div className="mx-auto flex max-w-[1440px] items-center gap-1.5 overflow-x-auto px-4 py-2 sm:px-6">
              {activeChapter.exercises.map((group) => {
                const isActive = group.id === activeExerciseId;
                const groupDone = group.questions.filter((q) => completedSet.has(q.id)).length;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleSelectExercise(group.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isActive
                        ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{group.code}</span>
                    <span
                      className={`font-mono-tabular text-[11px] ${
                        isActive ? 'text-sky-100' : 'text-slate-400 dark:text-slate-400'
                      }`}
                    >
                      {groupDone > 0 ? `${groupDone}/${group.questions.length}` : group.questions.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-4 sm:px-6 sm:py-5 space-y-4">
        {activeChapter.status === 'reserved' || !activeGroup || !activeQuestion ? (
          <section className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center space-y-3">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <FolderPlus className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {activeChapter.number} — {activeChapter.title}
            </h2>
            <p className="mx-auto max-w-lg text-sm text-slate-600 dark:text-slate-300">
              This chapter slot is reserved for upcoming question uploads. Once you upload the next
              chapter materials, its exercises, LaTeX solutions, and interactive graphs will appear
              here automatically.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSelectChapter('ch4')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700 cursor-pointer"
              >
                Return to Ch. 4: Functions and Graphs
              </button>
            </div>
          </section>
        ) : (
          <>
            {activeDrill ? (
              /* Top-of-Main Drill Mode Banner */
              <div
                aria-label="Similar drill navigation bar"
                className="rounded-xl border border-indigo-300 bg-indigo-50/80 dark:border-indigo-700/60 dark:bg-indigo-950/35 px-3 py-2.5 sm:px-4 flex flex-wrap items-center justify-between gap-2.5 shadow-xs"
              >
                <button
                  type="button"
                  onClick={handleExitDrill}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Question</span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-indigo-800 dark:text-indigo-200">
                    <Repeat className="h-3.5 w-3.5" />
                    Similar Drill · {activeDrill.archetypeLabel}
                  </span>
                  <span className="font-mono-tabular rounded-md border border-indigo-200 bg-white dark:border-indigo-700/70 dark:bg-slate-900 px-2 py-0.5 font-semibold text-indigo-700 dark:text-indigo-300">
                    Variation #{activeDrill.variationNumber}
                  </span>
                  <span className="font-mono-tabular text-slate-600 dark:text-slate-300">
                    Solved: {drillSolvedIds.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNewDrillVariation}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-600 bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>New Variation</span>
                </button>
              </div>
            ) : (
              <>
                {/* Top-of-Main Question Stepper Bar */}
                <div
                  aria-label="Question navigation bar"
                  className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 px-3 py-2.5 sm:px-4 flex flex-wrap items-center justify-between gap-2.5 shadow-xs"
                >
                  <button
                    type="button"
                    disabled={activeQuestionIndexInFiltered <= 0}
                    onClick={() => handleStepQuestion(-1)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous Question</span>
                  </button>

                  <div className="flex items-center gap-2 min-w-0 flex-1 justify-center">
                    {filteredQuestions.length > 0 ? (
                      <>
                        <select
                          aria-label="Select question"
                          value={activeQuestion.id}
                          onChange={(e) => setActiveQuestionId(e.target.value)}
                          className="max-w-full sm:max-w-sm truncate rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:border-sky-500 focus:outline-none cursor-pointer"
                        >
                          {filteredQuestions.map((q) => (
                            <option key={q.id} value={q.id}>
                              {completedSet.has(q.id) ? '✓ ' : ''}
                              {q.number} — {q.topic}
                            </option>
                          ))}
                        </select>
                        <span className="font-mono-tabular text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
                          {activeQuestionIndexInFiltered + 1} / {filteredQuestions.length}
                        </span>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>No matching questions.</span>
                        <button
                          type="button"
                          onClick={() => {
                            setLevelFilter('ALL');
                            setSearchQuery('');
                          }}
                          className="font-semibold text-sky-700 dark:text-sky-400 hover:underline cursor-pointer"
                        >
                          Reset filters
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={
                      activeQuestionIndexInFiltered === -1 ||
                      activeQuestionIndexInFiltered >= filteredQuestions.length - 1
                    }
                    onClick={() => handleStepQuestion(1)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-600 bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Compact Section Info + Filter Strip */}
                <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 px-4 py-3 space-y-2.5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                      <span className="text-xs font-semibold text-sky-700 dark:text-sky-400 shrink-0">
                        {activeGroup.code}
                      </span>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 truncate">
                        {activeGroup.title}
                      </h2>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-tabular shrink-0">
                        {activeGroup.pages} · {completedInGroup}/{activeGroup.questions.length} done
                      </span>
                    </div>

                    {activeGroup.sectionCheck && activeGroup.sectionCheck.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowSectionCheck((s) => !s)}
                        aria-expanded={showSectionCheck}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                          showSectionCheck
                            ? 'border-sky-600 bg-sky-50 text-sky-800 dark:border-sky-500 dark:bg-sky-950/60 dark:text-sky-200'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <ClipboardCheck className="h-3.5 w-3.5" />
                        {showSectionCheck
                          ? 'Hide Section Check'
                          : `Section Check (${activeGroup.sectionCheck.length})`}
                      </button>
                    )}
                  </div>

                  {showSectionCheck && activeGroup.sectionCheck && (
                    <SectionCheckPanel
                      exerciseCode={activeGroup.code}
                      items={activeGroup.sectionCheck}
                    />
                  )}

                  {/* Compact Level Filter + Search */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {availableLevels.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLevelFilter(lvl)}
                          className={`rounded-md border px-2 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                            levelFilter === lvl
                              ? 'border-slate-900 bg-slate-900 text-white dark:border-sky-500 dark:bg-sky-600'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {lvl === 'ALL' ? `All (${activeGroup.questions.length})` : lvl}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full md:w-60">
                      <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="search"
                        aria-label="Filter questions by number or topic"
                        placeholder="Search Q#, topic, keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Two-Zone iPad-Friendly Split Workspace (md+ = 768px iPad portrait & landscape) */}
            {displayedQuestion && (
              <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/* Left Zone: Question Statement + Interactive Visualization */}
                <div className="md:col-span-6 space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-4 space-y-3 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {activeDrill
                          ? `Similar Drill · Based on ${activeGroup.code} ${activeDrill.sourceTitle}`
                          : metaParts.join(' · ')}
                      </div>

                      {!activeDrill && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={activeQuestionIndexInFiltered <= 0}
                            onClick={() => handleStepQuestion(-1)}
                            aria-label="Previous question"
                            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            Prev
                          </button>
                          <button
                            type="button"
                            disabled={
                              activeQuestionIndexInFiltered === -1 ||
                              activeQuestionIndexInFiltered >= filteredQuestions.length - 1
                            }
                            onClick={() => handleStepQuestion(1)}
                            aria-label="Next question"
                            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          >
                            Next
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                        {activeDrill
                          ? `Practice Drill #${activeDrill.variationNumber} — ${activeDrill.archetypeLabel}`
                          : `${activeGroup.code} — ${activeQuestion.number}`}
                      </h3>
                      {formattedStatement && (
                        <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed space-y-2.5">
                          {formattedStatement.intro && (
                            <div>
                              <MathText text={formattedStatement.intro} />
                            </div>
                          )}
                          {formattedStatement.items.length > 0 && (
                            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                              {formattedStatement.items.map((item, idx) => (
                                <div key={`${item.marker}-${idx}`} className="space-y-1.5">
                                  <div className="flex items-start gap-2">
                                    <span className="font-mono-tabular font-bold text-sky-700 dark:text-sky-400 shrink-0 min-w-[1.75rem]">
                                      {item.marker}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      {item.text && <MathText text={item.text} />}
                                      {item.nested && item.nested.length > 0 && (
                                        <div className="mt-1.5 space-y-1 pl-1 sm:pl-2 border-l-2 border-slate-200 dark:border-slate-700/80">
                                          {item.nested.map((sub, subIdx) => (
                                            <div
                                              key={`${sub.marker}-${subIdx}`}
                                              className="flex items-start gap-2 pl-2"
                                            >
                                              <span className="font-mono-tabular font-semibold text-slate-600 dark:text-sky-300/90 shrink-0 min-w-[1.6rem]">
                                                {sub.marker}
                                              </span>
                                              <div className="min-w-0 flex-1">
                                                <MathText text={sub.text} />
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick Self-Check Box in Drill Mode */}
                    {activeDrill && (
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          Quick Check: {activeDrill.quickCheckLabel}
                        </div>
                        {activeDrill.quickChoices ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {activeDrill.quickChoices.map((choice) => (
                              <button
                                key={choice}
                                type="button"
                                onClick={() => handleVerifyDrillAnswer(choice)}
                                className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                                  drillAnswerInput.toLowerCase() === choice.toLowerCase()
                                    ? 'border-sky-600 bg-sky-600 text-white'
                                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                                }`}
                              >
                                {choice}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleVerifyDrillAnswer();
                            }}
                            className="flex flex-wrap items-center gap-2"
                          >
                            <input
                              type="text"
                              aria-label="Enter your drill answer"
                              placeholder={activeDrill.answerPlaceholder}
                              value={drillAnswerInput}
                              onChange={(e) => {
                                setDrillAnswerInput(e.target.value);
                                if (drillCheckStatus) setDrillCheckStatus(null);
                              }}
                              className="flex-1 min-w-[160px] rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 cursor-pointer transition-colors"
                            >
                              Check Answer
                            </button>
                          </form>
                        )}

                        {drillCheckStatus === 'correct' && (
                          <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-300 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/40 px-3 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                            <span className="inline-flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              Correct! Try a New Variation to build mastery.
                            </span>
                            <button
                              type="button"
                              onClick={handleNewDrillVariation}
                              className="rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700 cursor-pointer shrink-0"
                            >
                              Next Drill →
                            </button>
                          </div>
                        )}
                        {drillCheckStatus === 'incorrect' && (
                          <div className="flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 dark:border-rose-800/60 dark:bg-rose-950/40 px-3 py-2 text-xs font-semibold text-rose-900 dark:text-rose-200">
                            <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                            <span>
                              Not quite — click Show Step 1 or Show Graph Hint on the right to check
                              your working.
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Related Textbook Questions in Drill Mode */}
                    {activeDrill && relatedQuestions.length > 0 && (
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-2.5 space-y-1.5">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          More Textbook Questions on This Skill
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {relatedQuestions.map((rq) => (
                            <button
                              key={rq.id}
                              type="button"
                              onClick={() => handleJumpToTextbookQuestion(rq)}
                              className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                            >
                              <span>{exerciseCodeById.get(rq.exerciseId) ?? rq.exerciseId}</span>
                              <span className="font-mono-tabular text-sky-600 dark:text-sky-400">
                                {rq.number}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Graph / Visual Hint Area */}
                  <AnimatePresence mode="wait">
                    {isGraphVisible ? (
                      <motion.div
                        key={`viz-shown-${displayedQuestion.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-2"
                      >
                        {!hasGivenGraph && (
                          <div className="flex items-center justify-between gap-2 rounded-lg border border-sky-200 bg-sky-50/70 dark:border-sky-800/60 dark:bg-sky-950/30 px-3 py-2 text-xs">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-sky-800 dark:text-sky-200">
                              <LineChart className="h-3.5 w-3.5" />
                              Visual Hint Graph
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowHintGraph(false)}
                              className="inline-flex items-center gap-1 rounded-md border border-sky-300 bg-white dark:border-sky-700 dark:bg-slate-900 px-2.5 py-1 text-xs font-semibold text-sky-800 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <EyeOff className="h-3.5 w-3.5" />
                              Hide Graph
                            </button>
                          </div>
                        )}
                        <QuestionVisualizer
                          questionId={displayedQuestion.id}
                          visual={displayedQuestion.visual}
                          stepProgress={stepProgress}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`viz-hidden-${displayedQuestion.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl border border-dashed border-slate-300 bg-white/80 dark:border-slate-700 dark:bg-slate-900/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            <LineChart className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                              Visual Hint (Graph) Hidden
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {activeDrill
                                ? 'Try sketching first, or reveal the interactive graph for this drill variation.'
                                : 'This question has no figure in the textbook. Reveal the interactive graph if a visual hint is needed.'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowHintGraph(true)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-sky-600 bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700 shrink-0 cursor-pointer transition-colors"
                        >
                          <LineChart className="h-3.5 w-3.5" />
                          Show Graph Hint
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Zone: Hints & Progressive Step-by-Step Solutions */}
                <div className="md:col-span-6">
                  <StepAnalyzer
                    question={displayedQuestion}
                    isCompleted={completedSet.has(displayedQuestion.id)}
                    onToggleComplete={handleToggleComplete}
                    hasGivenGraph={hasGivenGraph}
                    showHintGraph={showHintGraph}
                    onToggleHintGraph={() => setShowHintGraph((v) => !v)}
                    onStepProgressChange={handleStepProgressChange}
                    onStartDrill={activeDrill ? undefined : handleStartDrill}
                    isDrillMode={Boolean(activeDrill)}
                  />
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 py-3 px-4 sm:px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} S.K.H. Bishop Baker Secondary School · All Rights Reserved
      </footer>
    </div>
  );
}
