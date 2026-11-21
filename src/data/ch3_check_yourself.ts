import type { ExerciseGroup } from '../types/math';

export const ch3CheckYourselfGroup: ExerciseGroup = {
  id: 'ch3_check_yourself',
  code: 'Check Yourself',
  title: 'Check Yourself (Chapter 3)',
  subtitle: 'Quick diagnostic check on equations of straight lines, perpendicularity & intersections',
  pages: 'p. 3.52',
  objectives: [
    'Quickly verify mastery of straight-line forms, general form, parallel/perpendicular conditions, and intersection points',
  ],
  questions: [
    {
      id: 'ch3-cy-1',
      exerciseId: 'ch3_check_yourself',
      number: 'Q1',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Intercept Form from Graph',
      statement: 'In the figure, the straight line L cuts the x-axis at (-4, 0) and the y-axis at (0, 3). Find the equation of L.',
      options: [
        'A. 3x - 4y + 12 = 0',
        'B. 3x + 4y - 12 = 0',
        'C. 4x - 3y + 12 = 0',
        'D. 4x + 3y - 12 = 0',
      ],
      correctOption: 'A',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the equation of L from its intercepts -4 and 3.',
          strategy: 'Use intercept form x/a + y/b = 1 with a = -4 and b = 3.',
          steps: [
            {
              title: 'Apply intercept form',
              math: 'x/(-4) + y/3 = 1 ⇒ -3x + 4y = 12 ⇒ 3x - 4y + 12 = 0',
              explanation: 'Multiplying by 12 and moving all terms to one side gives 3x - 4y + 12 = 0 (Option A).',
            },
          ],
          answer: 'A (3x - 4y + 12 = 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L with x-int -4 and y-int 3',
        curves: [{ kind: 'linear', m: 0.75, c: 3, label: 'L: 3x - 4y + 12 = 0', color: '#0284c7' }],
        points: [
          { x: -4, y: 0, label: '(-4, 0)', color: '#dc2626' },
          { x: 0, y: 3, label: '(0, 3)', color: '#10b981' },
        ],
        xRange: [-6, 4],
        yRange: [-2, 6],
      },
    },
    {
      id: 'ch3-cy-2',
      exerciseId: 'ch3_check_yourself',
      number: 'Q2',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Identifying Perpendicular Lines',
      statement: 'Which of the following straight lines is perpendicular to the straight line 2x - 3y - 15 = 0?',
      options: [
        'A. 2x + 3y - 15 = 0',
        'B. 3x - 2y + 15 = 0',
        'C. 4x - 6y + 15 = 0',
        'D. 6x + 4y - 15 = 0',
      ],
      correctOption: 'D',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the line whose slope is the negative reciprocal of 2/3.',
          strategy: 'The given line has slope 2/3, so a perpendicular line must have slope -3/2.',
          steps: [
            {
              title: 'Compute slope of given line and required slope',
              math: 'm_given = -2/(-3) = 2/3 ⇒ m_⊥ = -3/2',
              explanation: 'Check Option D: 6x + 4y - 15 = 0 has slope -6/4 = -3/2.',
            },
          ],
          answer: 'D (6x + 4y - 15 = 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '2x - 3y - 15 = 0 ⊥ 6x + 4y - 15 = 0',
        curves: [
          { kind: 'linear', m: 2 / 3, c: -5, label: '2x - 3y - 15 = 0', color: '#0284c7' },
          { kind: 'linear', m: -1.5, c: 3.75, label: '6x + 4y - 15 = 0', color: '#10b981' },
        ],
        xRange: [-4, 10],
        yRange: [-8, 6],
      },
    },
    {
      id: 'ch3-cy-3',
      exerciseId: 'ch3_check_yourself',
      number: 'Q3',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Parallel Lines (No Intersection)',
      statement: 'If the straight lines x - 5y + 7 = 0 and 5x + ky - 7 = 0 do not intersect, find the value of k.',
      options: ['A. -25', 'B. -1', 'C. 1', 'D. 25'],
      correctOption: 'A',
      parts: [
        {
          label: 'Main',
          prompt: 'Equate the slopes to find k.',
          strategy: 'Lines do not intersect when m₁ = m₂ and c₁ ≠ c₂.',
          steps: [
            {
              title: 'Equate slopes',
              math: '-1/(-5) = -5/k ⇒ 1/5 = -5/k ⇒ k = -25',
              explanation: 'Check y-intercepts: 7/5 ≠ -7/25, so they are distinct parallel lines. Answer is Option A.',
            },
          ],
          answer: 'A (-25)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Parallel Lines when k = -25',
        curves: [
          { kind: 'linear', m: 0.2, c: 1.4, label: 'x - 5y + 7 = 0', color: '#0284c7' },
          { kind: 'linear', m: 0.2, c: -0.28, label: '5x - 25y - 7 = 0', color: '#10b981' },
        ],
        xRange: [-10, 6],
        yRange: [-3, 4],
      },
    },
    {
      id: 'ch3-cy-4',
      exerciseId: 'ch3_check_yourself',
      number: 'Q4',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Deduce Constants from Straight-Line Graph',
      examRef: 'HKDSE 2013 P2 Q14',
      statement: 'The figure shows the graph of the straight line ax + y + b = 0, which slopes downwards, cuts the x-axis between -1 and 0, and cuts the negative y-axis. Which of the following are true? I. a > 0. II. b > 0. III. a > b.',
      options: [
        'A. I and II only',
        'B. I and III only',
        'C. II and III only',
        'D. I, II and III',
      ],
      correctOption: 'D',
      parts: [
        {
          label: 'Main',
          prompt: 'Check statements I, II, and III from the graph.',
          strategy: 'Rewrite as y = -ax - b to read slope -a, y-intercept -b, and x-intercept -b/a.',
          steps: [
            {
              title: 'Check signs of a and b',
              math: 'Slope = -a < 0 ⇒ a > 0 (I true); y-intercept = -b < 0 ⇒ b > 0 (II true)',
              explanation: 'Both a and b are positive.',
            },
            {
              title: 'Use x-intercept between -1 and 0',
              math: '-1 < -b/a < 0 ⇒ b/a < 1; since a > 0, b < a ⇒ a > b (III true)',
              explanation: 'All three statements are true (Option D).',
            },
          ],
          answer: 'D (I, II and III)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'ax + y + b = 0 (-1 < x-int < 0, y-int < 0)',
        curves: [{ kind: 'linear', m: -3, c: -1.5, label: 'ax + y + b = 0', color: '#0284c7' }],
        points: [
          { x: -1, y: 0, label: '(-1, 0)', color: '#94a3b8' },
          { x: -0.5, y: 0, label: '(-b/a, 0)', color: '#dc2626' },
          { x: 0, y: -1.5, label: '(0, -b)', color: '#10b981' },
        ],
        xRange: [-2, 2],
        yRange: [-3, 2],
      },
    },
    {
      id: 'ch3-cy-5',
      exerciseId: 'ch3_check_yourself',
      number: 'Q5',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Four Standard Line Forms',
      statement: 'Find the equation of the straight line L in each of the following cases: (a) L passes through (-2, 6) and its slope is -3. (b) L passes through A(-3, 4) and B(7, -1). (c) L has slope 3/2 and cuts the y-axis at (0, -11). (d) The y-intercept of L is -10 and L is parallel to the x-axis.',
      parts: [
        {
          label: '(a)',
          prompt: 'Line through (-2, 6) with slope -3.',
          strategy: 'Use point-slope form y - y₁ = m(x - x₁).',
          steps: [
            {
              title: 'Apply point-slope form',
              math: 'y - 6 = -3(x + 2) ⇒ y = -3x (or 3x + y = 0)',
              explanation: 'The line passes through the origin with slope -3.',
            },
          ],
          answer: 'y = -3x (or 3x + y = 0)',
        },
        {
          label: '(b)',
          prompt: 'Line through A(-3, 4) and B(7, -1).',
          strategy: 'Find slope first, then apply point-slope form.',
          steps: [
            {
              title: 'Find slope and equation',
              math: 'm = (-1 - 4)/(7 - (-3)) = -5/10 = -1/2 ⇒ y - 4 = -(1/2)(x + 3) ⇒ y = -(1/2)x + 5/2',
              explanation: 'General form: x + 2y - 5 = 0.',
            },
          ],
          answer: 'y = -(1/2)x + 5/2 (or x + 2y - 5 = 0)',
        },
        {
          label: '(c)',
          prompt: 'Line with slope 3/2 and y-intercept -11.',
          strategy: 'Use slope-intercept form y = mx + c directly.',
          steps: [
            {
              title: 'Substitute m = 3/2 and c = -11',
              math: 'y = (3/2)x - 11 (or 3x - 2y - 22 = 0)',
              explanation: 'Directly from slope-intercept form.',
            },
          ],
          answer: 'y = (3/2)x - 11 (or 3x - 2y - 22 = 0)',
        },
        {
          label: '(d)',
          prompt: 'Horizontal line with y-intercept -10.',
          strategy: 'Parallel to the x-axis means y is constant.',
          steps: [
            {
              title: 'Write horizontal line equation',
              math: 'y = -10',
              explanation: 'Every point has y-coordinate -10.',
            },
          ],
          answer: 'y = -10',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Four Lines in Q5 (a)–(d)',
        curves: [
          { kind: 'linear', m: -3, c: 0, label: '(a) y = -3x', color: '#0284c7' },
          { kind: 'linear', m: -0.5, c: 2.5, label: '(b) x + 2y - 5 = 0', color: '#10b981' },
          { kind: 'linear', m: 1.5, c: -11, label: '(c) y = (3/2)x - 11', color: '#f59e0b' },
          { kind: 'linear', m: 0, c: -10, label: '(d) y = -10', color: '#9333ea' },
        ],
        xRange: [-6, 12],
        yRange: [-14, 10],
      },
    },
    {
      id: 'ch3-cy-6',
      exerciseId: 'ch3_check_yourself',
      number: 'Q6',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Vertical & Horizontal Intersection + Line through Origin',
      statement: 'The straight lines x = 16 and y = -20 intersect at the point P. (a) Write down the coordinates of P. (b) Find the equation of the straight line passing through P and the origin O.',
      parts: [
        {
          label: '(a)',
          prompt: 'Write down P.',
          strategy: 'The intersection of x = h and y = k is simply (h, k).',
          steps: [
            {
              title: 'Read intersection coordinates',
              math: 'P = (16, -20)',
              explanation: 'x = 16 and y = -20 simultaneously.',
            },
          ],
          answer: '(16, -20)',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of line OP.',
          strategy: 'Compute slope m = y_P / x_P and write y = mx.',
          steps: [
            {
              title: 'Find slope and equation',
              math: 'm = -20/16 = -5/4 ⇒ y = -(5/4)x (or 5x + 4y = 0)',
              explanation: 'Since it passes through O(0, 0), the y-intercept is 0.',
            },
          ],
          answer: 'y = -(5/4)x (or 5x + 4y = 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'P(16, -20) & Line OP',
        curves: [
          { kind: 'vertical', x: 16, label: 'x = 16', color: '#94a3b8', dashed: true },
          { kind: 'linear', m: 0, c: -20, label: 'y = -20', color: '#94a3b8', dashed: true },
          { kind: 'linear', m: -1.25, c: 0, label: 'OP: 5x + 4y = 0', color: '#0284c7' },
        ],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#10b981' },
          { x: 16, y: -20, label: 'P(16, -20)', color: '#dc2626' },
        ],
        xRange: [-4, 22],
        yRange: [-26, 6],
      },
    },
    {
      id: 'ch3-cy-7',
      exerciseId: 'ch3_check_yourself',
      number: 'Q7',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Mid-point of Intercepts',
      statement: 'The straight line 5x - 8y - 80 = 0 cuts the x-axis and the y-axis at A and B respectively. Find the coordinates of the mid-point of AB.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find A, B, and the mid-point of AB.',
          strategy: 'Find the x- and y-intercepts, then average their coordinates.',
          steps: [
            {
              title: 'Find intercepts A and B',
              math: 'y = 0 ⇒ 5x = 80 ⇒ A(16, 0); x = 0 ⇒ -8y = 80 ⇒ B(0, -10)',
              explanation: 'A is (16, 0) and B is (0, -10).',
            },
            {
              title: 'Compute mid-point of AB',
              math: 'M = ((16 + 0)/2, (0 - 10)/2) = (8, -5)',
              explanation: 'The mid-point of AB is (8, -5).',
            },
          ],
          answer: '(8, -5)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Mid-point M(8, -5) of AB',
        curves: [{ kind: 'linear', m: 5 / 8, c: -10, label: '5x - 8y - 80 = 0', color: '#0284c7' }],
        points: [
          { x: 16, y: 0, label: 'A(16, 0)', color: '#10b981' },
          { x: 0, y: -10, label: 'B(0, -10)', color: '#10b981' },
          { x: 8, y: -5, label: 'M(8, -5)', color: '#dc2626' },
        ],
        xRange: [-4, 20],
        yRange: [-14, 4],
      },
    },
    {
      id: 'ch3-cy-8',
      exerciseId: 'ch3_check_yourself',
      number: 'Q8',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Parallel Lines & Point Verification',
      statement: 'It is given that the straight line L₁: 10x + 4y - 11 = 0 is parallel to the straight line L₂: hx - 2y + 20 = 0. (a) Find the value of h. (b) Does L₂ pass through (-2, 15)? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find h.',
          strategy: 'Equate slopes m₁ = m₂.',
          steps: [
            {
              title: 'Equate slopes',
              math: '-10/4 = -h/(-2) ⇒ -5/2 = h/2 ⇒ h = -5',
              explanation: 'So L₂ is -5x - 2y + 20 = 0 (or 5x + 2y - 20 = 0).',
            },
          ],
          answer: '-5',
        },
        {
          label: '(b)',
          prompt: 'Check if (-2, 15) lies on L₂.',
          strategy: 'Substitute x = -2, y = 15 into L₂ and check if LHS = 0.',
          steps: [
            {
              title: 'Substitute (-2, 15) into -5x - 2y + 20',
              math: 'LHS = -5(-2) - 2(15) + 20 = 10 - 30 + 20 = 0 = RHS',
              explanation: 'Since (-2, 15) satisfies the equation of L₂, yes, L₂ passes through (-2, 15).',
            },
          ],
          answer: 'yes',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ ∥ L₂ Passing Through (-2, 15)',
        curves: [
          { kind: 'linear', m: -2.5, c: 2.75, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -2.5, c: 10, label: 'L₂', color: '#10b981' },
        ],
        points: [{ x: -2, y: 15, label: '(-2, 15)', color: '#dc2626' }],
        xRange: [-6, 8],
        yRange: [-4, 18],
      },
    },
    {
      id: 'ch3-cy-9',
      exerciseId: 'ch3_check_yourself',
      number: 'Q9',
      page: '3.52',
      level: 'Check Yourself',
      topic: 'Intersection & Perpendicular Bisector',
      statement: 'The straight lines L₁: 2x + y - 1 = 0 and L₂: 3x - 4y + 26 = 0 intersect at the point P. (a) Find the coordinates of P. (b) Find the equation of the perpendicular bisector of PQ, where the coordinates of Q are (-4, -1).',
      parts: [
        {
          label: '(a)',
          prompt: 'Find P.',
          strategy: 'Eliminate y by computing 4 × L₁ + L₂.',
          steps: [
            {
              title: 'Solve L₁ and L₂ simultaneously',
              math: '4(2x + y - 1) + (3x - 4y + 26) = 0 ⇒ 11x + 22 = 0 ⇒ x = -2; y = 1 - 2(-2) = 5',
              explanation: 'Thus P is (-2, 5).',
            },
          ],
          answer: '(-2, 5)',
        },
        {
          label: '(b)',
          prompt: 'Find the perpendicular bisector of PQ where P(-2, 5) and Q(-4, -1).',
          strategy: 'Find the mid-point M of PQ and the negative reciprocal of m_PQ.',
          steps: [
            {
              title: 'Find mid-point and perpendicular slope',
              math: 'M = ((-2 - 4)/2, (5 - 1)/2) = (-3, 2); m_PQ = (5 - (-1))/(-2 - (-4)) = 3 ⇒ m_⊥ = -1/3',
              explanation: 'Perpendicular bisector passes through (-3, 2) with slope -1/3.',
            },
            {
              title: 'Write equation',
              math: 'y - 2 = -(1/3)(x + 3) ⇒ x + 3y - 3 = 0',
              explanation: 'Equation is x + 3y - 3 = 0 (or y = -(1/3)x + 1).',
            },
          ],
          answer: 'x + 3y - 3 = 0 (or y = -(1/3)x + 1)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'P(-2, 5), Q(-4, -1) & Perp. Bisector',
        curves: [
          { kind: 'linear', m: -2, c: 1, label: 'L₁', color: '#94a3b8', dashed: true },
          { kind: 'linear', m: 0.75, c: 6.5, label: 'L₂', color: '#94a3b8', dashed: true },
          { kind: 'linear', m: -1 / 3, c: 1, label: 'Perp. bisector: x + 3y - 3 = 0', color: '#10b981' },
        ],
        points: [
          { x: -2, y: 5, label: 'P(-2, 5)', color: '#0284c7' },
          { x: -4, y: -1, label: 'Q(-4, -1)', color: '#0284c7' },
          { x: -3, y: 2, label: 'M(-3, 2)', color: '#dc2626' },
        ],
        xRange: [-8, 6],
        yRange: [-4, 8],
      },
    },
  ],
};
