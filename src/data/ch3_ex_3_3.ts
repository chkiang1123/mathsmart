import type { ExerciseGroup } from '../types/math';

export const exercise33: ExerciseGroup = {
  id: 'ex3_3',
  code: 'Ex 3.3',
  title: 'Possible Intersection of Straight Lines',
  subtitle: 'Number of intersections, solving simultaneous equations, parallel & coincident lines',
  pages: 'p. 3.45 – 3.49',
  objectives: [
    'Determine whether two straight lines have one, zero, or infinitely many points of intersection by comparing slopes and y-intercepts',
    'Find coordinates of points of intersection by solving simultaneous linear equations',
    'Solve geometric problems involving bounded areas, parallelograms, perpendicular bisectors, circumcentres, orthocentres, and centroids',
  ],
  sectionCheck: [
    {
      id: 'sc33-a',
      label: '(a)',
      statement: 'The straight lines 2x - y - 10 = 0 and x = 2y - 10 have one point of intersection.',
      isCorrect: true,
      explanation: 'Slope of 2x - y - 10 = 0 is 2, while x = 2y - 10 ⇒ y = (1/2)x + 5 has slope 1/2. Since 2 ≠ 1/2, the two lines have one point of intersection.',
    },
    {
      id: 'sc33-b',
      label: '(b)',
      statement: 'The straight lines 2x + 3y - 15 = 0 and 4x + 6y - 15 = 0 do not intersect.',
      isCorrect: true,
      explanation: 'Both lines have slope -2/3, while their y-intercepts are 5 and 5/2 respectively (5 ≠ 5/2). Hence they are parallel and do not intersect.',
    },
    {
      id: 'sc33-c',
      label: '(c)',
      statement: 'The straight lines y = 5x - 2 and 5x - y + 2 = 0 have an infinite number of points of intersection.',
      isCorrect: false,
      explanation: 'Rewriting 5x - y + 2 = 0 gives y = 5x + 2. Both have slope 5, but their y-intercepts are -2 and 2 (-2 ≠ 2), so they have no points of intersection.',
    },
    {
      id: 'sc33-d',
      label: '(d)',
      statement: 'The straight lines x = 3 and x - 3y + 9 = 0 intersect at the x-axis.',
      isCorrect: false,
      explanation: 'The x-intercept of x = 3 is 3, while putting y = 0 in x - 3y + 9 = 0 gives x = -9 ≠ 3. They intersect at (3, 4), not on the x-axis.',
    },
    {
      id: 'sc33-e',
      label: '(e)',
      statement: 'In the figure, L₁ and L₂ are two non-parallel straight lines with different slopes. L₁ and L₂ have one point of intersection.',
      isCorrect: true,
      explanation: 'Two straight lines in the same coordinate plane with unequal slopes must extend and meet at exactly one point of intersection.',
    },
  ],
  questions: [
    {
      id: 'ex33-1',
      exerciseId: 'ex3_3',
      number: 'Q1',
      page: '3.45',
      level: 'Level 1',
      topic: 'Number of Intersections',
      statement: 'Find the number of points of intersection of the straight lines L₁: 2x - y - 1 = 0 and L₂: y = 2x + 1.',
      parts: [
        {
          label: 'Main',
          prompt: 'Compare the slopes and y-intercepts of L₁ and L₂.',
          strategy: 'Rewrite L₁ in slope-intercept form y = mx + c and compare with L₂.',
          steps: [
            {
              title: 'Rewrite L₁ in slope-intercept form',
              math: '2x - y - 1 = 0 ⇒ y = 2x - 1',
              explanation: 'For L₁: slope m₁ = 2, y-intercept c₁ = -1.',
            },
            {
              title: 'Compare with L₂: y = 2x + 1',
              math: 'm₁ = m₂ = 2, c₁ = -1 ≠ c₂ = 1',
              explanation: 'Equal slopes and different y-intercepts mean L₁ and L₂ are distinct parallel lines.',
            },
          ],
          answer: 'no points of intersection',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: y = 2x - 1 and L₂: y = 2x + 1',
        curves: [
          { kind: 'linear', m: 2, c: -1, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 2, c: 1, label: 'L₂', color: '#10b981' },
        ],
        xRange: [-4, 4],
        yRange: [-6, 6],
      },
    },
    {
      id: 'ex33-2',
      exerciseId: 'ex3_3',
      number: 'Q2',
      page: '3.45',
      level: 'Level 1',
      topic: 'Number of Intersections',
      statement: 'Find the number of points of intersection of the straight lines L₁: 3x + 4y - 12 = 0 and L₂: y = -12.',
      parts: [
        {
          label: 'Main',
          prompt: 'Compare the slopes of L₁ and L₂.',
          strategy: 'Check whether the two lines have different slopes.',
          steps: [
            {
              title: 'Find slopes of L₁ and L₂',
              math: 'm₁ = -3/4, m₂ = 0',
              explanation: 'L₂: y = -12 is a horizontal line with slope 0, while L₁ has slope -3/4.',
            },
            {
              title: 'Conclude number of intersections',
              math: 'm₁ ≠ m₂ ⇒ 1 point of intersection',
              explanation: 'Lines with different slopes intersect at exactly one point (20, -12).',
            },
          ],
          answer: 'one point of intersection',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: 3x + 4y - 12 = 0 and L₂: y = -12',
        curves: [
          { kind: 'linear', m: -0.75, c: 3, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0, c: -12, label: 'L₂: y = -12', color: '#e11d48' },
        ],
        points: [{ x: 20, y: -12, label: '(20, -12)', color: '#10b981' }],
        xRange: [-6, 26],
        yRange: [-18, 8],
      },
    },
    {
      id: 'ex33-3',
      exerciseId: 'ex3_3',
      number: 'Q3',
      page: '3.45',
      level: 'Level 1',
      topic: 'Number of Intersections',
      statement: 'Find the number of points of intersection of the straight lines L₁: x - 4y + 25 = 0 and L₂: 3x - 12y + 25 = 0.',
      parts: [
        {
          label: 'Main',
          prompt: 'Compare slopes and y-intercepts of L₁ and L₂.',
          strategy: 'Use m = -A/B and y-intercept = -C/B for both general-form equations.',
          steps: [
            {
              title: 'Compute slopes',
              math: 'm₁ = -1/(-4) = 1/4, m₂ = -3/(-12) = 1/4',
              explanation: 'Both lines have the same slope 1/4.',
            },
            {
              title: 'Compare y-intercepts',
              math: 'c₁ = -25/(-4) = 25/4, c₂ = -25/(-12) = 25/12 ⇒ c₁ ≠ c₂',
              explanation: 'Equal slopes with unequal y-intercepts means the lines are parallel and never meet.',
            },
          ],
          answer: 'no points of intersection',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ and L₂ (Parallel)',
        curves: [
          { kind: 'linear', m: 0.25, c: 6.25, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0.25, c: 25 / 12, label: 'L₂', color: '#f59e0b' },
        ],
        xRange: [-12, 12],
        yRange: [-4, 12],
      },
    },
    {
      id: 'ex33-4',
      exerciseId: 'ex3_3',
      number: 'Q4',
      page: '3.45',
      level: 'Level 1',
      topic: 'Number of Intersections',
      statement: 'Find the number of points of intersection of the straight lines L₁: 6x - 2y - 12 = 0 and L₂: x/2 - y/6 = 1.',
      parts: [
        {
          label: 'Main',
          prompt: 'Compare L₁ and L₂ after simplifying.',
          strategy: 'Clear fractions in L₂ by multiplying by 6, or rewrite both in slope-intercept form.',
          steps: [
            {
              title: 'Rewrite L₁ and L₂ in slope-intercept form',
              math: 'L₁: y = 3x - 6; L₂: 3x - y = 6 ⇒ y = 3x - 6',
              explanation: 'Multiplying L₂ by 6 gives 3x - y = 6, which is identical to L₁.',
            },
            {
              title: 'Conclude coincidence',
              math: 'm₁ = m₂ = 3 and c₁ = c₂ = -6',
              explanation: 'The two lines coincide, so they share infinitely many points of intersection.',
            },
          ],
          answer: 'an infinite number of points of intersection',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Coincident Lines y = 3x - 6',
        curves: [
          { kind: 'linear', m: 3, c: -6, label: 'L₁ = L₂', color: '#0284c7' },
        ],
        points: [
          { x: 2, y: 0, label: '(2, 0)', color: '#10b981' },
          { x: 0, y: -6, label: '(0, -6)', color: '#10b981' },
        ],
        xRange: [-4, 6],
        yRange: [-8, 8],
      },
    },
    {
      id: 'ex33-5',
      exerciseId: 'ex3_3',
      number: 'Q5',
      page: '3.45',
      level: 'Level 1',
      topic: 'Coordinates of Intersection',
      statement: 'Find the coordinates of the point of intersection of L₁: 3x + 5y + 24 = 0 and L₂: x = -3.',
      parts: [
        {
          label: 'Main',
          prompt: 'Solve the simultaneous equations.',
          strategy: 'Substitute x = -3 directly into L₁ to find y.',
          steps: [
            {
              title: 'Substitute x = -3 into L₁',
              math: '3(-3) + 5y + 24 = 0 ⇒ 5y + 15 = 0',
              explanation: 'Replace x with -3.',
            },
            {
              title: 'Solve for y',
              math: '5y = -15 ⇒ y = -3',
              explanation: 'The intersection point is (-3, -3).',
            },
          ],
          answer: '(-3, -3)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection (-3, -3)',
        curves: [
          { kind: 'linear', m: -0.6, c: -4.8, label: 'L₁', color: '#0284c7' },
          { kind: 'vertical', x: -3, label: 'L₂: x = -3', color: '#e11d48' },
        ],
        points: [{ x: -3, y: -3, label: '(-3, -3)', color: '#10b981' }],
        xRange: [-10, 4],
        yRange: [-8, 4],
      },
    },
    {
      id: 'ex33-6',
      exerciseId: 'ex3_3',
      number: 'Q6',
      page: '3.45',
      level: 'Level 1',
      topic: 'Coordinates of Intersection',
      statement: 'Find the coordinates of the point of intersection of L₁: x - 5y = 11 and L₂: 2x + y = 33.',
      parts: [
        {
          label: 'Main',
          prompt: 'Solve L₁ and L₂ simultaneously.',
          strategy: 'Eliminate x or y using the method of substitution or elimination.',
          steps: [
            {
              title: 'Eliminate y by multiplying L₂ by 5',
              math: '5(2x + y) + (x - 5y) = 165 + 11 ⇒ 11x = 176 ⇒ x = 16',
              explanation: 'Adding 5 × L₂ and L₁ cancels the y term immediately.',
            },
            {
              title: 'Substitute x = 16 into L₂',
              math: '2(16) + y = 33 ⇒ y = 1',
              explanation: 'The intersection point is (16, 1).',
            },
          ],
          answer: '(16, 1)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection (16, 1)',
        curves: [
          { kind: 'linear', m: 0.2, c: -2.2, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -2, c: 33, label: 'L₂', color: '#f59e0b' },
        ],
        points: [{ x: 16, y: 1, label: '(16, 1)', color: '#10b981' }],
        xRange: [-2, 22],
        yRange: [-6, 12],
      },
    },
    {
      id: 'ex33-7',
      exerciseId: 'ex3_3',
      number: 'Q7',
      page: '3.45',
      level: 'Level 1',
      topic: 'Coordinates of Intersection',
      statement: 'Find the coordinates of the point of intersection of L₁: x - 3y + 18 = 0 and L₂: x - y + 10 = 0.',
      parts: [
        {
          label: 'Main',
          prompt: 'Solve L₁ and L₂ simultaneously.',
          strategy: 'Subtract L₁ from L₂ to eliminate x.',
          steps: [
            {
              title: 'Subtract L₁ from L₂',
              math: '(x - y + 10) - (x - 3y + 18) = 0 ⇒ 2y - 8 = 0 ⇒ y = 4',
              explanation: 'Eliminating x leaves a simple equation in y.',
            },
            {
              title: 'Substitute y = 4 into L₂',
              math: 'x - 4 + 10 = 0 ⇒ x = -6',
              explanation: 'The intersection point is (-6, 4).',
            },
          ],
          answer: '(-6, 4)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection (-6, 4)',
        curves: [
          { kind: 'linear', m: 1 / 3, c: 6, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 1, c: 10, label: 'L₂', color: '#f59e0b' },
        ],
        points: [{ x: -6, y: 4, label: '(-6, 4)', color: '#10b981' }],
        xRange: [-14, 4],
        yRange: [-2, 12],
      },
    },
    {
      id: 'ex33-8',
      exerciseId: 'ex3_3',
      number: 'Q8',
      page: '3.45',
      level: 'Level 1',
      topic: 'Coordinates of Intersection',
      statement: 'Find the coordinates of the point of intersection of L₁: -4x + 3y + 42 = 0 and L₂: 2x + 5y + 70 = 0.',
      parts: [
        {
          label: 'Main',
          prompt: 'Solve L₁ and L₂ simultaneously.',
          strategy: 'Add L₁ and 2 × L₂ to eliminate x.',
          steps: [
            {
              title: 'Eliminate x',
              math: '(-4x + 3y + 42) + 2(2x + 5y + 70) = 0 ⇒ 13y + 182 = 0 ⇒ y = -14',
              explanation: 'Combining L₁ + 2L₂ removes x cleanly.',
            },
            {
              title: 'Substitute y = -14 into L₂',
              math: '2x + 5(-14) + 70 = 0 ⇒ 2x = 0 ⇒ x = 0',
              explanation: 'The two lines intersect on the y-axis at (0, -14).',
            },
          ],
          answer: '(0, -14)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection (0, -14)',
        curves: [
          { kind: 'linear', m: 4 / 3, c: -14, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -0.4, c: -14, label: 'L₂', color: '#f59e0b' },
        ],
        points: [{ x: 0, y: -14, label: '(0, -14)', color: '#10b981' }],
        xRange: [-10, 12],
        yRange: [-20, 4],
      },
    },
    {
      id: 'ex33-9',
      exerciseId: 'ex3_3',
      number: 'Q9',
      page: '3.45',
      level: 'Level 1',
      topic: 'Intersection & Distance from Origin',
      statement: 'The straight lines L₁: x + y - 1 = 0 and L₂: 2x - 3y - 17 = 0 intersect at the point P. (a) Find the coordinates of P. (b) Find the length of OP, where O is the origin.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the coordinates of P.',
          strategy: 'Add 3 × L₁ and L₂ to eliminate y.',
          steps: [
            {
              title: 'Eliminate y',
              math: '3(x + y - 1) + (2x - 3y - 17) = 0 ⇒ 5x - 20 = 0 ⇒ x = 4',
              explanation: 'Adding 3L₁ and L₂ gives x = 4.',
            },
            {
              title: 'Substitute x = 4 into L₁',
              math: '4 + y - 1 = 0 ⇒ y = -3',
              explanation: 'Thus P is (4, -3).',
            },
          ],
          answer: '(4, -3)',
        },
        {
          label: '(b)',
          prompt: 'Find the distance OP.',
          strategy: 'Apply the distance formula from O(0, 0) to P(4, -3).',
          steps: [
            {
              title: 'Apply distance formula',
              math: 'OP = √((4 - 0)² + (-3 - 0)²) = √(16 + 9) = √25 = 5',
              explanation: 'So OP = 5 units.',
            },
          ],
          answer: '5 units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection P(4, -3) & OP = 5',
        curves: [
          { kind: 'linear', m: -1, c: 1, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 2 / 3, c: -17 / 3, label: 'L₂', color: '#f59e0b' },
        ],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#94a3b8' },
          { x: 4, y: -3, label: 'P(4, -3)', color: '#10b981' },
        ],
        xRange: [-4, 10],
        yRange: [-8, 6],
      },
    },
    {
      id: 'ex33-10',
      exerciseId: 'ex3_3',
      number: 'Q10',
      page: '3.46',
      level: 'Level 1',
      topic: 'Intersection & Horizontal Line',
      statement: 'The straight lines L₁: x - 3y + 7 = 0 and L₂: 2x + y - 7 = 0 intersect at the point A. (a) Find the coordinates of A. (b) Find the equation of the horizontal line passing through A.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the coordinates of A.',
          strategy: 'Eliminate y by computing L₁ + 3 × L₂.',
          steps: [
            {
              title: 'Eliminate y',
              math: '(x - 3y + 7) + 3(2x + y - 7) = 0 ⇒ 7x - 14 = 0 ⇒ x = 2',
              explanation: 'Solving for x yields x = 2.',
            },
            {
              title: 'Find y',
              math: '2(2) + y - 7 = 0 ⇒ y = 3',
              explanation: 'Hence A is (2, 3).',
            },
          ],
          answer: '(2, 3)',
        },
        {
          label: '(b)',
          prompt: 'Write the equation of the horizontal line through A(2, 3).',
          strategy: 'A horizontal line has constant y-coordinate equal to y_A.',
          steps: [
            {
              title: 'Write horizontal line equation',
              math: 'y = 3',
              explanation: 'Every point on the horizontal line through (2, 3) has y = 3.',
            },
          ],
          answer: 'y = 3',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection A(2, 3) & y = 3',
        curves: [
          { kind: 'linear', m: 1 / 3, c: 7 / 3, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -2, c: 7, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: 0, c: 3, label: 'y = 3', color: '#10b981', dashed: true },
        ],
        points: [{ x: 2, y: 3, label: 'A(2, 3)', color: '#10b981' }],
        xRange: [-4, 8],
        yRange: [-2, 10],
      },
    },
    {
      id: 'ex33-11',
      exerciseId: 'ex3_3',
      number: 'Q11',
      page: '3.46',
      level: 'Level 1',
      topic: 'Intersection & Two-Point Form',
      statement: 'The straight lines L₁: 4x - y + 77 = 0 and L₂: 3x - 4y + 74 = 0 intersect at the point Q. (a) Find the coordinates of Q. (b) Find the equation of the straight line passing through Q with x-intercept -14.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the coordinates of Q.',
          strategy: 'Compute 4 × L₁ - L₂ to eliminate y.',
          steps: [
            {
              title: 'Eliminate y',
              math: '4(4x - y + 77) - (3x - 4y + 74) = 0 ⇒ 13x + 234 = 0 ⇒ x = -18',
              explanation: 'Dividing -234 by 13 gives x = -18.',
            },
            {
              title: 'Find y',
              math: 'y = 4(-18) + 77 = 5',
              explanation: 'So Q is (-18, 5).',
            },
          ],
          answer: '(-18, 5)',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of the line through Q(-18, 5) and (-14, 0).',
          strategy: 'Use two-point form with (-18, 5) and (-14, 0).',
          steps: [
            {
              title: 'Find slope',
              math: 'm = (5 - 0)/(-18 - (-14)) = 5/(-4) = -5/4',
              explanation: 'The x-intercept -14 corresponds to the point (-14, 0).',
            },
            {
              title: 'Apply point-slope form',
              math: 'y - 0 = -(5/4)(x + 14) ⇒ y = -(5/4)x - 35/2 (or 5x + 4y + 70 = 0)',
              explanation: 'Multiplying by 4 gives general form 5x + 4y + 70 = 0.',
            },
          ],
          answer: 'y = -(5/4)x - 35/2 (or 5x + 4y + 70 = 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection Q(-18, 5) & Line through (-14, 0)',
        curves: [
          { kind: 'linear', m: 4, c: 77, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0.75, c: 18.5, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: -1.25, c: -17.5, label: 'Required Line', color: '#10b981' },
        ],
        points: [
          { x: -18, y: 5, label: 'Q(-18, 5)', color: '#10b981' },
          { x: -14, y: 0, label: '(-14, 0)', color: '#dc2626' },
        ],
        xRange: [-24, 2],
        yRange: [-8, 14],
      },
    },
    {
      id: 'ex33-12',
      exerciseId: 'ex3_3',
      number: 'Q12',
      page: '3.46',
      level: 'Level 1',
      topic: 'Intersection & Mid-point Formula',
      statement: 'The straight lines L₁: x + 2y + 2 = 0 and L₂: 5x - 3y - 55 = 0 intersect at the point R. (a) Find the coordinates of R. (b) A(-1, -3) is a point on the coordinate plane. If R is the mid-point of AB, find the coordinates of B.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the coordinates of R.',
          strategy: 'Compute 3 × L₁ + 2 × L₂ to eliminate y.',
          steps: [
            {
              title: 'Eliminate y',
              math: '3(x + 2y + 2) + 2(5x - 3y - 55) = 0 ⇒ 13x - 104 = 0 ⇒ x = 8',
              explanation: 'Dividing 104 by 13 yields x = 8.',
            },
            {
              title: 'Find y',
              math: '8 + 2y + 2 = 0 ⇒ 2y = -10 ⇒ y = -5',
              explanation: 'Hence R is (8, -5).',
            },
          ],
          answer: '(8, -5)',
        },
        {
          label: '(b)',
          prompt: 'Find B given R(8, -5) is the mid-point of A(-1, -3) and B.',
          strategy: 'Use the mid-point formula ((-1 + x)/2, (-3 + y)/2) = (8, -5).',
          steps: [
            {
              title: 'Solve for coordinates of B(x, y)',
              math: '(-1 + x)/2 = 8 ⇒ x = 17; (-3 + y)/2 = -5 ⇒ y = -7',
              explanation: 'Therefore B is (17, -7).',
            },
          ],
          answer: '(17, -7)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Mid-point R(8, -5) of AB',
        curves: [
          { kind: 'linear', m: -0.5, c: -1, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 5 / 3, c: -55 / 3, label: 'L₂', color: '#f59e0b' },
        ],
        points: [
          { x: -1, y: -3, label: 'A(-1, -3)', color: '#9333ea' },
          { x: 8, y: -5, label: 'R(8, -5)', color: '#10b981' },
          { x: 17, y: -7, label: 'B(17, -7)', color: '#dc2626' },
        ],
        xRange: [-4, 20],
        yRange: [-12, 4],
      },
    },
    {
      id: 'ex33-13',
      exerciseId: 'ex3_3',
      number: 'Q13',
      page: '3.46',
      level: 'Level 1',
      topic: 'No Intersection Condition',
      statement: 'Find the value of k such that the straight lines L₁: (3 - k)x + 2y + 15 = 0 and L₂: (k + 6)x - 5y - 22 = 0 do not intersect.',
      parts: [
        {
          label: 'Main',
          prompt: 'Equate the slopes of L₁ and L₂ and verify unequal y-intercepts.',
          strategy: 'Lines do not intersect when m₁ = m₂ and c₁ ≠ c₂.',
          steps: [
            {
              title: 'Equate slopes m₁ = m₂',
              math: '-(3 - k)/2 = -(k + 6)/(-5) ⇒ (k - 3)/2 = (k + 6)/5',
              explanation: 'Write slope m = -A/B for each line.',
            },
            {
              title: 'Solve for k and check y-intercepts',
              math: '5(k - 3) = 2(k + 6) ⇒ 5k - 15 = 2k + 12 ⇒ 3k = 27 ⇒ k = 9',
              explanation: 'Check y-intercepts: c₁ = -15/2 = -7.5 and c₂ = -22/5 = -4.4 (-7.5 ≠ -4.4). So k = 9.',
            },
          ],
          answer: '9',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Parallel Lines when k = 9',
        curves: [
          { kind: 'linear', m: 3, c: -7.5, label: 'L₁: -6x + 2y + 15 = 0', color: '#0284c7' },
          { kind: 'linear', m: 3, c: -4.4, label: 'L₂: 15x - 5y - 22 = 0', color: '#10b981' },
        ],
        xRange: [-4, 6],
        yRange: [-10, 8],
      },
    },
    {
      id: 'ex33-14',
      exerciseId: 'ex3_3',
      number: 'Q14',
      page: '3.46',
      level: 'Level 1',
      topic: 'Parallel Lines & Triangle Area',
      statement: 'The straight lines L₁: hx + 3y - 9 = 0 and L₂: 3x + 9y - 17 = 0 do not intersect. (a) Find the value of h. (b) L₁ cuts the x-axis and the y-axis at A and B respectively. Find the area of △OAB, where O is the origin.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find h.',
          strategy: 'Since L₁ and L₂ do not intersect, m₁ = m₂.',
          steps: [
            {
              title: 'Equate slopes',
              math: '-h/3 = -3/9 ⇒ h/3 = 1/3 ⇒ h = 1',
              explanation: 'Verify y-intercepts: c₁ = 3 ≠ c₂ = 17/9. Hence h = 1.',
            },
          ],
          answer: '1',
        },
        {
          label: '(b)',
          prompt: 'Find the area of △OAB.',
          strategy: 'Find the x- and y-intercepts of L₁: x + 3y - 9 = 0.',
          steps: [
            {
              title: 'Find A and B',
              math: 'y = 0 ⇒ x = 9 ⇒ A(9, 0); x = 0 ⇒ y = 3 ⇒ B(0, 3)',
              explanation: 'So OA = 9 and OB = 3.',
            },
            {
              title: 'Compute area of △OAB',
              math: 'Area = (1/2) × 9 × 3 = 13.5',
              explanation: 'The area of △OAB is 13.5 sq. units.',
            },
          ],
          answer: '13.5 sq. units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: x + 3y - 9 = 0 & △OAB',
        curves: [
          { kind: 'linear', m: -1 / 3, c: 3, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -1 / 3, c: 17 / 9, label: 'L₂', color: '#94a3b8', dashed: true },
        ],
        points: [
          { x: 9, y: 0, label: 'A(9, 0)', color: '#dc2626' },
          { x: 0, y: 3, label: 'B(0, 3)', color: '#10b981' },
        ],
        polygons: [
          {
            points: [
              { x: 0, y: 0 },
              { x: 9, y: 0 },
              { x: 0, y: 3 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
            label: 'Area = 13.5',
          },
        ],
        xRange: [-2, 12],
        yRange: [-2, 6],
      },
    },
    {
      id: 'ex33-15',
      exerciseId: 'ex3_3',
      number: 'Q15',
      page: '3.46',
      level: 'Level 1',
      topic: 'Parallel Lines & Mid-point on y-axis',
      statement: 'The straight lines L₁: 4x - 5y + 20 = 0 and L₂: 8x + ky - 25 = 0 do not intersect. (a) Find the value of k. (b) L₁, L₂ and a straight line L₃ cut the y-axis at A, B and P respectively. If L₃ ∥ L₂ and AP = BP, find the equation of L₃ in general form.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'Equate the slopes of L₁ and L₂.',
          steps: [
            {
              title: 'Equate slopes',
              math: '-4/(-5) = -8/k ⇒ 4/5 = -8/k ⇒ k = -10',
              explanation: 'Check y-intercepts: c₁ = 4 ≠ c₂ = -2.5. Thus k = -10.',
            },
          ],
          answer: '-10',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of L₃ in general form.',
          strategy: 'Find the y-intercepts A and B, take their mid-point P, and use slope 4/5.',
          steps: [
            {
              title: 'Find A, B, and mid-point P',
              math: 'A(0, 4), B(0, -5/2) ⇒ y_P = (4 + (-5/2))/2 = 3/4 ⇒ P(0, 3/4)',
              explanation: 'Since AP = BP on the y-axis, P is the mid-point of AB.',
            },
            {
              title: 'Write equation of L₃',
              math: 'y = (4/5)x + 3/4 ⇒ 20y = 16x + 15 ⇒ 16x - 20y + 15 = 0',
              explanation: 'Multiply through by 20 to obtain integer coefficients in general form.',
            },
          ],
          answer: '16x - 20y + 15 = 0',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Parallel Lines L₁, L₂, and Mid-line L₃',
        curves: [
          { kind: 'linear', m: 0.8, c: 4, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0.8, c: -2.5, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: 0.8, c: 0.75, label: 'L₃', color: '#10b981' },
        ],
        points: [
          { x: 0, y: 4, label: 'A(0, 4)', color: '#0284c7' },
          { x: 0, y: 0.75, label: 'P(0, 3/4)', color: '#10b981' },
          { x: 0, y: -2.5, label: 'B(0, -2.5)', color: '#f59e0b' },
        ],
        xRange: [-6, 6],
        yRange: [-5, 7],
      },
    },
    {
      id: 'ex33-16',
      exerciseId: 'ex3_3',
      number: 'Q16',
      page: '3.46',
      level: 'Level 1',
      topic: 'Infinite Intersections',
      statement: 'Find the value of k such that the straight lines L₁: 5x - 7y + 10 = 0 and L₂: (2k + 3)x + 21y - 30 = 0 have an infinite number of points of intersection.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find k so that L₁ and L₂ coincide.',
          strategy: 'Match coefficients using the ratio A₁/A₂ = B₁/B₂ = C₁/C₂.',
          steps: [
            {
              title: 'Compare ratios of coefficients',
              math: '5/(2k + 3) = -7/21 = 10/(-30) = -1/3',
              explanation: 'Multiplying L₁ by -3 gives -15x + 21y - 30 = 0, matching the y and constant terms of L₂.',
            },
            {
              title: 'Solve for k',
              math: '2k + 3 = -15 ⇒ 2k = -18 ⇒ k = -9',
              explanation: 'Hence k = -9.',
            },
          ],
          answer: '-9',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Coincident Line 5x - 7y + 10 = 0 (k = -9)',
        curves: [{ kind: 'linear', m: 5 / 7, c: 10 / 7, label: 'L₁ = L₂', color: '#0284c7' }],
        points: [{ x: -2, y: 0, label: '(-2, 0)', color: '#10b981' }],
        xRange: [-6, 6],
        yRange: [-4, 6],
      },
    },
    {
      id: 'ex33-17',
      exerciseId: 'ex3_3',
      number: 'Q17',
      page: '3.46',
      level: 'Level 1',
      topic: 'Infinite Intersections (Two Unknowns)',
      statement: 'The straight lines L₁: 8x + 6y - 15 = 0 and L₂: y = (p/3)x + q have an infinite number of points of intersection. Find the values of p and q.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find p and q.',
          strategy: 'Rewrite L₁ in slope-intercept form and match the slope and y-intercept with L₂.',
          steps: [
            {
              title: 'Rewrite L₁ in slope-intercept form',
              math: '6y = -8x + 15 ⇒ y = -(4/3)x + 5/2',
              explanation: 'Slope of L₁ is -4/3 and y-intercept is 5/2.',
            },
            {
              title: 'Equate slope and y-intercept',
              math: 'p/3 = -4/3 ⇒ p = -4; q = 5/2',
              explanation: 'Both lines coincide when p = -4 and q = 5/2.',
            },
          ],
          answer: 'p = -4, q = 5/2',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'y = -(4/3)x + 5/2',
        curves: [{ kind: 'linear', m: -4 / 3, c: 2.5, label: 'L₁ = L₂', color: '#0284c7' }],
        points: [
          { x: 0, y: 2.5, label: '(0, 5/2)', color: '#10b981' },
          { x: 1.875, y: 0, label: '(15/8, 0)', color: '#dc2626' },
        ],
        xRange: [-4, 6],
        yRange: [-4, 6],
      },
    },
    {
      id: 'ex33-18',
      exerciseId: 'ex3_3',
      number: 'Q18',
      page: '3.47',
      level: 'Level 2',
      topic: 'Unknowns from Intersection Point',
      examRef: 'HKCEE 2001 P2 Q33',
      statement: 'The straight lines L₁: 4x - 5y - 57 = 0 and L₂: hx + y - 11 = 0 intersect at the point (8, k). Find the values of h and k.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find k from L₁, then h from L₂.',
          strategy: 'Because (8, k) lies on both lines, substitute it into L₁ first to find k, then into L₂ to find h.',
          steps: [
            {
              title: 'Substitute (8, k) into L₁',
              math: '4(8) - 5k - 57 = 0 ⇒ -5k - 25 = 0 ⇒ k = -5',
              explanation: 'So the intersection point is (8, -5).',
            },
            {
              title: 'Substitute (8, -5) into L₂',
              math: '8h + (-5) - 11 = 0 ⇒ 8h = 16 ⇒ h = 2',
              explanation: 'Thus h = 2 and k = -5.',
            },
          ],
          answer: 'h = 2, k = -5',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intersection (8, -5) with h = 2, k = -5',
        curves: [
          { kind: 'linear', m: 0.8, c: -11.4, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -2, c: 11, label: 'L₂', color: '#f59e0b' },
        ],
        points: [{ x: 8, y: -5, label: '(8, -5)', color: '#10b981' }],
        xRange: [-2, 16],
        yRange: [-14, 12],
      },
    },
    {
      id: 'ex33-19',
      exerciseId: 'ex3_3',
      number: 'Q19',
      page: '3.47',
      level: 'Level 2',
      topic: 'Simultaneous Unknown Coefficients',
      examRef: 'HKCEE 2002 P2 Q8',
      statement: 'The straight lines L₁: mx + ny + 5 = 0 and L₂: nx - my + 40 = 0 intersect at the point (-7, 4). Find the values of m and n.',
      parts: [
        {
          label: 'Main',
          prompt: 'Substitute (-7, 4) into both equations and solve for m and n.',
          strategy: 'Form two linear equations in m and n, then solve simultaneously.',
          steps: [
            {
              title: 'Substitute (-7, 4) into L₁ and L₂',
              math: '-7m + 4n + 5 = 0; -7n - 4m + 40 = 0 ⇒ 4m + 7n = 40',
              explanation: 'From L₁: 7m - 4n = 5. From L₂: 4m + 7n = 40.',
            },
            {
              title: 'Solve simultaneously for m and n',
              math: '7(7m - 4n) + 4(4m + 7n) = 35 + 160 ⇒ 65m = 195 ⇒ m = 3; 4(3) + 7n = 40 ⇒ n = 4',
              explanation: 'Hence m = 3 and n = 4.',
            },
          ],
          answer: 'm = 3, n = 4',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: 3x + 4y + 5 = 0 and L₂: 4x - 3y + 40 = 0',
        curves: [
          { kind: 'linear', m: -0.75, c: -1.25, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 4 / 3, c: 40 / 3, label: 'L₂', color: '#f59e0b' },
        ],
        points: [{ x: -7, y: 4, label: '(-7, 4)', color: '#10b981' }],
        xRange: [-14, 4],
        yRange: [-4, 16],
      },
    },
    {
      id: 'ex33-20',
      exerciseId: 'ex3_3',
      number: 'Q20',
      page: '3.47',
      level: 'Level 2',
      topic: 'Three Concurrent Lines',
      examRef: 'HKCEE 2003 P2 Q30',
      statement: 'The straight lines L₁: 2x + 3y + 22 = 0 and L₂: x - 2y - 24 = 0 intersect at the point A. If the straight line L₃: x + ky + 6 = 0 passes through A, find the value of k.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find A, then substitute A into L₃ to determine k.',
          strategy: 'Solve L₁ and L₂ simultaneously first.',
          steps: [
            {
              title: 'Find intersection A of L₁ and L₂',
              math: '(2x + 3y + 22) - 2(x - 2y - 24) = 0 ⇒ 7y + 70 = 0 ⇒ y = -10; x = 2(-10) + 24 = 4',
              explanation: 'So A is (4, -10).',
            },
            {
              title: 'Substitute A(4, -10) into L₃',
              math: '4 + k(-10) + 6 = 0 ⇒ 10 - 10k = 0 ⇒ k = 1',
              explanation: 'Hence k = 1.',
            },
          ],
          answer: '1',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Concurrent Lines at A(4, -10)',
        curves: [
          { kind: 'linear', m: -2 / 3, c: -22 / 3, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0.5, c: -12, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: -1, c: -6, label: 'L₃', color: '#10b981' },
        ],
        points: [{ x: 4, y: -10, label: 'A(4, -10)', color: '#10b981' }],
        xRange: [-8, 14],
        yRange: [-16, 4],
      },
    },
    {
      id: 'ex33-21',
      exerciseId: 'ex3_3',
      number: 'Q21',
      page: '3.47',
      level: 'Level 2',
      topic: 'Perpendicular Line & Foot of Perpendicular',
      statement: 'The straight line L₂ passes through (2, 13) and is perpendicular to L₁: 2x + 4y + 9 = 0. (a) Find the equation of L₂ in general form. (b) Find the coordinates of the point of intersection of L₁ and L₂.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L₂ in general form.',
          strategy: 'Find slope of L₁, take the negative reciprocal for L₂, then use point-slope form.',
          steps: [
            {
              title: 'Find slope of L₂',
              math: 'm₁ = -2/4 = -1/2 ⇒ m₂ = -1/(-1/2) = 2',
              explanation: 'Perpendicular lines satisfy m₁ × m₂ = -1.',
            },
            {
              title: 'Write equation of L₂ through (2, 13)',
              math: 'y - 13 = 2(x - 2) ⇒ y = 2x + 9 ⇒ 2x - y + 9 = 0',
              explanation: 'General form is 2x - y + 9 = 0.',
            },
          ],
          answer: '2x - y + 9 = 0',
        },
        {
          label: '(b)',
          prompt: 'Find the intersection of L₁ and L₂.',
          strategy: 'Substitute y = 2x + 9 into L₁: 2x + 4y + 9 = 0.',
          steps: [
            {
              title: 'Solve simultaneously',
              math: '2x + 4(2x + 9) + 9 = 0 ⇒ 10x + 45 = 0 ⇒ x = -9/2; y = 2(-9/2) + 9 = 0',
              explanation: 'The lines intersect on the x-axis at (-9/2, 0).',
            },
          ],
          answer: '(-9/2, 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ ⊥ L₂ Meeting at (-9/2, 0)',
        curves: [
          { kind: 'linear', m: -0.5, c: -2.25, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 2, c: 9, label: 'L₂', color: '#10b981' },
        ],
        points: [
          { x: 2, y: 13, label: '(2, 13)', color: '#9333ea' },
          { x: -4.5, y: 0, label: '(-9/2, 0)', color: '#dc2626' },
        ],
        xRange: [-8, 6],
        yRange: [-6, 16],
      },
    },
    {
      id: 'ex33-22',
      exerciseId: 'ex3_3',
      number: 'Q22',
      page: '3.47',
      level: 'Level 2',
      topic: 'Intersection & Perpendicularity Claim',
      statement: 'The straight lines L₁: 3x + 5y + 33 = 0 and L₂: x - 3y - 17 = 0 intersect at the point P. (a) Find the coordinates of P. (b) A straight line L₃ passes through P and (2, -1). (i) Find the equation of L₃. (ii) Someone claims that L₁ is perpendicular to L₃. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the coordinates of P.',
          strategy: 'Eliminate x using L₁ - 3 × L₂.',
          steps: [
            {
              title: 'Solve L₁ and L₂ simultaneously',
              math: '(3x + 5y + 33) - 3(x - 3y - 17) = 0 ⇒ 14y + 84 = 0 ⇒ y = -6; x = 3(-6) + 17 = -1',
              explanation: 'So P is (-1, -6).',
            },
          ],
          answer: '(-1, -6)',
        },
        {
          label: '(b)(i)',
          prompt: 'Find the equation of L₃ through P(-1, -6) and (2, -1).',
          strategy: 'Compute slope of L₃ and apply point-slope form.',
          steps: [
            {
              title: 'Find slope and equation of L₃',
              math: 'm₃ = (-1 - (-6))/(2 - (-1)) = 5/3; y - (-1) = (5/3)(x - 2) ⇒ y = (5/3)x - 13/3',
              explanation: 'In general form: 5x - 3y - 13 = 0.',
            },
          ],
          answer: 'y = (5/3)x - 13/3 (or 5x - 3y - 13 = 0)',
        },
        {
          label: '(b)(ii)',
          prompt: 'Test whether L₁ ⊥ L₃.',
          strategy: 'Check if m₁ × m₃ = -1.',
          steps: [
            {
              title: 'Multiply slopes m₁ and m₃',
              math: 'm₁ × m₃ = (-3/5) × (5/3) = -1',
              explanation: 'Since the product of slopes is -1, L₁ ⊥ L₃. Therefore, agree with the claim.',
            },
          ],
          answer: 'agree',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ ⊥ L₃ at P(-1, -6)',
        curves: [
          { kind: 'linear', m: -0.6, c: -6.6, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 1 / 3, c: -17 / 3, label: 'L₂', color: '#94a3b8', dashed: true },
          { kind: 'linear', m: 5 / 3, c: -13 / 3, label: 'L₃', color: '#10b981' },
        ],
        points: [
          { x: -1, y: -6, label: 'P(-1, -6)', color: '#dc2626' },
          { x: 2, y: -1, label: '(2, -1)', color: '#10b981' },
        ],
        xRange: [-8, 8],
        yRange: [-10, 4],
      },
    },
    {
      id: 'ex33-23',
      exerciseId: 'ex3_3',
      number: 'Q23',
      page: '3.47',
      level: 'Level 2',
      topic: 'Area of Bounded Region',
      examRef: 'HKCEE 2002 P2 Q32',
      statement: 'The figure shows the straight lines L₁: 3x + 4y + 192 = 0 and L₂: y = 6. Find the area of the region bounded by L₁, L₂ and the y-axis.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the three vertices of the bounded triangle and compute its area.',
          strategy: 'Find where L₁ meets the y-axis, where L₂ meets the y-axis, and where L₁ meets L₂.',
          steps: [
            {
              title: 'Find vertices on the y-axis',
              math: 'L₁ cuts y-axis at (0, -48); L₂ cuts y-axis at (0, 6)',
              explanation: 'The vertical side along the y-axis has length 6 - (-48) = 54.',
            },
            {
              title: 'Find intersection of L₁ and L₂',
              math: '3x + 4(6) + 192 = 0 ⇒ 3x = -216 ⇒ x = -72 ⇒ (-72, 6)',
              explanation: 'The horizontal base along y = 6 has length 0 - (-72) = 72.',
            },
            {
              title: 'Compute triangle area',
              math: 'Area = (1/2) × 72 × 54 = 1944',
              explanation: 'The bounded region is a right-angled triangle of area 1944 sq. units.',
            },
          ],
          answer: '1944 sq. units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Region Bounded by L₁, L₂ and y-axis',
        curves: [
          { kind: 'linear', m: -0.75, c: -48, label: 'L₁: 3x + 4y + 192 = 0', color: '#0284c7' },
          { kind: 'linear', m: 0, c: 6, label: 'L₂: y = 6', color: '#f59e0b' },
        ],
        points: [
          { x: -72, y: 6, label: '(-72, 6)', color: '#dc2626' },
          { x: 0, y: 6, label: '(0, 6)', color: '#10b981' },
          { x: 0, y: -48, label: '(0, -48)', color: '#10b981' },
        ],
        polygons: [
          {
            points: [
              { x: -72, y: 6 },
              { x: 0, y: 6 },
              { x: 0, y: -48 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
            label: 'Area = 1944',
          },
        ],
        xRange: [-84, 16],
        yRange: [-58, 18],
      },
    },
    {
      id: 'ex33-24',
      exerciseId: 'ex3_3',
      number: 'Q24',
      page: '3.47',
      level: 'Level 2',
      topic: 'Area Bounded by Two Lines & x-axis',
      statement: 'The figure shows the straight lines L₁: 2x - y - 4 = 0 and L₂: 2x - 3y - 24 = 0. Find the area of the region bounded by L₁, L₂ and the x-axis.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the two x-intercepts and the intersection of L₁ and L₂, then calculate the area.',
          strategy: 'Use the segment along the x-axis as the base and |y| of the intersection as the height.',
          steps: [
            {
              title: 'Find x-intercepts of L₁ and L₂',
              math: 'L₁: 2x - 4 = 0 ⇒ (2, 0); L₂: 2x - 24 = 0 ⇒ (12, 0)',
              explanation: 'The base along the x-axis has length 12 - 2 = 10.',
            },
            {
              title: 'Find intersection of L₁ and L₂',
              math: '(2x - y - 4) - (2x - 3y - 24) = 0 ⇒ 2y + 20 = 0 ⇒ y = -10; x = -3 ⇒ (-3, -10)',
              explanation: 'The perpendicular height from (-3, -10) to the x-axis is |-10| = 10.',
            },
            {
              title: 'Compute area',
              math: 'Area = (1/2) × 10 × 10 = 50',
              explanation: 'The bounded triangle has area 50 sq. units.',
            },
          ],
          answer: '50 sq. units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Region Bounded by L₁, L₂ and x-axis',
        curves: [
          { kind: 'linear', m: 2, c: -4, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 2 / 3, c: -8, label: 'L₂', color: '#f59e0b' },
        ],
        points: [
          { x: 2, y: 0, label: '(2, 0)', color: '#10b981' },
          { x: 12, y: 0, label: '(12, 0)', color: '#10b981' },
          { x: -3, y: -10, label: '(-3, -10)', color: '#dc2626' },
        ],
        polygons: [
          {
            points: [
              { x: 2, y: 0 },
              { x: 12, y: 0 },
              { x: -3, y: -10 },
            ],
            fill: 'rgba(16, 185, 129, 0.2)',
            stroke: '#10b981',
            label: 'Area = 50',
          },
        ],
        xRange: [-6, 16],
        yRange: [-14, 6],
      },
    },
    {
      id: 'ex33-25',
      exerciseId: 'ex3_3',
      number: 'Q25',
      page: '3.48',
      level: 'Level 2',
      topic: 'Parallel Lines & Parallelogram Area',
      statement: 'The straight lines L₁: 5x - 6y - 60 = 0 and L₂: px + 12y + 25 = 0 do not intersect. (a) Find the value of p. (b) L₁ and L₂ cut the x-axis at A and B respectively. A horizontal line L₃ intersects L₁ at a point C on the y-axis and intersects L₂ at D. Find the area of the parallelogram ABDC.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find p.',
          strategy: 'Equate the slopes of L₁ and L₂.',
          steps: [
            {
              title: 'Equate slopes',
              math: '-5/(-6) = -p/12 ⇒ 5/6 = -p/12 ⇒ p = -10',
              explanation: 'So L₂ is -10x + 12y + 25 = 0 (slope 5/6, different y-intercept from L₁).',
            },
          ],
          answer: '-10',
        },
        {
          label: '(b)',
          prompt: 'Find the area of parallelogram ABDC.',
          strategy: 'Find base AB along the x-axis and vertical height from C on the y-axis.',
          steps: [
            {
              title: 'Find A, B, and C',
              math: 'A(12, 0), B(2.5, 0) ⇒ AB = 12 - 2.5 = 9.5; C(0, -10) ⇒ height = 10',
              explanation: 'L₁ cuts the y-axis at C(0, -10), so the horizontal line L₃ is y = -10, distance 10 below the x-axis.',
            },
            {
              title: 'Calculate parallelogram area',
              math: 'Area = AB × height = 9.5 × 10 = 95',
              explanation: 'The area of parallelogram ABDC is 95 sq. units.',
            },
          ],
          answer: '95 sq. units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Parallelogram ABDC (Area = 95)',
        curves: [
          { kind: 'linear', m: 5 / 6, c: -10, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 5 / 6, c: -25 / 12, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: 0, c: -10, label: 'L₃: y = -10', color: '#94a3b8', dashed: true },
        ],
        points: [
          { x: 12, y: 0, label: 'A(12, 0)', color: '#0284c7' },
          { x: 2.5, y: 0, label: 'B(2.5, 0)', color: '#f59e0b' },
          { x: 0, y: -10, label: 'C(0, -10)', color: '#0284c7' },
          { x: -9.5, y: -10, label: 'D(-9.5, -10)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: 12, y: 0 },
              { x: 2.5, y: 0 },
              { x: -9.5, y: -10 },
              { x: 0, y: -10 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
            label: 'Area = 95',
          },
        ],
        xRange: [-14, 16],
        yRange: [-14, 4],
      },
    },
    {
      id: 'ex33-26',
      exerciseId: 'ex3_3',
      number: 'Q26',
      page: '3.48',
      level: 'Level 2',
      topic: 'Transversal Across Parallel Lines',
      statement: 'The straight line L₂ is parallel to L₁: 4x + 5y + 20 = 0 and its x-intercept is 20. (a) Find the equation of L₂. (b) A straight line L₃: 8x - 15y + 40 = 0 cuts L₁ and L₂ at A and B respectively. Find the distance between A and B.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L₂.',
          strategy: 'L₂ has the same slope -4/5 as L₁ and passes through (20, 0).',
          steps: [
            {
              title: 'Use point-slope form',
              math: 'y - 0 = -(4/5)(x - 20) ⇒ 4x + 5y - 80 = 0',
              explanation: 'Parallel line with x-intercept 20 is 4x + 5y - 80 = 0.',
            },
          ],
          answer: '4x + 5y - 80 = 0 (or y = -(4/5)x + 16)',
        },
        {
          label: '(b)',
          prompt: 'Find A, B, and distance AB.',
          strategy: 'Solve L₃ with L₁ for A, and L₃ with L₂ for B, then apply distance formula.',
          steps: [
            {
              title: 'Find A (L₁ ∩ L₃)',
              math: '3(4x + 5y + 20) + (8x - 15y + 40) = 0 ⇒ 20x + 100 = 0 ⇒ x = -5, y = 0 ⇒ A(-5, 0)',
              explanation: 'A is (-5, 0).',
            },
            {
              title: 'Find B (L₂ ∩ L₃)',
              math: '3(4x + 5y - 80) + (8x - 15y + 40) = 0 ⇒ 20x - 200 = 0 ⇒ x = 10, y = 8 ⇒ B(10, 8)',
              explanation: 'B is (10, 8).',
            },
            {
              title: 'Compute distance AB',
              math: 'AB = √((10 - (-5))² + (8 - 0)²) = √(15² + 8²) = √289 = 17',
              explanation: 'The distance AB is 17 units.',
            },
          ],
          answer: '17 units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Transversal L₃ Cutting L₁ and L₂ (AB = 17)',
        curves: [
          { kind: 'linear', m: -0.8, c: -4, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -0.8, c: 16, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: 8 / 15, c: 8 / 3, label: 'L₃', color: '#10b981' },
        ],
        points: [
          { x: -5, y: 0, label: 'A(-5, 0)', color: '#dc2626' },
          { x: 10, y: 8, label: 'B(10, 8)', color: '#dc2626' },
        ],
        xRange: [-10, 24],
        yRange: [-8, 20],
      },
    },
    {
      id: 'ex33-27',
      exerciseId: 'ex3_3',
      number: 'Q27',
      page: '3.48',
      level: 'Level 2',
      topic: 'Coincident Lines with Integer Parameters',
      statement: 'The straight lines L₁: hx - 2y = 0 and L₂: -4x + ky = 0 have an infinite number of points of intersection, where h and k are negative integers. (a) Express h in terms of k. (b) List all possible pairs of values of h and k.',
      parts: [
        {
          label: '(a)',
          prompt: 'Express h in terms of k.',
          strategy: 'Both lines pass through the origin (0, 0), so they coincide whenever their slopes are equal.',
          steps: [
            {
              title: 'Equate slopes',
              math: 'h/2 = 4/k ⇒ hk = 8 ⇒ h = 8/k',
              explanation: 'Since both lines have y-intercept 0, equal slopes guarantee coincidence.',
            },
          ],
          answer: 'h = 8/k',
        },
        {
          label: '(b)',
          prompt: 'List all negative integer pairs (h, k) satisfying hk = 8.',
          strategy: 'Test all negative integer divisors of 8.',
          steps: [
            {
              title: 'Find negative factor pairs of 8',
              math: 'k ∈ {-8, -4, -2, -1} ⇒ (h, k) = (-1, -8), (-2, -4), (-4, -2), (-8, -1)',
              explanation: 'There are 4 valid negative integer pairs.',
            },
          ],
          answer: '(-1, -8), (-2, -4), (-4, -2), (-8, -1)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Sample Coincident Pair (h, k) = (-2, -4)',
        curves: [
          { kind: 'linear', m: -1, c: 0, label: 'y = -x (h=-2, k=-4)', color: '#0284c7' },
          { kind: 'linear', m: -2, c: 0, label: 'y = -2x (h=-4, k=-2)', color: '#10b981', dashed: true },
        ],
        points: [{ x: 0, y: 0, label: 'O(0, 0)', color: '#dc2626' }],
        xRange: [-6, 6],
        yRange: [-6, 6],
      },
    },
    {
      id: 'ex33-28',
      exerciseId: 'ex3_3',
      number: 'Q28',
      page: '3.48',
      level: 'Level 2',
      topic: 'Perpendicular Intersection & Triangle Perimeter',
      statement: 'The straight line L₁: 4x + ky - 35 = 0 passes through A(14, -7). (a) Find the value of k. (b) A straight line L₂ passes through B(-10, 0) and is perpendicular to L₁. L₁ and L₂ intersect at C. (i) Find the coordinates of C. (ii) Someone claims that the perimeter of △ABC is greater than 70 units. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k.',
          strategy: 'Substitute A(14, -7) into L₁.',
          steps: [
            {
              title: 'Substitute A(14, -7)',
              math: '4(14) + k(-7) - 35 = 0 ⇒ 21 - 7k = 0 ⇒ k = 3',
              explanation: 'Thus L₁ is 4x + 3y - 35 = 0.',
            },
          ],
          answer: '3',
        },
        {
          label: '(b)(i)',
          prompt: 'Find L₂ and intersection C.',
          strategy: 'Slope of L₁ is -4/3 so slope of L₂ is 3/4; pass through B(-10, 0) and solve with L₁.',
          steps: [
            {
              title: 'Find equation of L₂',
              math: 'm₂ = 3/4 ⇒ y - 0 = (3/4)(x + 10) ⇒ 3x - 4y + 30 = 0',
              explanation: 'L₂ is 3x - 4y + 30 = 0.',
            },
            {
              title: 'Solve L₁ and L₂ for C',
              math: '4(4x + 3y - 35) + 3(3x - 4y + 30) = 0 ⇒ 25x - 50 = 0 ⇒ x = 2; y = 9 ⇒ C(2, 9)',
              explanation: 'Intersection C is (2, 9).',
            },
          ],
          answer: '(2, 9)',
        },
        {
          label: '(b)(ii)',
          prompt: 'Check whether perimeter of △ABC > 70.',
          strategy: 'Find side lengths AC, BC, and AB.',
          steps: [
            {
              title: 'Calculate side lengths',
              math: 'AC = √((14 - 2)² + (-7 - 9)²) = 20; BC = √((2 + 10)² + (9 - 0)²) = 15; AB = √((14 + 10)² + (-7 - 0)²) = 25',
              explanation: '△ABC is a 15-20-25 right-angled triangle.',
            },
            {
              title: 'Compare perimeter with 70',
              math: 'Perimeter = 20 + 15 + 25 = 60 < 70',
              explanation: 'Since 60 < 70, disagree with the claim.',
            },
          ],
          answer: 'disagree (perimeter = 60 < 70)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Right Triangle △ABC (Perimeter = 60)',
        curves: [
          { kind: 'linear', m: -4 / 3, c: 35 / 3, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0.75, c: 7.5, label: 'L₂', color: '#10b981' },
        ],
        points: [
          { x: 14, y: -7, label: 'A(14, -7)', color: '#0284c7' },
          { x: -10, y: 0, label: 'B(-10, 0)', color: '#10b981' },
          { x: 2, y: 9, label: 'C(2, 9)', color: '#dc2626' },
        ],
        polygons: [
          {
            points: [
              { x: 14, y: -7 },
              { x: -10, y: 0 },
              { x: 2, y: 9 },
            ],
            fill: 'rgba(14, 165, 233, 0.18)',
            stroke: '#0ea5e9',
          },
        ],
        xRange: [-14, 18],
        yRange: [-10, 14],
      },
    },
    {
      id: 'ex33-29',
      exerciseId: 'ex3_3',
      number: 'Q29',
      page: '3.48',
      level: 'Level 2',
      topic: 'Perpendicular Bisector & Circumcentre',
      isNonFoundation: true,
      statement: 'The straight lines L₁: 3x - 4y = 0 and L₂: 4x + 3y - 150 = 0 intersect at the point A, and L₂ cuts the y-axis at the point B. (a) Find the equation of the perpendicular bisector of AB. (b) Find the coordinates of the circumcentre of △OAB, where O is the origin.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find A, B, and the perpendicular bisector of AB.',
          strategy: 'Find A by solving L₁ and L₂, find B on the y-axis, then use the mid-point of AB and perpendicular slope.',
          steps: [
            {
              title: 'Find A and B',
              math: '3(3x - 4y) + 4(4x + 3y - 150) = 0 ⇒ 25x = 600 ⇒ A(24, 18); B(0, 50)',
              explanation: 'A is (24, 18) and B is (0, 50).',
            },
            {
              title: 'Find mid-point and slope of perpendicular bisector',
              math: 'Mid-point M = (12, 34); m_AB = -4/3 ⇒ m_⊥ = 3/4',
              explanation: 'The perpendicular bisector passes through M(12, 34) with slope 3/4.',
            },
            {
              title: 'Write equation of perpendicular bisector',
              math: 'y - 34 = (3/4)(x - 12) ⇒ y = (3/4)x + 25 (or 3x - 4y + 100 = 0)',
              explanation: 'Equation is y = (3/4)x + 25.',
            },
          ],
          answer: 'y = (3/4)x + 25 (or 3x - 4y + 100 = 0)',
        },
        {
          label: '(b)',
          prompt: 'Find the circumcentre of △OAB.',
          strategy: 'Note that L₁ ⊥ L₂ at A, so △OAB is right-angled at A; or intersect the perpendicular bisectors of AB and OB.',
          steps: [
            {
              title: 'Intersect perpendicular bisectors of AB and OB',
              math: 'Perpendicular bisector of OB is y = 25; put y = 25 into y = (3/4)x + 25 ⇒ x = 0',
              explanation: 'Equivalently, since ∠OAB = 90°, the circumcentre is the mid-point of hypotenuse OB: (0, 25).',
            },
          ],
          answer: '(0, 25)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Circumcentre (0, 25) of Right △OAB',
        curves: [
          { kind: 'linear', m: 0.75, c: 0, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: -4 / 3, c: 50, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: 0.75, c: 25, label: 'Perp. bisector of AB', color: '#10b981', dashed: true },
        ],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#94a3b8' },
          { x: 24, y: 18, label: 'A(24, 18)', color: '#0284c7' },
          { x: 0, y: 50, label: 'B(0, 50)', color: '#f59e0b' },
          { x: 0, y: 25, label: 'Circumcentre (0, 25)', color: '#dc2626' },
        ],
        circles: [{ cx: 0, cy: 25, r: 25, stroke: '#10b981' }],
        xRange: [-30, 34],
        yRange: [-5, 56],
      },
    },
    {
      id: 'ex33-30',
      exerciseId: 'ex3_3',
      number: 'Q30',
      page: '3.48',
      level: 'Level 2',
      topic: 'Altitude & Orthocentre',
      isNonFoundation: true,
      statement: 'The straight line L₁: 3x - 5y + 30 = 0 cuts the x-axis and the y-axis at A and B respectively. The straight line L₂: x + 2y = k cuts the x-axis and the y-axis at A and C respectively. (a) Find the equation of the altitude from C to AB. (b) Find the coordinates of the orthocentre of △ABC.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find A, B, C, and the altitude from C to AB.',
          strategy: 'Find A from L₁, use A to get k and C from L₂, then use the perpendicular slope to AB.',
          steps: [
            {
              title: 'Find A, B, k, and C',
              math: 'A(-10, 0), B(0, 6); (-10) + 2(0) = k ⇒ k = -10 ⇒ C(0, -5)',
              explanation: 'Both lines share x-intercept A(-10, 0); L₂ cuts the y-axis at C(0, -5).',
            },
            {
              title: 'Find altitude from C(0, -5) to AB',
              math: 'm_AB = 3/5 ⇒ m_alt = -5/3 ⇒ y = -(5/3)x - 5 (or 5x + 3y + 15 = 0)',
              explanation: 'Using slope-intercept form with y-intercept -5 gives y = -(5/3)x - 5.',
            },
          ],
          answer: 'y = -(5/3)x - 5 (or 5x + 3y + 15 = 0)',
        },
        {
          label: '(b)',
          prompt: 'Find the orthocentre of △ABC.',
          strategy: 'Note that BC lies along the y-axis, so the altitude from A to BC is the x-axis y = 0!',
          steps: [
            {
              title: 'Intersect altitude from C with x-axis (y = 0)',
              math: '0 = -(5/3)x - 5 ⇒ x = -3 ⇒ (-3, 0)',
              explanation: 'Since BC is vertical (on the y-axis), the altitude from A(-10, 0) is y = 0. Meeting y = -(5/3)x - 5 gives (-3, 0).',
            },
          ],
          answer: '(-3, 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Orthocentre (-3, 0) of △ABC',
        curves: [
          { kind: 'linear', m: 0.6, c: 6, label: 'L₁ (AB)', color: '#0284c7' },
          { kind: 'linear', m: -0.5, c: -5, label: 'L₂ (AC)', color: '#f59e0b' },
          { kind: 'linear', m: -5 / 3, c: -5, label: 'Altitude from C', color: '#10b981', dashed: true },
        ],
        points: [
          { x: -10, y: 0, label: 'A(-10, 0)', color: '#0284c7' },
          { x: 0, y: 6, label: 'B(0, 6)', color: '#0284c7' },
          { x: 0, y: -5, label: 'C(0, -5)', color: '#f59e0b' },
          { x: -3, y: 0, label: 'H(-3, 0)', color: '#dc2626' },
        ],
        polygons: [
          {
            points: [
              { x: -10, y: 0 },
              { x: 0, y: 6 },
              { x: 0, y: -5 },
            ],
            fill: 'rgba(14, 165, 233, 0.15)',
            stroke: '#0ea5e9',
          },
        ],
        xRange: [-12, 4],
        yRange: [-7, 8],
      },
    },
    {
      id: 'ex33-31',
      exerciseId: 'ex3_3',
      number: 'Q31',
      page: '3.49',
      level: 'Level 2',
      topic: 'Open-Ended Parallel Condition',
      statement: 'It is given that the straight lines L₁: 2x - 3y = 0 and L₂: 3x + ay + b = 0 have no points of intersection. List two sets of possible values of a and b.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the condition on a and b for no intersection, and give two examples.',
          strategy: 'Match slopes m₁ = m₂, and ensure y-intercepts are unequal (c₂ ≠ 0).',
          steps: [
            {
              title: 'Equate slopes',
              math: '2/3 = -3/a ⇒ 2a = -9 ⇒ a = -9/2',
              explanation: 'a is uniquely fixed at -9/2.',
            },
            {
              title: 'Choose non-zero values for b',
              math: 'c₁ = 0 and c₂ = -b/a ≠ 0 ⇒ b ≠ 0 (e.g. b = 1 or b = -1)',
              explanation: 'Any non-zero value of b gives a distinct parallel line.',
            },
          ],
          answer: 'a = -9/2, b = 1; a = -9/2, b = -1 (any two with a = -9/2, b ≠ 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: 2x - 3y = 0 & Sample Parallel L₂',
        curves: [
          { kind: 'linear', m: 2 / 3, c: 0, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 2 / 3, c: 2 / 9, label: 'L₂ (b = 1)', color: '#10b981' },
          { kind: 'linear', m: 2 / 3, c: -2 / 9, label: 'L₂ (b = -1)', color: '#f59e0b' },
        ],
        xRange: [-6, 6],
        yRange: [-5, 5],
      },
    },
    {
      id: 'ex33-32',
      exerciseId: 'ex3_3',
      number: 'Q32',
      page: '3.49',
      level: 'Level 2',
      topic: 'Three Lines & Triangle Formation',
      statement: 'Consider three straight lines L₁: 3x - y - 1 = 0, L₂: x - y + 1 = 0 and L₃: ax + by + c = 0, where a, b and c are non-zero constants. List two possible equations of L₃ in each of the following cases: (a) L₁, L₂ and L₃ cannot form a triangle. (b) L₃ passes through the point of intersection of L₁ and L₂.',
      parts: [
        {
          label: '(a)',
          prompt: 'Give two equations for L₃ so the three lines cannot form a triangle.',
          strategy: 'Three lines fail to form a triangle if L₃ is parallel to L₁ (slope 3), parallel to L₂ (slope 1), or concurrent at L₁ ∩ L₂ = (1, 2).',
          steps: [
            {
              title: 'Choose L₃ parallel to L₂ or L₁',
              math: 'Parallel to L₂: x - y + 4 = 0; Parallel to L₁: 3x - y + 2 = 0',
              explanation: 'Both have non-zero a, b, c and prevent a closed triangle from forming.',
            },
          ],
          answer: 'x - y + 4 = 0, 3x - y + 2 = 0 (or any line parallel to L₁/L₂ or through (1, 2))',
        },
        {
          label: '(b)',
          prompt: 'Give two equations for L₃ passing through L₁ ∩ L₂.',
          strategy: 'First solve L₁ and L₂ to find their intersection (1, 2), then write two lines satisfied by (1, 2).',
          steps: [
            {
              title: 'Find intersection of L₁ and L₂',
              math: '(3x - y - 1) - (x - y + 1) = 0 ⇒ 2x - 2 = 0 ⇒ x = 1, y = 2 ⇒ (1, 2)',
              explanation: 'Intersection is (1, 2).',
            },
            {
              title: 'Construct two lines through (1, 2)',
              math: '5x + y - 7 = 0 and 3x - 2y + 1 = 0',
              explanation: 'Check: 5(1) + 2 - 7 = 0 and 3(1) - 2(2) + 1 = 0, with non-zero a, b, c.',
            },
          ],
          answer: '5x + y - 7 = 0, 3x - 2y + 1 = 0 (any two satisfied by (1, 2))',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ and L₂ Intersecting at (1, 2)',
        curves: [
          { kind: 'linear', m: 3, c: -1, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 1, c: 1, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: -5, c: 7, label: 'L₃ through (1, 2)', color: '#10b981', dashed: true },
        ],
        points: [{ x: 1, y: 2, label: '(1, 2)', color: '#dc2626' }],
        xRange: [-4, 6],
        yRange: [-4, 10],
      },
    },
    {
      id: 'ex33-33',
      exerciseId: 'ex3_3',
      number: 'Q33',
      page: '3.49',
      level: 'Smart Corner',
      topic: 'Isosceles Triangle, Centroid & Circumcentre',
      isNonFoundation: true,
      statement: 'The straight lines L₁: 3x + 5y + 24 = 0 and L₂: 3x - 5y - 36 = 0 intersect at P, and cut the x-axis at Q and R respectively. (a) Show that PQ = PR. (b) (i) Find the equation of the median from R to PQ. (ii) Find the coordinates of the centroid of △PQR. (c) (i) Find the equation of the perpendicular bisector of PQ. (ii) Someone claims that the circumcentre of △PQR lies outside △PQR. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find P, Q, R and show PQ = PR.',
          strategy: 'Solve L₁ and L₂ for P, find x-intercepts Q and R, then compare PQ and PR.',
          steps: [
            {
              title: 'Find P, Q, and R',
              math: 'L₁ + L₂ ⇒ 6x - 12 = 0 ⇒ x = 2, y = -6 ⇒ P(2, -6); Q(-8, 0); R(12, 0)',
              explanation: 'P is (2, -6), Q is (-8, 0), and R is (12, 0).',
            },
            {
              title: 'Compare PQ and PR',
              math: 'PQ = √((2 + 8)² + (-6)²) = √136; PR = √((2 - 12)² + (-6)²) = √136 ⇒ PQ = PR',
              explanation: 'Since PQ = PR = √136, △PQR is isosceles.',
            },
          ],
          answer: 'PQ = PR = √136 (shown)',
        },
        {
          label: '(b)(i)',
          prompt: 'Find the equation of the median from R to PQ.',
          strategy: 'Find mid-point M of PQ, then find the line through M and R(12, 0).',
          steps: [
            {
              title: 'Find mid-point M of PQ and median MR',
              math: 'M = ((2 - 8)/2, (-6 + 0)/2) = (-3, -3); m_MR = (0 - (-3))/(12 - (-3)) = 1/5 ⇒ y = (1/5)x - 12/5',
              explanation: 'General form is x - 5y - 12 = 0.',
            },
          ],
          answer: 'y = (1/5)x - 12/5 (or x - 5y - 12 = 0)',
        },
        {
          label: '(b)(ii)',
          prompt: 'Find the centroid of △PQR.',
          strategy: 'Intersect the median MR with the axis of symmetry x = 2 (median from P to QR).',
          steps: [
            {
              title: 'Use centroid formula or intersect medians',
              math: 'G = ((2 - 8 + 12)/3, (-6 + 0 + 0)/3) = (2, -2)',
              explanation: 'Check on x - 5y - 12 = 0: 2 - 5(-2) - 12 = 0. Thus centroid is (2, -2).',
            },
          ],
          answer: '(2, -2)',
        },
        {
          label: '(c)(i)',
          prompt: 'Find the perpendicular bisector of PQ.',
          strategy: 'Line through M(-3, -3) perpendicular to L₁ (slope -3/5).',
          steps: [
            {
              title: 'Write equation of perpendicular bisector',
              math: 'm_⊥ = 5/3 ⇒ y + 3 = (5/3)(x + 3) ⇒ y = (5/3)x + 2 (or 5x - 3y + 6 = 0)',
              explanation: 'Equation is y = (5/3)x + 2.',
            },
          ],
          answer: 'y = (5/3)x + 2 (or 5x - 3y + 6 = 0)',
        },
        {
          label: '(c)(ii)',
          prompt: 'Determine whether the circumcentre lies outside △PQR.',
          strategy: 'Find the circumcentre by intersecting the perpendicular bisector of PQ with x = 2 (perpendicular bisector of QR).',
          steps: [
            {
              title: 'Find circumcentre and check its position',
              math: 'Put x = 2 into y = (5/3)x + 2 ⇒ y = 16/3 ⇒ circumcentre (2, 16/3)',
              explanation: 'All points inside △PQR satisfy y < 0 (below QR on the x-axis), whereas 16/3 > 0. Thus the circumcentre lies outside △PQR (agree).',
            },
          ],
          answer: 'agree (circumcentre (2, 16/3) lies above y = 0)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '△PQR, Centroid (2, -2) & Circumcentre (2, 16/3)',
        curves: [
          { kind: 'linear', m: -0.6, c: -4.8, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0.6, c: -7.2, label: 'L₂', color: '#f59e0b' },
          { kind: 'linear', m: 5 / 3, c: 2, label: 'Perp. bisector of PQ', color: '#10b981', dashed: true },
        ],
        points: [
          { x: 2, y: -6, label: 'P(2, -6)', color: '#0284c7' },
          { x: -8, y: 0, label: 'Q(-8, 0)', color: '#0284c7' },
          { x: 12, y: 0, label: 'R(12, 0)', color: '#f59e0b' },
          { x: 2, y: -2, label: 'G(2, -2)', color: '#9333ea' },
          { x: 2, y: 16 / 3, label: 'O_c(2, 16/3)', color: '#dc2626' },
        ],
        polygons: [
          {
            points: [
              { x: 2, y: -6 },
              { x: -8, y: 0 },
              { x: 12, y: 0 },
            ],
            fill: 'rgba(14, 165, 233, 0.16)',
            stroke: '#0ea5e9',
          },
        ],
        xRange: [-12, 16],
        yRange: [-10, 10],
      },
    },
    {
      id: 'ex33-34',
      exerciseId: 'ex3_3',
      number: 'Q34',
      page: '3.49',
      level: 'Cross Topics',
      topic: 'Rhombus Diagonals & Area',
      examRef: 'HKCEE 2004 P1 Q13',
      statement: 'ABCD is a rhombus, where the coordinates of A and C are (-2, 7) and (4, 1) respectively. The diagonals AC and BD intersect at E. (a) Find (i) the coordinates of E; (ii) the equation of the straight line BD. (b) It is given that the slope of BC is 1/4. (i) Find the coordinates of D. (ii) Someone claims that the area of the rhombus ABCD is greater than 65 sq. units. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)(i)',
          prompt: 'Find the coordinates of E.',
          strategy: 'Diagonals of a rhombus bisect each other, so E is the mid-point of AC.',
          steps: [
            {
              title: 'Apply mid-point formula to AC',
              math: 'E = ((-2 + 4)/2, (7 + 1)/2) = (1, 4)',
              explanation: 'Thus E is (1, 4).',
            },
          ],
          answer: '(1, 4)',
        },
        {
          label: '(a)(ii)',
          prompt: 'Find the equation of BD.',
          strategy: 'Diagonals of a rhombus are perpendicular (BD ⊥ AC) and pass through E(1, 4).',
          steps: [
            {
              title: 'Find slope of AC and BD',
              math: 'm_AC = (1 - 7)/(4 - (-2)) = -1 ⇒ m_BD = 1',
              explanation: 'Since m_AC × m_BD = -1, m_BD = 1.',
            },
            {
              title: 'Write equation of BD through E(1, 4)',
              math: 'y - 4 = 1(x - 1) ⇒ y = x + 3 (or x - y + 3 = 0)',
              explanation: 'Equation of BD is y = x + 3.',
            },
          ],
          answer: 'y = x + 3 (or x - y + 3 = 0)',
        },
        {
          label: '(b)(i)',
          prompt: 'Find the coordinates of D.',
          strategy: 'Since AD ∥ BC, AD has slope 1/4 through A(-2, 7). Intersect AD with BD.',
          steps: [
            {
              title: 'Find equation of AD',
              math: 'y - 7 = (1/4)(x + 2) ⇒ x - 4y + 30 = 0',
              explanation: 'Opposite sides of a rhombus are parallel, so m_AD = m_BC = 1/4.',
            },
            {
              title: 'Intersect AD with BD: y = x + 3',
              math: 'x - 4(x + 3) + 30 = 0 ⇒ -3x + 18 = 0 ⇒ x = 6; y = 9 ⇒ D(6, 9)',
              explanation: 'Thus D is (6, 9).',
            },
          ],
          answer: '(6, 9)',
        },
        {
          label: '(b)(ii)',
          prompt: 'Check whether Area(ABCD) > 65.',
          strategy: 'Compute diagonals AC and BD = 2 × ED, then use Area = (1/2) × AC × BD.',
          steps: [
            {
              title: 'Find AC and BD',
              math: 'AC = √(6² + (-6)²) = 6√2; ED = √(5² + 5²) = 5√2 ⇒ BD = 10√2',
              explanation: 'Since E is the mid-point of BD, BD = 2ED = 10√2 (and B is (-4, -1)).',
            },
            {
              title: 'Calculate area of rhombus',
              math: 'Area = (1/2) × AC × BD = (1/2)(6√2)(10√2) = 60 < 65',
              explanation: 'Since 60 < 65, disagree with the claim.',
            },
          ],
          answer: 'disagree (area = 60 < 65)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Rhombus ABCD (Area = 60)',
        curves: [
          { kind: 'linear', m: -1, c: 5, label: 'Diagonal AC', color: '#94a3b8', dashed: true },
          { kind: 'linear', m: 1, c: 3, label: 'Diagonal BD', color: '#10b981', dashed: true },
        ],
        points: [
          { x: -2, y: 7, label: 'A(-2, 7)', color: '#0284c7' },
          { x: -4, y: -1, label: 'B(-4, -1)', color: '#0284c7' },
          { x: 4, y: 1, label: 'C(4, 1)', color: '#0284c7' },
          { x: 6, y: 9, label: 'D(6, 9)', color: '#0284c7' },
          { x: 1, y: 4, label: 'E(1, 4)', color: '#dc2626' },
        ],
        polygons: [
          {
            points: [
              { x: -2, y: 7 },
              { x: -4, y: -1 },
              { x: 4, y: 1 },
              { x: 6, y: 9 },
            ],
            fill: 'rgba(14, 165, 233, 0.18)',
            stroke: '#0ea5e9',
            label: 'Area = 60',
          },
        ],
        xRange: [-6, 10],
        yRange: [-4, 12],
      },
    },
  ],
};
