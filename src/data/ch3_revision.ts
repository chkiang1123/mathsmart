import type { ExerciseGroup, QuestionItem } from '../types/math';
import { ch3CheckYourselfGroup } from './ch3_check_yourself';
import { ch3RevisionLevel2Questions } from './ch3_rev_l2';

export { ch3CheckYourselfGroup };

const ch3RevisionLevel1Questions: QuestionItem[] = [
  {
    id: 'ch3-rev-1',
    exerciseId: 'ch3_revision',
    number: 'Q1',
    page: '3.53',
    level: 'Level 1',
    topic: 'Point-Slope Form from Figure',
    statement: 'In the figure, the straight line L passes through (-2, 7) with slope -2. Find the equation of L.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find the equation of L.',
        strategy: 'Use point-slope form y - y₁ = m(x - x₁).',
        steps: [
          {
            title: 'Apply point-slope form',
            math: 'y - 7 = -2(x + 2) ⇒ y = -2x + 3 (or 2x + y - 3 = 0)',
            explanation: 'Simplify to slope-intercept or general form.',
          },
        ],
        answer: 'y = -2x + 3 (or 2x + y - 3 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L through (-2, 7) with slope -2',
      curves: [{ kind: 'linear', m: -2, c: 3, label: 'L: y = -2x + 3', color: '#0284c7' }],
      points: [{ x: -2, y: 7, label: '(-2, 7)', color: '#dc2626' }],
      xRange: [-5, 5],
      yRange: [-3, 10],
    },
  },
  {
    id: 'ch3-rev-2',
    exerciseId: 'ch3_revision',
    number: 'Q2',
    page: '3.53',
    level: 'Level 1',
    topic: 'Two-Point Form from Figure',
    statement: 'In the figure, the straight line L passes through (-3, -6) and (3, -2). Find the equation of L.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find the equation of L.',
        strategy: 'Compute slope m first, then apply point-slope form.',
        steps: [
          {
            title: 'Compute slope and equation',
            math: 'm = (-2 - (-6))/(3 - (-3)) = 4/6 = 2/3 ⇒ y + 2 = (2/3)(x - 3) ⇒ y = (2/3)x - 4',
            explanation: 'General form: 2x - 3y - 12 = 0.',
          },
        ],
        answer: 'y = (2/3)x - 4 (or 2x - 3y - 12 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L through (-3, -6) and (3, -2)',
      curves: [{ kind: 'linear', m: 2 / 3, c: -4, label: 'L', color: '#0284c7' }],
      points: [
        { x: -3, y: -6, label: '(-3, -6)', color: '#dc2626' },
        { x: 3, y: -2, label: '(3, -2)', color: '#10b981' },
      ],
      xRange: [-6, 8],
      yRange: [-8, 2],
    },
  },
  {
    id: 'ch3-rev-3',
    exerciseId: 'ch3_revision',
    number: 'Q3',
    page: '3.53',
    level: 'Level 1',
    topic: 'Intercept Form from Figure',
    statement: 'In the figure, the straight line L cuts the x-axis at (-24, 0) and the y-axis at (0, -20). Find the equation of L.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find the equation of L from intercepts -24 and -20.',
        strategy: 'Use intercept form x/(-24) + y/(-20) = 1.',
        steps: [
          {
            title: 'Apply intercept form',
            math: 'x/(-24) + y/(-20) = 1 ⇒ 5x + 6y + 120 = 0 (or y = -(5/6)x - 20)',
            explanation: 'Multiplying by -120 yields 5x + 6y + 120 = 0.',
          },
        ],
        answer: 'y = -(5/6)x - 20 (or 5x + 6y + 120 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L with x-int -24 and y-int -20',
      curves: [{ kind: 'linear', m: -5 / 6, c: -20, label: 'L', color: '#0284c7' }],
      points: [
        { x: -24, y: 0, label: '(-24, 0)', color: '#dc2626' },
        { x: 0, y: -20, label: '(0, -20)', color: '#10b981' },
      ],
      xRange: [-28, 6],
      yRange: [-25, 6],
    },
  },
  {
    id: 'ch3-rev-4',
    exerciseId: 'ch3_revision',
    number: 'Q4',
    page: '3.53',
    level: 'Level 1',
    topic: 'Slope-Intercept Form from Figure',
    statement: 'In the figure, the straight line L has y-intercept 32 and slope 5/3. Find the equation of L.',
    parts: [
      {
        label: 'Main',
        prompt: 'Write the equation of L.',
        strategy: 'Substitute m = 5/3 and c = 32 directly into y = mx + c.',
        steps: [
          {
            title: 'Apply slope-intercept form',
            math: 'y = (5/3)x + 32 (or 5x - 3y + 96 = 0)',
            explanation: 'Direct substitution into y = mx + c.',
          },
        ],
        answer: 'y = (5/3)x + 32 (or 5x - 3y + 96 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L: y = (5/3)x + 32',
      curves: [{ kind: 'linear', m: 5 / 3, c: 32, label: 'L', color: '#0284c7' }],
      points: [{ x: 0, y: 32, label: '(0, 32)', color: '#10b981' }],
      xRange: [-24, 8],
      yRange: [-6, 40],
    },
  },
  {
    id: 'ch3-rev-5',
    exerciseId: 'ch3_revision',
    number: 'Q5',
    page: '3.53',
    level: 'Level 1',
    topic: 'Vertical Line from Figure',
    statement: 'In the figure, the straight line L is parallel to the y-axis and passes through (-11, -9). Find the equation of L.',
    parts: [
      {
        label: 'Main',
        prompt: 'Write the equation of vertical line L.',
        strategy: 'A vertical line through (h, k) has equation x = h.',
        steps: [
          {
            title: 'Read constant x-coordinate',
            math: 'x = -11',
            explanation: 'Every point on L has x-coordinate -11.',
          },
        ],
        answer: 'x = -11',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Vertical Line x = -11',
      curves: [{ kind: 'vertical', x: -11, label: 'L: x = -11', color: '#0284c7' }],
      points: [{ x: -11, y: -9, label: '(-11, -9)', color: '#dc2626' }],
      xRange: [-16, 4],
      yRange: [-14, 4],
    },
  },
  {
    id: 'ch3-rev-6',
    exerciseId: 'ch3_revision',
    number: 'Q6',
    page: '3.53',
    level: 'Level 1',
    topic: 'Inclination & Point-Slope Form from Figure',
    statement: 'In the figure, the straight line L has inclination 45° and passes through (8, -20). Find the equation of L.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find slope m = tan 45° and write the equation of L.',
        strategy: 'Use m = tan 45° = 1 with point (8, -20).',
        steps: [
          {
            title: 'Compute slope and equation',
            math: 'm = tan 45° = 1 ⇒ y + 20 = 1(x - 8) ⇒ y = x - 28 (or x - y - 28 = 0)',
            explanation: 'Equation of L is y = x - 28.',
          },
        ],
        answer: 'y = x - 28 (or x - y - 28 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L: y = x - 28 (Inclination 45°)',
      curves: [{ kind: 'linear', m: 1, c: -28, label: 'L: y = x - 28', color: '#0284c7' }],
      points: [{ x: 8, y: -20, label: '(8, -20)', color: '#dc2626' }],
      xRange: [-4, 34],
      yRange: [-32, 6],
    },
  },
  {
    id: 'ch3-rev-7',
    exerciseId: 'ch3_revision',
    number: 'Q7',
    page: '3.53',
    level: 'Level 1',
    topic: 'Slope & Intercepts of a Line',
    statement: 'Find the slope, the x-intercept and the y-intercept of the straight line y = -(1/3)x + 2.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find slope, x-intercept, and y-intercept.',
        strategy: 'Read slope and y-intercept directly from y = mx + c, then put y = 0 for x-intercept.',
        steps: [
          {
            title: 'Read slope & y-intercept, solve for x-intercept',
            math: 'slope = -1/3; y-intercept = 2; y = 0 ⇒ (1/3)x = 2 ⇒ x-intercept = 6',
            explanation: 'Slope = -1/3, x-intercept = 6, y-intercept = 2.',
          },
        ],
        answer: 'slope = -1/3, x-intercept = 6, y-intercept = 2',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'y = -(1/3)x + 2',
      curves: [{ kind: 'linear', m: -1 / 3, c: 2, label: 'y = -(1/3)x + 2', color: '#0284c7' }],
      points: [
        { x: 6, y: 0, label: '(6, 0)', color: '#dc2626' },
        { x: 0, y: 2, label: '(0, 2)', color: '#10b981' },
      ],
      xRange: [-2, 8],
      yRange: [-2, 5],
    },
  },
  {
    id: 'ch3-rev-8',
    exerciseId: 'ch3_revision',
    number: 'Q8',
    page: '3.53',
    level: 'Level 1',
    topic: 'Slope & Intercepts from General Form',
    statement: 'Find the slope, the x-intercept and the y-intercept of the straight line 3x - 5y - 15 = 0.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find slope, x-intercept, and y-intercept.',
        strategy: 'Use m = -A/B, x-int = -C/A, y-int = -C/B.',
        steps: [
          {
            title: 'Apply general form formulas',
            math: 'slope = -3/(-5) = 3/5; x-intercept = 15/3 = 5; y-intercept = 15/(-5) = -3',
            explanation: 'Slope = 3/5, x-intercept = 5, y-intercept = -3.',
          },
        ],
        answer: 'slope = 3/5, x-intercept = 5, y-intercept = -3',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: '3x - 5y - 15 = 0',
      curves: [{ kind: 'linear', m: 0.6, c: -3, label: '3x - 5y - 15 = 0', color: '#0284c7' }],
      points: [
        { x: 5, y: 0, label: '(5, 0)', color: '#dc2626' },
        { x: 0, y: -3, label: '(0, -3)', color: '#10b981' },
      ],
      xRange: [-2, 8],
      yRange: [-5, 3],
    },
  },
  {
    id: 'ch3-rev-9',
    exerciseId: 'ch3_revision',
    number: 'Q9',
    page: '3.53',
    level: 'Level 1',
    topic: 'Slope & Intercepts (Fractional Intercepts)',
    statement: 'Find the slope, the x-intercept and the y-intercept of the straight line 4x + 2y = 1.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find slope, x-intercept, and y-intercept.',
        strategy: 'Rewrite as y = -2x + 1/2, then put y = 0 for the x-intercept.',
        steps: [
          {
            title: 'Rewrite in slope-intercept form and solve y = 0',
            math: 'y = -2x + 1/2 ⇒ slope = -2, y-intercept = 1/2; 4x = 1 ⇒ x-intercept = 1/4',
            explanation: 'Slope = -2, x-intercept = 1/4, y-intercept = 1/2.',
          },
        ],
        answer: 'slope = -2, x-intercept = 1/4, y-intercept = 1/2',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: '4x + 2y = 1',
      curves: [{ kind: 'linear', m: -2, c: 0.5, label: '4x + 2y = 1', color: '#0284c7' }],
      points: [
        { x: 0.25, y: 0, label: '(1/4, 0)', color: '#dc2626' },
        { x: 0, y: 0.5, label: '(0, 1/2)', color: '#10b981' },
      ],
      xRange: [-1, 2],
      yRange: [-1, 2],
    },
  },
  {
    id: 'ch3-rev-10',
    exerciseId: 'ch3_revision',
    number: 'Q10',
    page: '3.53',
    level: 'Level 1',
    topic: 'Line Passing Through the Origin',
    statement: 'Find the slope, the x-intercept and the y-intercept of the straight line 6x = 7y.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find slope and both intercepts.',
        strategy: 'Rewrite as y = (6/7)x.',
        steps: [
          {
            title: 'Read slope and intercepts',
            math: 'y = (6/7)x ⇒ slope = 6/7, x-intercept = 0, y-intercept = 0',
            explanation: 'Since there is no constant term, the line passes through (0, 0).',
          },
        ],
        answer: 'slope = 6/7, x-intercept = 0, y-intercept = 0',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: '6x = 7y',
      curves: [{ kind: 'linear', m: 6 / 7, c: 0, label: '6x = 7y', color: '#0284c7' }],
      points: [{ x: 0, y: 0, label: 'O(0, 0)', color: '#dc2626' }],
      xRange: [-7, 7],
      yRange: [-6, 6],
    },
  },
  {
    id: 'ch3-rev-11',
    exerciseId: 'ch3_revision',
    number: 'Q11',
    page: '3.53',
    level: 'Level 1',
    topic: 'Shared x-intercept with Vertical Line',
    statement: 'In the figure, the straight lines L₁: x = -18 and L₂ intersect at a point on the x-axis. If the slope of L₂ is 3/2, find the equation of L₂.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find the equation of L₂.',
        strategy: 'L₂ passes through (-18, 0) with slope 3/2.',
        steps: [
          {
            title: 'Apply point-slope form at (-18, 0)',
            math: 'y - 0 = (3/2)(x + 18) ⇒ y = (3/2)x + 27 (or 3x - 2y + 54 = 0)',
            explanation: 'Equation of L₂ is y = (3/2)x + 27.',
          },
        ],
        answer: 'y = (3/2)x + 27 (or 3x - 2y + 54 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L₁: x = -18 & L₂: y = (3/2)x + 27',
      curves: [
        { kind: 'vertical', x: -18, label: 'L₁: x = -18', color: '#94a3b8', dashed: true },
        { kind: 'linear', m: 1.5, c: 27, label: 'L₂', color: '#0284c7' },
      ],
      points: [{ x: -18, y: 0, label: '(-18, 0)', color: '#dc2626' }],
      xRange: [-24, 6],
      yRange: [-6, 32],
    },
  },
  {
    id: 'ch3-rev-12',
    exerciseId: 'ch3_revision',
    number: 'Q12',
    page: '3.53',
    level: 'Level 1',
    topic: 'Translation of Points & Line Equation',
    statement: 'The point A(-10, 2) is translated downwards by 9 units to B, and then B is translated to the right by 12 units to C. (a) Find the coordinates of B and C. (b) Find the equation of the straight line passing through A and C in general form.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find B and C.',
        strategy: 'Downwards by 9 subtracts 9 from y; right by 12 adds 12 to x.',
        steps: [
          {
            title: 'Apply translations',
            math: 'B = (-10, 2 - 9) = (-10, -7); C = (-10 + 12, -7) = (2, -7)',
            explanation: 'B is (-10, -7) and C is (2, -7).',
          },
        ],
        answer: 'B: (-10, -7), C: (2, -7)',
      },
      {
        label: '(b)',
        prompt: 'Find the equation of line AC in general form.',
        strategy: 'Find slope of AC, then apply point-slope form.',
        steps: [
          {
            title: 'Compute slope and general form of AC',
            math: 'm_AC = (-7 - 2)/(2 - (-10)) = -9/12 = -3/4 ⇒ y - 2 = -(3/4)(x + 10) ⇒ 3x + 4y + 22 = 0',
            explanation: 'Equation of AC in general form is 3x + 4y + 22 = 0.',
          },
        ],
        answer: '3x + 4y + 22 = 0',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Translation A → B → C & Line AC',
      curves: [{ kind: 'linear', m: -0.75, c: -5.5, label: 'AC: 3x + 4y + 22 = 0', color: '#0284c7' }],
      points: [
        { x: -10, y: 2, label: 'A(-10, 2)', color: '#0284c7' },
        { x: -10, y: -7, label: 'B(-10, -7)', color: '#f59e0b' },
        { x: 2, y: -7, label: 'C(2, -7)', color: '#10b981' },
      ],
      xRange: [-14, 6],
      yRange: [-10, 6],
    },
  },
  {
    id: 'ch3-rev-13',
    exerciseId: 'ch3_revision',
    number: 'Q13',
    page: '3.54',
    level: 'Level 1',
    topic: 'Reflection, Rotation & Line Equation',
    statement: 'The point P(3, -9) is reflected in the y-axis to Q, and Q is rotated anticlockwise about the origin through 90° to R. (a) Find the equation of the straight line QR. (b) Find the y-intercept of the straight line QR.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find Q, R, and the equation of QR.',
        strategy: 'Reflection in y-axis maps (x, y) → (-x, y); 90° anticlockwise rotation maps (x, y) → (-y, x).',
        steps: [
          {
            title: 'Find Q and R',
            math: 'Q = (-3, -9); R = (9, -3)',
            explanation: 'Negating x gives Q(-3, -9); applying (x, y) → (-y, x) gives R(9, -3).',
          },
          {
            title: 'Find equation of QR',
            math: 'm_QR = (-3 - (-9))/(9 - (-3)) = 6/12 = 1/2 ⇒ y + 3 = (1/2)(x - 9) ⇒ y = (1/2)x - 15/2',
            explanation: 'General form: x - 2y - 15 = 0.',
          },
        ],
        answer: 'y = (1/2)x - 15/2 (or x - 2y - 15 = 0)',
      },
      {
        label: '(b)',
        prompt: 'State the y-intercept of QR.',
        strategy: 'Read c directly from y = (1/2)x - 15/2.',
        steps: [
          {
            title: 'Read y-intercept',
            math: 'y-intercept = -15/2',
            explanation: 'Putting x = 0 gives y = -15/2.',
          },
        ],
        answer: '-15/2',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Line QR through Q(-3, -9) and R(9, -3)',
      curves: [{ kind: 'linear', m: 0.5, c: -7.5, label: 'QR', color: '#0284c7' }],
      points: [
        { x: 3, y: -9, label: 'P(3, -9)', color: '#94a3b8' },
        { x: -3, y: -9, label: 'Q(-3, -9)', color: '#10b981' },
        { x: 9, y: -3, label: 'R(9, -3)', color: '#dc2626' },
      ],
      xRange: [-6, 16],
      yRange: [-12, 4],
    },
  },
  {
    id: 'ch3-rev-14',
    exerciseId: 'ch3_revision',
    number: 'Q14',
    page: '3.54',
    level: 'Level 1',
    topic: 'Point on Line & Mid-point Line',
    statement: 'The straight line 3x - y + 8 = 0 passes through P(-k, k). (a) Find the value of k. (b) Find the equation of the straight line passing through the mid-point of OP with slope -1, where O is the origin.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find k.',
        strategy: 'Substitute (-k, k) into 3x - y + 8 = 0.',
        steps: [
          {
            title: 'Solve for k',
            math: '3(-k) - k + 8 = 0 ⇒ -4k + 8 = 0 ⇒ k = 2',
            explanation: 'So P is (-2, 2).',
          },
        ],
        answer: '2',
      },
      {
        label: '(b)',
        prompt: 'Find the line through mid-point of OP with slope -1.',
        strategy: 'Mid-point of O(0, 0) and P(-2, 2) is (-1, 1).',
        steps: [
          {
            title: 'Apply point-slope form at (-1, 1)',
            math: 'M = (-1, 1); y - 1 = -1(x + 1) ⇒ y = -x (or x + y = 0)',
            explanation: 'The line is y = -x.',
          },
        ],
        answer: 'y = -x (or x + y = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'P(-2, 2), Mid-point (-1, 1) & Line y = -x',
      curves: [
        { kind: 'linear', m: 3, c: 8, label: '3x - y + 8 = 0', color: '#0284c7' },
        { kind: 'linear', m: -1, c: 0, label: 'y = -x', color: '#10b981' },
      ],
      points: [
        { x: -2, y: 2, label: 'P(-2, 2)', color: '#dc2626' },
        { x: -1, y: 1, label: 'M(-1, 1)', color: '#10b981' },
      ],
      xRange: [-5, 4],
      yRange: [-4, 10],
    },
  },
  {
    id: 'ch3-rev-15',
    exerciseId: 'ch3_revision',
    number: 'Q15',
    page: '3.54',
    level: 'Level 1',
    topic: 'Unknown Constant from x-intercept & Area',
    statement: 'The x-intercept of the straight line L: 4x - 7y + k = 0 is 14. (a) Find the value of k. (b) L cuts the x-axis and the y-axis at M and N respectively. Find the area of △OMN, where O is the origin.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find k.',
        strategy: 'Substitute (14, 0) into 4x - 7y + k = 0.',
        steps: [
          {
            title: 'Solve for k',
            math: '4(14) - 7(0) + k = 0 ⇒ k = -56',
            explanation: 'So L is 4x - 7y - 56 = 0.',
          },
        ],
        answer: '-56',
      },
      {
        label: '(b)',
        prompt: 'Find the area of △OMN.',
        strategy: 'Find y-intercept N(0, -8) and compute (1/2) × OM × ON.',
        steps: [
          {
            title: 'Find N and area',
            math: 'M(14, 0), N(0, -8) ⇒ Area = (1/2) × 14 × 8 = 56',
            explanation: 'Area of △OMN is 56 sq. units.',
          },
        ],
        answer: '56 sq. units',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: '4x - 7y - 56 = 0 & △OMN (Area = 56)',
      curves: [{ kind: 'linear', m: 4 / 7, c: -8, label: 'L', color: '#0284c7' }],
      points: [
        { x: 14, y: 0, label: 'M(14, 0)', color: '#dc2626' },
        { x: 0, y: -8, label: 'N(0, -8)', color: '#10b981' },
      ],
      polygons: [
        {
          points: [
            { x: 0, y: 0 },
            { x: 14, y: 0 },
            { x: 0, y: -8 },
          ],
          fill: 'rgba(14, 165, 233, 0.2)',
          stroke: '#0ea5e9',
          label: 'Area = 56',
        },
      ],
      xRange: [-2, 16],
      yRange: [-10, 4],
    },
  },
  {
    id: 'ch3-rev-16',
    exerciseId: 'ch3_revision',
    number: 'Q16',
    page: '3.54',
    level: 'Level 1',
    topic: 'Parallel Lines Unknown',
    statement: 'If the straight lines hx + 3y - 15 = 0 and (h + 6)x + 12y + 11 = 0 are parallel, find the value of h.',
    parts: [
      {
        label: 'Main',
        prompt: 'Equate slopes to find h.',
        strategy: 'Parallel lines satisfy -A₁/B₁ = -A₂/B₂.',
        steps: [
          {
            title: 'Solve for h',
            math: '-h/3 = -(h + 6)/12 ⇒ 4h = h + 6 ⇒ 3h = 6 ⇒ h = 2',
            explanation: 'Check y-intercepts: 5 ≠ -11/12. Hence h = 2.',
          },
        ],
        answer: '2',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Parallel Lines when h = 2',
      curves: [
        { kind: 'linear', m: -2 / 3, c: 5, label: '2x + 3y - 15 = 0', color: '#0284c7' },
        { kind: 'linear', m: -2 / 3, c: -11 / 12, label: '8x + 12y + 11 = 0', color: '#10b981' },
      ],
      xRange: [-6, 10],
      yRange: [-4, 8],
    },
  },
  {
    id: 'ch3-rev-17',
    exerciseId: 'ch3_revision',
    number: 'Q17',
    page: '3.54',
    level: 'Level 1',
    topic: 'Perpendicular Lines Unknown',
    examRef: 'HKDSE 2019 P2 Q24',
    statement: 'If the straight lines 3x + (10 - k)y + 17 = 0 and (k + 2)x - 6y - 25 = 0 are perpendicular to each other, find the value of k.',
    parts: [
      {
        label: 'Main',
        prompt: 'Use m₁ × m₂ = -1 to solve for k.',
        strategy: 'Equate (-3/(10 - k)) × ((k + 2)/6) = -1.',
        steps: [
          {
            title: 'Solve for k',
            math: '(-3/(10 - k)) × ((k + 2)/6) = -1 ⇒ (k + 2)/(2(10 - k)) = 1 ⇒ k + 2 = 20 - 2k ⇒ 3k = 18 ⇒ k = 6',
            explanation: 'Hence k = 6.',
          },
        ],
        answer: '6',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Perpendicular Lines when k = 6',
      curves: [
        { kind: 'linear', m: -0.75, c: -4.25, label: '3x + 4y + 17 = 0', color: '#0284c7' },
        { kind: 'linear', m: 4 / 3, c: -25 / 6, label: '8x - 6y - 25 = 0', color: '#10b981' },
      ],
      xRange: [-8, 8],
      yRange: [-8, 4],
    },
  },
  {
    id: 'ch3-rev-18',
    exerciseId: 'ch3_revision',
    number: 'Q18',
    page: '3.54',
    level: 'Level 1',
    topic: 'Parallel Line with Given y-intercept',
    examRef: 'HKDSE 2017 P2 Q24',
    statement: 'The straight line L₂ is parallel to L₁: 4x - 10y + 25 = 0 and its y-intercept is -5. Find the equation of L₂ in general form.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find the equation of L₂ in general form.',
        strategy: 'Slope of L₂ equals slope of L₁ = 2/5, and y-intercept is -5.',
        steps: [
          {
            title: 'Use slope-intercept form and convert to general form',
            math: 'm = 4/10 = 2/5 ⇒ y = (2/5)x - 5 ⇒ 2x - 5y - 25 = 0',
            explanation: 'Multiplying by 5 gives 2x - 5y - 25 = 0.',
          },
        ],
        answer: '2x - 5y - 25 = 0',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L₂: 2x - 5y - 25 = 0 ∥ L₁',
      curves: [
        { kind: 'linear', m: 0.4, c: 2.5, label: 'L₁', color: '#94a3b8', dashed: true },
        { kind: 'linear', m: 0.4, c: -5, label: 'L₂', color: '#0284c7' },
      ],
      points: [{ x: 0, y: -5, label: '(0, -5)', color: '#dc2626' }],
      xRange: [-6, 14],
      yRange: [-8, 6],
    },
  },
  {
    id: 'ch3-rev-19',
    exerciseId: 'ch3_revision',
    number: 'Q19',
    page: '3.54',
    level: 'Level 1',
    topic: 'Perpendicular Line & Inclination',
    statement: 'The straight line L passes through (-15, 7) and is perpendicular to 6x + 3y - 17 = 0. (a) Find the equation of L in general form. (b) Find the inclination of L, correct to 3 significant figures.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find the equation of L in general form.',
        strategy: 'Slope of given line is -2, so slope of L is 1/2.',
        steps: [
          {
            title: 'Write equation of L',
            math: 'm_L = 1/2 ⇒ y - 7 = (1/2)(x + 15) ⇒ 2y - 14 = x + 15 ⇒ x - 2y + 29 = 0',
            explanation: 'General form is x - 2y + 29 = 0.',
          },
        ],
        answer: 'x - 2y + 29 = 0',
      },
      {
        label: '(b)',
        prompt: 'Find the inclination θ of L.',
        strategy: 'Solve tan θ = 1/2.',
        steps: [
          {
            title: 'Compute arctan(1/2)',
            math: 'tan θ = 1/2 ⇒ θ ≈ 26.6° (cor. to 3 sig. fig.)',
            explanation: 'Inclination is 26.6°.',
          },
        ],
        answer: '26.6°',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L: x - 2y + 29 = 0 (θ ≈ 26.6°)',
      curves: [
        { kind: 'linear', m: -2, c: 17 / 3, label: '6x + 3y - 17 = 0', color: '#94a3b8', dashed: true },
        { kind: 'linear', m: 0.5, c: 14.5, label: 'L', color: '#0284c7' },
      ],
      points: [{ x: -15, y: 7, label: '(-15, 7)', color: '#dc2626' }],
      xRange: [-20, 6],
      yRange: [-2, 18],
    },
  },
  {
    id: 'ch3-rev-20',
    exerciseId: 'ch3_revision',
    number: 'Q20',
    page: '3.54',
    level: 'Level 1',
    topic: 'Perpendicular Lines & Distance Between x-intercepts',
    examRef: 'HKDSE 2019 P2 Q24',
    statement: 'The straight lines L₁: hx + 3y - 22 = 0 and L₂: 6x + 4y - 9 = 0 are perpendicular to each other. (a) Find the value of h. (b) L₁ and L₂ cut the x-axis at P and Q respectively. Someone claims that the length of PQ is greater than 12 units. Do you agree? Explain your answer.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find h.',
        strategy: 'Apply m₁ × m₂ = -1.',
        steps: [
          {
            title: 'Use perpendicular condition',
            math: '(-h/3)(-6/4) = -1 ⇒ h/2 = -1 ⇒ h = -2',
            explanation: 'So L₁ is -2x + 3y - 22 = 0.',
          },
        ],
        answer: '-2',
      },
      {
        label: '(b)',
        prompt: 'Find P, Q, and compare PQ with 12.',
        strategy: 'Find both x-intercepts and take their distance.',
        steps: [
          {
            title: 'Find x-intercepts P and Q',
            math: 'P(-11, 0), Q(1.5, 0) ⇒ PQ = 1.5 - (-11) = 12.5 > 12',
            explanation: 'Since 12.5 > 12, agree with the claim.',
          },
        ],
        answer: 'agree (PQ = 12.5 > 12)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'P(-11, 0), Q(1.5, 0) & PQ = 12.5',
      curves: [
        { kind: 'linear', m: 2 / 3, c: 22 / 3, label: 'L₁', color: '#0284c7' },
        { kind: 'linear', m: -1.5, c: 2.25, label: 'L₂', color: '#10b981' },
      ],
      points: [
        { x: -11, y: 0, label: 'P(-11, 0)', color: '#dc2626' },
        { x: 1.5, y: 0, label: 'Q(1.5, 0)', color: '#dc2626' },
      ],
      xRange: [-14, 6],
      yRange: [-4, 10],
    },
  },
  {
    id: 'ch3-rev-21',
    exerciseId: 'ch3_revision',
    number: 'Q21',
    page: '3.54',
    level: 'Level 1',
    topic: 'Perpendicular Lines on x-axis & Point Test',
    examRef: 'HKDSE 2016 P2 Q25',
    statement: 'The straight lines L₁: hx + ky - 11 = 0 and L₂: 2x + y + 11 = 0 are perpendicular to each other and intersect at a point on the x-axis. (a) Find the values of h and k. (b) Does L₁ pass through (-4, 1)? Explain your answer.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find h and k.',
        strategy: 'Equate x-intercepts to find h, then apply m₁ × m₂ = -1 to find k.',
        steps: [
          {
            title: 'Equate x-intercepts and apply perpendicularity',
            math: '11/h = -11/2 ⇒ h = -2; (-(-2)/k)(-2) = -1 ⇒ -4/k = -1 ⇒ k = 4',
            explanation: 'So h = -2, k = 4, and L₁ is -2x + 4y - 11 = 0.',
          },
        ],
        answer: 'h = -2, k = 4',
      },
      {
        label: '(b)',
        prompt: 'Test whether (-4, 1) lies on L₁.',
        strategy: 'Substitute (-4, 1) into -2x + 4y - 11.',
        steps: [
          {
            title: 'Evaluate LHS at (-4, 1)',
            math: 'LHS = -2(-4) + 4(1) - 11 = 8 + 4 - 11 = 1 ≠ 0',
            explanation: 'Since LHS ≠ 0, no, L₁ does not pass through (-4, 1).',
          },
        ],
        answer: 'no',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L₁ ⊥ L₂ at (-5.5, 0) & Point (-4, 1)',
      curves: [
        { kind: 'linear', m: 0.5, c: 2.75, label: 'L₁', color: '#0284c7' },
        { kind: 'linear', m: -2, c: -11, label: 'L₂', color: '#f59e0b' },
      ],
      points: [
        { x: -5.5, y: 0, label: '(-5.5, 0)', color: '#10b981' },
        { x: -4, y: 1, label: '(-4, 1) ∉ L₁', color: '#dc2626' },
      ],
      xRange: [-10, 2],
      yRange: [-6, 6],
    },
  },
  {
    id: 'ch3-rev-22',
    exerciseId: 'ch3_revision',
    number: 'Q22',
    page: '3.55',
    level: 'Level 1',
    topic: 'Number of Intersections (Coincident)',
    statement: 'Find the number of points of intersection of 3x - 5y + 15 = 0 and y = (3/5)x + 3. If they have one point of intersection, find its coordinates.',
    parts: [
      {
        label: 'Main',
        prompt: 'Compare slopes and y-intercepts.',
        strategy: 'Rewrite 3x - 5y + 15 = 0 in slope-intercept form.',
        steps: [
          {
            title: 'Compare equations',
            math: '3x - 5y + 15 = 0 ⇒ y = (3/5)x + 3 (identical to second line)',
            explanation: 'Same slope and same y-intercept ⇒ infinitely many points of intersection.',
          },
        ],
        answer: 'an infinite number of points of intersection',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Coincident Lines y = (3/5)x + 3',
      curves: [{ kind: 'linear', m: 0.6, c: 3, label: 'y = (3/5)x + 3', color: '#0284c7' }],
      xRange: [-8, 4],
      yRange: [-2, 6],
    },
  },
  {
    id: 'ch3-rev-23',
    exerciseId: 'ch3_revision',
    number: 'Q23',
    page: '3.55',
    level: 'Level 1',
    topic: 'Number & Coordinates of Intersection',
    statement: 'Find the number of points of intersection of x - 3y + 7 = 0 and 2x - y - 11 = 0. If they have one point of intersection, find its coordinates.',
    parts: [
      {
        label: 'Main',
        prompt: 'Check slopes and solve simultaneously.',
        strategy: 'Slopes 1/3 ≠ 2 ⇒ one intersection; eliminate x using 2L₁ - L₂.',
        steps: [
          {
            title: 'Solve simultaneously',
            math: '2(x - 3y + 7) - (2x - y - 11) = 0 ⇒ -5y + 25 = 0 ⇒ y = 5; x = 3(5) - 7 = 8 ⇒ (8, 5)',
            explanation: 'One point of intersection at (8, 5).',
          },
        ],
        answer: 'one point of intersection, (8, 5)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Intersection (8, 5)',
      curves: [
        { kind: 'linear', m: 1 / 3, c: 7 / 3, label: 'x - 3y + 7 = 0', color: '#0284c7' },
        { kind: 'linear', m: 2, c: -11, label: '2x - y - 11 = 0', color: '#f59e0b' },
      ],
      points: [{ x: 8, y: 5, label: '(8, 5)', color: '#10b981' }],
      xRange: [-2, 12],
      yRange: [-4, 10],
    },
  },
  {
    id: 'ch3-rev-24',
    exerciseId: 'ch3_revision',
    number: 'Q24',
    page: '3.55',
    level: 'Level 1',
    topic: 'Number of Intersections (Parallel)',
    statement: 'Find the number of points of intersection of 2x + 7y = 56 and 2x + 7y + 56 = 0. If they have one point of intersection, find its coordinates.',
    parts: [
      {
        label: 'Main',
        prompt: 'Compare slopes and y-intercepts.',
        strategy: 'Both have slope -2/7; compare their y-intercepts 8 and -8.',
        steps: [
          {
            title: 'Compare slopes and y-intercepts',
            math: 'm₁ = m₂ = -2/7; c₁ = 8 ≠ c₂ = -8',
            explanation: 'Distinct parallel lines have no points of intersection.',
          },
        ],
        answer: 'no points of intersection',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Parallel Lines (No Intersection)',
      curves: [
        { kind: 'linear', m: -2 / 7, c: 8, label: '2x + 7y = 56', color: '#0284c7' },
        { kind: 'linear', m: -2 / 7, c: -8, label: '2x + 7y + 56 = 0', color: '#f59e0b' },
      ],
      xRange: [-14, 14],
      yRange: [-12, 12],
    },
  },
  {
    id: 'ch3-rev-25',
    exerciseId: 'ch3_revision',
    number: 'Q25',
    page: '3.55',
    level: 'Level 1',
    topic: 'Fractional Intersection Coordinates',
    statement: 'Find the number of points of intersection of 2x - 4y = 19 and 6x + 7y = 0. If they have one point of intersection, find its coordinates.',
    parts: [
      {
        label: 'Main',
        prompt: 'Check slopes and solve simultaneously.',
        strategy: 'Slopes 1/2 ≠ -6/7 ⇒ one intersection; compute L₂ - 3L₁.',
        steps: [
          {
            title: 'Solve simultaneously',
            math: '(6x + 7y) - 3(2x - 4y) = 0 - 57 ⇒ 19y = -57 ⇒ y = -3; 6x = 21 ⇒ x = 7/2 ⇒ (7/2, -3)',
            explanation: 'One point of intersection at (7/2, -3).',
          },
        ],
        answer: 'one point of intersection, (7/2, -3)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Intersection (7/2, -3)',
      curves: [
        { kind: 'linear', m: 0.5, c: -4.75, label: '2x - 4y = 19', color: '#0284c7' },
        { kind: 'linear', m: -6 / 7, c: 0, label: '6x + 7y = 0', color: '#f59e0b' },
      ],
      points: [{ x: 3.5, y: -3, label: '(7/2, -3)', color: '#10b981' }],
      xRange: [-4, 10],
      yRange: [-7, 4],
    },
  },
  {
    id: 'ch3-rev-26',
    exerciseId: 'ch3_revision',
    number: 'Q26',
    page: '3.55',
    level: 'Level 1',
    topic: 'Intersection & Collinearity Proof',
    statement: 'The straight lines x + y + 2 = 0 and 2x - 3y + 34 = 0 intersect at A. (a) Find the coordinates of A. (b) Show that O, A and B(24, -18) are collinear, where O is the origin.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find A.',
        strategy: 'Compute 3L₁ + L₂ to eliminate y.',
        steps: [
          {
            title: 'Solve simultaneously',
            math: '3(x + y + 2) + (2x - 3y + 34) = 0 ⇒ 5x + 40 = 0 ⇒ x = -8; y = 6 ⇒ A(-8, 6)',
            explanation: 'So A is (-8, 6).',
          },
        ],
        answer: '(-8, 6)',
      },
      {
        label: '(b)',
        prompt: 'Show O(0, 0), A(-8, 6), and B(24, -18) are collinear.',
        strategy: 'Compare m_OA and m_OB.',
        steps: [
          {
            title: 'Compare slopes m_OA and m_OB',
            math: 'm_OA = 6/(-8) = -3/4; m_OB = -18/24 = -3/4 ⇒ m_OA = m_OB',
            explanation: 'Since OA and OB have equal slopes and share O, O, A, and B are collinear.',
          },
        ],
        answer: 'm_OA = m_OB = -3/4 (collinear shown)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Collinear O, A(-8, 6) & B(24, -18)',
      curves: [{ kind: 'linear', m: -0.75, c: 0, label: 'Line OAB', color: '#10b981' }],
      points: [
        { x: -8, y: 6, label: 'A(-8, 6)', color: '#dc2626' },
        { x: 0, y: 0, label: 'O(0, 0)', color: '#94a3b8' },
        { x: 24, y: -18, label: 'B(24, -18)', color: '#0284c7' },
      ],
      xRange: [-12, 28],
      yRange: [-22, 10],
    },
  },
  {
    id: 'ch3-rev-27',
    exerciseId: 'ch3_revision',
    number: 'Q27',
    page: '3.55',
    level: 'Level 1',
    topic: 'Intersection & Horizontal Line',
    statement: 'The straight lines 2x + 5y + 40 = 0 and 4x - 3y + 28 = 0 intersect at P. (a) Find the coordinates of P. (b) Find the equation of the straight line passing through P and Q(10, -4).',
    parts: [
      {
        label: '(a)',
        prompt: 'Find P.',
        strategy: 'Compute 2L₁ - L₂ to eliminate x.',
        steps: [
          {
            title: 'Solve simultaneously',
            math: '2(2x + 5y + 40) - (4x - 3y + 28) = 0 ⇒ 13y + 52 = 0 ⇒ y = -4; x = -10 ⇒ P(-10, -4)',
            explanation: 'So P is (-10, -4).',
          },
        ],
        answer: '(-10, -4)',
      },
      {
        label: '(b)',
        prompt: 'Find line PQ through P(-10, -4) and Q(10, -4).',
        strategy: 'Both points share the same y-coordinate -4.',
        steps: [
          {
            title: 'Write horizontal line equation',
            math: 'y_P = y_Q = -4 ⇒ y = -4',
            explanation: 'Line PQ is the horizontal line y = -4.',
          },
        ],
        answer: 'y = -4',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'P(-10, -4), Q(10, -4) & Line y = -4',
      curves: [
        { kind: 'linear', m: -0.4, c: -8, label: '2x + 5y + 40 = 0', color: '#94a3b8', dashed: true },
        { kind: 'linear', m: 4 / 3, c: 28 / 3, label: '4x - 3y + 28 = 0', color: '#94a3b8', dashed: true },
        { kind: 'linear', m: 0, c: -4, label: 'PQ: y = -4', color: '#0284c7' },
      ],
      points: [
        { x: -10, y: -4, label: 'P(-10, -4)', color: '#dc2626' },
        { x: 10, y: -4, label: 'Q(10, -4)', color: '#10b981' },
      ],
      xRange: [-14, 14],
      yRange: [-10, 4],
    },
  },
  {
    id: 'ch3-rev-28',
    exerciseId: 'ch3_revision',
    number: 'Q28',
    page: '3.55',
    level: 'Level 1',
    topic: 'Parallel Line with Fractional y-intercept',
    statement: 'The straight line L₁ is parallel to 2x + 7y - 15 = 0 and has y-intercept -3/2. Find the equation of L₁ in general form.',
    parts: [
      {
        label: 'Main',
        prompt: 'Write the equation of L₁ in general form.',
        strategy: 'Slope is -2/7 and y-intercept is -3/2.',
        steps: [
          {
            title: 'Write equation and clear fractions',
            math: 'y = -(2/7)x - 3/2 ⇒ 14y = -4x - 21 ⇒ 4x + 14y + 21 = 0',
            explanation: 'Multiplying through by 14 gives integer coefficients.',
          },
        ],
        answer: '4x + 14y + 21 = 0',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'L₁: 4x + 14y + 21 = 0',
      curves: [
        { kind: 'linear', m: -2 / 7, c: 15 / 7, label: '2x + 7y - 15 = 0', color: '#94a3b8', dashed: true },
        { kind: 'linear', m: -2 / 7, c: -1.5, label: 'L₁', color: '#0284c7' },
      ],
      points: [{ x: 0, y: -1.5, label: '(0, -3/2)', color: '#dc2626' }],
      xRange: [-8, 8],
      yRange: [-4, 5],
    },
  },
  {
    id: 'ch3-rev-29',
    exerciseId: 'ch3_revision',
    number: 'Q29',
    page: '3.55',
    level: 'Level 1',
    topic: 'Parallel Lines & Comparing y-intercept Distances',
    statement: 'The straight lines L₁: 2x - 5y + 10 = 0 and L₂: 6x + ky - 20 = 0 do not intersect. (a) Find the value of k. (b) L₁ and L₂ cut the y-axis at A and B respectively. Is OA > OB, where O is the origin? Explain your answer.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find k.',
        strategy: 'Equate slopes m₁ = m₂.',
        steps: [
          {
            title: 'Equate slopes',
            math: '2/5 = -6/k ⇒ k = -15',
            explanation: 'So L₂ is 6x - 15y - 20 = 0.',
          },
        ],
        answer: '-15',
      },
      {
        label: '(b)',
        prompt: 'Compare OA and OB.',
        strategy: 'Find the absolute values of the y-intercepts of L₁ and L₂.',
        steps: [
          {
            title: 'Compute OA and OB',
            math: 'A(0, 2) ⇒ OA = 2; B(0, -4/3) ⇒ OB = 4/3; 2 > 4/3 ⇒ OA > OB',
            explanation: 'Yes, OA = 2 is greater than OB = 4/3.',
          },
        ],
        answer: 'yes (OA = 2 > OB = 4/3)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'A(0, 2) and B(0, -4/3) on y-axis',
      curves: [
        { kind: 'linear', m: 0.4, c: 2, label: 'L₁', color: '#0284c7' },
        { kind: 'linear', m: 0.4, c: -4 / 3, label: 'L₂', color: '#f59e0b' },
      ],
      points: [
        { x: 0, y: 2, label: 'A(0, 2)', color: '#0284c7' },
        { x: 0, y: -4 / 3, label: 'B(0, -4/3)', color: '#f59e0b' },
      ],
      xRange: [-6, 6],
      yRange: [-4, 5],
    },
  },
  {
    id: 'ch3-rev-30',
    exerciseId: 'ch3_revision',
    number: 'Q30',
    page: '3.55',
    level: 'Level 1',
    topic: 'Coincident Lines Unknowns',
    statement: 'The straight lines 4x - 5y + 13 = 0 and px + qy - 65 = 0 have an infinite number of points of intersection. Find the values of p and q.',
    parts: [
      {
        label: 'Main',
        prompt: 'Match the constant terms to scale the equation.',
        strategy: 'Multiply 4x - 5y + 13 = 0 by -5 so the constant term becomes -65.',
        steps: [
          {
            title: 'Scale first equation by -5',
            math: '-5(4x - 5y + 13) = 0 ⇒ -20x + 25y - 65 = 0 ⇒ p = -20, q = 25',
            explanation: 'Matching coefficients gives p = -20 and q = 25.',
          },
        ],
        answer: 'p = -20, q = 25',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Coincident Line 4x - 5y + 13 = 0',
      curves: [{ kind: 'linear', m: 0.8, c: 2.6, label: '4x - 5y + 13 = 0', color: '#0284c7' }],
      xRange: [-6, 6],
      yRange: [-3, 7],
    },
  },
];

export const revisionExercise3Group: ExerciseGroup = {
  id: 'ch3_revision',
  code: 'Revision 3',
  title: 'Revision Exercise 3',
  subtitle: 'Comprehensive straight-line mastery from Level 1 to Smart Corner & Cross Topics',
  pages: 'p. 3.53 – 3.57',
  objectives: [
    'Integrate equations of straight lines, general form, transformations, intersections, bounded areas, and triangle centres',
  ],
  questions: [...ch3RevisionLevel1Questions, ...ch3RevisionLevel2Questions],
};
