import type { ExerciseGroup } from '../types/math';

export const warmupExercise: ExerciseGroup = {
  id: 'warmup',
  code: 'Warm-up',
  title: 'Warm-up Exercise & Quick Review',
  subtitle: 'Substitution, discriminant nature of roots, and slope-intercept straight lines',
  pages: 'p. 4.2',
  objectives: [
    'Substitute values into quadratic and algebraic formulas',
    'Determine the nature of roots using the discriminant Δ = b² - 4ac',
    'Identify slope m and y-intercept c from y = mx + c',
  ],
  questions: [
    {
      id: 'wu-1',
      exerciseId: 'warmup',
      number: 'Q1',
      page: 'p. 4.2',
      level: 'Warm-up',
      topic: 'Method of Substitution',
      statement: 'Substitute the given values to evaluate y or find the unknown constant k.',
      parts: [
        {
          label: '(a)',
          prompt: 'It is given that y = x² - 3x + 7. Find y when x = 2.',
          steps: [
            {
              title: 'Substitute x = 2 into the equation',
              math: 'y = (2)² - 3(2) + 7',
              explanation: 'Replace every occurrence of x with 2.',
            },
            {
              title: 'Simplify arithmetic',
              math: 'y = 4 - 6 + 7 = 5',
              explanation: 'Evaluate the square and product first, then add/subtract.',
            },
          ],
          answer: '5',
        },
        {
          label: '(b)',
          prompt: 'It is given that y = -2x² + kx + 6. Find k when x = 3 and y = 0.',
          steps: [
            {
              title: 'Substitute x = 3 and y = 0',
              math: '0 = -2(3)² + k(3) + 6',
              explanation: 'Plug the given point (3, 0) into the quadratic equation.',
            },
            {
              title: 'Simplify and solve for k',
              math: '0 = -18 + 3k + 6  ⇒  3k = 12  ⇒  k = 4',
              explanation: 'Combine constants (-18 + 6 = -12) and isolate k.',
            },
          ],
          answer: '4',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Part (a) y = x² - 3x + 7 and Part (b) y = -2x² + 4x + 6',
        curves: [
          { kind: 'quadratic', a: 1, b: -3, c: 7, label: 'y = x² - 3x + 7', color: '#0284c7' },
          { kind: 'quadratic', a: -2, b: 4, c: 6, label: 'y = -2x² + 4x + 6', color: '#059669' },
        ],
        points: [
          { x: 2, y: 5, label: '(2, 5)', color: '#0284c7' },
          { x: 3, y: 0, label: '(3, 0)', color: '#059669' },
        ],
        xRange: [-2, 5],
        yRange: [-4, 12],
        interactiveX: { min: -1, max: 4, step: 0.5, defaultVal: 2, label: 'Test x value' },
      },
    },
    {
      id: 'wu-2',
      exerciseId: 'warmup',
      number: 'Q2',
      page: 'p. 4.2',
      level: 'Warm-up',
      topic: 'Nature of Roots (Discriminant)',
      statement: 'For each of the following quadratic equations, find the discriminant and hence determine the nature of its roots.',
      parts: [
        {
          label: '(a)',
          prompt: 'x² - 6x + 9 = 0',
          steps: [
            {
              title: 'Identify coefficients a, b, c',
              math: 'a = 1,  b = -6,  c = 9',
              explanation: 'Compare with standard form ax² + bx + c = 0.',
            },
            {
              title: 'Compute discriminant Δ = b² - 4ac',
              math: 'Δ = (-6)² - 4(1)(9) = 36 - 36 = 0',
              explanation: 'Since Δ = 0, the parabola touches the x-axis at one point.',
            },
          ],
          answer: 'Δ = 0, one double real root',
        },
        {
          label: '(b)',
          prompt: '3x² + x - 2 = 0',
          steps: [
            {
              title: 'Identify coefficients and compute Δ',
              math: 'Δ = (1)² - 4(3)(-2) = 1 + 24 = 25 > 0',
              explanation: 'Since Δ > 0, the equation has two distinct real roots.',
            },
          ],
          answer: 'Δ = 25, two unequal real roots',
        },
        {
          label: '(c)',
          prompt: '-4x² + 13x - 11 = 0',
          steps: [
            {
              title: 'Compute Δ = b² - 4ac',
              math: 'Δ = (13)² - 4(-4)(-11) = 169 - 176 = -7 < 0',
              explanation: 'Since Δ < 0, there are no real roots (graph does not cross the x-axis).',
            },
          ],
          answer: 'Δ = -7, no real roots',
        },
        {
          label: '(d)',
          prompt: '9 + 5x² = 0',
          steps: [
            {
              title: 'Rewrite in standard form 5x² + 0x + 9 = 0',
              math: 'Δ = 0² - 4(5)(9) = -180 < 0',
              explanation: 'Here b = 0, so Δ = -4ac < 0, meaning no real roots.',
            },
          ],
          answer: 'Δ = -180, no real roots',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Visualizing Roots via Corresponding Parabolas',
        curves: [
          { kind: 'quadratic', a: 1, b: -6, c: 9, label: '(a) x² - 6x + 9 (Δ=0)', color: '#0284c7' },
          { kind: 'quadratic', a: 3, b: 1, c: -2, label: '(b) 3x² + x - 2 (Δ=25)', color: '#059669' },
          { kind: 'quadratic', a: -4, b: 13, c: -11, label: '(c) -4x² + 13x - 11 (Δ=-7)', color: '#dc2626' },
        ],
        points: [
          { x: 3, y: 0, label: '(3, 0)', color: '#0284c7' },
          { x: -1, y: 0, label: '(-1, 0)', color: '#059669' },
          { x: 2 / 3, y: 0, label: '(2/3, 0)', color: '#059669' },
        ],
        xRange: [-2, 5],
        yRange: [-5, 10],
        note: 'Δ > 0 cuts x-axis twice; Δ = 0 touches once; Δ < 0 never touches the x-axis.',
      },
    },
    {
      id: 'wu-3',
      exerciseId: 'warmup',
      number: 'Q3',
      page: 'p. 4.2',
      level: 'Warm-up',
      topic: 'Slope-intercept Form',
      statement: 'Write down the slope and the y-intercept of the graph of each of the following equations.',
      parts: [
        {
          label: '(a)',
          prompt: 'y = x + 3',
          steps: [
            {
              title: 'Compare with y = mx + c',
              math: 'y = 1·x + 3  ⇒  m = 1, c = 3',
              explanation: 'The coefficient of x is 1 and the constant term is 3.',
            },
          ],
          answer: 'slope = 1, y-intercept = 3',
        },
        {
          label: '(b)',
          prompt: 'y = -5x - 2',
          steps: [
            {
              title: 'Compare with y = mx + c',
              math: 'm = -5,  c = -2',
              explanation: 'Keep the negative signs with the slope and constant.',
            },
          ],
          answer: 'slope = -5, y-intercept = -2',
        },
        {
          label: '(c)',
          prompt: 'y = -8',
          steps: [
            {
              title: 'Write as y = 0·x - 8',
              math: 'm = 0,  c = -8',
              explanation: 'A horizontal line has slope 0 and cuts the y-axis at (0, -8).',
            },
          ],
          answer: 'slope = 0, y-intercept = -8',
        },
        {
          label: '(d)',
          prompt: 'y = 6 - 8x',
          steps: [
            {
              title: 'Rearrange into y = mx + c order',
              math: 'y = -8x + 6  ⇒  m = -8, c = 6',
              explanation: 'Always read the coefficient of x as slope, not the first number.',
            },
          ],
          answer: 'slope = -8, y-intercept = 6',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Comparison of the Four Straight Lines',
        curves: [
          { kind: 'linear', m: 1, c: 3, label: '(a) y = x + 3', color: '#0284c7' },
          { kind: 'linear', m: -5, c: -2, label: '(b) y = -5x - 2', color: '#059669' },
          { kind: 'linear', m: 0, c: -8, label: '(c) y = -8', color: '#d97706' },
          { kind: 'linear', m: -8, c: 6, label: '(d) y = 6 - 8x', color: '#7c3aed' },
        ],
        points: [
          { x: 0, y: 3, label: '(0, 3)', color: '#0284c7' },
          { x: 0, y: -2, label: '(0, -2)', color: '#059669' },
          { x: 0, y: -8, label: '(0, -8)', color: '#d97706' },
          { x: 0, y: 6, label: '(0, 6)', color: '#7c3aed' },
        ],
        xRange: [-5, 5],
        yRange: [-10, 10],
      },
    },
  ],
};
