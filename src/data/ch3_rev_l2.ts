import type { QuestionItem } from '../types/math';

export const ch3RevisionLevel2Questions: QuestionItem[] = [
  {
    id: 'ch3-rev-31',
    exerciseId: 'ch3_revision',
    number: 'Q31',
    page: '3.56',
    level: 'Level 2',
    topic: 'Intercepts, Mid-point & Line Equation',
    statement: 'The straight line L₁: 2x - 7y - 28 = 0 cuts the x-axis and the y-axis at A and B respectively. (a) Find the coordinates of A and B. (b) Find the equation of the straight line passing through the mid-point of AB with y-intercept -9.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find A and B.',
        strategy: 'Put y = 0 for A and x = 0 for B.',
        steps: [
          {
            title: 'Find x- and y-intercepts',
            math: 'y = 0 ⇒ 2x = 28 ⇒ A(14, 0); x = 0 ⇒ -7y = 28 ⇒ B(0, -4)',
            explanation: 'A is (14, 0) and B is (0, -4).',
          },
        ],
        answer: 'A: (14, 0), B: (0, -4)',
      },
      {
        label: '(b)',
        prompt: 'Find the line through mid-point of AB and (0, -9).',
        strategy: 'Compute mid-point M(7, -2), find slope from (0, -9) to (7, -2), then write slope-intercept form.',
        steps: [
          {
            title: 'Find mid-point M and slope',
            math: 'M = (7, -2); m = (-2 - (-9))/(7 - 0) = 7/7 = 1',
            explanation: 'Slope is 1 and y-intercept is -9.',
          },
          {
            title: 'Write equation',
            math: 'y = x - 9 (or x - y - 9 = 0)',
            explanation: 'Equation is y = x - 9.',
          },
        ],
        answer: 'y = x - 9 (or x - y - 9 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Mid-point M(7, -2) & Line y = x - 9',
      curves: [
        { kind: 'linear', m: 2 / 7, c: -4, label: 'L₁', color: '#0284c7' },
        { kind: 'linear', m: 1, c: -9, label: 'y = x - 9', color: '#10b981' },
      ],
      points: [
        { x: 14, y: 0, label: 'A(14, 0)', color: '#0284c7' },
        { x: 0, y: -4, label: 'B(0, -4)', color: '#0284c7' },
        { x: 7, y: -2, label: 'M(7, -2)', color: '#dc2626' },
      ],
      xRange: [-2, 16],
      yRange: [-11, 4],
    },
  },
  {
    id: 'ch3-rev-32',
    exerciseId: 'ch3_revision',
    number: 'Q32',
    page: '3.56',
    level: 'Level 2',
    topic: 'Unknown Coefficient & Perpendicular Bisector',
    statement: 'The point P(14, -2) lies on the straight line L: 4x + ky - 42 = 0, and L cuts the y-axis at Q. (a) Find the value of k. (b) Find the equation of the perpendicular bisector of PQ.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find k.',
        strategy: 'Substitute P(14, -2) into L.',
        steps: [
          {
            title: 'Substitute P(14, -2)',
            math: '4(14) + k(-2) - 42 = 0 ⇒ 14 - 2k = 0 ⇒ k = 7',
            explanation: 'So L is 4x + 7y - 42 = 0.',
          },
        ],
        answer: '7',
      },
      {
        label: '(b)',
        prompt: 'Find Q and the perpendicular bisector of PQ.',
        strategy: 'Put x = 0 in L to find Q(0, 6), take mid-point M(7, 2), and use slope perpendicular to L.',
        steps: [
          {
            title: 'Find Q, mid-point M, and perpendicular slope',
            math: 'Q(0, 6); M = (7, 2); m_L = -4/7 ⇒ m_⊥ = 7/4',
            explanation: 'Perpendicular bisector passes through (7, 2) with slope 7/4.',
          },
          {
            title: 'Write equation',
            math: 'y - 2 = (7/4)(x - 7) ⇒ y = (7/4)x - 41/4 (or 7x - 4y - 41 = 0)',
            explanation: 'General form is 7x - 4y - 41 = 0.',
          },
        ],
        answer: 'y = (7/4)x - 41/4 (or 7x - 4y - 41 = 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Perpendicular Bisector of PQ',
      curves: [
        { kind: 'linear', m: -4 / 7, c: 6, label: 'L: 4x + 7y - 42 = 0', color: '#0284c7' },
        { kind: 'linear', m: 1.75, c: -10.25, label: 'Perp. bisector', color: '#10b981' },
      ],
      points: [
        { x: 14, y: -2, label: 'P(14, -2)', color: '#0284c7' },
        { x: 0, y: 6, label: 'Q(0, 6)', color: '#0284c7' },
        { x: 7, y: 2, label: 'M(7, 2)', color: '#dc2626' },
      ],
      xRange: [-2, 16],
      yRange: [-12, 10],
    },
  },
  {
    id: 'ch3-rev-33',
    exerciseId: 'ch3_revision',
    number: 'Q33',
    page: '3.56',
    level: 'Level 2',
    topic: 'Perpendicular Lines on x-axis & Bounded Area',
    examRef: 'HKDSE 2016 P2 Q25',
    statement: 'The straight lines L₁: 6x - 8y - 3 = 0 and L₂: px + qy - 2 = 0 are perpendicular to each other and intersect at a point on the x-axis. (a) Find the values of p and q. (b) Find the area of the region bounded by L₂, the straight line x = 11 and the x-axis.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find p and q.',
        strategy: 'Equate x-intercepts to find p, then use m₁ × m₂ = -1 to find q.',
        steps: [
          {
            title: 'Equate x-intercepts to find p',
            math: 'x-int of L₁ is 3/6 = 1/2; x-int of L₂ is 2/p = 1/2 ⇒ p = 4',
            explanation: 'Both lines cross the x-axis at (1/2, 0).',
          },
          {
            title: 'Use perpendicularity to find q',
            math: '(6/8)(-4/q) = -1 ⇒ -3/q = -1 ⇒ q = 3',
            explanation: 'So L₂ is 4x + 3y - 2 = 0.',
          },
        ],
        answer: 'p = 4, q = 3',
      },
      {
        label: '(b)',
        prompt: 'Find the area bounded by L₂, x = 11, and the x-axis.',
        strategy: 'Find the three vertices: (0.5, 0), (11, 0), and L₂ ∩ (x = 11).',
        steps: [
          {
            title: 'Find intersection of L₂ and x = 11',
            math: '4(11) + 3y - 2 = 0 ⇒ 3y = -42 ⇒ y = -14 ⇒ (11, -14)',
            explanation: 'Base along x-axis is 11 - 0.5 = 10.5; height is |-14| = 14.',
          },
          {
            title: 'Compute area',
            math: 'Area = (1/2) × 10.5 × 14 = 73.5',
            explanation: 'Area is 73.5 sq. units.',
          },
        ],
        answer: '73.5 sq. units',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Bounded Triangle Area = 73.5',
      curves: [
        { kind: 'linear', m: 0.75, c: -3 / 8, label: 'L₁', color: '#94a3b8', dashed: true },
        { kind: 'linear', m: -4 / 3, c: 2 / 3, label: 'L₂: 4x + 3y - 2 = 0', color: '#0284c7' },
        { kind: 'vertical', x: 11, label: 'x = 11', color: '#f59e0b' },
      ],
      points: [
        { x: 0.5, y: 0, label: '(0.5, 0)', color: '#10b981' },
        { x: 11, y: 0, label: '(11, 0)', color: '#10b981' },
        { x: 11, y: -14, label: '(11, -14)', color: '#dc2626' },
      ],
      polygons: [
        {
          points: [
            { x: 0.5, y: 0 },
            { x: 11, y: 0 },
            { x: 11, y: -14 },
          ],
          fill: 'rgba(14, 165, 233, 0.2)',
          stroke: '#0ea5e9',
          label: 'Area = 73.5',
        },
      ],
      xRange: [-2, 14],
      yRange: [-16, 4],
    },
  },
  {
    id: 'ch3-rev-34',
    exerciseId: 'ch3_revision',
    number: 'Q34',
    page: '3.56',
    level: 'Level 2',
    topic: 'Perpendicular Lines on y-axis & Triangle Area',
    examRef: 'HKDSE 2018 P2 Q26',
    statement: 'The straight line L₁: 2x - 5y - 100 = 0 is perpendicular to the straight line L₂, and they intersect at a point on the y-axis. (a) Find the equation of L₂ in general form. (b) Find the area of the region bounded by L₁, L₂ and the x-axis.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find the equation of L₂ in general form.',
        strategy: 'Find the y-intercept of L₁ and the negative reciprocal slope for L₂.',
        steps: [
          {
            title: 'Find y-intercept and slope of L₂',
            math: 'y-int of L₁ is -20; m₁ = 2/5 ⇒ m₂ = -5/2 ⇒ y = -(5/2)x - 20 ⇒ 5x + 2y + 40 = 0',
            explanation: 'General form of L₂ is 5x + 2y + 40 = 0.',
          },
        ],
        answer: '5x + 2y + 40 = 0',
      },
      {
        label: '(b)',
        prompt: 'Find the area bounded by L₁, L₂ and the x-axis.',
        strategy: 'Find both x-intercepts along the base and use |-20| = 20 as the height.',
        steps: [
          {
            title: 'Find x-intercepts and area',
            math: 'L₁: (50, 0); L₂: (-8, 0) ⇒ base = 50 - (-8) = 58; Area = (1/2) × 58 × 20 = 580',
            explanation: 'The bounded triangle has area 580 sq. units.',
          },
        ],
        answer: '580 sq. units',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Bounded Triangle Area = 580',
      curves: [
        { kind: 'linear', m: 0.4, c: -20, label: 'L₁', color: '#0284c7' },
        { kind: 'linear', m: -2.5, c: -20, label: 'L₂', color: '#f59e0b' },
      ],
      points: [
        { x: 50, y: 0, label: '(50, 0)', color: '#0284c7' },
        { x: -8, y: 0, label: '(-8, 0)', color: '#f59e0b' },
        { x: 0, y: -20, label: '(0, -20)', color: '#dc2626' },
      ],
      polygons: [
        {
          points: [
            { x: -8, y: 0 },
            { x: 50, y: 0 },
            { x: 0, y: -20 },
          ],
          fill: 'rgba(14, 165, 233, 0.2)',
          stroke: '#0ea5e9',
          label: 'Area = 580',
        },
      ],
      xRange: [-14, 56],
      yRange: [-26, 8],
    },
  },
  {
    id: 'ch3-rev-35',
    exerciseId: 'ch3_revision',
    number: 'Q35',
    page: '3.56',
    level: 'Level 2',
    topic: 'Quadratic Parallel Condition & Parallelogram Area',
    statement: 'It is given that the straight lines L₁: kx - 3y + 15 = 0 and L₂: 5x + (2 - k)y + 30 = 0 are parallel. (a) Find the possible values of k. (b) Find the possible areas of the parallelogram bounded by L₁, L₂, the straight line y = -5 and the x-axis.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find all possible values of k.',
        strategy: 'Equate slopes m₁ = m₂ to form a quadratic equation in k.',
        steps: [
          {
            title: 'Equate slopes and solve quadratic',
            math: 'k/3 = -5/(2 - k) ⇒ k(2 - k) = -15 ⇒ k² - 2k - 15 = 0 ⇒ (k + 3)(k - 5) = 0 ⇒ k = -3 or 5',
            explanation: 'Verify neither value makes L₁ and L₂ coincident: both give distinct y-intercepts.',
          },
        ],
        answer: '-3, 5',
      },
      {
        label: '(b)',
        prompt: 'Find the parallelogram area for each k.',
        strategy: 'Height between y = 0 and y = -5 is 5; base is the distance between the two x-intercepts.',
        steps: [
          {
            title: 'Case 1: k = -3',
            math: 'L₁: -3x - 3y + 15 = 0 (x-int = 5); L₂: 5x + 5y + 30 = 0 (x-int = -6) ⇒ Area = |5 - (-6)| × 5 = 55',
            explanation: 'When k = -3, base = 11 and area = 55 sq. units.',
          },
          {
            title: 'Case 2: k = 5',
            math: 'L₁: 5x - 3y + 15 = 0 (x-int = -3); L₂: 5x - 3y + 30 = 0 (x-int = -6) ⇒ Area = |-3 - (-6)| × 5 = 15',
            explanation: 'When k = 5, base = 3 and area = 15 sq. units.',
          },
        ],
        answer: '55 sq. units, 15 sq. units',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Parallelogram for k = 5 (Area = 15)',
      curves: [
        { kind: 'linear', m: 5 / 3, c: 5, label: 'L₁ (k = 5)', color: '#0284c7' },
        { kind: 'linear', m: 5 / 3, c: 10, label: 'L₂ (k = 5)', color: '#f59e0b' },
        { kind: 'linear', m: 0, c: -5, label: 'y = -5', color: '#94a3b8', dashed: true },
      ],
      polygons: [
        {
          points: [
            { x: -3, y: 0 },
            { x: -6, y: 0 },
            { x: -9, y: -5 },
            { x: -6, y: -5 },
          ],
          fill: 'rgba(14, 165, 233, 0.2)',
          stroke: '#0ea5e9',
          label: 'Area = 15',
        },
      ],
      xRange: [-12, 4],
      yRange: [-7, 12],
    },
  },
  {
    id: 'ch3-rev-36',
    exerciseId: 'ch3_revision',
    number: 'Q36',
    page: '3.56',
    level: 'Level 2',
    topic: 'Perpendicularity, Triangle Area & Shortest Distance',
    statement: 'The straight line L₁: kx - 4y + 36 = 0 passes through A(4, 12) and cuts the x-axis at B. Another straight line L₂ intersects L₁ at B and passes through C(-3, -12). (a) Is L₁ perpendicular to L₂? Explain your answer. (b) Find (i) the area of △ABC; (ii) the shortest distance from B to AC.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find k and B, then test whether L₁ ⊥ L₂.',
        strategy: 'Substitute A(4, 12) to find k, find B on the x-axis, and multiply slopes m₁ and m_BC.',
        steps: [
          {
            title: 'Find k and B',
            math: '4k - 4(12) + 36 = 0 ⇒ 4k = 12 ⇒ k = 3; L₁: 3x - 4y + 36 = 0 ⇒ B(-12, 0)',
            explanation: 'Slope of L₁ is 3/4, and B is (-12, 0).',
          },
          {
            title: 'Check m₁ × m₂',
            math: 'm₂ = (-12 - 0)/(-3 - (-12)) = -12/9 = -4/3 ⇒ m₁ × m₂ = (3/4)(-4/3) = -1',
            explanation: 'Since m₁ × m₂ = -1, yes, L₁ is perpendicular to L₂.',
          },
        ],
        answer: 'yes (m₁ × m₂ = -1)',
      },
      {
        label: '(b)(i)',
        prompt: 'Find the area of △ABC.',
        strategy: 'Since ∠ABC = 90°, Area = (1/2) × AB × BC.',
        steps: [
          {
            title: 'Compute AB, BC, and area',
            math: 'AB = √(16² + 12²) = 20; BC = √(9² + (-12)²) = 15 ⇒ Area = (1/2) × 20 × 15 = 150',
            explanation: 'Area of △ABC is 150 sq. units.',
          },
        ],
        answer: '150 sq. units',
      },
      {
        label: '(b)(ii)',
        prompt: 'Find the shortest distance h from B to AC.',
        strategy: 'Use Area = (1/2) × AC × h where AC = √(AB² + BC²) = 25.',
        steps: [
          {
            title: 'Equate area expressions',
            math: 'AC = √(20² + 15²) = 25 ⇒ (1/2)(25)h = 150 ⇒ h = 12',
            explanation: 'The shortest distance from B to AC is 12 units.',
          },
        ],
        answer: '12 units',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Right Triangle △ABC (Area = 150, h = 12)',
      curves: [
        { kind: 'linear', m: 0.75, c: 9, label: 'L₁ (AB)', color: '#0284c7' },
        { kind: 'linear', m: -4 / 3, c: -16, label: 'L₂ (BC)', color: '#10b981' },
      ],
      points: [
        { x: 4, y: 12, label: 'A(4, 12)', color: '#0284c7' },
        { x: -12, y: 0, label: 'B(-12, 0)', color: '#dc2626' },
        { x: -3, y: -12, label: 'C(-3, -12)', color: '#10b981' },
      ],
      polygons: [
        {
          points: [
            { x: 4, y: 12 },
            { x: -12, y: 0 },
            { x: -3, y: -12 },
          ],
          fill: 'rgba(14, 165, 233, 0.16)',
          stroke: '#0ea5e9',
        },
      ],
      xRange: [-16, 10],
      yRange: [-16, 16],
    },
  },
  {
    id: 'ch3-rev-37',
    exerciseId: 'ch3_revision',
    number: 'Q37',
    page: '3.56',
    level: 'Level 2',
    topic: 'Triangle Bounded by Three Lines (Isosceles Proof)',
    statement: '△ABC is bounded by three straight lines: x + y - 10 = 0, x - 7y + 38 = 0 and 3x - y + 14 = 0. Show that △ABC is an isosceles triangle.',
    parts: [
      {
        label: 'Main',
        prompt: 'Find the three vertices A, B, C and compare the side lengths.',
        strategy: 'Solve the three pairs of simultaneous equations, then use the distance formula.',
        steps: [
          {
            title: 'Find the three vertices by solving pairs of lines',
            math: 'L₁ ∩ L₂: A(4, 6); L₁ ∩ L₃: B(-1, 11); L₂ ∩ L₃: C(-3, 5)',
            explanation: 'Check each vertex: (4, 6) satisfies L₁ and L₂; (-1, 11) satisfies L₁ and L₃; (-3, 5) satisfies L₂ and L₃.',
          },
          {
            title: 'Compute side lengths',
            math: 'AB = √((-1 - 4)² + (11 - 6)²) = √50; AC = √((-3 - 4)² + (5 - 6)²) = √50; BC = √((-3 + 1)² + (5 - 11)²) = √40',
            explanation: 'Since AB = AC = √50, △ABC is an isosceles triangle.',
          },
        ],
        answer: 'AB = AC = √50 (isosceles triangle shown)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Isosceles Triangle △ABC (AB = AC = √50)',
      curves: [
        { kind: 'linear', m: -1, c: 10, label: 'x + y - 10 = 0', color: '#0284c7' },
        { kind: 'linear', m: 1 / 7, c: 38 / 7, label: 'x - 7y + 38 = 0', color: '#f59e0b' },
        { kind: 'linear', m: 3, c: 14, label: '3x - y + 14 = 0', color: '#10b981' },
      ],
      points: [
        { x: 4, y: 6, label: 'A(4, 6)', color: '#dc2626' },
        { x: -1, y: 11, label: 'B(-1, 11)', color: '#0284c7' },
        { x: -3, y: 5, label: 'C(-3, 5)', color: '#10b981' },
      ],
      polygons: [
        {
          points: [
            { x: 4, y: 6 },
            { x: -1, y: 11 },
            { x: -3, y: 5 },
          ],
          fill: 'rgba(14, 165, 233, 0.18)',
          stroke: '#0ea5e9',
        },
      ],
      xRange: [-6, 8],
      yRange: [2, 14],
    },
  },
  {
    id: 'ch3-rev-38',
    exerciseId: 'ch3_revision',
    number: 'Q38',
    page: '3.56',
    level: 'Level 2',
    topic: 'Perpendicular Lines, Triangle Area & Similar Triangles',
    statement: 'The straight line L₁: 2x + 3y - 6 = 0 is perpendicular to the straight line L₂ with y-intercept 15, and they intersect at P. (a) Find the coordinates of P. (b) L₁ and L₂ cut the x-axis at A and B respectively. (i) Find the area of △PAB. (ii) Let D be a point on BP such that OD ∥ AP, where O is the origin. Someone claims that the area of quadrilateral OAPD is greater than 25 sq. units. Do you agree? Explain your answer.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find L₂ and intersection P.',
        strategy: 'L₂ has slope 3/2 and y-intercept 15, so 3x - 2y + 30 = 0; solve with L₁.',
        steps: [
          {
            title: 'Write L₂ and solve with L₁',
            math: 'L₂: 3x - 2y + 30 = 0; 2(2x + 3y - 6) + 3(3x - 2y + 30) = 0 ⇒ 13x + 78 = 0 ⇒ x = -6, y = 6 ⇒ P(-6, 6)',
            explanation: 'Intersection P is (-6, 6).',
          },
        ],
        answer: '(-6, 6)',
      },
      {
        label: '(b)(i)',
        prompt: 'Find the area of △PAB.',
        strategy: 'Find x-intercepts A(3, 0) and B(-10, 0), then use base AB = 13 and height y_P = 6.',
        steps: [
          {
            title: 'Compute area of △PAB',
            math: 'A(3, 0), B(-10, 0) ⇒ AB = 13 ⇒ Area(△PAB) = (1/2) × 13 × 6 = 39',
            explanation: 'Area of △PAB is 39 sq. units.',
          },
        ],
        answer: '39 sq. units',
      },
      {
        label: '(b)(ii)',
        prompt: 'Check whether Area(OAPD) > 25.',
        strategy: 'Since OD ∥ AP, △BOD ∼ △BAP with linear scale factor OB/AB = 10/13.',
        steps: [
          {
            title: 'Use area ratio of similar triangles',
            math: 'Area(△BOD)/Area(△BAP) = (OB/AB)² = (10/13)² = 100/169 ⇒ Area(OAPD) = 39 × (69/169) = 207/13 ≈ 15.9 < 25',
            explanation: 'Since 15.9 < 25, disagree with the claim.',
          },
        ],
        answer: 'disagree (Area(OAPD) = 207/13 ≈ 15.9 < 25)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: '△PAB (Area = 39) & Quadrilateral OAPD',
      curves: [
        { kind: 'linear', m: -2 / 3, c: 2, label: 'L₁', color: '#0284c7' },
        { kind: 'linear', m: 1.5, c: 15, label: 'L₂', color: '#f59e0b' },
      ],
      points: [
        { x: -6, y: 6, label: 'P(-6, 6)', color: '#dc2626' },
        { x: 3, y: 0, label: 'A(3, 0)', color: '#0284c7' },
        { x: -10, y: 0, label: 'B(-10, 0)', color: '#f59e0b' },
        { x: 0, y: 0, label: 'O(0, 0)', color: '#94a3b8' },
      ],
      polygons: [
        {
          points: [
            { x: -6, y: 6 },
            { x: 3, y: 0 },
            { x: -10, y: 0 },
          ],
          fill: 'rgba(14, 165, 233, 0.16)',
          stroke: '#0ea5e9',
        },
      ],
      xRange: [-12, 6],
      yRange: [-2, 10],
    },
  },
  {
    id: 'ch3-rev-39',
    exerciseId: 'ch3_revision',
    number: 'Q39',
    page: '3.56',
    level: 'Level 2',
    topic: 'Altitude, Foot of Altitude & Area Ratio',
    examRef: 'HKDSE 2021 P2 Q26',
    isNonFoundation: true,
    statement: 'The coordinates of the vertices of △ABC are A(-2, 10), B(6, -4) and C(16, 1). BP is the altitude from B to AC. (a) Find the equation of the straight line BP. (b) Find the coordinates of P. (c) Find the ratio of the area of △ABC to the area of △BCP.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find the equation of altitude BP.',
        strategy: 'Compute slope of AC, take negative reciprocal for BP, and pass through B(6, -4).',
        steps: [
          {
            title: 'Find m_AC and equation of BP',
            math: 'm_AC = (1 - 10)/(16 - (-2)) = -9/18 = -1/2 ⇒ m_BP = 2 ⇒ y + 4 = 2(x - 6) ⇒ 2x - y - 16 = 0',
            explanation: 'Equation of BP is 2x - y - 16 = 0 (or y = 2x - 16).',
          },
        ],
        answer: '2x - y - 16 = 0 (or y = 2x - 16)',
      },
      {
        label: '(b)',
        prompt: 'Find the coordinates of P.',
        strategy: 'Write equation of AC and solve simultaneously with BP.',
        steps: [
          {
            title: 'Find equation of AC and intersect with BP',
            math: 'AC: y - 1 = -(1/2)(x - 16) ⇒ x + 2y - 18 = 0; x + 2(2x - 16) - 18 = 0 ⇒ 5x = 50 ⇒ x = 10, y = 4 ⇒ P(10, 4)',
            explanation: 'Foot of altitude P is (10, 4).',
          },
        ],
        answer: '(10, 4)',
      },
      {
        label: '(c)',
        prompt: 'Find Area(△ABC) : Area(△BCP).',
        strategy: 'Both triangles share the same altitude BP, so their area ratio equals the ratio of bases AC : PC.',
        steps: [
          {
            title: 'Use x-coordinate differences along collinear points A, P, C',
            math: 'Area(△ABC) : Area(△BCP) = AC : PC = (16 - (-2)) : (16 - 10) = 18 : 6 = 3 : 1',
            explanation: 'The ratio of areas is 3 : 1.',
          },
        ],
        answer: '3 : 1',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Altitude BP & Foot P(10, 4)',
      curves: [
        { kind: 'linear', m: -0.5, c: 9, label: 'AC', color: '#0284c7' },
        { kind: 'linear', m: 2, c: -16, label: 'Altitude BP', color: '#10b981', dashed: true },
      ],
      points: [
        { x: -2, y: 10, label: 'A(-2, 10)', color: '#0284c7' },
        { x: 6, y: -4, label: 'B(6, -4)', color: '#f59e0b' },
        { x: 16, y: 1, label: 'C(16, 1)', color: '#0284c7' },
        { x: 10, y: 4, label: 'P(10, 4)', color: '#dc2626' },
      ],
      polygons: [
        {
          points: [
            { x: -2, y: 10 },
            { x: 6, y: -4 },
            { x: 16, y: 1 },
          ],
          fill: 'rgba(14, 165, 233, 0.16)',
          stroke: '#0ea5e9',
        },
      ],
      xRange: [-4, 18],
      yRange: [-6, 12],
    },
  },
  {
    id: 'ch3-rev-40',
    exerciseId: 'ch3_revision',
    number: 'Q40',
    page: '3.56',
    level: 'Level 2',
    topic: 'Perpendicular Bisector & Circumcentre of △OPQ',
    examRef: 'HKCEE 2008 P2 Q52',
    isNonFoundation: true,
    statement: 'The coordinates of the points P and Q are (30, 30) and (36, 0) respectively. Let O be the origin. (a) Find the equation of the perpendicular bisector of PQ. (b) Find the coordinates of the circumcentre of △OPQ.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find the perpendicular bisector of PQ.',
        strategy: 'Find mid-point M(33, 15) and slope perpendicular to m_PQ = -5.',
        steps: [
          {
            title: 'Find mid-point and perpendicular slope',
            math: 'M = (33, 15); m_PQ = (0 - 30)/(36 - 30) = -5 ⇒ m_⊥ = 1/5',
            explanation: 'Perpendicular bisector passes through (33, 15) with slope 1/5.',
          },
          {
            title: 'Write equation',
            math: 'y - 15 = (1/5)(x - 33) ⇒ y = (1/5)x + 42/5 (or x - 5y + 42 = 0)',
            explanation: 'Equation is x - 5y + 42 = 0.',
          },
        ],
        answer: 'y = (1/5)x + 42/5 (or x - 5y + 42 = 0)',
      },
      {
        label: '(b)',
        prompt: 'Find the circumcentre of △OPQ.',
        strategy: 'Since OQ lies on the x-axis from 0 to 36, its perpendicular bisector is x = 18.',
        steps: [
          {
            title: 'Intersect x = 18 with x - 5y + 42 = 0',
            math: '18 - 5y + 42 = 0 ⇒ 5y = 60 ⇒ y = 12 ⇒ (18, 12)',
            explanation: 'The circumcentre of △OPQ is (18, 12).',
          },
        ],
        answer: '(18, 12)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Circumcentre (18, 12) of △OPQ',
      curves: [
        { kind: 'linear', m: 0.2, c: 8.4, label: 'Perp. bisector of PQ', color: '#10b981', dashed: true },
        { kind: 'vertical', x: 18, label: 'x = 18', color: '#f59e0b', dashed: true },
      ],
      points: [
        { x: 0, y: 0, label: 'O(0, 0)', color: '#94a3b8' },
        { x: 30, y: 30, label: 'P(30, 30)', color: '#0284c7' },
        { x: 36, y: 0, label: 'Q(36, 0)', color: '#0284c7' },
        { x: 18, y: 12, label: '(18, 12)', color: '#dc2626' },
      ],
      polygons: [
        {
          points: [
            { x: 0, y: 0 },
            { x: 30, y: 30 },
            { x: 36, y: 0 },
          ],
          fill: 'rgba(14, 165, 233, 0.16)',
          stroke: '#0ea5e9',
        },
      ],
      xRange: [-4, 42],
      yRange: [-4, 34],
    },
  },
  {
    id: 'ch3-rev-41',
    exerciseId: 'ch3_revision',
    number: 'Q41',
    page: '3.56',
    level: 'Level 2',
    topic: 'Orthocentre, Centroid & Collinearity',
    isNonFoundation: true,
    statement: 'The coordinates of the vertices of △ABC are A(-39, 0), B(0, -52) and C(26, 0). Let H be the orthocentre of △ABC. (a) Find (i) the equation of the altitude from A to BC; (ii) the coordinates of H. (b) Someone claims that A, H and the centroid of △ABC are collinear. Do you agree? Explain your answer.',
    parts: [
      {
        label: '(a)(i)',
        prompt: 'Find the altitude from A to BC.',
        strategy: 'Find m_BC = 2, take negative reciprocal -1/2, and pass through A(-39, 0).',
        steps: [
          {
            title: 'Write altitude from A',
            math: 'm_BC = (0 - (-52))/(26 - 0) = 2 ⇒ m_alt = -1/2 ⇒ y = -(1/2)(x + 39) ⇒ x + 2y + 39 = 0',
            explanation: 'Altitude from A is x + 2y + 39 = 0.',
          },
        ],
        answer: 'x + 2y + 39 = 0 (or y = -(1/2)x - 39/2)',
      },
      {
        label: '(a)(ii)',
        prompt: 'Find H.',
        strategy: 'AC lies on the x-axis, so the altitude from B(0, -52) is the y-axis x = 0.',
        steps: [
          {
            title: 'Intersect x = 0 with x + 2y + 39 = 0',
            math: '0 + 2y + 39 = 0 ⇒ y = -19.5 ⇒ H(0, -19.5)',
            explanation: 'Orthocentre H is (0, -19.5) or (0, -39/2).',
          },
        ],
        answer: '(0, -19.5) (or (0, -39/2))',
      },
      {
        label: '(b)',
        prompt: 'Check if A, H, and centroid G are collinear.',
        strategy: 'Find centroid G and compare m_AH with m_AG (or substitute G into altitude AH).',
        steps: [
          {
            title: 'Find centroid G and test on AH: x + 2y + 39 = 0',
            math: 'G = ((-39 + 0 + 26)/3, (0 - 52 + 0)/3) = (-13/3, -52/3); LHS = -13/3 + 2(-52/3) + 39 = -117/3 + 39 = 0',
            explanation: 'G lies directly on the line AH! Therefore A, H, and G are collinear (agree).',
          },
        ],
        answer: 'agree (G(-13/3, -52/3) lies on AH)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Collinear A, H(0, -19.5) & G(-13/3, -52/3)',
      curves: [{ kind: 'linear', m: -0.5, c: -19.5, label: 'Altitude AH', color: '#10b981', dashed: true }],
      points: [
        { x: -39, y: 0, label: 'A(-39, 0)', color: '#0284c7' },
        { x: 0, y: -52, label: 'B(0, -52)', color: '#0284c7' },
        { x: 26, y: 0, label: 'C(26, 0)', color: '#0284c7' },
        { x: 0, y: -19.5, label: 'H(0, -19.5)', color: '#dc2626' },
        { x: -13 / 3, y: -52 / 3, label: 'G', color: '#9333ea' },
      ],
      polygons: [
        {
          points: [
            { x: -39, y: 0 },
            { x: 0, y: -52 },
            { x: 26, y: 0 },
          ],
          fill: 'rgba(14, 165, 233, 0.16)',
          stroke: '#0ea5e9',
        },
      ],
      xRange: [-44, 32],
      yRange: [-58, 10],
    },
  },
  {
    id: 'ch3-rev-42',
    exerciseId: 'ch3_revision',
    number: 'Q42',
    page: '3.57',
    level: 'Level 2',
    topic: 'Open-Ended Intercept Segment Length',
    statement: 'A straight line L cuts the x-axis and the y-axis at A and B respectively such that AB = 20 units. List two possible equations of L.',
    parts: [
      {
        label: 'Main',
        prompt: 'Choose intercept pairs (a, 0) and (0, b) with a² + b² = 20² = 400.',
        strategy: 'Use the Pythagorean triple (12, 16, 20) to get clean integer-coefficient equations.',
        steps: [
          {
            title: 'Use a = 16, b = 12 and a = 12, b = 16',
            math: 'x/16 + y/12 = 1 ⇒ 3x + 4y - 48 = 0; x/12 + y/16 = 1 ⇒ 4x + 3y - 48 = 0',
            explanation: 'Check: √(16² + 12²) = √400 = 20. Any sign variation of (±16, ±12) or (±12, ±16) also works.',
          },
        ],
        answer: '3x + 4y - 48 = 0, 4x + 3y - 48 = 0 (any two with a² + b² = 400)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Sample Lines with AB = 20',
      curves: [
        { kind: 'linear', m: -0.75, c: 12, label: '3x + 4y - 48 = 0', color: '#0284c7' },
        { kind: 'linear', m: -4 / 3, c: 16, label: '4x + 3y - 48 = 0', color: '#10b981' },
      ],
      points: [
        { x: 16, y: 0, label: '(16, 0)', color: '#0284c7' },
        { x: 0, y: 12, label: '(0, 12)', color: '#0284c7' },
      ],
      xRange: [-2, 20],
      yRange: [-2, 20],
    },
  },
  {
    id: 'ch3-rev-43',
    exerciseId: 'ch3_revision',
    number: 'Q43',
    page: '3.57',
    level: 'Smart Corner',
    topic: 'Symmetric Lines, Centroid & Circumcentre',
    examRef: 'HKDSE 2020 P2 Q40',
    isNonFoundation: true,
    statement: 'The straight lines L₁: 2x + 3y = 12 and L₂: 2x - 3y = 12 intersect at P. The vertical line x = a (where a > 0, a ≠ 6) intersects L₁ and L₂ at Q and R respectively. (a) Show that △PQR is an isosceles triangle. (b) It is given that the x-coordinate of the centroid of △PQR is 30. (i) Find the value of a. (ii) Find the coordinates of the circumcentre of △PQR.',
    parts: [
      {
        label: '(a)',
        prompt: 'Find P, Q, R in terms of a and show PQ = PR.',
        strategy: 'Solve L₁ and L₂ for P(6, 0), find Q and R on x = a, and compare PQ with PR.',
        steps: [
          {
            title: 'Find P, Q, R and compare PQ and PR',
            math: 'P(6, 0); Q(a, (12 - 2a)/3); R(a, (2a - 12)/3) ⇒ PQ = PR = √((a - 6)² + ((12 - 2a)/3)²)',
            explanation: 'Since Q and R are symmetric about the x-axis and P lies on the x-axis, PQ = PR, so △PQR is isosceles.',
          },
        ],
        answer: 'PQ = PR (isosceles triangle shown)',
      },
      {
        label: '(b)(i)',
        prompt: 'Find a given the centroid x-coordinate is 30.',
        strategy: 'Set (x_P + x_Q + x_R)/3 = 30.',
        steps: [
          {
            title: 'Solve for a',
            math: '(6 + a + a)/3 = 30 ⇒ 6 + 2a = 90 ⇒ 2a = 84 ⇒ a = 42',
            explanation: 'Thus a = 42, giving Q(42, -24) and R(42, 24).',
          },
        ],
        answer: '42',
      },
      {
        label: '(b)(ii)',
        prompt: 'Find the circumcentre of △PQR.',
        strategy: 'By symmetry about the x-axis, the circumcentre lies on y = 0 at C(h, 0); equate CP² = CQ².',
        steps: [
          {
            title: 'Equate CP² = CQ² for C(h, 0)',
            math: '(h - 6)² = (h - 42)² + (-24)² ⇒ h² - 12h + 36 = h² - 84h + 1764 + 576 ⇒ 72h = 2304 ⇒ h = 32',
            explanation: 'Thus the circumcentre of △PQR is (32, 0).',
          },
        ],
        answer: '(32, 0)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Isosceles △PQR & Circumcentre (32, 0)',
      curves: [
        { kind: 'linear', m: -2 / 3, c: 4, label: 'L₁', color: '#0284c7' },
        { kind: 'linear', m: 2 / 3, c: -4, label: 'L₂', color: '#f59e0b' },
        { kind: 'vertical', x: 42, label: 'x = 42', color: '#10b981' },
      ],
      points: [
        { x: 6, y: 0, label: 'P(6, 0)', color: '#0284c7' },
        { x: 42, y: -24, label: 'Q(42, -24)', color: '#0284c7' },
        { x: 42, y: 24, label: 'R(42, 24)', color: '#f59e0b' },
        { x: 32, y: 0, label: 'Circumcentre (32, 0)', color: '#dc2626' },
      ],
      circles: [{ cx: 32, cy: 0, r: 26, stroke: '#10b981' }],
      xRange: [0, 62],
      yRange: [-30, 30],
    },
  },
  {
    id: 'ch3-rev-44',
    exerciseId: 'ch3_revision',
    number: 'Q44',
    page: '3.57',
    level: 'Smart Corner',
    topic: 'Perpendicular Bisector, Intersection & Area Ratio',
    examRef: 'HKCEE 2006 P1 Q12',
    statement: 'A is a point on the negative x-axis and C is (10, 0). P(-8, -9) lies on BC such that AP is the perpendicular bisector of BC. (a) Find (i) the coordinates of B; (ii) the equation of AP. (b) Q(-2, 0) lies on the x-axis, and AP and BQ intersect at R. (i) Find the coordinates of R. (ii) Find Area(△APC) : Area(△ARC).',
    parts: [
      {
        label: '(a)(i)',
        prompt: 'Find the coordinates of B.',
        strategy: 'Since AP bisects BC, P(-8, -9) is the mid-point of B and C(10, 0).',
        steps: [
          {
            title: 'Use mid-point formula backwards',
            math: '(x_B + 10)/2 = -8 ⇒ x_B = -26; (y_B + 0)/2 = -9 ⇒ y_B = -18 ⇒ B(-26, -18)',
            explanation: 'So B is (-26, -18).',
          },
        ],
        answer: '(-26, -18)',
      },
      {
        label: '(a)(ii)',
        prompt: 'Find the equation of AP.',
        strategy: 'AP ⊥ BC and passes through P(-8, -9).',
        steps: [
          {
            title: 'Find m_BC, m_AP, and equation of AP',
            math: 'm_BC = (0 - (-9))/(10 - (-8)) = 1/2 ⇒ m_AP = -2 ⇒ y + 9 = -2(x + 8) ⇒ 2x + y + 25 = 0',
            explanation: 'Equation of AP is 2x + y + 25 = 0 (cutting x-axis at A(-12.5, 0)).',
          },
        ],
        answer: '2x + y + 25 = 0 (or y = -2x - 25)',
      },
      {
        label: '(b)(i)',
        prompt: 'Find the intersection R of AP and BQ.',
        strategy: 'Find equation of BQ through B(-26, -18) and Q(-2, 0), then solve with AP.',
        steps: [
          {
            title: 'Find equation of BQ',
            math: 'm_BQ = (0 - (-18))/(-2 - (-26)) = 18/24 = 3/4 ⇒ y = (3/4)(x + 2) ⇒ 3x - 4y + 6 = 0',
            explanation: 'Line BQ is 3x - 4y + 6 = 0.',
          },
          {
            title: 'Intersect AP and BQ',
            math: '3x - 4(-2x - 25) + 6 = 0 ⇒ 11x + 106 = 0 ⇒ x = -106/11; y = -63/11 ⇒ R(-106/11, -63/11)',
            explanation: 'Thus R is (-106/11, -63/11).',
          },
        ],
        answer: '(-106/11, -63/11)',
      },
      {
        label: '(b)(ii)',
        prompt: 'Find Area(△APC) : Area(△ARC).',
        strategy: 'Both triangles share base AC along the x-axis, so their area ratio equals the ratio of heights |y_P| : |y_R|.',
        steps: [
          {
            title: 'Compare heights from P and R to AC (x-axis)',
            math: 'Area(△APC) : Area(△ARC) = |y_P| : |y_R| = 9 : (63/11) = 99 : 63 = 11 : 7',
            explanation: 'The ratio of areas is 11 : 7.',
          },
        ],
        answer: '11 : 7',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Perpendicular Bisector AP & Intersection R',
      curves: [
        { kind: 'linear', m: -2, c: -25, label: 'AP', color: '#0284c7' },
        { kind: 'linear', m: 0.75, c: 1.5, label: 'BQ', color: '#10b981' },
        { kind: 'linear', m: 0.5, c: -5, label: 'BC', color: '#f59e0b', dashed: true },
      ],
      points: [
        { x: -12.5, y: 0, label: 'A(-12.5, 0)', color: '#0284c7' },
        { x: -26, y: -18, label: 'B(-26, -18)', color: '#f59e0b' },
        { x: 10, y: 0, label: 'C(10, 0)', color: '#f59e0b' },
        { x: -8, y: -9, label: 'P(-8, -9)', color: '#0284c7' },
        { x: -106 / 11, y: -63 / 11, label: 'R', color: '#dc2626' },
      ],
      xRange: [-30, 14],
      yRange: [-22, 6],
    },
  },
  {
    id: 'ch3-rev-45',
    exerciseId: 'ch3_revision',
    number: 'Q45',
    page: '3.57',
    level: 'Cross Topics',
    topic: 'Parallel Lines, Isosceles Triangle & Inclination Angle',
    examRef: 'HKDSE 2020 P1 Q14(b)',
    statement: 'The straight line L₁ passes through A(-4, -6) and B(11, 0). Another straight line L₂ passes through C(-19, 0) and a point D above the x-axis such that the perpendicular distances from C and D to L₁ are equal. (a) Write down the geometric relationship between L₁ and L₂. (b) Find the equation of L₂ in general form. (c) (i) Show that AC = AB. (ii) Someone claims that ∠ACD > 45°. Do you agree? Explain your answer.',
    parts: [
      {
        label: '(a)',
        prompt: 'State the relationship between L₁ and L₂.',
        strategy: 'Two points on the same side of L₁ at equal perpendicular distance from L₁ lie on a line parallel to L₁.',
        steps: [
          {
            title: 'Identify parallel lines',
            math: 'L₁ ∥ L₂',
            explanation: 'Since C and D are equidistant from L₁ on the same side, L₂ is parallel to L₁.',
          },
        ],
        answer: 'L₁ ∥ L₂',
      },
      {
        label: '(b)',
        prompt: 'Find the equation of L₂ in general form.',
        strategy: 'Compute slope of AB and pass L₂ through C(-19, 0).',
        steps: [
          {
            title: 'Find slope of L₁ and equation of L₂',
            math: 'm₁ = (0 - (-6))/(11 - (-4)) = 6/15 = 2/5 ⇒ y - 0 = (2/5)(x + 19) ⇒ 2x - 5y + 38 = 0',
            explanation: 'General form of L₂ is 2x - 5y + 38 = 0.',
          },
        ],
        answer: '2x - 5y + 38 = 0',
      },
      {
        label: '(c)(i)',
        prompt: 'Show that AC = AB.',
        strategy: 'Apply the distance formula to AC and AB.',
        steps: [
          {
            title: 'Compare AC and AB',
            math: 'AC = √((-4 + 19)² + (-6 - 0)²) = √(15² + 6²) = √261; AB = √((11 + 4)² + (0 + 6)²) = √261 ⇒ AC = AB',
            explanation: 'Hence △ABC is isosceles with AC = AB.',
          },
        ],
        answer: 'AC = AB = √261 (shown)',
      },
      {
        label: '(c)(ii)',
        prompt: 'Determine whether ∠ACD > 45°.',
        strategy: 'Find the inclination θ of L₁ and L₂ using tan θ = 2/5; note ∠ACD = ∠ACB + ∠BCD = θ + θ = 2θ.',
        steps: [
          {
            title: 'Find inclination θ and ∠ACD',
            math: 'tan θ = 2/5 ⇒ θ ≈ 21.8°; ∠ACB = ∠ABC = θ and ∠BCD = θ (L₂ ∥ L₁) ⇒ ∠ACD = 2θ ≈ 43.6° < 45°',
            explanation: 'Since 43.6° < 45°, disagree with the claim.',
          },
        ],
        answer: 'disagree (∠ACD ≈ 43.6° < 45°)',
      },
    ],
    visual: {
      kind: 'coordinate',
      title: 'Parallel Lines L₁, L₂ & ∠ACD ≈ 43.6°',
      curves: [
        { kind: 'linear', m: 0.4, c: -4.4, label: 'L₁ (AB)', color: '#0284c7' },
        { kind: 'linear', m: 0.4, c: 7.6, label: 'L₂ (CD)', color: '#10b981' },
      ],
      points: [
        { x: -4, y: -6, label: 'A(-4, -6)', color: '#0284c7' },
        { x: 11, y: 0, label: 'B(11, 0)', color: '#0284c7' },
        { x: -19, y: 0, label: 'C(-19, 0)', color: '#10b981' },
        { x: -4, y: 6, label: 'D(-4, 6)', color: '#dc2626' },
      ],
      polygons: [
        {
          points: [
            { x: -4, y: -6 },
            { x: 11, y: 0 },
            { x: -19, y: 0 },
          ],
          fill: 'rgba(14, 165, 233, 0.16)',
          stroke: '#0ea5e9',
        },
      ],
      xRange: [-22, 16],
      yRange: [-10, 12],
    },
  },
];
