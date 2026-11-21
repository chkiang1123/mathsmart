import type {
  ExerciseId,
  QuestionItem,
  QuestionLevel,
  QuestionPart,
  VisualConfig,
} from '../types/math';

export type DrillArchetype =
  | 'vertical-line-test'
  | 'function-eval'
  | 'unknown-coeff-single'
  | 'unknown-coeff-two-points'
  | 'solve-func-eq'
  | 'linear-intercepts'
  | 'quadratic-features'
  | 'discriminant-range'
  | 'vertex-form'
  | 'completing-square'
  | 'optimization-geometry'
  | 'ch3-line-forms'
  | 'ch3-general-form'
  | 'ch3-parallel-perp'
  | 'ch3-inclination'
  | 'ch3-intersections'
  | 'ch3-triangle-geometry';

export interface DrillQuestion {
  id: string;
  archetype: DrillArchetype;
  archetypeLabel: string;
  sourceQuestionId: string;
  sourceTitle: string;
  variationNumber: number;
  question: QuestionItem;
  quickCheckLabel: string;
  acceptableAnswers: string[];
  answerPlaceholder: string;
  quickChoices?: string[];
}

export const ARCHETYPE_LABELS: Record<DrillArchetype, string> = {
  'vertical-line-test': 'Function vs Non-function',
  'function-eval': 'Function Evaluation & Substitution',
  'unknown-coeff-single': 'Finding Unknown Coefficients',
  'unknown-coeff-two-points': 'Two-Point Fitting & Vertical Shift',
  'solve-func-eq': 'Solving Functional Equations',
  'linear-intercepts': 'Linear Graph, Intercepts & Area',
  'quadratic-features': 'Quadratic Graph Features',
  'discriminant-range': 'Discriminant & x-intercept Conditions',
  'vertex-form': 'Vertex Form Properties',
  'completing-square': 'Completing the Square',
  'optimization-geometry': 'Quadratic Optimization',
  'ch3-line-forms': 'Equations of Straight Lines',
  'ch3-general-form': 'General Form: Slope & Intercepts',
  'ch3-parallel-perp': 'Parallel & Perpendicular Lines',
  'ch3-inclination': 'Inclination & Slope Angles',
  'ch3-intersections': 'Intersections of Straight Lines',
  'ch3-triangle-geometry': 'Perpendicular Bisectors, Centres & Area',
};

const CH3_EXERCISE_IDS = new Set<ExerciseId>([
  'ex3_1',
  'ex3_2',
  'ex3_3',
  'ch3_check_yourself',
  'ch3_revision',
  'ch3_mcq',
  'ch3_exam_zone',
]);

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length) % items.length];
}

function formatCoeffTerm(coeff: number, variable: string, isFirst: boolean): string {
  if (coeff === 0) return '';
  const abs = Math.abs(coeff);
  const sign = coeff < 0 ? (isFirst ? '-' : ' - ') : isFirst ? '' : ' + ';
  if (!variable) {
    return `${sign}${abs}`;
  }
  const mag = abs === 1 ? '' : String(abs);
  return `${sign}${mag}${variable}`;
}

export function formatQuadraticPoly(a: number, b: number, c: number, varName = 'x'): string {
  const parts: string[] = [];
  if (a !== 0) {
    parts.push(formatCoeffTerm(a, `${varName}²`, true));
  }
  if (b !== 0) {
    parts.push(formatCoeffTerm(b, varName, parts.length === 0));
  }
  if (c !== 0 || parts.length === 0) {
    parts.push(formatCoeffTerm(c, '', parts.length === 0));
  }
  return parts.join('');
}

export function formatLinearPoly(m: number, c: number, varName = 'x'): string {
  const parts: string[] = [];
  if (m !== 0) {
    parts.push(formatCoeffTerm(m, varName, true));
  }
  if (c !== 0 || parts.length === 0) {
    parts.push(formatCoeffTerm(c, '', parts.length === 0));
  }
  return parts.join('');
}

export function formatVertexForm(a: number, h: number, k: number): string {
  const lead = a === 1 ? '' : a === -1 ? '-' : String(a);
  const inner =
    h === 0 ? 'x²' : h > 0 ? `(x - ${h})²` : `(x + ${Math.abs(h)})²`;
  const tail = k === 0 ? '' : k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
  return `${lead}${inner}${tail}`;
}

export function classifyQuestionArchetype(q: QuestionItem): DrillArchetype {
  const topicLower = q.topic.toLowerCase();
  const stmtLower = q.statement.toLowerCase();

  // Chapter 3: Equations of Straight Lines (classify strictly into straight-line archetypes)
  if (CH3_EXERCISE_IDS.has(q.exerciseId)) {
    if (
      topicLower.includes('bisector') ||
      topicLower.includes('median') ||
      topicLower.includes('altitude') ||
      topicLower.includes('orthocentre') ||
      topicLower.includes('circumcentre') ||
      topicLower.includes('centroid') ||
      topicLower.includes('rhombus') ||
      topicLower.includes('equidistant') ||
      topicLower.includes('area') ||
      stmtLower.includes('perpendicular bisector') ||
      stmtLower.includes('orthocentre') ||
      stmtLower.includes('circumcentre')
    ) {
      return 'ch3-triangle-geometry';
    }
    if (
      topicLower.includes('inclination') ||
      stmtLower.includes('inclination')
    ) {
      return 'ch3-inclination';
    }
    if (
      q.exerciseId === 'ex3_3' ||
      topicLower.includes('intersection') ||
      topicLower.includes('concurrent') ||
      topicLower.includes('coincident') ||
      stmtLower.includes('points of intersection') ||
      stmtLower.includes('intersect at')
    ) {
      return 'ch3-intersections';
    }
    if (
      topicLower.includes('parallel') ||
      topicLower.includes('perpendicular') ||
      stmtLower.includes('parallel to') ||
      stmtLower.includes('perpendicular to')
    ) {
      return 'ch3-parallel-perp';
    }
    if (
      q.exerciseId === 'ex3_2' ||
      topicLower.includes('general form') ||
      topicLower.includes('slope & intercept') ||
      topicLower.includes('graphical') ||
      topicLower.includes('constants')
    ) {
      return 'ch3-general-form';
    }
    return 'ch3-line-forms';
  }

  if (q.visual.kind === 'vertical-line-test' || topicLower.includes('function vs non-function')) {
    return 'vertical-line-test';
  }
  if (q.visual.kind === 'geometry-lab' || topicLower.includes('optimization') || topicLower.includes('max height') || topicLower.includes('cost minimization')) {
    return 'optimization-geometry';
  }
  if (
    q.visual.kind === 'completing-square' ||
    topicLower.includes('completing the square') ||
    topicLower.includes('completing square')
  ) {
    return 'completing-square';
  }
  if (
    q.visual.kind === 'discriminant-explorer' ||
    topicLower.includes('discriminant') ||
    topicLower.includes('tangent') ||
    stmtLower.includes('cut the x-axis') ||
    stmtLower.includes('touch the x-axis') ||
    stmtLower.includes('touches the x-axis')
  ) {
    if (
      topicLower.includes('vertical shift') ||
      (stmtLower.includes('passing through') && stmtLower.includes('('))
    ) {
      return 'unknown-coeff-two-points';
    }
    return 'discriminant-range';
  }
  if (topicLower.includes('vertex form')) {
    return 'vertex-form';
  }
  if (
    topicLower.includes('vertical shift') ||
    topicLower.includes('simultaneous') ||
    topicLower.includes('symmetric quadratic constants') ||
    (stmtLower.includes('passing through') && stmtLower.includes('and ('))
  ) {
    return 'unknown-coeff-two-points';
  }
  if (
    topicLower.includes('linear') ||
    topicLower.includes('intercepts & sketching') ||
    topicLower.includes('two intercepts') ||
    topicLower.includes('slope & x-intercept')
  ) {
    return 'linear-intercepts';
  }
  if (
    topicLower.includes('solving') ||
    topicLower.includes('graphical solution') ||
    topicLower.includes('finding independent variable') ||
    topicLower.includes('roots')
  ) {
    return 'solve-func-eq';
  }
  if (
    topicLower.includes('unknown') ||
    topicLower.includes('eliminating constant') ||
    topicLower.includes('equal outputs') ||
    topicLower.includes('symmetry shortcut')
  ) {
    return 'unknown-coeff-single';
  }
  if (
    q.visual.kind === 'function-machine' ||
    topicLower.includes('evaluation') ||
    topicLower.includes('substitution') ||
    topicLower.includes('function values') ||
    topicLower.includes('operations on function') ||
    topicLower.includes('two-function') ||
    topicLower.includes('function difference') ||
    topicLower.includes('function sum') ||
    topicLower.includes('dummy variable')
  ) {
    return 'function-eval';
  }
  return 'quadratic-features';
}

function makeDrillQuestionItem(params: {
  id: string;
  exerciseId: ExerciseId;
  level: QuestionLevel;
  topic: string;
  statement: string;
  parts: QuestionPart[];
  visual: VisualConfig;
  variationNumber: number;
}): QuestionItem {
  return {
    id: params.id,
    exerciseId: params.exerciseId,
    number: `Drill #${params.variationNumber}`,
    page: 'Similar Practice',
    level: params.level,
    topic: params.topic,
    statement: params.statement,
    parts: params.parts,
    visual: params.visual,
  };
}

export function generateDrillQuestion(
  source: QuestionItem,
  seed: number,
  variationNumber = 1
): DrillQuestion {
  const rng = mulberry32(seed);
  const archetype = classifyQuestionArchetype(source);
  const archetypeLabel = ARCHETYPE_LABELS[archetype];
  const sourceTitle = `${source.number} (${source.topic})`;
  const id = `drill-${source.id}-${variationNumber}-${Math.abs(seed % 10000)}`;

  switch (archetype) {
    case 'vertical-line-test': {
      const scenarios = [
        () => {
          const m = pick(rng, [-3, -2, 2, 3, 4]);
          const c = pick(rng, [-5, -3, -1, 1, 3, 5]);
          const eq = `y = ${formatLinearPoly(m, c)}`;
          return {
            eq,
            isFn: true,
            curve: { kind: 'linear' as const, m, c, label: eq, color: '#0284c7' },
            testX: 2,
            reason: `For every real x, y has only one value ${m}(x) ${c >= 0 ? '+' : '-'} ${Math.abs(c)}.`,
            step1Math: `x = 1 ⇒ y = ${m + c} (unique)`,
            step1Exp: 'Each input x produces exactly one output y.',
            xRange: [-6, 6] as [number, number],
            yRange: [-12, 12] as [number, number],
          };
        },
        () => {
          const m = pick(rng, [2, 3, 4, 5]);
          const eq = `y² = ${m}x (x ≥ 0)`;
          const ySample = Math.round(Math.sqrt(m * 4) * 100) / 100;
          const exactSqrt = Number.isInteger(Math.sqrt(m * 4))
            ? String(Math.sqrt(m * 4))
            : `√${m * 4}`;
          return {
            eq,
            isFn: false,
            curve: { kind: 'relation-y2' as const, m, c: 0, label: `y² = ${m}x`, color: '#e11d48' },
            testX: 2,
            reason: `When x = 4, y² = ${m * 4} gives two y-values: y = ±${Number.isInteger(Math.sqrt(m * 4)) ? Math.sqrt(m * 4) : ySample.toFixed(2)}.`,
            step1Math: `x = 4 ⇒ y² = ${m * 4} ⇒ y = +${exactSqrt} or -${exactSqrt}`,
            step1Exp: 'One input x corresponds to TWO values of y, violating uniqueness.',
            xRange: [-1, 8] as [number, number],
            yRange: [-8, 8] as [number, number],
          };
        },
        () => {
          const a = pick(rng, [-2, -1, 1, 2]);
          const b = pick(rng, [-3, -1, 2, 4]);
          const eq = `y = ${formatQuadraticPoly(a, 0, b)}`;
          const sample = a * 4 + b;
          return {
            eq,
            isFn: true,
            curve: { kind: 'quadratic' as const, a, b: 0, c: b, label: eq, color: '#0284c7' },
            testX: 2,
            reason: `Any vertical line cuts the parabola y = ${formatQuadraticPoly(a, 0, b)} at most once.`,
            step1Math: `x = 2 ⇒ y = ${a}(4) ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${sample} (unique)`,
            step1Exp: 'Squaring x still produces a single unique value of y for each x.',
            xRange: [-5, 5] as [number, number],
            yRange: [-10, 12] as [number, number],
          };
        },
      ];
      const chosen = pick(rng, scenarios)();
      const ansWord = chosen.isFn ? 'Yes' : 'No';
      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Is y a function of x? (Yes / No)',
        acceptableAnswers: chosen.isFn ? ['yes', 'y is a function of x', 'function'] : ['no', 'y is not a function of x', 'not a function'],
        answerPlaceholder: 'Yes or No',
        quickChoices: ['Yes', 'No'],
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `In the relation below, x and y are real numbers. Is y a function of x? ${chosen.eq}`,
          parts: [
            {
              label: 'Main',
              prompt: `Determine whether ${chosen.eq} defines y as a function of x.`,
              strategy: 'Test whether each allowed x gives exactly one y (Vertical Line Test).',
              steps: [
                {
                  title: 'Check uniqueness of y for a sample x',
                  math: chosen.step1Math,
                  explanation: chosen.step1Exp,
                },
                {
                  title: 'Apply Vertical Line Test',
                  math: chosen.isFn
                    ? 'Every vertical line cuts the graph at most once ⇒ Yes'
                    : 'A vertical line x > 0 cuts the graph twice ⇒ No',
                  explanation: chosen.reason,
                },
              ],
              answer: `${ansWord} (${chosen.isFn ? 'y is a function of x' : 'y is not a function of x'})`,
            },
          ],
          visual: {
            kind: 'vertical-line-test',
            title: chosen.eq,
            curve: chosen.curve,
            xRange: chosen.xRange,
            yRange: chosen.yRange,
            isFunction: chosen.isFn,
            defaultTestX: chosen.testX,
            reason: chosen.reason,
          },
        }),
      };
    }

    case 'function-eval': {
      const a = pick(rng, [-2, -1, 1, 2, 3]);
      const b = pick(rng, [-4, -3, -2, 1, 2, 3, 4]);
      const c = pick(rng, [-5, -2, 1, 3, 4, 6]);
      const x1 = pick(rng, [-3, -2, -1, 1, 2, 3]);
      const x2 = pick(rng, [0, 1, 2, -1].filter((v) => v !== x1));
      const fStr = formatQuadraticPoly(a, b, c);
      const y1 = a * x1 * x1 + b * x1 + c;
      const y2 = a * x2 * x2 + b * x2 + c;
      const diff = y1 - y2;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: `Enter Part (a) f(${x1})`,
        acceptableAnswers: [String(y1)],
        answerPlaceholder: `e.g. ${y1}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Let f(x) = ${fStr}. Find (a) f(${x1}); (b) f(${x1}) - f(${x2}).`,
          parts: [
            {
              label: '(a)',
              prompt: `Evaluate f(${x1}).`,
              strategy: `Substitute x = ${x1} carefully using brackets around negative numbers.`,
              steps: [
                {
                  title: `Substitute x = ${x1}`,
                  math: `f(${x1}) = ${a}(${x1})² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}(${x1}) ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`,
                  explanation: 'Replace every x in the formula with the given input.',
                },
                {
                  title: 'Simplify arithmetic',
                  math: `f(${x1}) = ${a * x1 * x1} ${b * x1 >= 0 ? '+' : '-'} ${Math.abs(b * x1)} ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${y1}`,
                  explanation: `So the output at x = ${x1} is ${y1}.`,
                },
              ],
              answer: String(y1),
            },
            {
              label: '(b)',
              prompt: `Find f(${x1}) - f(${x2}).`,
              strategy: `First compute f(${x2}), then subtract from f(${x1}) = ${y1}.`,
              steps: [
                {
                  title: `Evaluate f(${x2})`,
                  math: `f(${x2}) = ${a}(${x2})² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}(${x2}) ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${y2}`,
                  explanation: 'Evaluate the second function value.',
                },
                {
                  title: 'Subtract the two outputs',
                  math: `f(${x1}) - f(${x2}) = ${y1} - (${y2}) = ${diff}`,
                  explanation: 'Combine the two values carefully.',
                },
              ],
              answer: String(diff),
            },
          ],
          visual: {
            kind: 'function-machine',
            title: `f(x) = ${fStr}`,
            formulaText: `f(x) = ${fStr}`,
            curve: { kind: 'quadratic', a, b, c, label: `f(x) = ${fStr}`, color: '#0284c7' },
            evalPoints: [
              { x: x1, label: `(${x1}, ${y1})`, color: '#10b981' },
              { x: x2, label: `(${x2}, ${y2})`, color: '#8b5cf6' },
            ],
            xRange: [-5, 5],
            yRange: [Math.min(-10, y1 - 4, y2 - 4), Math.max(12, y1 + 4, y2 + 4)],
            defaultX: x1,
          },
        }),
      };
    }

    case 'unknown-coeff-single': {
      const a = pick(rng, [-2, -1, 1, 2]);
      const k = pick(rng, [-5, -4, -3, -2, 2, 3, 4, 5]);
      const c = pick(rng, [-6, -3, -1, 2, 4, 5]);
      const x1 = pick(rng, [-2, -1, 1, 2, 3]);
      const x2 = pick(rng, [-3, -1, 2, 3].filter((v) => v !== x1));
      const y1 = a * x1 * x1 + k * x1 + c;
      const y2 = a * x2 * x2 + k * x2 + c;
      const kxSign = '+';
      const cTerm = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
      const aTerm = a === 1 ? 'x²' : a === -1 ? '-x²' : `${a}x²`;
      const formulaDisplay = `${aTerm} ${kxSign} kx ${cTerm}`;
      const solvedFormula = formatQuadraticPoly(a, k, c);

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the value of k',
        acceptableAnswers: [String(k), `k=${k}`, `k = ${k}`],
        answerPlaceholder: `e.g. ${k}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Let f(x) = ${formulaDisplay}, where k is a constant. If f(${x1}) = ${y1}, find (a) the value of k; (b) f(${x2}).`,
          parts: [
            {
              label: '(a)',
              prompt: `Find the value of k given f(${x1}) = ${y1}.`,
              strategy: `Substitute x = ${x1} into f(x) and equate the expression to ${y1}.`,
              steps: [
                {
                  title: `Substitute x = ${x1} into f(x)`,
                  math: `f(${x1}) = ${a}(${x1})² + k(${x1}) ${cTerm} = ${y1}`,
                  explanation: 'Replace x with the given input.',
                },
                {
                  title: 'Solve linear equation for k',
                  math: `${a * x1 * x1 + c} + (${x1})k = ${y1} ⇒ ${x1}k = ${k * x1} ⇒ k = ${k}`,
                  explanation: `Dividing both sides by ${x1} yields k = ${k}.`,
                },
              ],
              answer: String(k),
            },
            {
              label: '(b)',
              prompt: `Find f(${x2}).`,
              strategy: `Write the complete function f(x) = ${solvedFormula}, then substitute x = ${x2}.`,
              steps: [
                {
                  title: `Substitute k = ${k} and x = ${x2}`,
                  math: `f(${x2}) = ${a}(${x2})² ${k >= 0 ? '+' : '-'} ${Math.abs(k)}(${x2}) ${cTerm} = ${y2}`,
                  explanation: `So f(${x2}) evaluates to ${y2}.`,
                },
              ],
              answer: String(y2),
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `f(x) = ${solvedFormula}`,
            curves: [{ kind: 'quadratic', a, b: k, c, label: `f(x) = ${solvedFormula}`, color: '#0284c7' }],
            points: [
              { x: x1, y: y1, label: `(${x1}, ${y1})`, color: '#10b981' },
              { x: x2, y: y2, label: `(${x2}, ${y2})`, color: '#8b5cf6' },
            ],
            xRange: [-5, 5],
            yRange: [Math.min(-12, y1 - 5, y2 - 5), Math.max(12, y1 + 5, y2 + 5)],
          },
        }),
      };
    }

    case 'unknown-coeff-two-points': {
      const a = pick(rng, [-3, -2, -1, 2]);
      const b = pick(rng, [6, 9, 12, 15, -6, -9]);
      const x1 = 1;
      const x2 = pick(rng, [-3, -4, -2]);
      const y1 = a * x1 * x1 + x1 + b;
      const y2 = a * x2 * x2 + x2 + b;
      const wantTwoRoots = rng() > 0.5;
      // Vertex of f(x) = ax^2 + x + b has y_v = b - 1/(4a)
      // If a < 0, f opens downwards. Shifting down by d makes max < 0 (no roots) if d > b + 2, or shifting up makes > 0.
      const shift = a < 0 ? (wantTwoRoots ? 2 : Math.abs(b) + 5) : wantTwoRoots ? Math.abs(b) + 6 : 2;
      const gConst = b - shift;
      const discG = 1 - 4 * a * gConst;
      const hasTwoRoots = discG > 0;
      const fFormula = formatQuadraticPoly(a, 1, b);
      const gFormula = formatQuadraticPoly(a, 1, gConst);
      const diffA = x2 * x2 - x1 * x1;
      const diffY = y2 - y1 - (x2 - x1);

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter Part (a) f(0)',
        acceptableAnswers: [String(b)],
        answerPlaceholder: `e.g. ${b}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Let f(x) = ax² + x + b passing through (${x1}, ${y1}) and (${x2}, ${y2}). (a) Find f(0). (b) Let G be y = f(x) - ${shift}. Find: (i) y-intercept of G; (ii) whether G cuts the x-axis at two distinct points.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Find a, b and f(0).',
              strategy: `Substitute (${x1}, ${y1}) and (${x2}, ${y2}) into f(x) = ax² + x + b and solve simultaneously.`,
              steps: [
                {
                  title: 'Form two linear equations in a and b',
                  math: `a + 1 + b = ${y1} ⇒ a + b = ${y1 - 1}; ${x2 * x2}a ${x2 < 0 ? '-' : '+'} ${Math.abs(x2)} + b = ${y2} ⇒ ${x2 * x2}a + b = ${y2 - x2}`,
                  explanation: 'Subtract the first equation from the second to eliminate b.',
                },
                {
                  title: 'Solve for a, b and evaluate f(0)',
                  math: `${diffA}a = ${diffY} ⇒ a = ${a}; b = ${b} ⇒ f(0) = b = ${b}`,
                  explanation: `So f(x) = ${fFormula}, giving f(0) = ${b}.`,
                },
              ],
              answer: String(b),
            },
            {
              label: '(b)',
              prompt: `Analyze G: y = ${gFormula}.`,
              strategy: `Shift f(x) downwards by ${shift} units to obtain G, then test Δ = b² - 4ac.`,
              steps: [
                {
                  title: '(i) Find y-intercept of G',
                  math: `y = f(0) - ${shift} = ${b} - ${shift} = ${gConst}`,
                  explanation: `Shifting down by ${shift} lowers the y-intercept from ${b} to ${gConst}.`,
                },
                {
                  title: `(ii) Check discriminant of ${gFormula} = 0`,
                  math: `Δ = 1² - 4(${a})(${gConst}) = 1 - (${4 * a * gConst}) = ${discG} ${discG > 0 ? '> 0' : '< 0'}`,
                  explanation: hasTwoRoots
                    ? 'Since Δ > 0, G cuts the x-axis at two distinct points (Agree).'
                    : 'Since Δ < 0, G has no real x-intercepts and does not cut the x-axis (Disagree).',
                },
              ],
              answer: `(i) ${gConst}; (ii) ${hasTwoRoots ? 'yes (two distinct points)' : 'no (does not cut x-axis)'}`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `f(x) = ${fFormula} vs G = f(x) - ${shift}`,
            curves: [
              { kind: 'quadratic', a, b: 1, c: b, label: 'f(x)', color: '#0284c7' },
              { kind: 'quadratic', a, b: 1, c: gConst, label: `G = f(x) - ${shift}`, color: '#9333ea', dashed: true },
            ],
            points: [
              { x: x1, y: y1, label: `(${x1}, ${y1})`, color: '#10b981' },
              { x: x2, y: y2, label: `(${x2}, ${y2})`, color: '#10b981' },
            ],
            xRange: [-5, 4],
            yRange: [Math.min(-35, y2 - 4, gConst - 8), Math.max(20, y1 + 5, b + 5)],
          },
        }),
      };
    }

    case 'solve-func-eq': {
      const a = pick(rng, [1, -1, 2]);
      const r1 = pick(rng, [-4, -3, -2, -1, 0, 1]);
      const r2 = pick(rng, [r1 + 2, r1 + 3, r1 + 4, r1 + 5]);
      const target = pick(rng, [-3, 1, 2, 4, 5]);
      // f(x) = a(x - r1)(x - r2) + target
      const b = -a * (r1 + r2);
      const c = a * r1 * r2 + target;
      const cEq = c - target;
      const fStr = formatQuadraticPoly(a, b, c);
      const eqLeft = formatQuadraticPoly(a, b, cEq);

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the roots (comma-separated)',
        acceptableAnswers: [`${r1}, ${r2}`, `${r2}, ${r1}`, `${r1},${r2}`],
        answerPlaceholder: `e.g. ${r1}, ${r2}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Let f(x) = ${fStr}. Solve the equation f(x) = ${target}.`,
          parts: [
            {
              label: 'Main',
              prompt: `Solve ${fStr} = ${target} for x.`,
              strategy: 'Move all terms to one side so the right-hand side is 0, then factorize.',
              steps: [
                {
                  title: `Set f(x) = ${target}`,
                  math: `${fStr} = ${target} ⇒ ${eqLeft} = 0`,
                  explanation: `Subtract ${target} from both sides.`,
                },
                {
                  title: 'Factorize and solve',
                  math: `${a === 1 ? '' : a === -1 ? '-' : `${a}`}(x ${r1 >= 0 ? `- ${r1}` : `+ ${Math.abs(r1)}`})(x ${r2 >= 0 ? `- ${r2}` : `+ ${Math.abs(r2)}`}) = 0 ⇒ x = ${r1} or x = ${r2}`,
                  explanation: `Setting each factor to zero gives the solutions x = ${r1}, ${r2}.`,
                },
              ],
              answer: `${r1}, ${r2}`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `Solve f(x) = ${target}`,
            curves: [
              { kind: 'quadratic', a, b, c, label: `y = f(x)`, color: '#0284c7' },
              { kind: 'linear', m: 0, c: target, label: `y = ${target}`, color: '#e11d48', dashed: true },
            ],
            points: [
              { x: r1, y: target, label: `(${r1}, ${target})`, color: '#10b981' },
              { x: r2, y: target, label: `(${r2}, ${target})`, color: '#10b981' },
            ],
            xRange: [Math.min(-6, r1 - 2), Math.max(6, r2 + 2)],
            yRange: [Math.min(-8, target - 6), Math.max(10, target + 8)],
          },
        }),
      };
    }

    case 'linear-intercepts': {
      const m = pick(rng, [-3, -2, -1, 2, 3]);
      const xInt = pick(rng, [-5, -4, -3, -2, 2, 3, 4, 5]);
      const yInt = -m * xInt;
      const lineStr = formatLinearPoly(m, yInt);
      const area = (Math.abs(xInt) * Math.abs(yInt)) / 2;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter Part (a) x-intercept',
        acceptableAnswers: [String(xInt)],
        answerPlaceholder: `e.g. ${xInt}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Consider the linear function y = ${lineStr}. Find (a) the x-intercept and y-intercept of its graph; (b) the area of the triangle bounded by the graph and the two coordinate axes.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Find the x-intercept and y-intercept.',
              strategy: 'Set y = 0 to find the x-intercept, and set x = 0 to find the y-intercept.',
              steps: [
                {
                  title: 'Find the x-intercept (put y = 0)',
                  math: `0 = ${lineStr} ⇒ x = ${xInt}`,
                  explanation: `The graph cuts the x-axis at (${xInt}, 0), so the x-intercept is ${xInt}.`,
                },
                {
                  title: 'Find the y-intercept (put x = 0)',
                  math: `y = ${m}(0) ${yInt >= 0 ? '+' : '-'} ${Math.abs(yInt)} = ${yInt}`,
                  explanation: `The graph cuts the y-axis at (0, ${yInt}), so the y-intercept is ${yInt}.`,
                },
              ],
              answer: `x-intercept = ${xInt}, y-intercept = ${yInt}`,
            },
            {
              label: '(b)',
              prompt: 'Find the area of the triangle formed with the axes.',
              strategy: 'Use Area = (1/2) × |x-intercept| × |y-intercept|.',
              steps: [
                {
                  title: 'Apply triangle area formula',
                  math: `Area = (1/2) × |${xInt}| × |${yInt}| = (1/2) × ${Math.abs(xInt)} × ${Math.abs(yInt)} = ${area}`,
                  explanation: 'Lengths of legs along the axes must be positive.',
                },
              ],
              answer: `${area} sq. units`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `y = ${lineStr}`,
            curves: [{ kind: 'linear', m, c: yInt, label: `y = ${lineStr}`, color: '#0284c7' }],
            points: [
              { x: xInt, y: 0, label: `(${xInt}, 0)`, color: '#dc2626' },
              { x: 0, y: yInt, label: `(0, ${yInt})`, color: '#10b981' },
            ],
            polygons: [
              {
                points: [
                  { x: 0, y: 0 },
                  { x: xInt, y: 0 },
                  { x: 0, y: yInt },
                ],
                fill: 'rgba(14, 165, 233, 0.22)',
                stroke: '#0ea5e9',
                label: `Area = ${area}`,
              },
            ],
            xRange: [Math.min(-6, xInt - 2), Math.max(6, xInt + 2)],
            yRange: [Math.min(-8, yInt - 2), Math.max(8, yInt + 2)],
          },
        }),
      };
    }

    case 'quadratic-features': {
      const a = pick(rng, [-2, -1, 1, 2]);
      const r1 = pick(rng, [-5, -4, -3, -2, -1, 0, 1]);
      // Keep r1 + r2 even so axis of symmetry h = (r1 + r2) / 2 is integer
      const step = pick(rng, [2, 4, 6]);
      const r2 = r1 + step;
      const b = -a * (r1 + r2);
      const c = a * r1 * r2;
      const h = (r1 + r2) / 2;
      const k = a * h * h + b * h + c;
      const poly = formatQuadraticPoly(a, b, c);
      const opening = a > 0 ? 'upwards' : 'downwards';

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the axis of symmetry (e.g. x = 2)',
        acceptableAnswers: [`x=${h}`, `x = ${h}`, String(h)],
        answerPlaceholder: `e.g. x = ${h}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `For the quadratic graph y = ${poly}, find (a) the direction of opening and y-intercept; (b) the x-intercepts, axis of symmetry, and coordinates of the vertex.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Find the opening direction and y-intercept.',
              strategy: 'Check the sign of coefficient a (x² term), and substitute x = 0.',
              steps: [
                {
                  title: 'Check sign of a and put x = 0',
                  math: `a = ${a} ${a > 0 ? '> 0' : '< 0'} (opens ${opening}); x = 0 ⇒ y = ${c}`,
                  explanation: `Since a = ${a}, the parabola opens ${opening} with y-intercept ${c}.`,
                },
              ],
              answer: `opens ${opening}; y-intercept = ${c}`,
            },
            {
              label: '(b)',
              prompt: 'Find x-intercepts, axis of symmetry, and vertex.',
              strategy: 'Factorize to find the roots r₁, r₂; then use symmetry x = (r₁ + r₂)/2.',
              steps: [
                {
                  title: 'Find x-intercepts (put y = 0)',
                  math: `${poly} = 0 ⇒ x = ${r1} or x = ${r2}`,
                  explanation: `The x-intercepts are ${r1} and ${r2}.`,
                },
                {
                  title: 'Find axis of symmetry and vertex',
                  math: `x = (${r1} + ${r2})/2 = ${h}; y = ${a}(${h})² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}(${h}) ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${k}`,
                  explanation: `Axis of symmetry is x = ${h}, and vertex is (${h}, ${k}).`,
                },
              ],
              answer: `x-intercepts: ${r1}, ${r2}; axis: x = ${h}; vertex: (${h}, ${k})`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `y = ${poly}`,
            curves: [{ kind: 'quadratic', a, b, c, label: `y = ${poly}`, color: '#0284c7' }],
            showAxisOfSymmetry: h,
            showVertex: { x: h, y: k, label: `Vertex (${h}, ${k})` },
            showRoots: [r1, r2],
            xRange: [Math.min(-6, r1 - 2), Math.max(6, r2 + 2)],
            yRange: [Math.min(-12, k - 4, c - 2), Math.max(12, k + 4, c + 2)],
          },
        }),
      };
    }

    case 'discriminant-range': {
      const a = pick(rng, [1, 2, -1]);
      const halfB = pick(rng, [-4, -3, -2, 2, 3, 4]);
      const b = 2 * a * halfB; // so b² / (4a) = a * halfB² is guaranteed exact integer!
      const bSqOver4a = a * halfB * halfB;
      const cOffset = pick(rng, [-3, -2, -1, 1, 2, 3]);
      const kTangent = bSqOver4a - cOffset;
      const mode = pick(rng, ['tangent', 'two-roots', 'no-roots'] as const);
      const conditionText =
        mode === 'tangent'
          ? 'touches the x-axis at one point'
          : mode === 'two-roots'
            ? 'cuts the x-axis at two distinct points'
            : 'does not intersect the x-axis';
      const discOp = mode === 'tangent' ? '= 0' : mode === 'two-roots' ? '> 0' : '< 0';
      const kOp =
        mode === 'tangent'
          ? '='
          : a > 0
            ? mode === 'two-roots'
              ? '<'
              : '>'
            : mode === 'two-roots'
              ? '>'
              : '<';
      const ansStr = mode === 'tangent' ? `${kTangent}` : `k ${kOp} ${kTangent}`;
      const cExprStr = cOffset >= 0 ? `(k + ${cOffset})` : `(k - ${Math.abs(cOffset)})`;
      const aTerm = a === 1 ? 'x²' : a === -1 ? '-x²' : `${a}x²`;
      const bTerm = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
      const formulaDisplay = `${aTerm} ${bTerm} + ${cExprStr}`;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel:
          mode === 'tangent' ? 'Enter the value of k' : 'Enter the range of k (e.g. k < 4)',
        acceptableAnswers:
          mode === 'tangent'
            ? [String(kTangent), `k=${kTangent}`, `k = ${kTangent}`]
            : [`k${kOp}${kTangent}`, `k ${kOp} ${kTangent}`],
        answerPlaceholder: ansStr,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `The graph of y = ${formulaDisplay} ${conditionText}. Find ${mode === 'tangent' ? 'the value' : 'the range of values'} of k.`,
          parts: [
            {
              label: 'Main',
              prompt: `Use Δ = b² - 4ac ${discOp} to find k.`,
              strategy: `Identify a = ${a}, b = ${b}, c = k ${cOffset >= 0 ? `+ ${cOffset}` : `- ${Math.abs(cOffset)}`}, then set Δ ${discOp}.`,
              steps: [
                {
                  title: 'Form discriminant expression',
                  math: `Δ = (${b})² - 4(${a})${cExprStr} = ${b * b} - ${4 * a}${cExprStr}`,
                  explanation: `Recall that ${conditionText} corresponds to Δ ${discOp}.`,
                },
                {
                  title: 'Solve inequality / equation for k',
                  math: `${b * b} - ${4 * a * cOffset} - ${4 * a}k ${discOp} ⇒ ${ansStr}`,
                  explanation: `Simplifying gives the exact condition ${ansStr}.`,
                },
              ],
              answer: ansStr,
            },
          ],
          visual: {
            kind: 'discriminant-explorer',
            title: `y = ${formulaDisplay}`,
            paramName: 'k',
            min: kTangent - 6,
            max: kTangent + 6,
            step: 0.5,
            defaultVal: kTangent,
            aCoeff: [a, 0],
            bCoeff: [b, 0],
            cCoeff: [cOffset, 1],
            displayFormula: `y = ${formulaDisplay}`,
            conditionLabel: conditionText,
            xRange: [-6, 6],
            yRange: [-12, 14],
          },
        }),
      };
    }

    case 'vertex-form': {
      const a = pick(rng, [-3, -2, -1, 1, 2, 3]);
      const h = pick(rng, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
      const k = pick(rng, [-8, -5, -3, 2, 4, 6, 9]);
      const vStr = formatVertexForm(a, h, k);
      const yInt = a * h * h + k;
      const optLabel = a > 0 ? 'min. value' : 'max. value';
      const opening = a > 0 ? 'upwards' : 'downwards';
      const bExp = -2 * a * h;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the vertex coordinates (e.g. (2, -5))',
        acceptableAnswers: [`(${h}, ${k})`, `(${h},${k})`, `${h},${k}`, `${h}, ${k}`],
        answerPlaceholder: `(${h}, ${k})`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `For y = ${vStr}, find (a) the direction of opening, axis of symmetry, and vertex; (b) the ${optLabel} and y-intercept.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Read opening direction, axis of symmetry, and vertex.',
              strategy: 'Compare directly with vertex form y = a(x - h)² + k.',
              steps: [
                {
                  title: 'Identify a, h, and k',
                  math: `a = ${a} ${a > 0 ? '> 0' : '< 0'}, h = ${h}, k = ${k}`,
                  explanation: `Opens ${opening}; axis of symmetry is x = ${h}; vertex is (${h}, ${k}).`,
                },
              ],
              answer: `opens ${opening}; x = ${h}; (${h}, ${k})`,
            },
            {
              label: '(b)',
              prompt: `Find the ${optLabel} and y-intercept.`,
              strategy: `The optimum value is k = ${k}. Substitute x = 0 to find the y-intercept.`,
              steps: [
                {
                  title: 'State optimum value and compute y-intercept',
                  math: `${optLabel} = ${k}; x = 0 ⇒ y = ${a}(0 - (${h}))² ${k >= 0 ? '+' : '-'} ${Math.abs(k)} = ${yInt}`,
                  explanation: `So the ${optLabel} is ${k} and the y-intercept is ${yInt}.`,
                },
              ],
              answer: `${optLabel} = ${k}; y-intercept = ${yInt}`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `y = ${vStr}`,
            curves: [{ kind: 'quadratic', a, b: bExp, c: yInt, label: `y = ${vStr}`, color: '#0284c7' }],
            showAxisOfSymmetry: h,
            showVertex: { x: h, y: k, label: `Vertex (${h}, ${k})` },
            points: [{ x: 0, y: yInt, label: `(0, ${yInt})`, color: '#10b981' }],
            xRange: [h - 5, h + 5],
            yRange: [Math.min(-6, k - 4, yInt - 2), Math.max(8, k + 5, yInt + 3)],
          },
        }),
      };
    }

    case 'completing-square': {
      const a = pick(rng, [-2, -1, 1, 2, 3]);
      const h = pick(rng, [-4, -3, -2, -1, 1, 2, 3, 4]);
      const k = pick(rng, [-7, -5, -2, 3, 5, 8]);
      const b = -2 * a * h;
      const c = a * h * h + k;
      const stdPoly = formatQuadraticPoly(a, b, c);
      const vertexStr = formatVertexForm(a, h, k);
      const optLabel = a > 0 ? 'minimum' : 'maximum';
      const bOverA = b / a;
      const halfBOverA = bOverA / 2;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: `Enter the ${optLabel} value`,
        acceptableAnswers: [String(k)],
        answerPlaceholder: `e.g. ${k}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Rewrite y = ${stdPoly} in the form a(x - h)² + k by completing the square, and find (a) the vertex; (b) the ${optLabel} value of y.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Complete the square and state the vertex.',
              strategy:
                a === 1
                  ? 'Add and subtract (b/2)² inside the quadratic.'
                  : `Factor ${a} from the x² and x terms first, then add and subtract (${halfBOverA})² inside.`,
              steps: [
                {
                  title: a === 1 ? 'Group x² and x terms' : `Factor out a = ${a}`,
                  math:
                    a === 1
                      ? `y = (x² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x + (${halfBOverA})²) - (${halfBOverA})² ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`
                      : `y = ${a}[x² ${bOverA >= 0 ? '+' : '-'} ${Math.abs(bOverA)}x + (${halfBOverA})² - (${halfBOverA})²] ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`,
                  explanation: 'Add and subtract the square of half the coefficient of x.',
                },
                {
                  title: 'Simplify into vertex form',
                  math: `y = ${vertexStr} ⇒ vertex = (${h}, ${k})`,
                  explanation: `Comparing with a(x - h)² + k gives vertex (${h}, ${k}).`,
                },
              ],
              answer: `y = ${vertexStr}; vertex (${h}, ${k})`,
            },
            {
              label: '(b)',
              prompt: `State the ${optLabel} value of y.`,
              strategy: `Look at the sign of a = ${a} and the constant k = ${k}.`,
              steps: [
                {
                  title: `Read ${optLabel} value from vertex form`,
                  math: `a = ${a} ${a > 0 ? '> 0' : '< 0'} ⇒ ${optLabel} value = ${k} at x = ${h}`,
                  explanation: `Since (x ${h >= 0 ? `- ${h}` : `+ ${Math.abs(h)}`})² ≥ 0, y reaches its ${optLabel} of ${k} when x = ${h}.`,
                },
              ],
              answer: String(k),
            },
          ],
          visual: {
            kind: 'completing-square',
            title: `y = ${stdPoly}`,
            a,
            b,
            c,
            xRange: [h - 5, h + 5],
            yRange: [Math.min(-6, k - 4), Math.max(10, k + 6)],
          },
        }),
      };
    }

    case 'optimization-geometry': {
      const useProjectile = rng() > 0.5;
      if (useProjectile) {
        const t0 = pick(rng, [2, 3, 4]);
        const h0 = pick(rng, [5, 10, 15, 20]);
        const v0 = 10 * t0;
        const maxH = 5 * t0 * t0 + h0;
        const poly = `-5t² + ${v0}t + ${h0}`;

        return {
          id,
          archetype,
          archetypeLabel,
          sourceQuestionId: source.id,
          sourceTitle,
          variationNumber,
          quickCheckLabel: 'Enter the maximum height (in m)',
          acceptableAnswers: [String(maxH), `${maxH}m`, `${maxH} m`],
          answerPlaceholder: `e.g. ${maxH}`,
          question: makeDrillQuestionItem({
            id,
            exerciseId: source.exerciseId,
            level: source.level,
            topic: archetypeLabel,
            variationNumber,
            statement: `A ball is thrown upwards so its height h m after t seconds is h = ${poly}. Find (a) the time t when it reaches maximum height; (b) the maximum height.`,
            parts: [
              {
                label: '(a)',
                prompt: 'Complete the square in t to find when max height occurs.',
                strategy: 'Factor -5 from the t² and t terms, then complete the square.',
                steps: [
                  {
                    title: 'Factor out -5',
                    math: `h = -5(t² - ${2 * t0}t) + ${h0}`,
                    explanation: 'Always factor out the negative leading coefficient before completing the square.',
                  },
                  {
                    title: 'Complete the square',
                    math: `h = -5(t - ${t0})² + ${5 * t0 * t0} + ${h0} = -5(t - ${t0})² + ${maxH}`,
                    explanation: `The maximum occurs at t = ${t0} s.`,
                  },
                ],
                answer: `${t0} s`,
              },
              {
                label: '(b)',
                prompt: 'State the maximum height.',
                strategy: `Read the constant term k from -5(t - ${t0})² + ${maxH}.`,
                steps: [
                  {
                    title: 'Read max value',
                    math: `max height = ${maxH} m`,
                    explanation: `Since -5(t - ${t0})² ≤ 0, the maximum height is ${maxH} m.`,
                  },
                ],
                answer: `${maxH} m`,
              },
            ],
            visual: {
              kind: 'coordinate',
              title: `h(t) = ${poly}`,
              curves: [{ kind: 'quadratic', a: -5, b: v0, c: h0, label: 'h(t)', color: '#0284c7', domain: [0, 2 * t0 + 1] }],
              showAxisOfSymmetry: t0,
              showVertex: { x: t0, y: maxH, label: `Max (${t0}, ${maxH})` },
              points: [{ x: 0, y: h0, label: `(0, ${h0})`, color: '#10b981' }],
              xRange: [0, 2 * t0 + 2],
              yRange: [0, maxH + 15],
            },
          }),
        };
      }

      // Riverside rectangular fence: total fencing P divisible by 4
      const optW = pick(rng, [6, 8, 10, 12, 15]);
      const totalFence = 4 * optW;
      const maxArea = 2 * optW * optW;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the maximum area (in m²)',
        acceptableAnswers: [String(maxArea), `${maxArea}m²`, `${maxArea} m²`],
        answerPlaceholder: `e.g. ${maxArea}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `${totalFence} m of fencing encloses 3 sides of a rectangular garden against a straight wall. Let x m be the width perpendicular to the wall. (a) Express the area A m² in terms of x; (b) find the maximum area of the garden.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Express Area A in terms of x.',
              strategy: `The side parallel to the wall has length (${totalFence} - 2x) m.`,
              steps: [
                {
                  title: 'Write Area formula',
                  math: `A = x(${totalFence} - 2x) = -2x² + ${totalFence}x`,
                  explanation: 'Area = width × length.',
                },
              ],
              answer: `-2x² + ${totalFence}x`,
            },
            {
              label: '(b)',
              prompt: 'Complete the square to find the maximum area.',
              strategy: 'Factor -2 from -2x² + Px and complete the square.',
              steps: [
                {
                  title: 'Complete the square for A',
                  math: `A = -2(x² - ${2 * optW}x) = -2(x - ${optW})² + ${maxArea}`,
                  explanation: `Maximum area is ${maxArea} m² when width x = ${optW} m.`,
                },
              ],
              answer: `${maxArea} m²`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `Area A(x) = -2x² + ${totalFence}x`,
            curves: [{ kind: 'quadratic', a: -2, b: totalFence, c: 0, label: 'A(x)', color: '#10b981', domain: [0, totalFence / 2] }],
            showAxisOfSymmetry: optW,
            showVertex: { x: optW, y: maxArea, label: `Max (${optW}, ${maxArea})` },
            xRange: [0, totalFence / 2 + 2],
            yRange: [0, maxArea + Math.round(maxArea * 0.15)],
          },
        }),
      };
    }

    case 'ch3-line-forms': {
      const m = pick(rng, [-3, -2, -1, 2, 3, 4]);
      const x1 = pick(rng, [-4, -3, -2, 1, 2, 3]);
      const y1 = pick(rng, [-5, -3, -1, 2, 4, 6]);
      const dx = pick(rng, [2, 3, 4]);
      const x2 = x1 + dx;
      const y2 = y1 + m * dx;
      const c = y1 - m * x1;
      const eq = `y = ${formatLinearPoly(m, c)}`;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the y-intercept of L',
        acceptableAnswers: [String(c), `c=${c}`, `y=${c}`],
        answerPlaceholder: `e.g. ${c}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `A straight line L passes through A(${x1}, ${y1}) and B(${x2}, ${y2}). Find (a) the slope of L; (b) the equation of L in slope-intercept form and its y-intercept.`,
          parts: [
            {
              label: '(a)',
              prompt: `Find the slope of L passing through A(${x1}, ${y1}) and B(${x2}, ${y2}).`,
              strategy: 'Use the slope formula m = (y₂ - y₁)/(x₂ - x₁).',
              steps: [
                {
                  title: 'Compute slope m',
                  math: `m = (${y2} - (${y1}))/(${x2} - (${x1})) = ${y2 - y1}/${dx} = ${m}`,
                  explanation: `The slope of L is ${m}.`,
                },
              ],
              answer: String(m),
            },
            {
              label: '(b)',
              prompt: 'Find the equation of L and its y-intercept.',
              strategy: `Apply point-slope form y - (${y1}) = ${m}(x - (${x1})).`,
              steps: [
                {
                  title: 'Apply point-slope form',
                  math: `y - (${y1}) = ${m}(x - (${x1})) ⇒ ${eq}`,
                  explanation: `Expanding gives ${eq}, so the y-intercept is ${c}.`,
                },
              ],
              answer: `${eq}; y-intercept = ${c}`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: eq,
            curves: [{ kind: 'linear', m, c, label: `L: ${eq}`, color: '#0284c7' }],
            points: [
              { x: x1, y: y1, label: `A(${x1}, ${y1})`, color: '#10b981' },
              { x: x2, y: y2, label: `B(${x2}, ${y2})`, color: '#10b981' },
              { x: 0, y: c, label: `(0, ${c})`, color: '#dc2626' },
            ],
            xRange: [Math.min(-6, x1 - 2), Math.max(6, x2 + 2)],
            yRange: [Math.min(-10, y1 - 3, y2 - 3, c - 2), Math.max(10, y1 + 3, y2 + 3, c + 2)],
          },
        }),
      };
    }

    case 'ch3-general-form': {
      const a = pick(rng, [2, 3, 4, 5]);
      const b = pick(rng, [-5, -4, -3, -2, 2, 3, 4]);
      const xInt = pick(rng, [-6, -4, -3, -2, 2, 3, 4, 6]);
      const c = -a * xInt; // Ax + By + C = 0 has exact x-intercept xInt
      const slopeNum = -a;
      const slopeDen = b;
      const slopeVal = slopeNum / slopeDen;
      const yIntVal = -c / b;
      const bTerm = b >= 0 ? `+ ${b}y` : `- ${Math.abs(b)}y`;
      const cTerm = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
      const eq = `${a}x ${bTerm} ${cTerm} = 0`;
      const yIntDisplay = Number.isInteger(yIntVal) ? String(yIntVal) : `${-c}/${b}`;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the x-intercept of L',
        acceptableAnswers: [String(xInt), `x=${xInt}`],
        answerPlaceholder: `e.g. ${xInt}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Consider the straight line L: ${eq}. Find (a) the x-intercept of L; (b) the slope and y-intercept of L.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Find the x-intercept of L.',
              strategy: 'Substitute y = 0 into the general form equation and solve for x.',
              steps: [
                {
                  title: 'Put y = 0',
                  math: `${a}x ${cTerm} = 0 ⇒ ${a}x = ${-c} ⇒ x = ${xInt}`,
                  explanation: `L cuts the x-axis at (${xInt}, 0), so the x-intercept is ${xInt}.`,
                },
              ],
              answer: String(xInt),
            },
            {
              label: '(b)',
              prompt: 'Find the slope and y-intercept of L.',
              strategy: 'Use slope = -A/B and y-intercept = -C/B.',
              steps: [
                {
                  title: 'Apply general form formulas',
                  math: `slope = -${a}/(${b}) = ${Number.isInteger(slopeVal) ? slopeVal : `${slopeNum}/${slopeDen}`}; y-intercept = -(${c})/(${b}) = ${yIntDisplay}`,
                  explanation: 'Compare directly with Ax + By + C = 0.',
                },
              ],
              answer: `slope = ${Number.isInteger(slopeVal) ? slopeVal : `${slopeNum}/${slopeDen}`}, y-intercept = ${yIntDisplay}`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: eq,
            curves: [{ kind: 'linear', m: slopeVal, c: yIntVal, label: eq, color: '#0284c7' }],
            points: [
              { x: xInt, y: 0, label: `(${xInt}, 0)`, color: '#dc2626' },
              { x: 0, y: yIntVal, label: `(0, ${yIntDisplay})`, color: '#10b981' },
            ],
            xRange: [Math.min(-8, xInt - 2), Math.max(8, xInt + 2)],
            yRange: [Math.min(-8, Math.floor(yIntVal) - 2), Math.max(8, Math.ceil(yIntVal) + 2)],
          },
        }),
      };
    }

    case 'ch3-parallel-perp': {
      const isPerp = rng() > 0.45;
      const a1 = pick(rng, [2, 3, 4]);
      const b1 = pick(rng, [-3, -2, 2, 3, 5]);
      const c1 = pick(rng, [-12, -6, 6, 12]);
      const scale = pick(rng, [2, 3]);
      const b2 = isPerp ? a1 * scale : b1 * scale;
      const kVal = isPerp ? -b1 * scale : a1 * scale;
      const c2 = pick(rng, [-10, -5, 5, 11]);
      const l1Str = `${a1}x ${b1 >= 0 ? `+ ${b1}y` : `- ${Math.abs(b1)}y`} ${c1 >= 0 ? `+ ${c1}` : `- ${Math.abs(c1)}`} = 0`;
      const l2Str = `kx ${b2 >= 0 ? `+ ${b2}y` : `- ${Math.abs(b2)}y`} ${c2 >= 0 ? `+ ${c2}` : `- ${Math.abs(c2)}`} = 0`;
      const relationWord = isPerp ? 'perpendicular to each other' : 'parallel';

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the value of k',
        acceptableAnswers: [String(kVal), `k=${kVal}`, `k = ${kVal}`],
        answerPlaceholder: `e.g. ${kVal}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `If the straight lines L₁: ${l1Str} and L₂: ${l2Str} are ${relationWord}, find the value of k.`,
          parts: [
            {
              label: 'Main',
              prompt: `Find k so that L₁ and L₂ are ${relationWord}.`,
              strategy: isPerp
                ? 'Use the perpendicular condition m₁ × m₂ = -1.'
                : 'Use the parallel condition m₁ = m₂.',
              steps: [
                {
                  title: 'Express slopes m₁ and m₂',
                  math: `m₁ = -${a1}/(${b1}), m₂ = -k/(${b2})`,
                  explanation: 'Use m = -A/B for each general-form equation.',
                },
                {
                  title: isPerp ? 'Set m₁ × m₂ = -1 and solve' : 'Set m₁ = m₂ and solve',
                  math: isPerp
                    ? `(-${a1}/${b1})(-k/${b2}) = -1 ⇒ ${a1}k = -${b1 * b2} ⇒ k = ${kVal}`
                    : `-${a1}/${b1} = -k/${b2} ⇒ k = ${kVal}`,
                  explanation: `Solving gives k = ${kVal}.`,
                },
              ],
              answer: String(kVal),
            },
          ],
          visual: {
            kind: 'coordinate',
            title: isPerp ? `L₁ ⊥ L₂ (k = ${kVal})` : `L₁ ∥ L₂ (k = ${kVal})`,
            curves: [
              { kind: 'linear', m: -a1 / b1, c: -c1 / b1, label: 'L₁', color: '#0284c7' },
              { kind: 'linear', m: -kVal / b2, c: -c2 / b2, label: 'L₂', color: '#10b981' },
            ],
            xRange: [-8, 8],
            yRange: [-8, 8],
          },
        }),
      };
    }

    case 'ch3-inclination': {
      const choice = pick(rng, [
        { deg: 45, m: 1, mLabel: '1' },
        { deg: 135, m: -1, mLabel: '-1' },
      ]);
      const px = pick(rng, [-4, -2, 2, 3, 5]);
      const py = pick(rng, [-3, -1, 1, 4, 6]);
      const c = py - choice.m * px;
      const eq = `y = ${formatLinearPoly(choice.m, c)}`;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the y-intercept of L',
        acceptableAnswers: [String(c), `y=${c}`],
        answerPlaceholder: `e.g. ${c}`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `A straight line L has inclination ${choice.deg}° and passes through P(${px}, ${py}). Find (a) the slope of L; (b) the equation of L and its y-intercept.`,
          parts: [
            {
              label: '(a)',
              prompt: `Find the slope of L with inclination ${choice.deg}°.`,
              strategy: 'Use m = tan θ.',
              steps: [
                {
                  title: 'Apply m = tan θ',
                  math: `m = tan ${choice.deg}° = ${choice.mLabel}`,
                  explanation: `An inclination of ${choice.deg}° gives slope ${choice.mLabel}.`,
                },
              ],
              answer: choice.mLabel,
            },
            {
              label: '(b)',
              prompt: 'Find the equation of L and its y-intercept.',
              strategy: `Use point-slope form through P(${px}, ${py}) with slope ${choice.mLabel}.`,
              steps: [
                {
                  title: 'Apply point-slope form',
                  math: `y - (${py}) = ${choice.mLabel}(x - (${px})) ⇒ ${eq}`,
                  explanation: `So the y-intercept is ${c}.`,
                },
              ],
              answer: `${eq}; y-intercept = ${c}`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `${eq} (θ = ${choice.deg}°)`,
            curves: [{ kind: 'linear', m: choice.m, c, label: `L: ${eq}`, color: '#0284c7' }],
            points: [
              { x: px, y: py, label: `P(${px}, ${py})`, color: '#10b981' },
              { x: 0, y: c, label: `(0, ${c})`, color: '#dc2626' },
            ],
            xRange: [Math.min(-6, px - 3), Math.max(6, px + 3)],
            yRange: [Math.min(-6, py - 3, c - 2), Math.max(8, py + 3, c + 2)],
          },
        }),
      };
    }

    case 'ch3-intersections': {
      const px = pick(rng, [-4, -3, -2, -1, 1, 2, 3, 4, 5]);
      const py = pick(rng, [-4, -2, 1, 2, 3, 4]);
      const m1 = pick(rng, [1, 2, 3]);
      const m2 = pick(rng, [-3, -2, -1]);
      const c1 = py - m1 * px;
      const c2 = py - m2 * px;
      const eq1 = `${m1}x - y ${c1 >= 0 ? `+ ${c1}` : `- ${Math.abs(c1)}`} = 0`;
      const eq2 = `${-m2}x + y ${-c2 >= 0 ? `+ ${-c2}` : `- ${Math.abs(c2)}`} = 0`;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the intersection coordinates (e.g. (2, 3))',
        acceptableAnswers: [`(${px}, ${py})`, `(${px},${py})`, `${px},${py}`, `${px}, ${py}`],
        answerPlaceholder: `(${px}, ${py})`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Find the coordinates of the point of intersection P of the straight lines L₁: ${eq1} and L₂: ${eq2}.`,
          parts: [
            {
              label: 'Main',
              prompt: 'Solve L₁ and L₂ simultaneously.',
              strategy: 'Add L₁ and L₂ directly to eliminate y.',
              steps: [
                {
                  title: 'Add L₁ and L₂ to eliminate y',
                  math: `(${m1} + ${-m2})x + (${c1 - c2}) = 0 ⇒ ${m1 - m2}x = ${c2 - c1} ⇒ x = ${px}`,
                  explanation: 'Adding the two equations eliminates y immediately.',
                },
                {
                  title: `Substitute x = ${px} into L₁ to find y`,
                  math: `y = ${m1}(${px}) ${c1 >= 0 ? `+ ${c1}` : `- ${Math.abs(c1)}`} = ${py}`,
                  explanation: `The point of intersection is P(${px}, ${py}).`,
                },
              ],
              answer: `(${px}, ${py})`,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `Intersection P(${px}, ${py})`,
            curves: [
              { kind: 'linear', m: m1, c: c1, label: 'L₁', color: '#0284c7' },
              { kind: 'linear', m: m2, c: c2, label: 'L₂', color: '#f59e0b' },
            ],
            points: [{ x: px, y: py, label: `P(${px}, ${py})`, color: '#10b981' }],
            xRange: [px - 6, px + 6],
            yRange: [py - 6, py + 6],
          },
        }),
      };
    }

    case 'ch3-triangle-geometry': {
      // Construct a clean perpendicular bisector problem with integer mid-point and integer slope
      const mx = pick(rng, [-3, -2, 1, 2, 3, 4]);
      const my = pick(rng, [-2, -1, 1, 2, 3, 4]);
      const mAB = pick(rng, [1, -1]);
      const halfDx = pick(rng, [2, 3, 4]);
      const ax = mx - halfDx;
      const ay = my - mAB * halfDx;
      const bx = mx + halfDx;
      const by = my + mAB * halfDx;
      const mPerp = -1 / mAB;
      const cPerp = my - mPerp * mx;
      const perpEq = `y = ${formatLinearPoly(mPerp, cPerp)}`;

      return {
        id,
        archetype,
        archetypeLabel,
        sourceQuestionId: source.id,
        sourceTitle,
        variationNumber,
        quickCheckLabel: 'Enter the mid-point M of AB (e.g. (2, 3))',
        acceptableAnswers: [`(${mx}, ${my})`, `(${mx},${my})`, `${mx},${my}`, `${mx}, ${my}`],
        answerPlaceholder: `(${mx}, ${my})`,
        question: makeDrillQuestionItem({
          id,
          exerciseId: source.exerciseId,
          level: source.level,
          topic: archetypeLabel,
          variationNumber,
          statement: `Given A(${ax}, ${ay}) and B(${bx}, ${by}), find (a) the mid-point M of AB; (b) the equation of the perpendicular bisector of AB.`,
          parts: [
            {
              label: '(a)',
              prompt: 'Find the mid-point M of AB.',
              strategy: 'Use the mid-point formula ((x₁ + x₂)/2, (y₁ + y₂)/2).',
              steps: [
                {
                  title: 'Apply mid-point formula',
                  math: `M = ((${ax} + ${bx})/2, (${ay} + ${by})/2) = (${mx}, ${my})`,
                  explanation: `The mid-point M is (${mx}, ${my}).`,
                },
              ],
              answer: `(${mx}, ${my})`,
            },
            {
              label: '(b)',
              prompt: 'Find the equation of the perpendicular bisector of AB.',
              strategy: 'Find slope m_AB, take negative reciprocal m_⊥, and use point-slope form through M.',
              steps: [
                {
                  title: 'Compute perpendicular slope',
                  math: `m_AB = (${by} - (${ay}))/(${bx} - (${ax})) = ${mAB} ⇒ m_⊥ = ${mPerp}`,
                  explanation: 'Perpendicular lines satisfy m_AB × m_⊥ = -1.',
                },
                {
                  title: 'Write equation through M',
                  math: `y - (${my}) = ${mPerp}(x - (${mx})) ⇒ ${perpEq}`,
                  explanation: `The perpendicular bisector of AB is ${perpEq}.`,
                },
              ],
              answer: perpEq,
            },
          ],
          visual: {
            kind: 'coordinate',
            title: `Perp. Bisector of AB: ${perpEq}`,
            curves: [
              { kind: 'linear', m: mAB, c: ay - mAB * ax, label: 'Line AB', color: '#94a3b8', dashed: true },
              { kind: 'linear', m: mPerp, c: cPerp, label: `Perp. bisector: ${perpEq}`, color: '#10b981' },
            ],
            points: [
              { x: ax, y: ay, label: `A(${ax}, ${ay})`, color: '#0284c7' },
              { x: bx, y: by, label: `B(${bx}, ${by})`, color: '#0284c7' },
              { x: mx, y: my, label: `M(${mx}, ${my})`, color: '#dc2626' },
            ],
            xRange: [Math.min(ax, bx) - 3, Math.max(ax, bx) + 3],
            yRange: [Math.min(ay, by) - 3, Math.max(ay, by) + 3],
          },
        }),
      };
    }
  }
}

function normalizeAnswerToken(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/\s+/g, '')
    .replace(/m²|sq\.?units?/g, '');
}

function tryEvalNumericToken(token: string): number | null {
  const cleaned = token.replace(/^[a-z]=/, '');
  const fracMatch = cleaned.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const den = Number(fracMatch[2]);
    if (den !== 0) return Number(fracMatch[1]) / den;
  }
  if (/^[+-]?\d+(?:\.\d+)?$/.test(cleaned)) {
    return Number(cleaned);
  }
  return null;
}

export function checkDrillAnswer(
  rawInput: string,
  acceptableAnswers: string[]
): { status: 'empty' | 'correct' | 'incorrect' } {
  const normInput = normalizeAnswerToken(rawInput);
  if (!normInput) return { status: 'empty' };

  for (const ans of acceptableAnswers) {
    const normAns = normalizeAnswerToken(ans);
    if (normInput === normAns) {
      return { status: 'correct' };
    }

    // Numeric comparison (handles fractions vs decimals like -1/2 == -0.5)
    const numIn = tryEvalNumericToken(normInput);
    const numAns = tryEvalNumericToken(normAns);
    if (numIn !== null && numAns !== null && Math.abs(numIn - numAns) < 1e-6) {
      return { status: 'correct' };
    }
  }

  return { status: 'incorrect' };
}

export function findRelatedTextbookQuestions(
  source: QuestionItem,
  allQuestions: QuestionItem[],
  limit = 4
): QuestionItem[] {
  const sourceArch = classifyQuestionArchetype(source);
  const sourceTopic = source.topic.toLowerCase();

  const scored: { q: QuestionItem; score: number }[] = [];
  for (const q of allQuestions) {
    if (q.id === source.id) continue;
    let score = 0;
    if (q.topic.toLowerCase() === sourceTopic) score += 10;
    if (classifyQuestionArchetype(q) === sourceArch) score += 6;
    if (q.exerciseId !== source.exerciseId) score += 2; // Encourage cross-section drilling
    if (q.level === source.level) score += 1;
    if (score >= 6) {
      scored.push({ q, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((item) => item.q);
}
