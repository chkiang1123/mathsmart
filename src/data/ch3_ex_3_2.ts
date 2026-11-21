import type { ExerciseGroup } from '../types/math';

export const exercise32: ExerciseGroup = {
  id: 'ex3_2',
  code: 'Ex 3.2',
  title: 'General Form of Equations of Straight Lines',
  subtitle: 'General form Ax + By + C = 0, slope/intercepts, inclination & perpendicular/parallel geometry',
  pages: 'p. 3.32 – 3.36',
  objectives: [
    'Convert equations of straight lines into general form Ax + By + C = 0 (A > 0)',
    'Extract slope (-A/B), x-intercept (-C/A), and y-intercept (-C/B) directly from general form',
    'Use slope = tan θ to connect inclination and straight-line equations',
  ],
  sectionCheck: [
    {
      id: 'sc32-a',
      label: '(a)',
      statement: 'The x-intercept of the straight line L: 2x + 3y - 18 = 0 is -9.',
      isCorrect: false,
      explanation: 'x-intercept = -C/A = -(-18)/2 = 9, not -9.',
    },
    {
      id: 'sc32-b',
      label: '(b)',
      statement: 'The y-intercept of the straight line L: 5x - 4y = 60 is -15.',
      isCorrect: true,
      explanation: 'Put x = 0: -4y = 60 ⇒ y = -15. Correct!',
    },
    {
      id: 'sc32-c',
      label: '(c)',
      statement: 'The straight lines L₁: x + 3y - 15 = 0 and L₂: 4x + 12y - 15 = 0 are parallel lines.',
      isCorrect: true,
      explanation: 'Slope of L₁ = -1/3 and slope of L₂ = -4/12 = -1/3, with different y-intercepts (5 vs 5/4), so L₁ ∥ L₂.',
    },
    {
      id: 'sc32-d',
      label: '(d)',
      statement: 'The straight lines L₁: 4x - y + 8 = 0 and L₂: x - 4y - 7 = 0 are perpendicular lines.',
      isCorrect: false,
      explanation: 'm₁ = 4 and m₂ = 1/4, so m₁ × m₂ = 1 ≠ -1. They are not perpendicular.',
    },
    {
      id: 'sc32-e',
      label: '(e)',
      statement: 'In the figure, a downward-sloping line makes a 50° angle with the negative x-axis, so its inclination is 50°.',
      isCorrect: false,
      explanation: 'Inclination is measured anticlockwise from the positive x-axis, so θ = 180° - 50° = 130°.',
    },
    {
      id: 'sc32-f',
      label: '(f)',
      statement: 'The inclination of the straight line L: 5x - 6y - 18 = 0 is greater than 40°.',
      isCorrect: false,
      explanation: 'Slope = -5/(-6) = 5/6. tan θ = 5/6 ⇒ θ ≈ 39.8° < 40°.',
    },
  ],
  questions: [
    {
      id: 'ex32-1',
      exerciseId: 'ex3_2',
      number: 'Q1',
      page: '3.32',
      level: 'Level 1',
      topic: 'Convert to General Form',
      statement: 'Rewrite the equation y + 2 = -3(x - 4) into the general form Ax + By + C = 0, where A, B and C are integers with A > 0.',
      parts: [
        {
          label: 'Main',
          prompt: 'Expand and collect all terms on the left-hand side with A > 0.',
          strategy: 'Expand -3(x - 4) then move all terms to the left.',
          steps: [
            {
              title: 'Expand brackets',
              math: 'y + 2 = -3x + 12',
              explanation: 'Multiply -3 across (x - 4).',
            },
            {
              title: 'Move terms to form Ax + By + C = 0',
              math: '3x + y - 10 = 0',
              explanation: 'Here A = 3 > 0, B = 1, C = -10.',
            },
          ],
          answer: '3x + y - 10 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '3x + y - 10 = 0',
        curves: [{ kind: 'linear', m: -3, c: 10, label: '3x + y - 10 = 0', color: '#0284c7' }],
        points: [
          { x: 4, y: -2, label: '(4, -2)', color: '#10b981' },
          { x: 0, y: 10, label: '(0, 10)', color: '#f59e0b' },
        ],
        xRange: [-2, 6],
        yRange: [-4, 12],
      },
    },
    {
      id: 'ex32-2',
      exerciseId: 'ex3_2',
      number: 'Q2',
      page: '3.32',
      level: 'Level 1',
      topic: 'Convert Intercept Form to General Form',
      statement: 'Rewrite the equation x/3 + y/18 = 1 into the general form Ax + By + C = 0, where A, B and C are integers with A > 0.',
      parts: [
        {
          label: 'Main',
          prompt: 'Clear fractions and collect terms.',
          strategy: 'Multiply the entire equation by LCM(3, 18) = 18.',
          steps: [
            {
              title: 'Multiply by 18',
              math: '6x + y = 18 ⇒ 6x + y - 18 = 0',
              explanation: 'All coefficients are integers with A = 6 > 0.',
            },
          ],
          answer: '6x + y - 18 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '6x + y - 18 = 0',
        curves: [{ kind: 'linear', m: -6, c: 18, label: '6x + y - 18 = 0', color: '#0284c7' }],
        points: [
          { x: 3, y: 0, label: '(3, 0)', color: '#10b981' },
          { x: 0, y: 18, label: '(0, 18)', color: '#f59e0b' },
        ],
        xRange: [-2, 5],
        yRange: [-3, 20],
      },
    },
    {
      id: 'ex32-3',
      exerciseId: 'ex3_2',
      number: 'Q3',
      page: '3.32',
      level: 'Level 1',
      topic: 'Features from General Form',
      statement: 'Find the slope, the x-intercept and the y-intercept of the straight line 3x + y - 18 = 0.',
      parts: [
        {
          label: 'Main',
          prompt: 'Read A = 3, B = 1, C = -18.',
          strategy: 'Use slope = -A/B, x-intercept = -C/A, y-intercept = -C/B.',
          steps: [
            {
              title: 'Apply general form formulas',
              math: 'slope = -3/1 = -3; x-intercept = -(-18)/3 = 6; y-intercept = -(-18)/1 = 18',
              explanation: 'Verify: (6, 0) and (0, 18) both satisfy 3x + y - 18 = 0.',
            },
          ],
          answer: 'slope = -3, x-intercept = 6, y-intercept = 18',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '3x + y - 18 = 0',
        curves: [{ kind: 'linear', m: -3, c: 18, label: '3x + y - 18 = 0', color: '#0284c7' }],
        points: [
          { x: 6, y: 0, label: '(6, 0)', color: '#10b981' },
          { x: 0, y: 18, label: '(0, 18)', color: '#f59e0b' },
        ],
        xRange: [-2, 9],
        yRange: [-4, 21],
      },
    },
    {
      id: 'ex32-4',
      exerciseId: 'ex3_2',
      number: 'Q4',
      page: '3.32',
      level: 'Level 1',
      topic: 'Features from General Form',
      statement: 'Find the slope, the x-intercept and the y-intercept of the straight line 6x - 5y = 15.',
      parts: [
        {
          label: 'Main',
          prompt: 'Rewrite as 6x - 5y - 15 = 0 first.',
          strategy: 'Here A = 6, B = -5, C = -15.',
          steps: [
            {
              title: 'Rewrite and apply formulas',
              math: '6x - 5y - 15 = 0 ⇒ slope = -6/(-5) = 6/5',
              explanation: 'Slope = -A/B = 6/5.',
            },
            {
              title: 'Find intercepts',
              math: 'x-intercept = -(-15)/6 = 5/2; y-intercept = -(-15)/(-5) = -3',
              explanation: 'Check: put y = 0 ⇒ x = 5/2; put x = 0 ⇒ y = -3.',
            },
          ],
          answer: 'slope = 6/5, x-intercept = 5/2, y-intercept = -3',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '6x - 5y = 15',
        curves: [{ kind: 'linear', m: 1.2, c: -3, label: '6x - 5y = 15', color: '#0284c7' }],
        points: [
          { x: 2.5, y: 0, label: '(5/2, 0)', color: '#10b981' },
          { x: 0, y: -3, label: '(0, -3)', color: '#f59e0b' },
        ],
        xRange: [-3, 6],
        yRange: [-5, 5],
      },
    },
    {
      id: 'ex32-5',
      exerciseId: 'ex3_2',
      number: 'Q5',
      page: '3.32',
      level: 'Level 1',
      topic: 'Features from Linear Equation',
      statement: 'Find the slope, the x-intercept and the y-intercept of the straight line 2y = 14 - 7x.',
      parts: [
        {
          label: 'Main',
          prompt: 'Rewrite as 7x + 2y - 14 = 0.',
          strategy: 'Use A = 7, B = 2, C = -14.',
          steps: [
            {
              title: 'Convert to general form and read features',
              math: '7x + 2y - 14 = 0 ⇒ slope = -7/2; x-intercept = 14/7 = 2; y-intercept = 14/2 = 7',
              explanation: 'Equivalently y = -(7/2)x + 7.',
            },
          ],
          answer: 'slope = -7/2, x-intercept = 2, y-intercept = 7',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '2y = 14 - 7x',
        curves: [{ kind: 'linear', m: -3.5, c: 7, label: '7x + 2y - 14 = 0', color: '#0284c7' }],
        points: [
          { x: 2, y: 0, label: '(2, 0)', color: '#10b981' },
          { x: 0, y: 7, label: '(0, 7)', color: '#f59e0b' },
        ],
        xRange: [-2, 5],
        yRange: [-2, 9],
      },
    },
    {
      id: 'ex32-6',
      exerciseId: 'ex3_2',
      number: 'Q6',
      page: '3.32',
      level: 'Level 1',
      topic: 'Features from Intercept Form',
      statement: 'Find the slope, the x-intercept and the y-intercept of the straight line x/16 - y/24 = 1.',
      parts: [
        {
          label: 'Main',
          prompt: 'Read intercepts directly from x/16 + y/(-24) = 1.',
          strategy: 'x-intercept = 16, y-intercept = -24, then slope = (0 - (-24))/(16 - 0) = 3/2.',
          steps: [
            {
              title: 'Identify intercepts',
              math: 'x/16 + y/(-24) = 1 ⇒ x-intercept = 16, y-intercept = -24',
              explanation: 'Match directly with x/a + y/b = 1.',
            },
            {
              title: 'Compute slope',
              math: 'slope = (0 - (-24)) / (16 - 0) = 24 / 16 = 3/2',
              explanation: 'Or multiply by 48: 3x - 2y - 48 = 0 ⇒ slope = -3/(-2) = 3/2.',
            },
          ],
          answer: 'slope = 3/2, x-intercept = 16, y-intercept = -24',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'x/16 - y/24 = 1',
        curves: [{ kind: 'linear', m: 1.5, c: -24, label: '3x - 2y - 48 = 0', color: '#0284c7' }],
        points: [
          { x: 16, y: 0, label: '(16, 0)', color: '#10b981' },
          { x: 0, y: -24, label: '(0, -24)', color: '#f59e0b' },
        ],
        xRange: [-4, 22],
        yRange: [-28, 6],
      },
    },
    {
      id: 'ex32-7',
      exerciseId: 'ex3_2',
      number: 'Q7',
      page: '3.32',
      level: 'Level 1',
      topic: 'Unknown Constant from x-intercept',
      statement: 'It is given that the x-intercept of the straight line L: 4x - 3y - k = 0 is -3. (a) Find k. (b) Find the y-intercept of L.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'Substitute (-3, 0) into 4x - 3y - k = 0.',
          steps: [
            {
              title: 'Use x-intercept = -3',
              math: '4(-3) - 3(0) - k = 0 ⇒ -12 - k = 0 ⇒ k = -12',
              explanation: 'Equivalently -(-k)/4 = -3 ⇒ k = -12.',
            },
          ],
          answer: '-12',
        },
        {
          label: '(b)',
          prompt: 'Find the y-intercept of L.',
          strategy: 'Put x = 0 into 4x - 3y + 12 = 0.',
          steps: [
            {
              title: 'Compute y-intercept',
              math: '4(0) - 3y + 12 = 0 ⇒ y = 4',
              explanation: 'So the y-intercept of L is 4.',
            },
          ],
          answer: '4',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: 4x - 3y + 12 = 0',
        curves: [{ kind: 'linear', m: 4 / 3, c: 4, label: '4x - 3y + 12 = 0', color: '#0284c7' }],
        points: [
          { x: -3, y: 0, label: '(-3, 0)', color: '#10b981' },
          { x: 0, y: 4, label: '(0, 4)', color: '#f59e0b' },
        ],
        xRange: [-6, 4],
        yRange: [-2, 7],
      },
    },
    {
      id: 'ex32-8',
      exerciseId: 'ex3_2',
      number: 'Q8',
      page: '3.32',
      level: 'Level 1',
      topic: 'Unknown Constant from y-intercept',
      statement: 'It is given that the y-intercept of the straight line L: 3x - py = 48 is 6. (a) Find p. (b) Find the slope of L.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find p.',
          strategy: 'Substitute (0, 6) into 3x - py = 48.',
          steps: [
            {
              title: 'Substitute x = 0, y = 6',
              math: '3(0) - 6p = 48 ⇒ p = -8',
              explanation: 'So the equation of L is 3x + 8y - 48 = 0.',
            },
          ],
          answer: '-8',
        },
        {
          label: '(b)',
          prompt: 'Find the slope of L.',
          strategy: 'Use slope = -A/B on 3x + 8y - 48 = 0.',
          steps: [
            {
              title: 'Apply slope = -A/B',
              math: 'slope = -3/8',
              explanation: 'Here A = 3 and B = -(-8) = 8.',
            },
          ],
          answer: '-3/8',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: 3x + 8y = 48',
        curves: [{ kind: 'linear', m: -3 / 8, c: 6, label: '3x + 8y = 48', color: '#0284c7' }],
        points: [
          { x: 0, y: 6, label: '(0, 6)', color: '#10b981' },
          { x: 16, y: 0, label: '(16, 0)', color: '#f59e0b' },
        ],
        xRange: [-4, 18],
        yRange: [-3, 9],
      },
    },
    {
      id: 'ex32-9',
      exerciseId: 'ex3_2',
      number: 'Q9',
      page: '3.33',
      level: 'Level 1',
      topic: 'Unknown Coefficient from Slope & Verification',
      statement: 'It is given that the slope of the straight line L: hx + 8y - 25 = 0 is 3/4. (a) Find h. (b) Show that L passes through the point (-3/2, 2).',
      parts: [
        {
          label: '(a)',
          prompt: 'Find h.',
          strategy: 'Equate slope -h/8 to 3/4.',
          steps: [
            {
              title: 'Use slope = -A/B',
              math: '-h/8 = 3/4 ⇒ h = -6',
              explanation: 'So L is -6x + 8y - 25 = 0.',
            },
          ],
          answer: '-6',
        },
        {
          label: '(b)',
          prompt: 'Show that (-3/2, 2) lies on L.',
          strategy: 'Substitute x = -3/2, y = 2 into L.H.S. and verify it equals 0.',
          steps: [
            {
              title: 'Check L.H.S. = R.H.S.',
              math: 'L.H.S. = -6(-3/2) + 8(2) - 25 = 9 + 16 - 25 = 0 = R.H.S.',
              explanation: 'Since (-3/2, 2) satisfies the equation, L passes through (-3/2, 2).',
            },
          ],
          answer: 'Shown: L.H.S. = 0 = R.H.S.',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: -6x + 8y - 25 = 0',
        curves: [{ kind: 'linear', m: 0.75, c: 25 / 8, label: '-6x + 8y - 25 = 0', color: '#0284c7' }],
        points: [{ x: -1.5, y: 2, label: '(-3/2, 2)', color: '#10b981' }],
        xRange: [-6, 4],
        yRange: [-2, 6],
      },
    },
    {
      id: 'ex32-10',
      exerciseId: 'ex3_2',
      number: 'Q10',
      page: '3.33',
      level: 'Level 1',
      topic: 'Parallel vs Perpendicular Lines',
      statement: 'Determine whether L₁ and L₂ are parallel lines or perpendicular lines: (a) L₁: 3x + y + 6 = 0, L₂: x - 3y - 10 = 0. (b) L₁: 5x - 2y = 0, L₂: -5x + 2y - 15 = 0. (c) L₁: y = -4x + 2, L₂: 16x + 4y - 1 = 0. (d) L₁: 3x = 5y + 5, L₂: 15x + 9y - 20 = 0.',
      parts: [
        {
          label: '(a)',
          prompt: 'Compare slopes of 3x + y + 6 = 0 and x - 3y - 10 = 0.',
          strategy: 'Test m₁ = m₂ or m₁ × m₂ = -1.',
          steps: [
            {
              title: 'Compute product of slopes',
              math: 'm₁ = -3, m₂ = 1/3 ⇒ m₁ × m₂ = (-3)(1/3) = -1 ⇒ L₁ ⊥ L₂',
              explanation: 'Product is -1, so they are perpendicular.',
            },
          ],
          answer: 'perpendicular',
        },
        {
          label: '(b)',
          prompt: 'Compare 5x - 2y = 0 and -5x + 2y - 15 = 0.',
          strategy: 'Find both slopes and y-intercepts.',
          steps: [
            {
              title: 'Compare slopes and y-intercepts',
              math: 'm₁ = 5/2, m₂ = 5/2; c₁ = 0 ≠ c₂ = 15/2 ⇒ L₁ ∥ L₂',
              explanation: 'Same slope with distinct y-intercepts ⇒ parallel.',
            },
          ],
          answer: 'parallel',
        },
        {
          label: '(c)',
          prompt: 'Compare y = -4x + 2 and 16x + 4y - 1 = 0.',
          strategy: 'Find m₁ and m₂.',
          steps: [
            {
              title: 'Compare slopes and y-intercepts',
              math: 'm₁ = -4, m₂ = -16/4 = -4; c₁ = 2 ≠ c₂ = 1/4 ⇒ L₁ ∥ L₂',
              explanation: 'Equal slopes and different y-intercepts ⇒ parallel.',
            },
          ],
          answer: 'parallel',
        },
        {
          label: '(d)',
          prompt: 'Compare 3x = 5y + 5 and 15x + 9y - 20 = 0.',
          strategy: 'Find m₁ and m₂.',
          steps: [
            {
              title: 'Compute product of slopes',
              math: 'm₁ = 3/5, m₂ = -15/9 = -5/3 ⇒ m₁ × m₂ = (3/5)(-5/3) = -1 ⇒ L₁ ⊥ L₂',
              explanation: 'Product is -1 ⇒ perpendicular.',
            },
          ],
          answer: 'perpendicular',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Part (a): Perpendicular Pair L₁ ⊥ L₂',
        curves: [
          { kind: 'linear', m: -3, c: -6, label: 'L₁: 3x + y + 6 = 0', color: '#0284c7' },
          { kind: 'linear', m: 1 / 3, c: -10 / 3, label: 'L₂: x - 3y - 10 = 0', color: '#e11d48' },
        ],
        points: [{ x: -0.8, y: -3.6, label: '(-0.8, -3.6)', color: '#10b981' }],
        xRange: [-6, 6],
        yRange: [-8, 4],
      },
    },
    {
      id: 'ex32-11',
      exerciseId: 'ex3_2',
      number: 'Q11',
      page: '3.33',
      level: 'Level 1',
      topic: 'Inclination from Slope',
      statement: 'Find the inclination of the straight line L when the slope of L is 3. Give your answer correct to 3 significant figures.',
      parts: [
        {
          label: 'Main',
          prompt: 'Solve tan θ = 3.',
          strategy: 'Use slope = tan θ.',
          steps: [
            {
              title: 'Apply tan θ = m',
              math: 'tan θ = 3 ⇒ θ ≈ 71.6° (cor. to 3 sig. fig.)',
              explanation: 'Using inverse tangent on a calculator gives 71.565° ≈ 71.6°.',
            },
          ],
          answer: '71.6°',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Line with Slope 3 (θ ≈ 71.6°)',
        curves: [{ kind: 'linear', m: 3, c: 0, label: 'm = 3 (θ ≈ 71.6°)', color: '#0284c7' }],
        points: [{ x: 1, y: 3, label: '(1, 3)', color: '#10b981' }],
        xRange: [-3, 3],
        yRange: [-4, 6],
      },
    },
    {
      id: 'ex32-12',
      exerciseId: 'ex3_2',
      number: 'Q12',
      page: '3.33',
      level: 'Level 1',
      topic: 'Inclination from Two Points',
      statement: 'Find the inclination of the straight line L passing through the points (-3, 2) and (23, 12). Give your answer correct to 3 significant figures.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find slope first, then solve tan θ = m.',
          strategy: 'm = (12 - 2)/(23 - (-3)) = 10/26 = 5/13.',
          steps: [
            {
              title: 'Calculate slope',
              math: 'm = (12 - 2) / (23 + 3) = 10/26 = 5/13',
              explanation: 'Simplify slope to 5/13.',
            },
            {
              title: 'Find inclination θ',
              math: 'tan θ = 5/13 ⇒ θ ≈ 21.0° (cor. to 3 sig. fig.)',
              explanation: 'arctan(5/13) ≈ 21.0375° ≈ 21.0°.',
            },
          ],
          answer: '21.0°',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Line Through (-3, 2) & (23, 12)',
        curves: [{ kind: 'linear', m: 5 / 13, c: 41 / 13, label: 'θ ≈ 21.0°', color: '#0284c7' }],
        points: [
          { x: -3, y: 2, label: '(-3, 2)', color: '#10b981' },
          { x: 23, y: 12, label: '(23, 12)', color: '#8b5cf6' },
        ],
        xRange: [-8, 26],
        yRange: [-2, 16],
      },
    },
    {
      id: 'ex32-13',
      exerciseId: 'ex3_2',
      number: 'Q13',
      page: '3.33',
      level: 'Level 1',
      topic: 'Inclination from Intercepts',
      statement: 'Find the inclination of the straight line L whose x-intercept and y-intercept are 45 and -45 respectively.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find slope from (45, 0) and (0, -45), then find θ.',
          strategy: 'm = (0 - (-45))/(45 - 0) = 1 ⇒ tan θ = 1.',
          steps: [
            {
              title: 'Calculate slope and inclination',
              math: 'm = (0 - (-45)) / (45 - 0) = 1 ⇒ tan θ = 1 ⇒ θ = 45°',
              explanation: 'Slope 1 corresponds to exact inclination 45°.',
            },
          ],
          answer: '45°',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Line with Intercepts 45 & -45 (θ = 45°)',
        curves: [{ kind: 'linear', m: 1, c: -45, label: 'y = x - 45 (θ = 45°)', color: '#0284c7' }],
        points: [
          { x: 45, y: 0, label: '(45, 0)', color: '#10b981' },
          { x: 0, y: -45, label: '(0, -45)', color: '#f59e0b' },
        ],
        xRange: [-10, 55],
        yRange: [-55, 10],
      },
    },
    {
      id: 'ex32-14',
      exerciseId: 'ex3_2',
      number: 'Q14',
      page: '3.33',
      level: 'Level 1',
      topic: 'Common x-intercept & y-axis Segment',
      statement: 'L₁: x - 3y + 9 = 0 and L₂: 3x + y + 27 = 0 are two straight lines in the rectangular coordinate plane. (a) Show that they have the same x-intercept. (b) L₁ and L₂ intersect the y-axis at the points P and Q respectively. Find the length of PQ.',
      parts: [
        {
          label: '(a)',
          prompt: 'Compute both x-intercepts and compare.',
          strategy: 'Use x-intercept = -C/A for each line.',
          steps: [
            {
              title: 'Compare x-intercepts',
              math: 'x-intercept of L₁ = -9/1 = -9; x-intercept of L₂ = -27/3 = -9',
              explanation: 'Both lines have x-intercept -9.',
            },
          ],
          answer: 'Shown (both x-intercepts equal -9)',
        },
        {
          label: '(b)',
          prompt: 'Find the length of PQ on the y-axis.',
          strategy: 'Find y-intercepts P and Q, then subtract the lower y-coordinate from the upper.',
          steps: [
            {
              title: 'Find y-intercepts P and Q',
              math: 'y_P = -9/(-3) = 3; y_Q = -27/1 = -27 ⇒ P(0, 3), Q(0, -27)',
              explanation: 'Use y-intercept = -C/B.',
            },
            {
              title: 'Compute length PQ',
              math: 'PQ = 3 - (-27) = 30 units',
              explanation: 'Vertical distance along the y-axis.',
            },
          ],
          answer: '30 units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ & L₂ Sharing (-9, 0)',
        curves: [
          { kind: 'linear', m: 1 / 3, c: 3, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -3, c: -27, label: 'L₂', color: '#e11d48' },
        ],
        points: [
          { x: -9, y: 0, label: '(-9, 0)', color: '#10b981' },
          { x: 0, y: 3, label: 'P(0, 3)', color: '#f59e0b' },
          { x: 0, y: -27, label: 'Q(0, -27)', color: '#f59e0b' },
        ],
        xRange: [-12, 4],
        yRange: [-30, 8],
      },
    },
    {
      id: 'ex32-15',
      exerciseId: 'ex3_2',
      number: 'Q15',
      page: '3.33',
      level: 'Level 1',
      topic: 'Intersection on x-axis (Graph)',
      statement: 'In the figure, the straight lines L₁: kx - y - 10 = 0 and L₂: x = 5 intersect at a point on the x-axis, where k is a constant. (a) Find k. (b) Does the point (-3, -16) lie on L₁? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'L₂: x = 5 meets the x-axis at (5, 0), which also lies on L₁.',
          steps: [
            {
              title: 'Substitute (5, 0) into L₁',
              math: 'k(5) - 0 - 10 = 0 ⇒ 5k = 10 ⇒ k = 2',
              explanation: 'So L₁ is 2x - y - 10 = 0.',
            },
          ],
          answer: '2',
        },
        {
          label: '(b)',
          prompt: 'Check if (-3, -16) lies on L₁.',
          strategy: 'Substitute x = -3, y = -16 into 2x - y - 10.',
          steps: [
            {
              title: 'Evaluate L.H.S.',
              math: 'L.H.S. = 2(-3) - (-16) - 10 = -6 + 16 - 10 = 0 = R.H.S.',
              explanation: 'Since it satisfies the equation, yes, (-3, -16) lies on L₁.',
            },
          ],
          answer: 'yes',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: 2x - y - 10 = 0 & L₂: x = 5',
        curves: [
          { kind: 'linear', m: 2, c: -10, label: 'L₁', color: '#0284c7' },
          { kind: 'vertical', x: 5, label: 'L₂: x = 5', color: '#9333ea' },
        ],
        points: [
          { x: 5, y: 0, label: '(5, 0)', color: '#10b981' },
          { x: -3, y: -16, label: '(-3, -16)', color: '#f59e0b' },
        ],
        xRange: [-5, 9],
        yRange: [-18, 8],
      },
    },
    {
      id: 'ex32-16',
      exerciseId: 'ex3_2',
      number: 'Q16',
      page: '3.33',
      level: 'Level 1',
      topic: 'Intersection on y-axis & Comparing Lengths',
      statement: 'It is given that the straight lines L₁: 2x + 3y - 24 = 0 and L₂: 8x + 5y + k = 0 intersect at the point A on the y-axis, where k is a constant. (a) Find k. (b) Suppose that L₁ and L₂ intersect the x-axis at the points B and C respectively. Someone claims that OB < OC, where O is the origin. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'Equate y-intercepts of L₁ and L₂.',
          steps: [
            {
              title: 'Equate y-intercepts',
              math: '-(-24)/3 = -k/5 ⇒ 8 = -k/5 ⇒ k = -40',
              explanation: 'Both lines cut the y-axis at A(0, 8).',
            },
          ],
          answer: '-40',
        },
        {
          label: '(b)',
          prompt: 'Test whether OB < OC.',
          strategy: 'Find x-intercepts B and C of L₁ and L₂.',
          steps: [
            {
              title: 'Find x-intercepts B and C',
              math: 'x_B = 24/2 = 12 ⇒ OB = 12; x_C = 40/8 = 5 ⇒ OC = 5',
              explanation: 'Since OB = 12 > 5 = OC, the claim OB < OC is false (disagree).',
            },
          ],
          answer: 'disagree (OB = 12 > OC = 5)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ & L₂ Meeting at A(0, 8)',
        curves: [
          { kind: 'linear', m: -2 / 3, c: 8, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -8 / 5, c: 8, label: 'L₂', color: '#e11d48' },
        ],
        points: [
          { x: 0, y: 8, label: 'A(0, 8)', color: '#10b981' },
          { x: 12, y: 0, label: 'B(12, 0)', color: '#0284c7' },
          { x: 5, y: 0, label: 'C(5, 0)', color: '#e11d48' },
        ],
        xRange: [-3, 15],
        yRange: [-3, 11],
      },
    },
    {
      id: 'ex32-17',
      exerciseId: 'ex3_2',
      number: 'Q17',
      page: '3.34',
      level: 'Level 1',
      topic: 'Parallel Lines in General Form (Graph)',
      statement: 'In the figure, L₁: 2x + 5y - 20 = 0 and L₂: 4x + hy + 25 = 0 are two parallel lines. (a) Find h. (b) Find the y-intercept of L₂.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find h.',
          strategy: 'Parallel lines have equal slopes: -2/5 = -4/h.',
          steps: [
            {
              title: 'Equate slopes',
              math: '-2/5 = -4/h ⇒ 2h = 20 ⇒ h = 10',
              explanation: 'So L₂ is 4x + 10y + 25 = 0.',
            },
          ],
          answer: '10',
        },
        {
          label: '(b)',
          prompt: 'Find the y-intercept of L₂.',
          strategy: 'Use -C/B on 4x + 10y + 25 = 0.',
          steps: [
            {
              title: 'Compute y-intercept',
              math: 'y-intercept = -25/10 = -2.5',
              explanation: 'Or -5/2.',
            },
          ],
          answer: '-2.5',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Parallel Lines L₁ & L₂',
        curves: [
          { kind: 'linear', m: -0.4, c: 4, label: 'L₁: 2x + 5y - 20 = 0', color: '#0284c7' },
          { kind: 'linear', m: -0.4, c: -2.5, label: 'L₂: 4x + 10y + 25 = 0', color: '#9333ea' },
        ],
        points: [
          { x: 0, y: 4, label: '(0, 4)', color: '#10b981' },
          { x: 0, y: -2.5, label: '(0, -2.5)', color: '#f59e0b' },
        ],
        xRange: [-8, 12],
        yRange: [-6, 7],
      },
    },
    {
      id: 'ex32-18',
      exerciseId: 'ex3_2',
      number: 'Q18',
      page: '3.34',
      level: 'Level 1',
      topic: 'Perpendicular Lines in General Form',
      examRef: 'HKDSE 2019 P2 Q24',
      statement: 'Find the constant k such that the straight lines L₁: kx + 8y - 25 = 0 and L₂: 2x + 8y - 25 = 0 are perpendicular to each other.',
      parts: [
        {
          label: 'Main',
          prompt: 'Use m₁ × m₂ = -1 to solve for k.',
          strategy: 'm₁ = -k/8 and m₂ = -2/8 = -1/4.',
          steps: [
            {
              title: 'Apply perpendicular condition',
              math: '(-k/8) × (-2/8) = -1 ⇒ 2k / 64 = -1 ⇒ k = -32',
              explanation: 'Equivalently A₁A₂ + B₁B₂ = 0 ⇒ 2k + 64 = 0 ⇒ k = -32.',
            },
          ],
          answer: '-32',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: -32x + 8y - 25 = 0 ⊥ L₂',
        curves: [
          { kind: 'linear', m: 4, c: 25 / 8, label: 'L₁ (k = -32)', color: '#0284c7' },
          { kind: 'linear', m: -0.25, c: 25 / 8, label: 'L₂', color: '#e11d48' },
        ],
        points: [{ x: 0, y: 3.125, label: '(0, 25/8)', color: '#10b981' }],
        xRange: [-4, 6],
        yRange: [-4, 10],
      },
    },
    {
      id: 'ex32-19',
      exerciseId: 'ex3_2',
      number: 'Q19',
      page: '3.34',
      level: 'Level 1',
      topic: 'Perpendicular Lines & Same x-intercept',
      examRef: '(a): HKDSE 2016 P2 Q25',
      statement: 'It is given that the straight lines L₁: hx + ky - 11 = 0 and L₂: 6x + 4y - 33 = 0 are perpendicular to each other and intersect at a point on the x-axis. (a) Find h and k. (b) Does L₁ pass through the point (-4, 1)? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find h and k.',
          strategy: 'Equal x-intercepts gives h; perpendicular slopes gives k.',
          steps: [
            {
              title: 'Equate x-intercepts to find h',
              math: '11/h = 33/6 = 11/2 ⇒ h = 2',
              explanation: 'Both lines cut the x-axis at (11/2, 0).',
            },
            {
              title: 'Use m₁ × m₂ = -1 to find k',
              math: '(-2/k) × (-6/4) = -1 ⇒ 3/k = -1 ⇒ k = -3',
              explanation: 'Thus L₁ is 2x - 3y - 11 = 0.',
            },
          ],
          answer: 'h = 2, k = -3',
        },
        {
          label: '(b)',
          prompt: 'Check whether (-4, 1) lies on L₁.',
          strategy: 'Substitute x = -4, y = 1 into 2x - 3y - 11.',
          steps: [
            {
              title: 'Evaluate L.H.S.',
              math: 'L.H.S. = 2(-4) - 3(1) - 11 = -22 ≠ 0',
              explanation: 'Since L.H.S. ≠ R.H.S., L₁ does not pass through (-4, 1) (no).',
            },
          ],
          answer: 'no',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: 2x - 3y - 11 = 0 ⊥ L₂',
        curves: [
          { kind: 'linear', m: 2 / 3, c: -11 / 3, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -1.5, c: 8.25, label: 'L₂', color: '#e11d48' },
        ],
        points: [
          { x: 5.5, y: 0, label: '(11/2, 0)', color: '#10b981' },
          { x: -4, y: 1, label: '(-4, 1)', color: '#f59e0b', hollow: true },
        ],
        xRange: [-6, 10],
        yRange: [-6, 10],
      },
    },
    {
      id: 'ex32-20',
      exerciseId: 'ex3_2',
      number: 'Q20',
      page: '3.34',
      level: 'Level 1',
      topic: 'Parallel Line with Given y-intercept',
      examRef: 'HKDSE 2017 P2 Q24 technique',
      statement: 'It is given that the straight lines L₁: 7x - 4y + 30 = 0 and L₂ are parallel to each other. If the y-intercept of L₂ is -15, find the equation of L₂ in the general form.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find L₂ in general form.',
          strategy: 'Parallel to 7x - 4y + 30 = 0 means slope = 7/4 (or form 7x - 4y + C = 0).',
          steps: [
            {
              title: 'Use slope-intercept form',
              math: 'm₂ = 7/4, c = -15 ⇒ y = (7/4)x - 15',
              explanation: 'Parallel lines have equal slopes.',
            },
            {
              title: 'Convert to general form',
              math: '4y = 7x - 60 ⇒ 7x - 4y - 60 = 0',
              explanation: 'Multiply by 4 and rearrange with A > 0.',
            },
          ],
          answer: '7x - 4y - 60 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₂: 7x - 4y - 60 = 0 ∥ L₁',
        curves: [
          { kind: 'linear', m: 1.75, c: 7.5, label: 'L₁', color: '#64748b', dashed: true },
          { kind: 'linear', m: 1.75, c: -15, label: 'L₂', color: '#0284c7' },
        ],
        points: [{ x: 0, y: -15, label: '(0, -15)', color: '#10b981' }],
        xRange: [-6, 12],
        yRange: [-18, 12],
      },
    },
    {
      id: 'ex32-21',
      exerciseId: 'ex3_2',
      number: 'Q21',
      page: '3.34',
      level: 'Level 1',
      topic: 'Perpendicular Line Through a Point',
      statement: 'It is given that the straight line L passes through the point (-10, 6). If L is perpendicular to another straight line 8x - 3y - 48 = 0, find the equation of L in the general form.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the equation of L in general form.',
          strategy: 'Slope of given line is 8/3, so slope of L is -3/8.',
          steps: [
            {
              title: 'Find slope of L',
              math: 'm_given = 8/3 ⇒ m_L = -3/8',
              explanation: 'Negative reciprocal for perpendicular lines.',
            },
            {
              title: 'Apply point-slope form and convert',
              math: 'y - 6 = -(3/8)(x + 10) ⇒ 8y - 48 = -3x - 30 ⇒ 3x + 8y - 18 = 0',
              explanation: 'Clear denominator 8 and move terms to the left.',
            },
          ],
          answer: '3x + 8y - 18 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: 3x + 8y - 18 = 0',
        curves: [
          { kind: 'linear', m: 8 / 3, c: -16, label: '8x - 3y - 48 = 0', color: '#64748b', dashed: true },
          { kind: 'linear', m: -3 / 8, c: 2.25, label: 'L: 3x + 8y - 18 = 0', color: '#0284c7' },
        ],
        points: [{ x: -10, y: 6, label: '(-10, 6)', color: '#10b981' }],
        xRange: [-14, 12],
        yRange: [-18, 10],
      },
    },
    {
      id: 'ex32-22',
      exerciseId: 'ex3_2',
      number: 'Q22',
      page: '3.34',
      level: 'Level 1',
      topic: 'Inclination & Parallel Line',
      statement: 'L: 5x - 6y + 30 = 0 is a straight line in the rectangular coordinate plane. (a) Find the inclination of L, correct to 3 significant figures. (b) Suppose that another straight line L₁ has the same inclination as L, and L₁ passes through the point (12, -2). Find the equation of L₁ in the general form.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the inclination of L.',
          strategy: 'Slope of L is 5/6; solve tan θ = 5/6.',
          steps: [
            {
              title: 'Use slope = tan θ',
              math: 'm = -5/(-6) = 5/6 ⇒ tan θ = 5/6 ⇒ θ ≈ 39.8° (cor. to 3 sig. fig.)',
              explanation: 'arctan(5/6) ≈ 39.8056°.',
            },
          ],
          answer: '39.8°',
        },
        {
          label: '(b)',
          prompt: 'Find L₁ with same inclination passing through (12, -2).',
          strategy: 'Same inclination means same slope 5/6.',
          steps: [
            {
              title: 'Apply point-slope form',
              math: 'y - (-2) = (5/6)(x - 12) ⇒ 6y + 12 = 5x - 60 ⇒ 5x - 6y - 72 = 0',
              explanation: 'Convert to general form with A > 0.',
            },
          ],
          answer: '5x - 6y - 72 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L and Parallel Line L₁',
        curves: [
          { kind: 'linear', m: 5 / 6, c: 5, label: 'L: 5x - 6y + 30 = 0', color: '#64748b', dashed: true },
          { kind: 'linear', m: 5 / 6, c: -12, label: 'L₁: 5x - 6y - 72 = 0', color: '#0284c7' },
        ],
        points: [{ x: 12, y: -2, label: '(12, -2)', color: '#10b981' }],
        xRange: [-8, 18],
        yRange: [-15, 10],
      },
    },
    {
      id: 'ex32-23',
      exerciseId: 'ex3_2',
      number: 'Q23',
      page: '3.34',
      level: 'Level 1',
      topic: 'Inclination 30° & Surd General Form',
      statement: 'It is given that the inclination of a straight line L is 30°. (a) Find the slope of L. (b) If L cuts the y-axis at a point Q such that OQ = 3√3 units, where O is the origin, find the possible equations of L in the general form. (Leave the answers in surd form.)',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the slope of L.',
          strategy: 'Use m = tan 30° = 1/√3.',
          steps: [
            {
              title: 'Evaluate tan 30°',
              math: 'm = tan 30° = 1/√3',
              explanation: 'Exact trigonometric value of tan 30°.',
            },
          ],
          answer: '1/√3',
        },
        {
          label: '(b)',
          prompt: 'Find both possible equations when OQ = 3√3 on the y-axis.',
          strategy: 'Q can be (0, 3√3) or (0, -3√3).',
          steps: [
            {
              title: 'Write both slope-intercept equations',
              math: 'y = (1/√3)x + 3√3 or y = (1/√3)x - 3√3',
              explanation: 'y-intercept c = ±3√3.',
            },
            {
              title: 'Multiply by √3 to reach general form',
              math: 'x - √3y + 9 = 0 or x - √3y - 9 = 0',
              explanation: 'Note that (3√3)(√3) = 9.',
            },
          ],
          answer: 'x - √3y + 9 = 0, x - √3y - 9 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Inclination 30° Lines with OQ = 3√3',
        curves: [
          { kind: 'linear', m: 1 / Math.sqrt(3), c: 3 * Math.sqrt(3), label: 'x - √3y + 9 = 0', color: '#0284c7' },
          { kind: 'linear', m: 1 / Math.sqrt(3), c: -3 * Math.sqrt(3), label: 'x - √3y - 9 = 0', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 0, y: 5.196, label: 'Q₁(0, 3√3)', color: '#10b981' },
          { x: 0, y: -5.196, label: 'Q₂(0, -3√3)', color: '#f59e0b' },
        ],
        xRange: [-12, 12],
        yRange: [-8, 8],
      },
    },
    {
      id: 'ex32-24',
      exerciseId: 'ex3_2',
      number: 'Q24',
      page: '3.34',
      level: 'Level 2',
      topic: 'Intercepts & Rectangle Area (Graph)',
      statement: 'In the figure, the straight line L: 2x - 3y - 24 = 0 intersects the x-axis and the y-axis at the points A and B respectively. C is a point in the coordinate plane such that OACB is a rectangle. Find the area of the rectangle OACB.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find OA and OB from the intercepts, then multiply.',
          strategy: 'For 2x - 3y - 24 = 0, find x-intercept A and y-intercept B.',
          steps: [
            {
              title: 'Find intercepts A and B',
              math: 'x-intercept = 24/2 = 12 ⇒ A(12, 0); y-intercept = 24/(-3) = -8 ⇒ B(0, -8)',
              explanation: 'So OA = 12 units and OB = 8 units.',
            },
            {
              title: 'Compute area of rectangle OACB',
              math: 'Area = OA × OB = 12 × 8 = 96 sq. units',
              explanation: 'Adjacent sides of rectangle OACB lie along the axes.',
            },
          ],
          answer: '96 sq. units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Rectangle OACB (Area = 96)',
        curves: [{ kind: 'linear', m: 2 / 3, c: -8, label: 'L: 2x - 3y - 24 = 0', color: '#0284c7' }],
        points: [
          { x: 12, y: 0, label: 'A(12, 0)', color: '#10b981' },
          { x: 0, y: -8, label: 'B(0, -8)', color: '#10b981' },
          { x: 12, y: -8, label: 'C(12, -8)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: 0, y: 0 },
              { x: 12, y: 0 },
              { x: 12, y: -8 },
              { x: 0, y: -8 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
            label: 'Area = 96',
          },
        ],
        xRange: [-3, 15],
        yRange: [-11, 3],
      },
    },
    {
      id: 'ex32-25',
      exerciseId: 'ex3_2',
      number: 'Q25',
      page: '3.35',
      level: 'Level 2',
      topic: 'General Form & Triangle Perimeter',
      statement: 'It is given that the straight line L: 3x + 4y + k = 0 passes through the point A(-28, 6), where k is a constant. (a) Find k. (b) Suppose that L intersects the x-axis and the y-axis at the points B and C respectively. Find the perimeter of △OBC, where O is the origin.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'Substitute A(-28, 6) into 3x + 4y + k = 0.',
          steps: [
            {
              title: 'Substitute (-28, 6)',
              math: '3(-28) + 4(6) + k = 0 ⇒ -84 + 24 + k = 0 ⇒ k = 60',
              explanation: 'So L is 3x + 4y + 60 = 0.',
            },
          ],
          answer: '60',
        },
        {
          label: '(b)',
          prompt: 'Find the perimeter of △OBC.',
          strategy: 'Find intercepts B and C, then apply Pythagoras theorem for BC.',
          steps: [
            {
              title: 'Find B, C and hypotenuse BC',
              math: 'B = (-20, 0), C = (0, -15) ⇒ OB = 20, OC = 15, BC = √(20² + 15²) = 25',
              explanation: '△OBC is a 15-20-25 right-angled triangle.',
            },
            {
              title: 'Sum the three sides',
              math: 'Perimeter = 20 + 15 + 25 = 60 units',
              explanation: 'Total perimeter of △OBC.',
            },
          ],
          answer: '60 units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '△OBC (Perimeter = 60)',
        curves: [{ kind: 'linear', m: -0.75, c: -15, label: '3x + 4y + 60 = 0', color: '#0284c7' }],
        points: [
          { x: -28, y: 6, label: 'A(-28, 6)', color: '#8b5cf6' },
          { x: -20, y: 0, label: 'B(-20, 0)', color: '#10b981' },
          { x: 0, y: -15, label: 'C(0, -15)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: 0, y: 0 },
              { x: -20, y: 0 },
              { x: 0, y: -15 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
          },
        ],
        xRange: [-30, 5],
        yRange: [-18, 10],
      },
    },
    {
      id: 'ex32-26',
      exerciseId: 'ex3_2',
      number: 'Q26',
      page: '3.35',
      level: 'Level 2',
      topic: 'Common x-intercept & Triangle Area',
      statement: 'It is given that the straight lines L₁: x - 3y + 12 = 0 and L₂: 7x + 6y + k = 0 intersect at the point P on the x-axis, where k is a constant. (a) Find k. (b) Suppose that L₁ and L₂ intersect the y-axis at the points Q and R respectively. Someone claims that the area of △PQR is greater than 100 sq. units. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'Equate x-intercepts of L₁ and L₂.',
          steps: [
            {
              title: 'Equate x-intercepts',
              math: 'x_P = -12/1 = -12 ⇒ -k/7 = -12 ⇒ k = 84',
              explanation: 'So P is (-12, 0) and L₂ is 7x + 6y + 84 = 0.',
            },
          ],
          answer: '84',
        },
        {
          label: '(b)',
          prompt: 'Verify whether Area(△PQR) > 100.',
          strategy: 'Use QR on the y-axis as base and OP = 12 as height.',
          steps: [
            {
              title: 'Find Q and R on the y-axis',
              math: 'y_Q = -12/(-3) = 4 ⇒ Q(0, 4); y_R = -84/6 = -14 ⇒ R(0, -14)',
              explanation: 'Length QR = 4 - (-14) = 18 units.',
            },
            {
              title: 'Calculate area of △PQR',
              math: 'Area = (1/2) × QR × OP = (1/2) × 18 × 12 = 108 sq. units > 100 sq. units',
              explanation: 'Since 108 > 100, agree with the claim.',
            },
          ],
          answer: 'agree (Area = 108 sq. units > 100)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '△PQR (Area = 108)',
        curves: [
          { kind: 'linear', m: 1 / 3, c: 4, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -7 / 6, c: -14, label: 'L₂', color: '#e11d48' },
        ],
        points: [
          { x: -12, y: 0, label: 'P(-12, 0)', color: '#10b981' },
          { x: 0, y: 4, label: 'Q(0, 4)', color: '#f59e0b' },
          { x: 0, y: -14, label: 'R(0, -14)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: -12, y: 0 },
              { x: 0, y: 4 },
              { x: 0, y: -14 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
          },
        ],
        xRange: [-15, 4],
        yRange: [-17, 7],
      },
    },
    {
      id: 'ex32-27',
      exerciseId: 'ex3_2',
      number: 'Q27',
      page: '3.35',
      level: 'Level 2',
      topic: 'Quadratic Conditions for k',
      statement: 'Find k in each of the following cases: (a) L₁: 5x - ky + 72 = 0 and L₂: 4x + y - (k - 1) = 0 intersect at the y-axis. (b) L₁: (2 - k)x - 3y + 55 = 0 and L₂: 8x + ky - 17 = 0 are parallel lines. (c) L₁: 4x - (2k + 1)y + 25 = 0 and L₂: (3 - k)x + ky + 1 = 0 are perpendicular to each other.',
      parts: [
        {
          label: '(a)',
          prompt: 'Equal y-intercepts.',
          strategy: 'Equate y-intercepts: 72/k = k - 1.',
          steps: [
            {
              title: 'Form and solve quadratic in k',
              math: '72/k = k - 1 ⇒ k² - k - 72 = 0 ⇒ (k + 8)(k - 9) = 0 ⇒ k = -8 or k = 9',
              explanation: 'Both values give non-zero denominators.',
            },
          ],
          answer: '-8, 9',
        },
        {
          label: '(b)',
          prompt: 'Parallel lines.',
          strategy: 'Equate slopes: (2 - k)/3 = -8/k.',
          steps: [
            {
              title: 'Solve quadratic from equal slopes',
              math: '(2 - k)/3 = -8/k ⇒ k(2 - k) = -24 ⇒ k² - 2k - 24 = 0 ⇒ (k + 4)(k - 6) = 0',
              explanation: 'Both k = -4 and k = 6 give distinct y-intercepts, so both are parallel.',
            },
          ],
          answer: '-4, 6',
        },
        {
          label: '(c)',
          prompt: 'Perpendicular lines.',
          strategy: 'Use A₁A₂ + B₁B₂ = 0 (or m₁ × m₂ = -1).',
          steps: [
            {
              title: 'Apply perpendicular condition',
              math: '4(3 - k) - (2k + 1)k = 0 ⇒ 12 - 4k - 2k² - k = 0 ⇒ 2k² + 5k - 12 = 0',
              explanation: 'Rearrange to standard quadratic form.',
            },
            {
              title: 'Factorize',
              math: '(k + 4)(2k - 3) = 0 ⇒ k = -4 or k = 3/2',
              explanation: 'Check k ≠ 0 and 2k + 1 ≠ 0; both solutions are valid.',
            },
          ],
          answer: '-4, 3/2',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Part (b) Parallel Lines at k = 6',
        curves: [
          { kind: 'linear', m: -4 / 3, c: 55 / 3, label: 'L₁ (k = 6)', color: '#0284c7' },
          { kind: 'linear', m: -4 / 3, c: 17 / 6, label: 'L₂ (k = 6)', color: '#9333ea' },
        ],
        xRange: [-6, 15],
        yRange: [-6, 22],
      },
    },
    {
      id: 'ex32-28',
      exerciseId: 'ex3_2',
      number: 'Q28',
      page: '3.35',
      level: 'Level 2',
      topic: 'Perpendicular Lines Intersecting at a Given Point',
      statement: 'It is given that the straight lines L₁: hx + ky - 43 = 0 and L₂: 5x + 2y - 35 = 0 are perpendicular to each other. If L₁ and L₂ intersect at the point (9, -5), find h and k.',
      parts: [
        {
          label: 'Main',
          prompt: 'Form two equations in h and k.',
          strategy: 'Use perpendicular slopes (5h + 2k = 0) and point (9, -5) on L₁ (9h - 5k = 43).',
          steps: [
            {
              title: 'Form simultaneous equations',
              math: '(-h/k)(-5/2) = -1 ⇒ 5h + 2k = 0; 9h - 5k - 43 = 0',
              explanation: 'First equation from L₁ ⊥ L₂, second from substituting (9, -5) into L₁.',
            },
            {
              title: 'Solve simultaneously',
              math: 'k = -(5/2)h ⇒ 9h - 5(-5h/2) = 43 ⇒ (43/2)h = 43 ⇒ h = 2, k = -5',
              explanation: 'Verify: 2(9) - 5(-5) - 43 = 18 + 25 - 43 = 0.',
            },
          ],
          answer: 'h = 2, k = -5',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ ⊥ L₂ at (9, -5)',
        curves: [
          { kind: 'linear', m: 0.4, c: -8.6, label: 'L₁: 2x - 5y - 43 = 0', color: '#0284c7' },
          { kind: 'linear', m: -2.5, c: 17.5, label: 'L₂: 5x + 2y - 35 = 0', color: '#e11d48' },
        ],
        points: [{ x: 9, y: -5, label: '(9, -5)', color: '#10b981' }],
        xRange: [-2, 16],
        yRange: [-12, 12],
      },
    },
    {
      id: 'ex32-29',
      exerciseId: 'ex3_2',
      number: 'Q29',
      page: '3.35',
      level: 'Level 2',
      topic: 'Parallelogram & Section Formula',
      isNonFoundation: true,
      statement: 'ABCD is a parallelogram in the rectangular coordinate plane. It is given that the equation of AB is 3x - 5y - 25 = 0 and the coordinates of C are (-30, -9). (a) Find the equation of the straight line L passing through C and D in the general form. (b) Suppose that L found in (a) cuts the x-axis and the y-axis at the points H and K respectively. If P is a point on HK such that HP : PK = 1 : 2, find the coordinates of P.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find line CD parallel to AB.',
          strategy: 'CD ∥ AB ⇒ slope = 3/5 and passes through C(-30, -9).',
          steps: [
            {
              title: 'Use parallel slope and point C',
              math: 'y - (-9) = (3/5)(x + 30) ⇒ 5y + 45 = 3x + 90 ⇒ 3x - 5y + 45 = 0',
              explanation: 'Convert to general form.',
            },
          ],
          answer: '3x - 5y + 45 = 0',
        },
        {
          label: '(b)',
          prompt: 'Find P dividing HK in ratio 1 : 2.',
          strategy: 'Find intercepts H(-15, 0) and K(0, 9), then apply section formula.',
          steps: [
            {
              title: 'Find intercepts H and K',
              math: 'H = (-15, 0), K = (0, 9)',
              explanation: 'Put y = 0 and x = 0 in 3x - 5y + 45 = 0.',
            },
            {
              title: 'Apply section formula (HP : PK = 1 : 2)',
              math: 'P = ((2(-15) + 1(0))/(1 + 2), (2(0) + 1(9))/(1 + 2)) = (-10, 3)',
              explanation: 'Weight H by 2 and K by 1.',
            },
          ],
          answer: '(-10, 3)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Line CD & Division Point P(-10, 3)',
        curves: [
          { kind: 'linear', m: 0.6, c: -5, label: 'AB: 3x - 5y - 25 = 0', color: '#64748b', dashed: true },
          { kind: 'linear', m: 0.6, c: 9, label: 'CD: 3x - 5y + 45 = 0', color: '#0284c7' },
        ],
        points: [
          { x: -15, y: 0, label: 'H(-15, 0)', color: '#f59e0b' },
          { x: 0, y: 9, label: 'K(0, 9)', color: '#f59e0b' },
          { x: -10, y: 3, label: 'P(-10, 3)', color: '#10b981' },
        ],
        xRange: [-20, 8],
        yRange: [-8, 12],
      },
    },
    {
      id: 'ex32-30',
      exerciseId: 'ex3_2',
      number: 'Q30',
      page: '3.35',
      level: 'Level 2',
      topic: 'Perpendicular Through y-intercept of Segment',
      statement: 'The line segment joining the points A(-8, -11) and B(12, -1) intersects the y-axis at the point P. If the straight line L is perpendicular to AB and intersects AB at P, find the equation of L in the general form.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find AB equation (hence P) and perpendicular L through P.',
          strategy: 'Compute slope of AB = 1/2, find y-intercept P(0, -7), then use slope -2 for L.',
          steps: [
            {
              title: 'Find slope of AB and point P on y-axis',
              math: 'm_AB = (-1 - (-11)) / (12 - (-8)) = 10/20 = 1/2 ⇒ y + 1 = (1/2)(x - 12) ⇒ y = (1/2)x - 7',
              explanation: 'Putting x = 0 gives P = (0, -7).',
            },
            {
              title: 'Write equation of L ⊥ AB through P(0, -7)',
              math: 'm_L = -2, c = -7 ⇒ y = -2x - 7 ⇒ 2x + y + 7 = 0',
              explanation: 'Express in general form.',
            },
          ],
          answer: '2x + y + 7 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: 2x + y + 7 = 0 ⊥ AB at P(0, -7)',
        curves: [
          { kind: 'linear', m: 0.5, c: -7, label: 'AB', color: '#64748b', dashed: true },
          { kind: 'linear', m: -2, c: -7, label: 'L: 2x + y + 7 = 0', color: '#0284c7' },
        ],
        points: [
          { x: -8, y: -11, label: 'A(-8, -11)', color: '#8b5cf6' },
          { x: 12, y: -1, label: 'B(12, -1)', color: '#8b5cf6' },
          { x: 0, y: -7, label: 'P(0, -7)', color: '#10b981' },
        ],
        xRange: [-10, 14],
        yRange: [-13, 3],
      },
    },
    {
      id: 'ex32-31',
      exerciseId: 'ex3_2',
      number: 'Q31',
      page: '3.35',
      level: 'Level 2',
      topic: 'Perpendicular Lines & Triangle Area',
      examRef: 'HKCEE 2010 P1 Q12 technique',
      statement: 'In a rectangular coordinate plane, the straight line L₁: kx + 2y - 45 = 0 passes through the point P(-9, 9) and cuts the x-axis at the point Q. The straight line L₂ passes through P and is perpendicular to L₁. (a) Find k. (b) Find the equation of L₂ in the general form. (c) Suppose that L₂ cuts the x-axis at the point R. Someone claims that the area of △PQR exceeds 85 sq. units. Is the claim correct? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'Substitute P(-9, 9) into kx + 2y - 45 = 0.',
          steps: [
            {
              title: 'Substitute (-9, 9)',
              math: '-9k + 18 - 45 = 0 ⇒ -9k = 27 ⇒ k = -3',
              explanation: 'So L₁ is -3x + 2y - 45 = 0 (or 3x - 2y + 45 = 0).',
            },
          ],
          answer: '-3',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of L₂.',
          strategy: 'm₁ = 3/2 ⇒ m₂ = -2/3, passing through P(-9, 9).',
          steps: [
            {
              title: 'Apply point-slope form',
              math: 'm₁ = 3/2 ⇒ m₂ = -2/3 ⇒ y - 9 = -(2/3)(x + 9) ⇒ 2x + 3y - 9 = 0',
              explanation: 'Clear denominator 3 and rearrange.',
            },
          ],
          answer: '2x + 3y - 9 = 0',
        },
        {
          label: '(c)',
          prompt: 'Check if Area(△PQR) > 85.',
          strategy: 'Find x-intercepts Q and R; height from P(-9, 9) to the x-axis is 9.',
          steps: [
            {
              title: 'Find Q and R on the x-axis',
              math: 'Q = (-15, 0), R = (4.5, 0) ⇒ QR = 4.5 - (-15) = 19.5',
              explanation: 'Put y = 0 in L₁ and L₂.',
            },
            {
              title: 'Calculate area of △PQR',
              math: 'Area = (1/2) × 19.5 × 9 = 87.75 sq. units > 85 sq. units',
              explanation: 'Since 87.75 > 85, the claim is correct (yes).',
            },
          ],
          answer: 'yes (Area = 87.75 sq. units > 85)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Right Triangle △PQR (Area = 87.75)',
        curves: [
          { kind: 'linear', m: 1.5, c: 22.5, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -2 / 3, c: 3, label: 'L₂: 2x + 3y - 9 = 0', color: '#e11d48' },
        ],
        points: [
          { x: -9, y: 9, label: 'P(-9, 9)', color: '#10b981' },
          { x: -15, y: 0, label: 'Q(-15, 0)', color: '#f59e0b' },
          { x: 4.5, y: 0, label: 'R(4.5, 0)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: -9, y: 9 },
              { x: -15, y: 0 },
              { x: 4.5, y: 0 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
          },
        ],
        xRange: [-18, 8],
        yRange: [-3, 13],
      },
    },
    {
      id: 'ex32-32',
      exerciseId: 'ex3_2',
      number: 'Q32',
      page: '3.36',
      level: 'Level 2',
      topic: 'Inclination 45°, Parallel & Perpendicular Lines',
      statement: 'It is given that the inclination of the straight line L₁ is 45° and L₁ passes through the point (3, -5). L₂ is another straight line parallel to L₁ and passing through the origin O. (a) Find the equations of L₁ and L₂ in the general form. (b) P(-4, -4) is a point in the same coordinate plane. (i) Show that P lies on L₂. (ii) L₃ is another straight line perpendicular to L₂ and intersecting L₂ at P. Someone claims that L₃ intersects L₁ at the x-axis. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find L₁ and L₂ in general form.',
          strategy: 'Inclination 45° ⇒ slope = tan 45° = 1.',
          steps: [
            {
              title: 'Find L₁ and L₂',
              math: 'L₁: y + 5 = 1(x - 3) ⇒ x - y - 8 = 0; L₂: y = x ⇒ x - y = 0',
              explanation: 'Both have slope 1; L₂ passes through O(0, 0).',
            },
          ],
          answer: 'L₁: x - y - 8 = 0, L₂: x - y = 0',
        },
        {
          label: '(b)(i)',
          prompt: 'Show P(-4, -4) lies on L₂.',
          strategy: 'Substitute (-4, -4) into x - y = 0.',
          steps: [
            {
              title: 'Verify coordinates',
              math: 'L.H.S. = (-4) - (-4) = 0 = R.H.S.',
              explanation: 'Therefore P lies on L₂.',
            },
          ],
          answer: 'Shown: (-4) - (-4) = 0',
        },
        {
          label: '(b)(ii)',
          prompt: 'Check if L₃ meets L₁ on the x-axis.',
          strategy: 'Find L₃ (slope -1 through (-4, -4)), then compare x-intercepts of L₁ and L₃.',
          steps: [
            {
              title: 'Find L₃ and its x-intercept',
              math: 'L₃: y + 4 = -1(x + 4) ⇒ x + y + 8 = 0 ⇒ x-intercept of L₃ = -8',
              explanation: 'Meanwhile, x-intercept of L₁ (x - y - 8 = 0) is +8.',
            },
            {
              title: 'Compare x-intercepts',
              math: '-8 ≠ 8 ⇒ they do not intersect on the x-axis',
              explanation: 'Their intersection is actually (0, -8) on the y-axis! So disagree.',
            },
          ],
          answer: 'disagree (x-intercepts are 8 and -8; they meet at (0, -8))',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁, L₂ and L₃ Meeting at (0, -8)',
        curves: [
          { kind: 'linear', m: 1, c: -8, label: 'L₁: x - y - 8 = 0', color: '#0284c7' },
          { kind: 'linear', m: 1, c: 0, label: 'L₂: x - y = 0', color: '#64748b', dashed: true },
          { kind: 'linear', m: -1, c: -8, label: 'L₃: x + y + 8 = 0', color: '#e11d48' },
        ],
        points: [
          { x: -4, y: -4, label: 'P(-4, -4)', color: '#10b981' },
          { x: 0, y: -8, label: '(0, -8)', color: '#f59e0b' },
          { x: 8, y: 0, label: '(8, 0)', color: '#0284c7' },
        ],
        xRange: [-10, 10],
        yRange: [-10, 4],
      },
    },
    {
      id: 'ex32-33',
      exerciseId: 'ex3_2',
      number: 'Q33',
      page: '3.36',
      level: 'Smart Corner',
      topic: 'Perpendicular Lines, Triangle Area & Segment Ratio',
      statement: 'The straight line L₁ passes through the points A(-1, -16) and B(7, -10). The straight line L₂, passing through A and perpendicular to L₁, cuts the x-axis at the point C. (a) (i) Find the equation of L₂ in the general form. (ii) Hence, find the coordinates of C. (b) (i) Find the area of △ABC. (ii) D is a point on BC such that the area of △ACD is 40 sq. units. Find BD : DC.',
      parts: [
        {
          label: '(a)(i)',
          prompt: 'Find the equation of L₂ in general form.',
          strategy: 'Find slope of AB = 3/4, so m₂ = -4/3 through A(-1, -16).',
          steps: [
            {
              title: 'Find slope of L₁ and L₂',
              math: 'm₁ = (-10 + 16)/(7 + 1) = 6/8 = 3/4 ⇒ m₂ = -4/3',
              explanation: 'L₂ ⊥ L₁ ⇒ m₂ = -4/3.',
            },
            {
              title: 'Form equation of L₂',
              math: 'y + 16 = -(4/3)(x + 1) ⇒ 3y + 48 = -4x - 4 ⇒ 4x + 3y + 52 = 0',
              explanation: 'Express in general form.',
            },
          ],
          answer: '4x + 3y + 52 = 0',
        },
        {
          label: '(a)(ii)',
          prompt: 'Find coordinates of C.',
          strategy: 'Put y = 0 into 4x + 3y + 52 = 0.',
          steps: [
            {
              title: 'Find x-intercept C',
              math: '4x + 52 = 0 ⇒ x = -13 ⇒ C = (-13, 0)',
              explanation: 'C lies on the x-axis.',
            },
          ],
          answer: '(-13, 0)',
        },
        {
          label: '(b)(i)',
          prompt: 'Find the area of △ABC.',
          strategy: 'Since ∠BAC = 90°, Area(△ABC) = (1/2) × AB × AC.',
          steps: [
            {
              title: 'Compute AB and AC',
              math: 'AB = √(8² + 6²) = 10; AC = √((-13 + 1)² + (0 + 16)²) = √(144 + 256) = 20',
              explanation: 'Both sides are exact integers.',
            },
            {
              title: 'Compute right-triangle area',
              math: 'Area(△ABC) = (1/2) × 10 × 20 = 100 sq. units',
              explanation: 'Right angle is at vertex A.',
            },
          ],
          answer: '100 sq. units',
        },
        {
          label: '(b)(ii)',
          prompt: 'Find BD : DC given Area(△ACD) = 40.',
          strategy: '△ABD and △ACD share the same altitude from A to BC, so BD : DC = Area(△ABD) : Area(△ACD).',
          steps: [
            {
              title: 'Compare triangle areas with same height',
              math: 'Area(△ABD) = 100 - 40 = 60 ⇒ BD : DC = 60 : 40 = 3 : 2',
              explanation: 'Ratio of bases equals ratio of areas.',
            },
          ],
          answer: '3 : 2',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Right Triangle △ABC (Area = 100)',
        curves: [
          { kind: 'linear', m: 0.75, c: -15.25, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -4 / 3, c: -52 / 3, label: 'L₂: 4x + 3y + 52 = 0', color: '#e11d48' },
        ],
        points: [
          { x: -1, y: -16, label: 'A(-1, -16)', color: '#10b981' },
          { x: 7, y: -10, label: 'B(7, -10)', color: '#8b5cf6' },
          { x: -13, y: 0, label: 'C(-13, 0)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: -1, y: -16 },
              { x: 7, y: -10 },
              { x: -13, y: 0 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
          },
        ],
        xRange: [-16, 10],
        yRange: [-18, 4],
      },
    },
    {
      id: 'ex32-34',
      exerciseId: 'ex3_2',
      number: 'Q34',
      page: '3.36',
      level: 'Cross Topics',
      topic: 'Similar Triangles & Shortest Distance Area',
      examRef: 'HKCEE 2005 P1 Q13 technique',
      statement: 'The straight line L₁: x - 2y + 12 = 0 cuts the x-axis and the y-axis at the points A and B respectively. The straight line L₂, passing through A and perpendicular to L₁, cuts the y-axis at the point C. (a) Find the coordinates of A and B. (b) Find the equation of L₂ in the general form. (c) (i) Find the area of △ABC. (ii) P is a point on AC such that OP is the shortest distance from the origin O to AC. Someone claims that the area of the quadrilateral ABOP is less than 65 sq. units. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find A and B.',
          strategy: 'Read x- and y-intercepts of x - 2y + 12 = 0.',
          steps: [
            {
              title: 'Find intercepts',
              math: 'y = 0 ⇒ x = -12 ⇒ A(-12, 0); x = 0 ⇒ y = 6 ⇒ B(0, 6)',
              explanation: 'A lies on the x-axis and B lies on the y-axis.',
            },
          ],
          answer: 'A: (-12, 0), B: (0, 6)',
        },
        {
          label: '(b)',
          prompt: 'Find L₂ ⊥ L₁ through A(-12, 0).',
          strategy: 'm₁ = 1/2 ⇒ m₂ = -2.',
          steps: [
            {
              title: 'Apply point-slope form',
              math: 'y - 0 = -2(x + 12) ⇒ 2x + y + 24 = 0',
              explanation: 'General form of L₂.',
            },
          ],
          answer: '2x + y + 24 = 0',
        },
        {
          label: '(c)(i)',
          prompt: 'Find the area of △ABC.',
          strategy: 'Find C(0, -24) on y-axis; base BC = 30, height OA = 12.',
          steps: [
            {
              title: 'Compute Area(△ABC)',
              math: 'C = (0, -24) ⇒ BC = 6 - (-24) = 30; Area = (1/2) × 30 × 12 = 180 sq. units',
              explanation: 'BC lies along the y-axis and A(-12, 0) is 12 units away.',
            },
          ],
          answer: '180 sq. units',
        },
        {
          label: '(c)(ii)',
          prompt: 'Determine if Area(ABOP) < 65 sq. units.',
          strategy: 'OP ⊥ AC ⇒ △OCP ∼ △ACO with ratio OC/AC = 24/√(12² + 24²) = 2/√5, or compute Area(△OAP) directly.',
          steps: [
            {
              title: 'Use similar right triangles △OAP ∼ △CAO',
              math: 'AC = √(12² + 24²) = 12√5; Area(△OAC) = (1/2)(12)(24) = 144',
              explanation: 'Since OP ⊥ AC, △OAP ∼ △CAO with side ratio OA : AC = 12 : 12√5 = 1 : √5.',
            },
            {
              title: 'Compute Area(ABOP) = Area(△OAB) + Area(△OAP)',
              math: 'Area(△OAP) = 144 × (1/√5)² = 28.8; Area(△OAB) = (1/2)(12)(6) = 36 ⇒ Area(ABOP) = 36 + 28.8 = 64.8 < 65',
              explanation: 'Since 64.8 < 65, agree with the claim.',
            },
          ],
          answer: 'agree (Area = 64.8 sq. units < 65)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '△ABC & Quadrilateral ABOP (Area = 64.8)',
        curves: [
          { kind: 'linear', m: 0.5, c: 6, label: 'L₁: x - 2y + 12 = 0', color: '#0284c7' },
          { kind: 'linear', m: -2, c: -24, label: 'L₂: 2x + y + 24 = 0', color: '#e11d48' },
        ],
        points: [
          { x: -12, y: 0, label: 'A(-12, 0)', color: '#10b981' },
          { x: 0, y: 6, label: 'B(0, 6)', color: '#10b981' },
          { x: 0, y: -24, label: 'C(0, -24)', color: '#f59e0b' },
          { x: -9.6, y: -4.8, label: 'P(-9.6, -4.8)', color: '#9333ea' },
        ],
        polygons: [
          {
            points: [
              { x: -12, y: 0 },
              { x: 0, y: 6 },
              { x: 0, y: 0 },
              { x: -9.6, y: -4.8 },
            ],
            fill: 'rgba(16, 185, 129, 0.24)',
            stroke: '#10b981',
            label: 'ABOP = 64.8',
          },
        ],
        xRange: [-15, 5],
        yRange: [-26, 9],
      },
    },
  ],
};
