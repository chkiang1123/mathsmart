export type ExerciseId =
  | 'ex3_1'
  | 'ex3_2'
  | 'ex3_3'
  | 'ch3_check_yourself'
  | 'ch3_revision'
  | 'ch3_mcq'
  | 'ch3_exam_zone'
  | 'warmup'
  | 'ex4_1'
  | 'ex4_2'
  | 'ex4_3'
  | 'ex4_4'
  | 'check_yourself'
  | 'revision'
  | 'mcq'
  | 'exam_zone';

export type QuestionLevel =
  | 'Warm-up'
  | 'Level 1'
  | 'Level 2'
  | 'Smart Corner'
  | 'Cross Topics'
  | 'Check Yourself'
  | 'MCQ'
  | 'Exam Zone';

export interface AnalysisStep {
  title: string;
  math: string;
  explanation: string;
}

export interface QuestionPart {
  label: string;
  prompt: string;
  strategy?: string;
  steps: AnalysisStep[];
  answer: string;
}

export interface SectionCheckItem {
  id: string;
  label: string;
  statement: string;
  isCorrect: boolean;
  explanation: string;
  visual?: VisualConfig;
}

export type CurveSpec =
  | {
      kind: 'linear';
      m: number;
      c: number;
      label?: string;
      color?: string;
      dashed?: boolean;
    }
  | {
      kind: 'quadratic';
      a: number;
      b: number;
      c: number;
      label?: string;
      color?: string;
      dashed?: boolean;
      domain?: [number, number];
    }
  | {
      kind: 'cubic';
      a: number;
      b: number;
      c: number;
      d: number;
      label?: string;
      color?: string;
    }
  | {
      kind: 'rational';
      num: [number, number, number]; // [x^2, x, 1]
      den: [number, number, number]; // [x^2, x, 1]
      label?: string;
      color?: string;
    }
  | {
      kind: 'sqrt';
      a: number; // sqrt(a*x + b)
      b: number;
      label?: string;
      color?: string;
    }
  | {
      kind: 'exp2';
      k: number; // k * 2^x
      label?: string;
      color?: string;
    }
  | {
      kind: 'relation-y2'; // y^2 = m*x + c -> x = (y^2 - c)/m
      m: number;
      c: number;
      label?: string;
      color?: string;
    }
  | {
      kind: 'vertical';
      x: number;
      label?: string;
      color?: string;
      dashed?: boolean;
    };

export interface PointSpec {
  x: number;
  y: number;
  label: string;
  color?: string;
  hollow?: boolean;
}

export interface PolygonSpec {
  points: { x: number; y: number; label?: string }[];
  fill?: string;
  stroke?: string;
  label?: string;
}

export interface CircleSpec {
  cx: number;
  cy: number;
  r: number;
  stroke?: string;
  label?: string;
}

export type GeometryScenario =
  | 'river-fence'
  | 'wire-squares'
  | 'string-grid-4'
  | 'string-grid-6'
  | 'right-triangle-rect'
  | 'square-triangle-apq'
  | 'three-gardens'
  | 'bubble-tea'
  | 'park-road'
  | 'projectile-40'
  | 'projectile-55'
  | 'trapezium';

export type VisualConfig =
  | {
      kind: 'coordinate';
      title: string;
      curves: CurveSpec[];
      points?: PointSpec[];
      polygons?: PolygonSpec[];
      circles?: CircleSpec[];
      xRange: [number, number];
      yRange: [number, number];
      showAxisOfSymmetry?: number;
      showVertex?: { x: number; y: number; label?: string };
      showRoots?: number[];
      note?: string;
      interactiveX?: { min: number; max: number; step: number; defaultVal: number; curveIndex?: number; label?: string };
    }
  | {
      kind: 'vertical-line-test';
      title: string;
      curve: CurveSpec;
      xRange: [number, number];
      yRange: [number, number];
      isFunction: boolean;
      defaultTestX: number;
      reason: string;
    }
  | {
      kind: 'function-machine';
      title: string;
      formulaText: string;
      curve: CurveSpec;
      evalPoints: { x: number; label: string; color?: string }[];
      xRange: [number, number];
      yRange: [number, number];
      defaultX: number;
      note?: string;
    }
  | {
      kind: 'completing-square';
      title: string;
      a: number;
      b: number;
      c: number;
      kParam?: {
        name: string;
        min: number;
        max: number;
        step: number;
        defaultVal: number;
        // Coefficients as linear/quadratic functions of k: [c0, c1, c2] => c0 + c1*k + c2*k^2
        aExpr: [number, number, number];
        bExpr: [number, number, number];
        cExpr: [number, number, number];
        displayFormula: string;
      };
      xRange?: [number, number];
      yRange?: [number, number];
    }
  | {
      kind: 'discriminant-explorer';
      title: string;
      paramName: string;
      min: number;
      max: number;
      step: number;
      defaultVal: number;
      // a(k) = a0 + a1*k, b(k) = b0 + b1*k, c(k) = c0 + c1*k
      aCoeff: [number, number];
      bCoeff: [number, number];
      cCoeff: [number, number];
      displayFormula: string;
      conditionLabel: string;
      xRange: [number, number];
      yRange: [number, number];
    }
  | {
      kind: 'geometry-lab';
      title: string;
      scenario: GeometryScenario;
      minX: number;
      maxX: number;
      stepX: number;
      defaultX: number;
      unit: string;
    }
  | {
      kind: 'number-line';
      title: string;
      inequalities: {
        label: string;
        op: '>' | '>=' | '<' | '<=';
        value: number;
        color?: string;
      }[];
      integerHighlight?: { value: number; label: string };
      min: number;
      max: number;
    };

export interface QuestionItem {
  id: string;
  exerciseId: ExerciseId;
  number: string;
  page: string;
  level: QuestionLevel;
  topic: string;
  examRef?: string;
  isNonFoundation?: boolean;
  statement: string;
  options?: string[]; // For MCQ
  correctOption?: string; // e.g. 'A'
  parts: QuestionPart[];
  visual: VisualConfig;
}

export interface ExerciseGroup {
  id: ExerciseId;
  code: string;
  title: string;
  subtitle: string;
  pages: string;
  objectives: string[];
  sectionCheck?: SectionCheckItem[];
  questions: QuestionItem[];
}
