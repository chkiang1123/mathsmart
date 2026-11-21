import type { ExerciseGroup } from '../types/math';

export const exercise31: ExerciseGroup = {
  id: 'ex3_1',
  code: 'Ex 3.1',
  title: 'Equations of Straight Lines',
  subtitle: 'Point-slope, two-point, intercept, slope-intercept forms & special lines',
  pages: 'p. 3.18 – 3.22',
  objectives: [
    'Find the equation of a straight line from point-slope, two-point, intercept, or slope-intercept conditions',
    'Write equations of horizontal lines (y = k) and vertical lines (x = h)',
    'Solve problems involving parallel lines, perpendicular lines, perpendicular bisectors, medians, and altitudes',
  ],
  sectionCheck: [
    {
      id: 'sc31-a',
      label: '(a)',
      statement: 'The equation of the line passing through the point (-1, 4) with slope 2 is y - 4 = 2(x + 1).',
      isCorrect: true,
      explanation: 'By point-slope form y - y₁ = m(x - x₁), substituting (-1, 4) and m = 2 gives y - 4 = 2[x - (-1)] = 2(x + 1).',
    },
    {
      id: 'sc31-b',
      label: '(b)',
      statement: 'The equation of the line passing through the points (1, 3) and (2, 6) is y = 3x.',
      isCorrect: true,
      explanation: 'Slope m = (6 - 3)/(2 - 1) = 3. Substituting (1, 3) gives y - 3 = 3(x - 1) ⇒ y = 3x.',
    },
    {
      id: 'sc31-c',
      label: '(c)',
      statement: 'The equation of the vertical line passing through the point (-25, 20) is x = -25.',
      isCorrect: true,
      explanation: 'Every point on a vertical line shares the same x-coordinate, so x = -25.',
    },
    {
      id: 'sc31-d',
      label: '(d)',
      statement: 'If L is a straight line with slope -4 and the point (5, 0) lies on L, then the equation of L is y = -4x + 5.',
      isCorrect: false,
      explanation: '(5, 0) is the x-intercept, not the y-intercept. Using point-slope form: y - 0 = -4(x - 5) ⇒ y = -4x + 20.',
    },
    {
      id: 'sc31-e',
      label: '(e)',
      statement: 'The x-intercept and the y-intercept of the line x/2 - y/3 = 1 are 2 and 3 respectively.',
      isCorrect: false,
      explanation: 'Rewrite as x/2 + y/(-3) = 1. Thus the x-intercept is 2, while the y-intercept is -3 (not 3).',
    },
    {
      id: 'sc31-f',
      label: '(f)',
      statement: 'The slope and the y-intercept of the line x = 2y - 4 are 2 and -4 respectively.',
      isCorrect: false,
      explanation: 'Rewrite in slope-intercept form y = mx + c: 2y = x + 4 ⇒ y = (1/2)x + 2. So slope = 1/2 and y-intercept = 2.',
    },
    {
      id: 'sc31-g',
      label: '(g)',
      statement: 'The horizontal line y = 4 passes through the point (4, -4).',
      isCorrect: false,
      explanation: 'A horizontal line through (4, -4) has constant y-coordinate -4, so its equation is y = -4, not y = 4.',
    },
  ],
  questions: [
    {
      id: 'ex31-1',
      exerciseId: 'ex3_1',
      number: 'Q1',
      page: '3.18',
      level: 'Level 1',
      topic: 'Point-Slope Form (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: L passes through (-5, 3) with slope 4.',
      parts: [
        {
          label: 'Main',
          prompt: 'Apply the point-slope form y - y₁ = m(x - x₁).',
          strategy: 'Substitute (x₁, y₁) = (-5, 3) and m = 4 into y - y₁ = m(x - x₁).',
          steps: [
            {
              title: 'Substitute point and slope',
              math: 'y - 3 = 4[x - (-5)]',
              explanation: 'Use point-slope form with x₁ = -5, y₁ = 3, m = 4.',
            },
            {
              title: 'Expand and simplify',
              math: 'y - 3 = 4x + 20 ⇒ y = 4x + 23',
              explanation: 'Add 3 to both sides to express in slope-intercept form.',
            },
          ],
          answer: 'y = 4x + 23',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = 4x + 23',
        curves: [{ kind: 'linear', m: 4, c: 23, label: 'L (slope = 4)', color: '#0284c7' }],
        points: [
          { x: -5, y: 3, label: '(-5, 3)', color: '#10b981' },
          { x: 0, y: 23, label: '(0, 23)', color: '#f59e0b' },
        ],
        xRange: [-8, 3],
        yRange: [-5, 26],
      },
    },
    {
      id: 'ex31-2',
      exerciseId: 'ex3_1',
      number: 'Q2',
      page: '3.18',
      level: 'Level 1',
      topic: 'Two-Point Form (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: L passes through (-1, 1) and (3, 9).',
      parts: [
        {
          label: 'Main',
          prompt: 'Use the two-point form.',
          strategy: 'Compute the slope m first, then apply point-slope form.',
          steps: [
            {
              title: 'Calculate the slope',
              math: 'm = (9 - 1) / (3 - (-1)) = 8 / 4 = 2',
              explanation: 'Use m = (y₂ - y₁)/(x₂ - x₁).',
            },
            {
              title: 'Apply point-slope form',
              math: 'y - 1 = 2(x + 1) ⇒ y = 2x + 3',
              explanation: 'Substitute (-1, 1) and m = 2, then simplify.',
            },
          ],
          answer: 'y = 2x + 3',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = 2x + 3',
        curves: [{ kind: 'linear', m: 2, c: 3, label: 'L: y = 2x + 3', color: '#0284c7' }],
        points: [
          { x: -1, y: 1, label: '(-1, 1)', color: '#10b981' },
          { x: 3, y: 9, label: '(3, 9)', color: '#8b5cf6' },
        ],
        xRange: [-4, 5],
        yRange: [-3, 12],
      },
    },
    {
      id: 'ex31-3',
      exerciseId: 'ex3_1',
      number: 'Q3',
      page: '3.18',
      level: 'Level 1',
      topic: 'Intercept Form (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: the x-intercept is 35 and the y-intercept is -28.',
      parts: [
        {
          label: 'Main',
          prompt: 'Apply the intercept form x/a + y/b = 1.',
          strategy: 'Substitute a = 35 and b = -28, then make y the subject.',
          steps: [
            {
              title: 'Substitute intercepts into intercept form',
              math: 'x/35 + y/(-28) = 1',
              explanation: 'Here x-intercept a = 35 and y-intercept b = -28.',
            },
            {
              title: 'Solve for y',
              math: 'y/(-28) = 1 - x/35 ⇒ y = (4/5)x - 28',
              explanation: 'Multiply both sides by -28 and simplify 28/35 = 4/5.',
            },
          ],
          answer: 'y = (4/5)x - 28',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = (4/5)x - 28',
        curves: [{ kind: 'linear', m: 0.8, c: -28, label: 'L', color: '#0284c7' }],
        points: [
          { x: 35, y: 0, label: '(35, 0)', color: '#10b981' },
          { x: 0, y: -28, label: '(0, -28)', color: '#f59e0b' },
        ],
        xRange: [-10, 45],
        yRange: [-35, 10],
      },
    },
    {
      id: 'ex31-4',
      exerciseId: 'ex3_1',
      number: 'Q4',
      page: '3.18',
      level: 'Level 1',
      topic: 'Intercept Form (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: L passes through (0, 15) and cuts the x-axis at 5.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the equation using intercepts a = 5, b = 15.',
          strategy: 'Use x/5 + y/15 = 1 or compute slope = (0 - 15)/(5 - 0) = -3.',
          steps: [
            {
              title: 'Apply intercept form',
              math: 'x/5 + y/15 = 1',
              explanation: 'The x-intercept is 5 and the y-intercept is 15.',
            },
            {
              title: 'Express in slope-intercept form',
              math: '3x + y = 15 ⇒ y = -3x + 15',
              explanation: 'Multiply by 15 and rearrange.',
            },
          ],
          answer: 'y = -3x + 15',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = -3x + 15',
        curves: [{ kind: 'linear', m: -3, c: 15, label: 'L', color: '#0284c7' }],
        points: [
          { x: 0, y: 15, label: '(0, 15)', color: '#10b981' },
          { x: 5, y: 0, label: '(5, 0)', color: '#f59e0b' },
        ],
        xRange: [-3, 8],
        yRange: [-5, 18],
      },
    },
    {
      id: 'ex31-5',
      exerciseId: 'ex3_1',
      number: 'Q5',
      page: '3.18',
      level: 'Level 1',
      topic: 'Slope-Intercept Form (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: slope = 5/6 and y-intercept = -14.',
      parts: [
        {
          label: 'Main',
          prompt: 'Apply y = mx + c directly.',
          strategy: 'Substitute m = 5/6 and c = -14 into y = mx + c.',
          steps: [
            {
              title: 'Substitute slope and y-intercept',
              math: 'y = (5/6)x + (-14) ⇒ y = (5/6)x - 14',
              explanation: 'Direct substitution into slope-intercept form.',
            },
          ],
          answer: 'y = (5/6)x - 14',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = (5/6)x - 14',
        curves: [{ kind: 'linear', m: 5 / 6, c: -14, label: 'L (m = 5/6)', color: '#0284c7' }],
        points: [
          { x: 0, y: -14, label: '(0, -14)', color: '#10b981' },
          { x: 16.8, y: 0, label: '(16.8, 0)', color: '#f59e0b' },
        ],
        xRange: [-6, 22],
        yRange: [-20, 6],
      },
    },
    {
      id: 'ex31-6',
      exerciseId: 'ex3_1',
      number: 'Q6',
      page: '3.18',
      level: 'Level 1',
      topic: 'Line Through Origin (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: L passes through the origin O with slope -8/7.',
      parts: [
        {
          label: 'Main',
          prompt: 'Use y = mx for a line through the origin.',
          strategy: 'Since L passes through (0, 0), its y-intercept is c = 0.',
          steps: [
            {
              title: 'Apply y = mx',
              math: 'y = -(8/7)x + 0 ⇒ y = -(8/7)x',
              explanation: 'Substitute m = -8/7 and c = 0.',
            },
          ],
          answer: 'y = -(8/7)x',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = -(8/7)x',
        curves: [{ kind: 'linear', m: -8 / 7, c: 0, label: 'L (m = -8/7)', color: '#0284c7' }],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#10b981' },
          { x: -7, y: 8, label: '(-7, 8)', color: '#8b5cf6' },
        ],
        xRange: [-10, 10],
        yRange: [-10, 10],
      },
    },
    {
      id: 'ex31-7',
      exerciseId: 'ex3_1',
      number: 'Q7',
      page: '3.18',
      level: 'Level 1',
      topic: 'Two-Point Form (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: L cuts the x-axis at -16 and passes through (4, -15).',
      parts: [
        {
          label: 'Main',
          prompt: 'Use two points (-16, 0) and (4, -15).',
          strategy: 'Read the x-intercept as (-16, 0), find the slope, then write the equation.',
          steps: [
            {
              title: 'Find the slope',
              math: 'm = (-15 - 0) / (4 - (-16)) = -15 / 20 = -3/4',
              explanation: 'Compute slope from (-16, 0) to (4, -15).',
            },
            {
              title: 'Use point-slope form',
              math: 'y - 0 = -(3/4)(x + 16) ⇒ y = -(3/4)x - 12',
              explanation: 'Expand to obtain slope-intercept form.',
            },
          ],
          answer: 'y = -(3/4)x - 12',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = -(3/4)x - 12',
        curves: [{ kind: 'linear', m: -0.75, c: -12, label: 'L', color: '#0284c7' }],
        points: [
          { x: -16, y: 0, label: '(-16, 0)', color: '#10b981' },
          { x: 4, y: -15, label: '(4, -15)', color: '#8b5cf6' },
        ],
        xRange: [-20, 8],
        yRange: [-20, 5],
      },
    },
    {
      id: 'ex31-8',
      exerciseId: 'ex3_1',
      number: 'Q8',
      page: '3.18',
      level: 'Level 1',
      topic: 'Horizontal Line (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: L is a horizontal line passing through (7, -6).',
      parts: [
        {
          label: 'Main',
          prompt: 'Write the equation of the horizontal line.',
          strategy: 'Every point on a horizontal line has the same y-coordinate.',
          steps: [
            {
              title: 'Read constant y-coordinate',
              math: 'y = -6',
              explanation: 'Since L is perpendicular to the y-axis and passes through (7, -6), y = -6.',
            },
          ],
          answer: 'y = -6',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Horizontal Line y = -6',
        curves: [{ kind: 'linear', m: 0, c: -6, label: 'L: y = -6', color: '#0284c7' }],
        points: [{ x: 7, y: -6, label: '(7, -6)', color: '#10b981' }],
        xRange: [-2, 10],
        yRange: [-10, 3],
      },
    },
    {
      id: 'ex31-9',
      exerciseId: 'ex3_1',
      number: 'Q9',
      page: '3.18',
      level: 'Level 1',
      topic: 'Vertical Line (Graph)',
      statement: 'Find the equation of the straight line L from the graph given: L passes through (-12, -11) and (-12, -22).',
      parts: [
        {
          label: 'Main',
          prompt: 'Write the equation of the vertical line.',
          strategy: 'Both points share x = -12, so L is a vertical line.',
          steps: [
            {
              title: 'Read constant x-coordinate',
              math: 'x = -12',
              explanation: 'All points on L have x-coordinate -12.',
            },
          ],
          answer: 'x = -12',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Vertical Line x = -12',
        curves: [{ kind: 'vertical', x: -12, label: 'L: x = -12', color: '#0284c7' }],
        points: [
          { x: -12, y: -11, label: '(-12, -11)', color: '#10b981' },
          { x: -12, y: -22, label: '(-12, -22)', color: '#8b5cf6' },
        ],
        xRange: [-18, 4],
        yRange: [-26, 4],
      },
    },
    {
      id: 'ex31-10',
      exerciseId: 'ex3_1',
      number: 'Q10',
      page: '3.19',
      level: 'Level 1',
      topic: 'Point-Slope Form',
      statement: 'Find the equation of the straight line L satisfying: (a) L passes through (1, -3) with slope 2. (b) The slope and the x-intercept of L are -4/3 and -12 respectively.',
      parts: [
        {
          label: '(a)',
          prompt: 'Passes through (1, -3) with slope 2.',
          strategy: 'Use y - y₁ = m(x - x₁).',
          steps: [
            {
              title: 'Apply point-slope form',
              math: 'y - (-3) = 2(x - 1) ⇒ y + 3 = 2x - 2',
              explanation: 'Substitute (1, -3) and m = 2.',
            },
            {
              title: 'Simplify',
              math: 'y = 2x - 5',
              explanation: 'Subtract 3 from both sides.',
            },
          ],
          answer: 'y = 2x - 5',
        },
        {
          label: '(b)',
          prompt: 'Slope = -4/3 and x-intercept = -12.',
          strategy: 'x-intercept -12 means L passes through (-12, 0).',
          steps: [
            {
              title: 'Apply point-slope form at (-12, 0)',
              math: 'y - 0 = -(4/3)[x - (-12)]',
              explanation: 'Substitute x₁ = -12, y₁ = 0, and m = -4/3.',
            },
            {
              title: 'Expand',
              math: 'y = -(4/3)x - 16',
              explanation: 'Note that -(4/3)(12) = -16.',
            },
          ],
          answer: 'y = -(4/3)x - 16',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Lines in Q10(a) & (b)',
        curves: [
          { kind: 'linear', m: 2, c: -5, label: '(a) y = 2x - 5', color: '#0284c7' },
          { kind: 'linear', m: -4 / 3, c: -16, label: '(b) y = -(4/3)x - 16', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 1, y: -3, label: '(1, -3)', color: '#10b981' },
          { x: -12, y: 0, label: '(-12, 0)', color: '#f59e0b' },
        ],
        xRange: [-15, 6],
        yRange: [-20, 6],
      },
    },
    {
      id: 'ex31-11',
      exerciseId: 'ex3_1',
      number: 'Q11',
      page: '3.19',
      level: 'Level 1',
      topic: 'Two-Point Form',
      statement: 'Find the equation of the straight line L satisfying: (a) L passes through (11, 0) and (-5, 16). (b) The points P(-2, 10) and Q(16, 1) lie on L.',
      parts: [
        {
          label: '(a)',
          prompt: 'Line through (11, 0) and (-5, 16).',
          strategy: 'Compute slope m first, then use (11, 0).',
          steps: [
            {
              title: 'Find slope',
              math: 'm = (16 - 0) / (-5 - 11) = 16 / (-16) = -1',
              explanation: 'Slope between the two given points is -1.',
            },
            {
              title: 'Form equation',
              math: 'y - 0 = -1(x - 11) ⇒ y = -x + 11',
              explanation: 'Expand using point (11, 0).',
            },
          ],
          answer: 'y = -x + 11',
        },
        {
          label: '(b)',
          prompt: 'Line through P(-2, 10) and Q(16, 1).',
          strategy: 'Find slope of PQ, then apply point-slope form.',
          steps: [
            {
              title: 'Find slope of PQ',
              math: 'm = (1 - 10) / (16 - (-2)) = -9 / 18 = -1/2',
              explanation: 'Simplify -9/18 to -1/2.',
            },
            {
              title: 'Form equation using P(-2, 10)',
              math: 'y - 10 = -(1/2)(x + 2) ⇒ y = -(1/2)x + 9',
              explanation: 'Add 10 to both sides.',
            },
          ],
          answer: 'y = -(1/2)x + 9',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Two-Point Lines in Q11',
        curves: [
          { kind: 'linear', m: -1, c: 11, label: '(a) y = -x + 11', color: '#0284c7' },
          { kind: 'linear', m: -0.5, c: 9, label: '(b) y = -(1/2)x + 9', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 11, y: 0, label: '(11, 0)', color: '#10b981' },
          { x: -2, y: 10, label: 'P(-2, 10)', color: '#f59e0b' },
          { x: 16, y: 1, label: 'Q(16, 1)', color: '#f59e0b' },
        ],
        xRange: [-8, 20],
        yRange: [-4, 18],
      },
    },
    {
      id: 'ex31-12',
      exerciseId: 'ex3_1',
      number: 'Q12',
      page: '3.19',
      level: 'Level 1',
      topic: 'Intercept Form',
      statement: 'Find the equation of the straight line L satisfying: (a) The x-intercept and the y-intercept of L are 8 and -12 respectively. (b) L cuts the y-axis and the x-axis at (0, -49) and (-35, 0) respectively.',
      parts: [
        {
          label: '(a)',
          prompt: 'x-intercept = 8, y-intercept = -12.',
          strategy: 'Use x/a + y/b = 1 with a = 8, b = -12.',
          steps: [
            {
              title: 'Substitute into intercept form',
              math: 'x/8 + y/(-12) = 1',
              explanation: 'Place x-intercept under x and y-intercept under y.',
            },
            {
              title: 'Solve for y',
              math: 'y = -12(1 - x/8) ⇒ y = (3/2)x - 12',
              explanation: 'Multiply both sides by -12.',
            },
          ],
          answer: 'y = (3/2)x - 12',
        },
        {
          label: '(b)',
          prompt: 'Cuts y-axis at (0, -49) and x-axis at (-35, 0).',
          strategy: 'Use a = -35 and b = -49 in intercept form.',
          steps: [
            {
              title: 'Substitute into intercept form',
              math: 'x/(-35) + y/(-49) = 1',
              explanation: 'Notice x-intercept = -35 and y-intercept = -49.',
            },
            {
              title: 'Solve for y',
              math: 'y/(-49) = 1 + x/35 ⇒ y = -(7/5)x - 49',
              explanation: 'Multiply by -49 and reduce 49/35 = 7/5.',
            },
          ],
          answer: 'y = -(7/5)x - 49',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Intercept Form Lines in Q12',
        curves: [
          { kind: 'linear', m: 1.5, c: -12, label: '(a) y = (3/2)x - 12', color: '#0284c7' },
          { kind: 'linear', m: -1.4, c: -49, label: '(b) y = -(7/5)x - 49', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 8, y: 0, label: '(8, 0)', color: '#10b981' },
          { x: 0, y: -12, label: '(0, -12)', color: '#10b981' },
        ],
        xRange: [-40, 15],
        yRange: [-55, 10],
      },
    },
    {
      id: 'ex31-13',
      exerciseId: 'ex3_1',
      number: 'Q13',
      page: '3.19',
      level: 'Level 1',
      topic: 'Slope-Intercept Form',
      statement: 'Find the equation of the straight line L satisfying: (a) The slope and the y-intercept of L are -6 and 14 respectively. (b) L cuts the y-axis at (0, -23) with slope 1/2.',
      parts: [
        {
          label: '(a)',
          prompt: 'Slope = -6, y-intercept = 14.',
          strategy: 'Apply y = mx + c directly.',
          steps: [
            {
              title: 'Substitute m and c',
              math: 'y = -6x + 14',
              explanation: 'Here m = -6 and c = 14.',
            },
          ],
          answer: 'y = -6x + 14',
        },
        {
          label: '(b)',
          prompt: 'Cuts y-axis at (0, -23) with slope 1/2.',
          strategy: 'Read y-intercept c = -23 and apply y = mx + c.',
          steps: [
            {
              title: 'Substitute m = 1/2 and c = -23',
              math: 'y = (1/2)x - 23',
              explanation: 'Point (0, -23) gives c = -23 directly.',
            },
          ],
          answer: 'y = (1/2)x - 23',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Slope-Intercept Lines in Q13',
        curves: [
          { kind: 'linear', m: -6, c: 14, label: '(a) y = -6x + 14', color: '#0284c7' },
          { kind: 'linear', m: 0.5, c: -23, label: '(b) y = (1/2)x - 23', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 0, y: 14, label: '(0, 14)', color: '#10b981' },
          { x: 0, y: -23, label: '(0, -23)', color: '#f59e0b' },
        ],
        xRange: [-6, 12],
        yRange: [-28, 20],
      },
    },
    {
      id: 'ex31-14',
      exerciseId: 'ex3_1',
      number: 'Q14',
      page: '3.19',
      level: 'Level 1',
      topic: 'Lines Passing Through Origin',
      statement: 'Find the equation of the straight line L satisfying: (a) L passes through the origin with slope 3. (b) L passes through the origin and (-6, 2).',
      parts: [
        {
          label: '(a)',
          prompt: 'Origin and slope 3.',
          strategy: 'Use y = mx.',
          steps: [
            {
              title: 'Substitute m = 3 into y = mx',
              math: 'y = 3x',
              explanation: 'A line through the origin has c = 0.',
            },
          ],
          answer: 'y = 3x',
        },
        {
          label: '(b)',
          prompt: 'Origin (0, 0) and (-6, 2).',
          strategy: 'Find slope m = (2 - 0)/(-6 - 0) and substitute into y = mx.',
          steps: [
            {
              title: 'Find slope and write y = mx',
              math: 'm = (2 - 0) / (-6 - 0) = -1/3 ⇒ y = -(1/3)x',
              explanation: 'Since L passes through (0, 0), c = 0.',
            },
          ],
          answer: 'y = -(1/3)x',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Lines Through Origin in Q14',
        curves: [
          { kind: 'linear', m: 3, c: 0, label: '(a) y = 3x', color: '#0284c7' },
          { kind: 'linear', m: -1 / 3, c: 0, label: '(b) y = -(1/3)x', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#10b981' },
          { x: -6, y: 2, label: '(-6, 2)', color: '#f59e0b' },
        ],
        xRange: [-8, 6],
        yRange: [-8, 8],
      },
    },
    {
      id: 'ex31-15',
      exerciseId: 'ex3_1',
      number: 'Q15',
      page: '3.19',
      level: 'Level 1',
      topic: 'Vertical Lines',
      statement: 'Find the equation of the straight line L satisfying: (a) L is a vertical line passing through (10, 6). (b) The x-intercept of L is -6 and L is perpendicular to the x-axis.',
      parts: [
        {
          label: '(a)',
          prompt: 'Vertical line through (10, 6).',
          strategy: 'Vertical lines have equation x = h.',
          steps: [
            {
              title: 'Write x = h',
              math: 'x = 10',
              explanation: 'Every point on this vertical line has x-coordinate 10.',
            },
          ],
          answer: 'x = 10',
        },
        {
          label: '(b)',
          prompt: 'Perpendicular to x-axis with x-intercept -6.',
          strategy: 'A line perpendicular to the x-axis is vertical.',
          steps: [
            {
              title: 'Write x = h',
              math: 'x = -6',
              explanation: 'It passes through (-6, 0) vertically, so x = -6.',
            },
          ],
          answer: 'x = -6',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Vertical Lines in Q15',
        curves: [
          { kind: 'vertical', x: 10, label: '(a) x = 10', color: '#0284c7' },
          { kind: 'vertical', x: -6, label: '(b) x = -6', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 10, y: 6, label: '(10, 6)', color: '#10b981' },
          { x: -6, y: 0, label: '(-6, 0)', color: '#f59e0b' },
        ],
        xRange: [-10, 14],
        yRange: [-6, 10],
      },
    },
    {
      id: 'ex31-16',
      exerciseId: 'ex3_1',
      number: 'Q16',
      page: '3.19',
      level: 'Level 1',
      topic: 'Horizontal Lines',
      statement: 'Find the equation of the straight line L satisfying: (a) L passes through (7, -12) and (-7, -12). (b) L cuts the y-axis at (0, 99) and is parallel to the x-axis.',
      parts: [
        {
          label: '(a)',
          prompt: 'Passes through (7, -12) and (-7, -12).',
          strategy: 'Both points have y = -12, so L is horizontal.',
          steps: [
            {
              title: 'Identify horizontal line',
              math: 'y = -12',
              explanation: 'Equal y-coordinates mean slope = 0 and equation y = -12.',
            },
          ],
          answer: 'y = -12',
        },
        {
          label: '(b)',
          prompt: 'Cuts y-axis at (0, 99) and parallel to x-axis.',
          strategy: 'Parallel to the x-axis means horizontal line y = k.',
          steps: [
            {
              title: 'Write y = k',
              math: 'y = 99',
              explanation: 'All points on L have y-coordinate 99.',
            },
          ],
          answer: 'y = 99',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Horizontal Line y = -12',
        curves: [{ kind: 'linear', m: 0, c: -12, label: '(a) y = -12', color: '#0284c7' }],
        points: [
          { x: 7, y: -12, label: '(7, -12)', color: '#10b981' },
          { x: -7, y: -12, label: '(-7, -12)', color: '#10b981' },
        ],
        xRange: [-12, 12],
        yRange: [-18, 6],
        note: 'Part (b) is the horizontal line y = 99 (above the viewing window).',
      },
    },
    {
      id: 'ex31-17',
      exerciseId: 'ex3_1',
      number: 'Q17',
      page: '3.19',
      level: 'Level 1',
      topic: 'Perpendicular Vertical & Horizontal Lines',
      statement: 'In the figure, L₁ is a vertical line and L₂ is perpendicular to L₁. If L₁ and L₂ intersect at (-11, 15), find the equations of L₁ and L₂.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the equations of L₁ and L₂.',
          strategy: 'A line perpendicular to a vertical line is horizontal. Both pass through (-11, 15).',
          steps: [
            {
              title: 'Find L₁ (vertical)',
              math: 'L₁: x = -11',
              explanation: 'L₁ is vertical and passes through (-11, 15).',
            },
            {
              title: 'Find L₂ (horizontal)',
              math: 'L₂ ⊥ L₁ ⇒ L₂ is horizontal ⇒ L₂: y = 15',
              explanation: 'L₂ is horizontal and passes through (-11, 15).',
            },
          ],
          answer: 'L₁: x = -11, L₂: y = 15',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: x = -11 and L₂: y = 15',
        curves: [
          { kind: 'vertical', x: -11, label: 'L₁: x = -11', color: '#0284c7' },
          { kind: 'linear', m: 0, c: 15, label: 'L₂: y = 15', color: '#9333ea' },
        ],
        points: [{ x: -11, y: 15, label: '(-11, 15)', color: '#10b981' }],
        xRange: [-18, 6],
        yRange: [-4, 22],
      },
    },
    {
      id: 'ex31-18',
      exerciseId: 'ex3_1',
      number: 'Q18',
      page: '3.19',
      level: 'Level 1',
      topic: 'Slope & x-intercept to y-intercept',
      statement: 'It is given that the slope and the x-intercept of the straight line L are -3 and 6 respectively. (a) Find the equation of L. (b) Find the y-intercept of L.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L.',
          strategy: 'Use point-slope form with (6, 0) and m = -3.',
          steps: [
            {
              title: 'Apply point-slope form',
              math: 'y - 0 = -3(x - 6) ⇒ y = -3x + 18',
              explanation: 'x-intercept = 6 means the line passes through (6, 0).',
            },
          ],
          answer: 'y = -3x + 18',
        },
        {
          label: '(b)',
          prompt: 'Find the y-intercept of L.',
          strategy: 'Read constant c from y = -3x + 18 (or put x = 0).',
          steps: [
            {
              title: 'Put x = 0',
              math: 'y = -3(0) + 18 = 18',
              explanation: 'Thus the y-intercept of L is 18.',
            },
          ],
          answer: '18',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L: y = -3x + 18',
        curves: [{ kind: 'linear', m: -3, c: 18, label: 'L: y = -3x + 18', color: '#0284c7' }],
        points: [
          { x: 6, y: 0, label: '(6, 0)', color: '#10b981' },
          { x: 0, y: 18, label: '(0, 18)', color: '#f59e0b' },
        ],
        xRange: [-3, 9],
        yRange: [-4, 22],
      },
    },
    {
      id: 'ex31-19',
      exerciseId: 'ex3_1',
      number: 'Q19',
      page: '3.20',
      level: 'Level 1',
      topic: 'Two-Point Form & Vertical Line',
      statement: 'It is given that the straight line L₁ passes through (10, -2) and (-5, -8). (a) Find the equation of L₁. (b) Suppose that L₂ is a vertical line and cuts L₁ at a point on the x-axis. Find the equation of L₂.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L₁.',
          strategy: 'Calculate the slope between (10, -2) and (-5, -8), then apply point-slope form.',
          steps: [
            {
              title: 'Find slope of L₁',
              math: 'm = (-8 - (-2)) / (-5 - 10) = -6 / (-15) = 2/5',
              explanation: 'Reduce -6/(-15) to 2/5.',
            },
            {
              title: 'Apply point-slope form',
              math: 'y - (-2) = (2/5)(x - 10) ⇒ y + 2 = (2/5)x - 4 ⇒ y = (2/5)x - 6',
              explanation: 'Simplify to slope-intercept form.',
            },
          ],
          answer: 'y = (2/5)x - 6',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of vertical line L₂ cutting L₁ on the x-axis.',
          strategy: 'Find the x-intercept of L₁ by putting y = 0.',
          steps: [
            {
              title: 'Find x-intercept of L₁',
              math: '0 = (2/5)x - 6 ⇒ (2/5)x = 6 ⇒ x = 15',
              explanation: 'L₁ cuts the x-axis at (15, 0).',
            },
            {
              title: 'Write vertical line L₂',
              math: 'L₂: x = 15',
              explanation: 'Since L₂ is vertical and passes through (15, 0), its equation is x = 15.',
            },
          ],
          answer: 'x = 15',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: y = (2/5)x - 6 and L₂: x = 15',
        curves: [
          { kind: 'linear', m: 0.4, c: -6, label: 'L₁', color: '#0284c7' },
          { kind: 'vertical', x: 15, label: 'L₂: x = 15', color: '#e11d48', dashed: true },
        ],
        points: [
          { x: 10, y: -2, label: '(10, -2)', color: '#10b981' },
          { x: -5, y: -8, label: '(-5, -8)', color: '#10b981' },
          { x: 15, y: 0, label: '(15, 0)', color: '#f59e0b' },
        ],
        xRange: [-8, 20],
        yRange: [-12, 6],
      },
    },
    {
      id: 'ex31-20',
      exerciseId: 'ex3_1',
      number: 'Q20',
      page: '3.20',
      level: 'Level 1',
      topic: 'Slope-Intercept Form & x-intercept Length',
      statement: 'In the figure, the equation of the straight line L₁ is y = -12. L₁ and another straight line L₂ intersect at a point on the y-axis. It is given that the slope of L₂ is -3/4. (a) Find the equation of L₂. (b) If L₂ cuts the x-axis at the point B, find the length of OB.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L₂.',
          strategy: 'L₁ and L₂ share the same y-intercept -12.',
          steps: [
            {
              title: 'Identify y-intercept of L₂',
              math: 'y-intercept = -12, m = -3/4',
              explanation: 'L₁: y = -12 meets the y-axis at (0, -12), so L₂ also passes through (0, -12).',
            },
            {
              title: 'Write slope-intercept form',
              math: 'y = -(3/4)x - 12',
              explanation: 'Substitute m = -3/4 and c = -12.',
            },
          ],
          answer: 'y = -(3/4)x - 12',
        },
        {
          label: '(b)',
          prompt: 'Find the length of OB.',
          strategy: 'Put y = 0 into L₂ to find B, then take the positive distance from O.',
          steps: [
            {
              title: 'Find x-intercept B',
              math: '0 = -(3/4)x - 12 ⇒ (3/4)x = -12 ⇒ x = -16',
              explanation: 'So B is (-16, 0).',
            },
            {
              title: 'Compute length OB',
              math: 'OB = 0 - (-16) = 16 units',
              explanation: 'Distance is positive.',
            },
          ],
          answer: '16 units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: y = -12 and L₂: y = -(3/4)x - 12',
        curves: [
          { kind: 'linear', m: 0, c: -12, label: 'L₁: y = -12', color: '#9333ea' },
          { kind: 'linear', m: -0.75, c: -12, label: 'L₂', color: '#0284c7' },
        ],
        points: [
          { x: 0, y: -12, label: '(0, -12)', color: '#10b981' },
          { x: -16, y: 0, label: 'B(-16, 0)', color: '#f59e0b' },
        ],
        xRange: [-20, 6],
        yRange: [-16, 4],
      },
    },
    {
      id: 'ex31-21',
      exerciseId: 'ex3_1',
      number: 'Q21',
      page: '3.20',
      level: 'Level 1',
      topic: 'Rotation About Origin & Line Equation',
      statement: 'In a rectangular coordinate plane, the coordinates of A are (18, -12). A is rotated clockwise about the origin O through 180° to B. (a) Find the coordinates of B. (b) Find the equation of the straight line passing through A and B.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the coordinates of B after 180° rotation about O.',
          strategy: 'Rotating (x, y) through 180° about the origin maps it to (-x, -y).',
          steps: [
            {
              title: 'Apply 180° rotation rule',
              math: '(18, -12) → (-18, 12)',
              explanation: 'Negate both coordinates.',
            },
          ],
          answer: '(-18, 12)',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of straight line AB.',
          strategy: 'Since B is the 180° rotation of A about O, line AB passes through the origin O(0, 0).',
          steps: [
            {
              title: 'Find slope of AB',
              math: 'm = (12 - (-12)) / (-18 - 18) = 24 / (-36) = -2/3',
              explanation: 'Slope of AB equals slope of OA = -12/18 = -2/3.',
            },
            {
              title: 'Write equation through origin',
              math: 'y = -(2/3)x',
              explanation: 'Check: y = -(2/3)(18) = -12, confirming c = 0.',
            },
          ],
          answer: 'y = -(2/3)x',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Line AB: y = -(2/3)x',
        curves: [{ kind: 'linear', m: -2 / 3, c: 0, label: 'AB: y = -(2/3)x', color: '#0284c7' }],
        points: [
          { x: 18, y: -12, label: 'A(18, -12)', color: '#10b981' },
          { x: -18, y: 12, label: 'B(-18, 12)', color: '#8b5cf6' },
          { x: 0, y: 0, label: 'O(0, 0)', color: '#f59e0b' },
        ],
        xRange: [-22, 22],
        yRange: [-16, 16],
      },
    },
    {
      id: 'ex31-22',
      exerciseId: 'ex3_1',
      number: 'Q22',
      page: '3.20',
      level: 'Level 2',
      topic: 'Point-Slope Form & Triangle Area',
      statement: 'The slope of the straight line L is 3 and L passes through the point A(10, -12). (a) Find the equation of L. (b) If L cuts the x-axis at the point B, find the area of △OAB, where O is the origin.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L.',
          strategy: 'Apply point-slope form with A(10, -12) and m = 3.',
          steps: [
            {
              title: 'Apply point-slope form',
              math: 'y - (-12) = 3(x - 10) ⇒ y + 12 = 3x - 30 ⇒ y = 3x - 42',
              explanation: 'Simplify to slope-intercept form.',
            },
          ],
          answer: 'y = 3x - 42',
        },
        {
          label: '(b)',
          prompt: 'Find the area of △OAB.',
          strategy: 'Find x-intercept B on the x-axis (base OB), and use |y-coordinate of A| as height.',
          steps: [
            {
              title: 'Find coordinates of B (put y = 0)',
              math: '0 = 3x - 42 ⇒ x = 14 ⇒ B = (14, 0)',
              explanation: 'So base OB = 14 units along the x-axis.',
            },
            {
              title: 'Compute area of △OAB',
              math: 'Area = (1/2) × 14 × |-12| = (1/2) × 14 × 12 = 84 sq. units',
              explanation: 'Perpendicular height from A(10, -12) to the x-axis is 12 units.',
            },
          ],
          answer: '84 sq. units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: '△OAB with L: y = 3x - 42',
        curves: [{ kind: 'linear', m: 3, c: -42, label: 'L: y = 3x - 42', color: '#0284c7' }],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#64748b' },
          { x: 10, y: -12, label: 'A(10, -12)', color: '#10b981' },
          { x: 14, y: 0, label: 'B(14, 0)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: 0, y: 0 },
              { x: 14, y: 0 },
              { x: 10, y: -12 },
            ],
            fill: 'rgba(14, 165, 233, 0.2)',
            stroke: '#0ea5e9',
            label: 'Area = 84',
          },
        ],
        xRange: [-2, 18],
        yRange: [-18, 6],
      },
    },
    {
      id: 'ex31-23',
      exerciseId: 'ex3_1',
      number: 'Q23',
      page: '3.20',
      level: 'Level 2',
      topic: 'Rectangle Vertices & Diagonal Line',
      statement: 'In the figure, A(-4, 0), B, C(10, -7) and D are the vertices of a rectangle, where B is vertically below A. (a) Find the coordinates of B and D. (b) Find the equation of the straight line passing through B and D.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find B and D.',
          strategy: 'Sides of the axis-aligned rectangle share x- and y-coordinates with A(-4, 0) and C(10, -7).',
          steps: [
            {
              title: 'Read coordinates from horizontal/vertical sides',
              math: 'B = (-4, -7), D = (10, 0)',
              explanation: 'B has x of A and y of C; D has x of C and y of A.',
            },
          ],
          answer: 'B: (-4, -7), D: (10, 0)',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of line BD.',
          strategy: 'Use two-point form on B(-4, -7) and D(10, 0).',
          steps: [
            {
              title: 'Find slope of BD',
              math: 'm = (0 - (-7)) / (10 - (-4)) = 7 / 14 = 1/2',
              explanation: 'Simplify 7/14 = 1/2.',
            },
            {
              title: 'Apply point-slope form at D(10, 0)',
              math: 'y - 0 = (1/2)(x - 10) ⇒ y = (1/2)x - 5',
              explanation: 'Expand to slope-intercept form.',
            },
          ],
          answer: 'y = (1/2)x - 5',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Rectangle ABCD & Diagonal BD',
        curves: [{ kind: 'linear', m: 0.5, c: -5, label: 'BD: y = (1/2)x - 5', color: '#e11d48' }],
        points: [
          { x: -4, y: 0, label: 'A(-4, 0)', color: '#0284c7' },
          { x: -4, y: -7, label: 'B(-4, -7)', color: '#10b981' },
          { x: 10, y: -7, label: 'C(10, -7)', color: '#0284c7' },
          { x: 10, y: 0, label: 'D(10, 0)', color: '#10b981' },
        ],
        polygons: [
          {
            points: [
              { x: -4, y: 0 },
              { x: -4, y: -7 },
              { x: 10, y: -7 },
              { x: 10, y: 0 },
            ],
            fill: 'rgba(14, 165, 233, 0.14)',
            stroke: '#0284c7',
          },
        ],
        xRange: [-7, 13],
        yRange: [-10, 4],
      },
    },
    {
      id: 'ex31-24',
      exerciseId: 'ex3_1',
      number: 'Q24',
      page: '3.20',
      level: 'Level 2',
      topic: 'Collinear Points & Vertical Line',
      statement: 'A(k, 10), B(10, 0) and C(13, -2) are three points in the rectangular coordinate plane. It is given that A, B and C are collinear. (a) Find k. (b) Find the equation of the straight line passing through A with x-intercept -5.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k using collinearity.',
          strategy: 'Equate slope of AB to slope of BC.',
          steps: [
            {
              title: 'Equate slopes',
              math: '(0 - 10) / (10 - k) = (-2 - 0) / (13 - 10) = -2/3',
              explanation: 'Collinear points lie on the same straight line.',
            },
            {
              title: 'Solve for k',
              math: '-30 = -2(10 - k) ⇒ 15 = 10 - k ⇒ k = -5',
              explanation: 'So A is (-5, 10).',
            },
          ],
          answer: '-5',
        },
        {
          label: '(b)',
          prompt: 'Find the line through A(-5, 10) with x-intercept -5.',
          strategy: 'The line passes through (-5, 10) and (-5, 0), which share the same x-coordinate!',
          steps: [
            {
              title: 'Recognize vertical line',
              math: 'x₁ = x₂ = -5 ⇒ x = -5',
              explanation: 'Both A(-5, 10) and (-5, 0) lie on the vertical line x = -5.',
            },
          ],
          answer: 'x = -5',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Collinear A, B, C & Vertical Line x = -5',
        curves: [
          { kind: 'linear', m: -2 / 3, c: 20 / 3, label: 'Line ABC', color: '#0284c7' },
          { kind: 'vertical', x: -5, label: 'x = -5', color: '#e11d48', dashed: true },
        ],
        points: [
          { x: -5, y: 10, label: 'A(-5, 10)', color: '#10b981' },
          { x: 10, y: 0, label: 'B(10, 0)', color: '#8b5cf6' },
          { x: 13, y: -2, label: 'C(13, -2)', color: '#f59e0b' },
        ],
        xRange: [-10, 16],
        yRange: [-5, 14],
      },
    },
    {
      id: 'ex31-25',
      exerciseId: 'ex3_1',
      number: 'Q25',
      page: '3.20',
      level: 'Level 2',
      topic: 'Mid-point & Slope-Intercept Form',
      statement: 'The straight line L passes through the mid-point of the line segment joining A(-5, 9) and B(5, 3). (a) Find the coordinates of the mid-point of AB. (b) It is given that the slope of L is -1/3. Find the equation of L.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the mid-point M of AB.',
          strategy: 'Apply the mid-point formula ((x₁ + x₂)/2, (y₁ + y₂)/2).',
          steps: [
            {
              title: 'Apply mid-point formula',
              math: 'M = ((-5 + 5)/2, (9 + 3)/2) = (0, 6)',
              explanation: 'Average the x- and y-coordinates of A and B.',
            },
          ],
          answer: '(0, 6)',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of L with slope -1/3.',
          strategy: 'M(0, 6) lies on the y-axis, so c = 6.',
          steps: [
            {
              title: 'Use slope-intercept form',
              math: 'y = -(1/3)x + 6',
              explanation: 'Substitute m = -1/3 and y-intercept c = 6.',
            },
          ],
          answer: 'y = -(1/3)x + 6',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Mid-point (0, 6) & L: y = -(1/3)x + 6',
        curves: [{ kind: 'linear', m: -1 / 3, c: 6, label: 'L: y = -(1/3)x + 6', color: '#0284c7' }],
        points: [
          { x: -5, y: 9, label: 'A(-5, 9)', color: '#8b5cf6' },
          { x: 5, y: 3, label: 'B(5, 3)', color: '#8b5cf6' },
          { x: 0, y: 6, label: 'M(0, 6)', color: '#10b981' },
        ],
        xRange: [-8, 12],
        yRange: [-2, 12],
      },
    },
    {
      id: 'ex31-26',
      exerciseId: 'ex3_1',
      number: 'Q26',
      page: '3.21',
      level: 'Level 2',
      topic: 'Intercepts, Mid-point & Line Through Origin',
      statement: 'L₁ is a straight line with slope -1/2, where it cuts the x-axis and the y-axis at the points P and Q respectively. It is given that L₁ passes through the point (-20, 2). (a) Find the coordinates of the mid-point of PQ. (b) Find the equation of another straight line L₂ which passes through the mid-point of PQ and the origin O.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the mid-point of PQ.',
          strategy: 'Find the equation of L₁ first, then its intercepts P and Q, then the mid-point.',
          steps: [
            {
              title: 'Find equation of L₁',
              math: 'y - 2 = -(1/2)(x + 20) ⇒ y = -(1/2)x - 8',
              explanation: 'Use point-slope form with (-20, 2) and m = -1/2.',
            },
            {
              title: 'Find intercepts P and Q, then mid-point',
              math: 'P = (-16, 0), Q = (0, -8) ⇒ Mid-point = ((-16 + 0)/2, (0 - 8)/2) = (-8, -4)',
              explanation: 'Put y = 0 for P and x = 0 for Q.',
            },
          ],
          answer: '(-8, -4)',
        },
        {
          label: '(b)',
          prompt: 'Find L₂ through (-8, -4) and O(0, 0).',
          strategy: 'Find slope m = -4 / (-8) = 1/2 and write y = mx.',
          steps: [
            {
              title: 'Compute slope and write equation',
              math: 'm = (-4 - 0) / (-8 - 0) = 1/2 ⇒ y = (1/2)x',
              explanation: 'L₂ passes through the origin so c = 0.',
            },
          ],
          answer: 'y = (1/2)x',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ and Mid-point Line L₂: y = (1/2)x',
        curves: [
          { kind: 'linear', m: -0.5, c: -8, label: 'L₁: y = -(1/2)x - 8', color: '#0284c7' },
          { kind: 'linear', m: 0.5, c: 0, label: 'L₂: y = (1/2)x', color: '#10b981', dashed: true },
        ],
        points: [
          { x: -16, y: 0, label: 'P(-16, 0)', color: '#f59e0b' },
          { x: 0, y: -8, label: 'Q(0, -8)', color: '#f59e0b' },
          { x: -8, y: -4, label: 'M(-8, -4)', color: '#e11d48' },
        ],
        xRange: [-22, 6],
        yRange: [-12, 6],
      },
    },
    {
      id: 'ex31-27',
      exerciseId: 'ex3_1',
      number: 'Q27',
      page: '3.21',
      level: 'Level 2',
      topic: 'Translation of Points & Line Equation',
      statement: 'In a rectangular coordinate plane, the coordinates of P are (5, 3). P is translated upwards by 3 units to Q. Q is translated leftwards by 15 units to R. (a) Find the coordinates of Q and R. (b) Find the equation of the straight line passing through P and R.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find Q and R.',
          strategy: 'Upwards adds to y; leftwards subtracts from x.',
          steps: [
            {
              title: 'Apply translations',
              math: 'Q = (5, 3 + 3) = (5, 6); R = (5 - 15, 6) = (-10, 6)',
              explanation: 'Move up 3 units, then left 15 units.',
            },
          ],
          answer: 'Q: (5, 6), R: (-10, 6)',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of line PR.',
          strategy: 'Use two-point form on P(5, 3) and R(-10, 6).',
          steps: [
            {
              title: 'Find slope of PR',
              math: 'm = (6 - 3) / (-10 - 5) = 3 / (-15) = -1/5',
              explanation: 'Simplify 3/(-15) to -1/5.',
            },
            {
              title: 'Apply point-slope form',
              math: 'y - 3 = -(1/5)(x - 5) ⇒ y = -(1/5)x + 4',
              explanation: 'Add 3 to both sides.',
            },
          ],
          answer: 'y = -(1/5)x + 4',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Translations P → Q → R & Line PR',
        curves: [{ kind: 'linear', m: -0.2, c: 4, label: 'PR: y = -(1/5)x + 4', color: '#0284c7' }],
        points: [
          { x: 5, y: 3, label: 'P(5, 3)', color: '#10b981' },
          { x: 5, y: 6, label: 'Q(5, 6)', color: '#8b5cf6' },
          { x: -10, y: 6, label: 'R(-10, 6)', color: '#f59e0b' },
        ],
        xRange: [-14, 10],
        yRange: [-2, 10],
      },
    },
    {
      id: 'ex31-28',
      exerciseId: 'ex3_1',
      number: 'Q28',
      page: '3.21',
      level: 'Level 2',
      topic: 'Reflection, Rotation & Line Equation',
      statement: 'In a rectangular coordinate plane, the coordinates of A are (10, 5). A is reflected along the y-axis to B. B is rotated anticlockwise about the origin O through 90° to C. (a) Find the coordinates of B and C. (b) Find the equation of the straight line passing through B and C.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find B and C.',
          strategy: 'Reflection in y-axis: (x, y) → (-x, y). 90° anticlockwise rotation about O: (x, y) → (-y, x).',
          steps: [
            {
              title: 'Apply reflection then rotation',
              math: 'B = (-10, 5); C = (-5, -10)',
              explanation: 'Reflect (10, 5) across y-axis to (-10, 5); rotate 90° anticlockwise to (-5, -10).',
            },
          ],
          answer: 'B: (-10, 5), C: (-5, -10)',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of line BC.',
          strategy: 'Use two-point form on B(-10, 5) and C(-5, -10).',
          steps: [
            {
              title: 'Find slope of BC',
              math: 'm = (-10 - 5) / (-5 - (-10)) = -15 / 5 = -3',
              explanation: 'Slope of BC is -3.',
            },
            {
              title: 'Apply point-slope form',
              math: 'y - 5 = -3(x + 10) ⇒ y = -3x - 25',
              explanation: 'Expand and simplify.',
            },
          ],
          answer: 'y = -3x - 25',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Transformations A → B → C & Line BC',
        curves: [{ kind: 'linear', m: -3, c: -25, label: 'BC: y = -3x - 25', color: '#0284c7' }],
        points: [
          { x: 10, y: 5, label: 'A(10, 5)', color: '#64748b' },
          { x: -10, y: 5, label: 'B(-10, 5)', color: '#10b981' },
          { x: -5, y: -10, label: 'C(-5, -10)', color: '#f59e0b' },
        ],
        xRange: [-14, 14],
        yRange: [-16, 10],
      },
    },
    {
      id: 'ex31-29',
      exerciseId: 'ex3_1',
      number: 'Q29',
      page: '3.21',
      level: 'Level 2',
      topic: 'Distance Formula & Possible Line Equations',
      statement: 'P(2, 6) and Q(k, 6) are two points in the rectangular coordinate plane. It is given that PQ = 5 units. (a) Find k. (b) Find the possible equations of the straight line passing through Q with y-intercept 3.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the two possible values of k.',
          strategy: 'P and Q share y = 6, so |k - 2| = 5.',
          steps: [
            {
              title: 'Use horizontal distance',
              math: '|k - 2| = 5 ⇒ k - 2 = -5 or k - 2 = 5 ⇒ k = -3 or k = 7',
              explanation: 'Q can lie 5 units to the left or right of P.',
            },
          ],
          answer: '-3, 7',
        },
        {
          label: '(b)',
          prompt: 'Find both possible equations through Q with y-intercept 3.',
          strategy: 'For each Q, find the slope from (0, 3) to Q and use y = mx + 3.',
          steps: [
            {
              title: 'Case 1: Q(-3, 6)',
              math: 'm = (6 - 3) / (-3 - 0) = -1 ⇒ y = -x + 3',
              explanation: 'Passes through (-3, 6) and (0, 3).',
            },
            {
              title: 'Case 2: Q(7, 6)',
              math: 'm = (6 - 3) / (7 - 0) = 3/7 ⇒ y = (3/7)x + 3',
              explanation: 'Passes through (7, 6) and (0, 3).',
            },
          ],
          answer: 'y = -x + 3, y = (3/7)x + 3',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Two Possible Lines Through Q',
        curves: [
          { kind: 'linear', m: -1, c: 3, label: 'y = -x + 3', color: '#0284c7' },
          { kind: 'linear', m: 3 / 7, c: 3, label: 'y = (3/7)x + 3', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 2, y: 6, label: 'P(2, 6)', color: '#64748b' },
          { x: -3, y: 6, label: 'Q₁(-3, 6)', color: '#10b981' },
          { x: 7, y: 6, label: 'Q₂(7, 6)', color: '#f59e0b' },
          { x: 0, y: 3, label: '(0, 3)', color: '#e11d48' },
        ],
        xRange: [-6, 10],
        yRange: [-2, 10],
      },
    },
    {
      id: 'ex31-30',
      exerciseId: 'ex3_1',
      number: 'Q30',
      page: '3.21',
      level: 'Level 2',
      topic: 'Equal Distances & Possible Lines',
      statement: 'A(-11, -2), B(-6, 4) and C(0, p) are three points in the rectangular coordinate plane. It is given that AB = BC. (a) Find p. (b) Find the possible equations of the straight line passing through B and C.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find p from AB = BC.',
          strategy: 'Square both sides of AB = BC using the distance formula.',
          steps: [
            {
              title: 'Equate AB² and BC²',
              math: '(-6 + 11)² + (4 + 2)² = (0 + 6)² + (p - 4)² ⇒ 25 + 36 = 36 + (p - 4)²',
              explanation: 'Notice 36 cancels nicely on both sides.',
            },
            {
              title: 'Solve for p',
              math: '(p - 4)² = 25 ⇒ p - 4 = ±5 ⇒ p = -1 or p = 9',
              explanation: 'So C is (0, -1) or (0, 9).',
            },
          ],
          answer: '-1, 9',
        },
        {
          label: '(b)',
          prompt: 'Find both possible equations of line BC.',
          strategy: 'C(0, p) is the y-intercept! Find slope of BC for each p.',
          steps: [
            {
              title: 'For C(0, -1)',
              math: 'm = (-1 - 4) / (0 - (-6)) = -5/6 ⇒ y = -(5/6)x - 1',
              explanation: 'Use slope-intercept form with c = -1.',
            },
            {
              title: 'For C(0, 9)',
              math: 'm = (9 - 4) / (0 - (-6)) = 5/6 ⇒ y = (5/6)x + 9',
              explanation: 'Use slope-intercept form with c = 9.',
            },
          ],
          answer: 'y = -(5/6)x - 1, y = (5/6)x + 9',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Equal Distances AB = BC',
        curves: [
          { kind: 'linear', m: -5 / 6, c: -1, label: 'y = -(5/6)x - 1', color: '#0284c7' },
          { kind: 'linear', m: 5 / 6, c: 9, label: 'y = (5/6)x + 9', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: -11, y: -2, label: 'A(-11, -2)', color: '#64748b' },
          { x: -6, y: 4, label: 'B(-6, 4)', color: '#10b981' },
          { x: 0, y: -1, label: 'C₁(0, -1)', color: '#f59e0b' },
          { x: 0, y: 9, label: 'C₂(0, 9)', color: '#f59e0b' },
        ],
        xRange: [-14, 4],
        yRange: [-5, 12],
      },
    },
    {
      id: 'ex31-31',
      exerciseId: 'ex3_1',
      number: 'Q31',
      page: '3.21',
      level: 'Level 2',
      topic: 'Parallel Lines & Claim Verification',
      statement: 'The y-intercept of the straight line L₁ is 12. It is given that L₁ is parallel to another straight line L₂ with slope -3/4. (a) Find the equation of L₁. (b) Someone claims that the x-intercept of L₁ is -16. Do you agree? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L₁.',
          strategy: 'Parallel lines have equal slopes: m₁ = m₂ = -3/4.',
          steps: [
            {
              title: 'Apply slope-intercept form',
              math: 'L₁ ∥ L₂ ⇒ m₁ = -3/4 ⇒ y = -(3/4)x + 12',
              explanation: 'Use m = -3/4 and y-intercept c = 12.',
            },
          ],
          answer: 'y = -(3/4)x + 12',
        },
        {
          label: '(b)',
          prompt: 'Verify whether x-intercept is -16.',
          strategy: 'Put y = 0 into L₁ and solve for x.',
          steps: [
            {
              title: 'Compute x-intercept of L₁',
              math: '0 = -(3/4)x + 12 ⇒ (3/4)x = 12 ⇒ x = 16',
              explanation: 'The x-intercept is 16, not -16. Therefore, disagree.',
            },
          ],
          answer: 'disagree (x-intercept is 16, not -16)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁: y = -(3/4)x + 12',
        curves: [{ kind: 'linear', m: -0.75, c: 12, label: 'L₁', color: '#0284c7' }],
        points: [
          { x: 0, y: 12, label: '(0, 12)', color: '#10b981' },
          { x: 16, y: 0, label: '(16, 0)', color: '#e11d48' },
        ],
        xRange: [-6, 20],
        yRange: [-4, 16],
      },
    },
    {
      id: 'ex31-32',
      exerciseId: 'ex3_1',
      number: 'Q32',
      page: '3.22',
      level: 'Level 2',
      topic: 'Perpendicular Lines (Graph)',
      statement: 'In the figure, the straight line L₁ passes through the origin O and the point P(6, -4). Another straight line L₂ cuts L₁ at P. (a) Find the slope of L₁. (b) If L₁ and L₂ are perpendicular to each other, find the equation of L₂.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the slope of L₁.',
          strategy: 'Compute slope between O(0, 0) and P(6, -4).',
          steps: [
            {
              title: 'Compute slope of OP',
              math: 'm₁ = (-4 - 0) / (6 - 0) = -2/3',
              explanation: 'Reduce -4/6 to -2/3.',
            },
          ],
          answer: '-2/3',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of L₂ ⊥ L₁ passing through P(6, -4).',
          strategy: 'Use m₁ × m₂ = -1 to get m₂ = 3/2, then apply point-slope form at P(6, -4).',
          steps: [
            {
              title: 'Find slope of L₂',
              math: '(-2/3) × m₂ = -1 ⇒ m₂ = 3/2',
              explanation: 'Perpendicular slopes multiply to -1.',
            },
            {
              title: 'Apply point-slope form at P(6, -4)',
              math: 'y - (-4) = (3/2)(x - 6) ⇒ y + 4 = (3/2)x - 9 ⇒ y = (3/2)x - 13',
              explanation: 'Subtract 4 from both sides.',
            },
          ],
          answer: 'y = (3/2)x - 13',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ ⊥ L₂ at P(6, -4)',
        curves: [
          { kind: 'linear', m: -2 / 3, c: 0, label: 'L₁: y = -(2/3)x', color: '#0284c7' },
          { kind: 'linear', m: 1.5, c: -13, label: 'L₂: y = (3/2)x - 13', color: '#e11d48' },
        ],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#64748b' },
          { x: 6, y: -4, label: 'P(6, -4)', color: '#10b981' },
        ],
        xRange: [-4, 12],
        yRange: [-15, 5],
      },
    },
    {
      id: 'ex31-33',
      exerciseId: 'ex3_1',
      number: 'Q33',
      page: '3.22',
      level: 'Level 2',
      topic: 'Perpendicular Line Sharing y-intercept',
      statement: 'It is given that the x-intercept of the straight line L₁ is 24 and L₁ passes through the point (32, 6). (a) Find the equation of L₁. (b) Find the equation of another straight line L₂, which cuts L₁ at a point on the y-axis and is perpendicular to L₁.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of L₁.',
          strategy: 'Use points (24, 0) and (32, 6).',
          steps: [
            {
              title: 'Find slope of L₁',
              math: 'm₁ = (6 - 0) / (32 - 24) = 6 / 8 = 3/4',
              explanation: 'x-intercept = 24 gives point (24, 0).',
            },
            {
              title: 'Apply point-slope form',
              math: 'y - 0 = (3/4)(x - 24) ⇒ y = (3/4)x - 18',
              explanation: 'The y-intercept of L₁ is -18.',
            },
          ],
          answer: 'y = (3/4)x - 18',
        },
        {
          label: '(b)',
          prompt: 'Find the equation of L₂.',
          strategy: 'L₂ has slope -1/m₁ = -4/3 and shares y-intercept -18.',
          steps: [
            {
              title: 'Find slope and y-intercept of L₂',
              math: 'm₂ = -1 / (3/4) = -4/3; y-intercept = -18',
              explanation: 'L₂ cuts L₁ on the y-axis at (0, -18).',
            },
            {
              title: 'Write equation of L₂',
              math: 'y = -(4/3)x - 18',
              explanation: 'Apply slope-intercept form.',
            },
          ],
          answer: 'y = -(4/3)x - 18',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'L₁ ⊥ L₂ at (0, -18)',
        curves: [
          { kind: 'linear', m: 0.75, c: -18, label: 'L₁: y = (3/4)x - 18', color: '#0284c7' },
          { kind: 'linear', m: -4 / 3, c: -18, label: 'L₂: y = -(4/3)x - 18', color: '#e11d48', dashed: true },
        ],
        points: [
          { x: 24, y: 0, label: '(24, 0)', color: '#10b981' },
          { x: 32, y: 6, label: '(32, 6)', color: '#8b5cf6' },
          { x: 0, y: -18, label: '(0, -18)', color: '#f59e0b' },
        ],
        xRange: [-18, 36],
        yRange: [-22, 10],
      },
    },
    {
      id: 'ex31-34',
      exerciseId: 'ex3_1',
      number: 'Q34',
      page: '3.22',
      level: 'Level 2',
      topic: 'Parallel Lines & Trapezium Area',
      statement: 'The x-intercept and the y-intercept of the straight line L₁ are 12 and -6 respectively. L₂ is another straight line parallel to L₁ and passing through the point (-4, -13). (a) Find the equations of L₁ and L₂. (b) Suppose that L₁ cuts the x-axis and the y-axis at the points A and B, while L₂ cuts the x-axis and the y-axis at the points C and D. Find the area of the trapezium ABDC.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equations of L₁ and L₂.',
          strategy: 'Use intercept form for L₁, then keep the same slope for L₂ through (-4, -13).',
          steps: [
            {
              title: 'Find L₁',
              math: 'x/12 + y/(-6) = 1 ⇒ y = (1/2)x - 6',
              explanation: 'Slope of L₁ is 1/2.',
            },
            {
              title: 'Find L₂ parallel to L₁',
              math: 'y - (-13) = (1/2)(x + 4) ⇒ y + 13 = (1/2)x + 2 ⇒ y = (1/2)x - 11',
              explanation: 'Parallel lines share slope 1/2.',
            },
          ],
          answer: 'L₁: y = (1/2)x - 6, L₂: y = (1/2)x - 11',
        },
        {
          label: '(b)',
          prompt: 'Find the area of trapezium ABDC.',
          strategy: 'Area(ABDC) = Area(△OCD) - Area(△OAB).',
          steps: [
            {
              title: 'Find intercepts A, B, C, D',
              math: 'A(12, 0), B(0, -6); C(22, 0), D(0, -11)',
              explanation: 'For L₂: y = 0 ⇒ x = 22; x = 0 ⇒ y = -11.',
            },
            {
              title: 'Subtract areas of right triangles',
              math: 'Area(ABDC) = (1/2)(22)(11) - (1/2)(12)(6) = 121 - 36 = 85 sq. units',
              explanation: 'Both △OCD and △OAB are right-angled at the origin O.',
            },
          ],
          answer: '85 sq. units',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Trapezium ABDC (Area = 85)',
        curves: [
          { kind: 'linear', m: 0.5, c: -6, label: 'L₁', color: '#0284c7' },
          { kind: 'linear', m: 0.5, c: -11, label: 'L₂', color: '#9333ea' },
        ],
        points: [
          { x: 12, y: 0, label: 'A(12, 0)', color: '#10b981' },
          { x: 0, y: -6, label: 'B(0, -6)', color: '#10b981' },
          { x: 22, y: 0, label: 'C(22, 0)', color: '#f59e0b' },
          { x: 0, y: -11, label: 'D(0, -11)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: 12, y: 0 },
              { x: 0, y: -6 },
              { x: 0, y: -11 },
              { x: 22, y: 0 },
            ],
            fill: 'rgba(14, 165, 233, 0.22)',
            stroke: '#0ea5e9',
            label: 'Area = 85',
          },
        ],
        xRange: [-6, 26],
        yRange: [-15, 4],
      },
    },
    {
      id: 'ex31-35',
      exerciseId: 'ex3_1',
      number: 'Q35',
      page: '3.22',
      level: 'Level 2',
      topic: 'Perpendicular Bisector & Quadrilateral Area',
      statement: 'A(-22, 24) and B(10, 0) are two points in the rectangular coordinate plane. The straight line L is the perpendicular bisector of AB. (a) Find the equation of L. (b) Suppose that L cuts the x-axis and the y-axis at the points P and Q respectively. Someone claims that the area of the quadrilateral APBQ exceeds 500 sq. units. Is the claim correct? Explain your answer.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find the equation of perpendicular bisector L.',
          strategy: 'Find mid-point M of AB and negative reciprocal of slope AB.',
          steps: [
            {
              title: 'Find mid-point M and slope of AB',
              math: 'M = ((-22 + 10)/2, (24 + 0)/2) = (-6, 12); m_AB = (0 - 24)/(10 + 22) = -3/4',
              explanation: 'L passes through M(-6, 12) and is perpendicular to AB.',
            },
            {
              title: 'Find slope and equation of L',
              math: 'm_L = 4/3 ⇒ y - 12 = (4/3)(x + 6) ⇒ y = (4/3)x + 20',
              explanation: 'Simplify point-slope form.',
            },
          ],
          answer: 'y = (4/3)x + 20',
        },
        {
          label: '(b)',
          prompt: 'Determine if Area(APBQ) > 500 sq. units.',
          strategy: 'Diagonals AB and PQ are perpendicular! Area(APBQ) = (1/2) × AB × PQ.',
          steps: [
            {
              title: 'Find P, Q and diagonal lengths AB, PQ',
              math: 'P = (-15, 0), Q = (0, 20) ⇒ PQ = √(15² + 20²) = 25; AB = √(32² + 24²) = 40',
              explanation: 'Both diagonals have exact integer lengths (3-4-5 triangles).',
            },
            {
              title: 'Compute kite/quadrilateral area',
              math: 'Area(APBQ) = (1/2) × AB × PQ = (1/2) × 40 × 25 = 500 sq. units',
              explanation: '500 does not exceed 500 (500 is not > 500). So the claim is not correct (no).',
            },
          ],
          answer: 'no (Area = 500 sq. units, does not exceed 500)',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Perpendicular Bisector & Kite APBQ',
        curves: [
          { kind: 'linear', m: -0.75, c: 7.5, label: 'AB', color: '#64748b', dashed: true },
          { kind: 'linear', m: 4 / 3, c: 20, label: 'L: y = (4/3)x + 20', color: '#0284c7' },
        ],
        points: [
          { x: -22, y: 24, label: 'A(-22, 24)', color: '#10b981' },
          { x: 10, y: 0, label: 'B(10, 0)', color: '#10b981' },
          { x: -15, y: 0, label: 'P(-15, 0)', color: '#f59e0b' },
          { x: 0, y: 20, label: 'Q(0, 20)', color: '#f59e0b' },
          { x: -6, y: 12, label: 'M(-6, 12)', color: '#e11d48' },
        ],
        polygons: [
          {
            points: [
              { x: -22, y: 24 },
              { x: -15, y: 0 },
              { x: 10, y: 0 },
              { x: 0, y: 20 },
            ],
            fill: 'rgba(14, 165, 233, 0.18)',
            stroke: '#0ea5e9',
            label: 'Area = 500',
          },
        ],
        xRange: [-26, 14],
        yRange: [-4, 28],
      },
    },
    {
      id: 'ex31-36',
      exerciseId: 'ex3_1',
      number: 'Q36',
      page: '3.22',
      level: 'Level 2',
      topic: 'Median of a Triangle',
      examRef: 'HKDSE 2021 P2 Q26',
      statement: 'In a rectangular coordinate plane, the coordinates of the points A, B and C are (-2, 7), (10, 3) and (8, 13) respectively. Let P be a point on AB such that CP is a median of △ABC. Find the equation of the straight line which passes through C and P.',
      parts: [
        {
          label: 'Main',
          prompt: 'Find the equation of median CP.',
          strategy: 'A median joins vertex C to the mid-point P of opposite side AB.',
          steps: [
            {
              title: 'Find mid-point P of AB',
              math: 'P = ((-2 + 10)/2, (7 + 3)/2) = (4, 5)',
              explanation: 'P bisects side AB.',
            },
            {
              title: 'Find slope and equation of CP',
              math: 'm = (13 - 5) / (8 - 4) = 8 / 4 = 2 ⇒ y - 5 = 2(x - 4) ⇒ y = 2x - 3',
              explanation: 'Use point-slope form with P(4, 5) and C(8, 13).',
            },
          ],
          answer: 'y = 2x - 3',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Median CP: y = 2x - 3',
        curves: [{ kind: 'linear', m: 2, c: -3, label: 'Median CP', color: '#e11d48' }],
        points: [
          { x: -2, y: 7, label: 'A(-2, 7)', color: '#0284c7' },
          { x: 10, y: 3, label: 'B(10, 3)', color: '#0284c7' },
          { x: 8, y: 13, label: 'C(8, 13)', color: '#10b981' },
          { x: 4, y: 5, label: 'P(4, 5)', color: '#f59e0b' },
        ],
        polygons: [
          {
            points: [
              { x: -2, y: 7 },
              { x: 10, y: 3 },
              { x: 8, y: 13 },
            ],
            fill: 'rgba(14, 165, 233, 0.16)',
            stroke: '#0284c7',
          },
        ],
        xRange: [-5, 13],
        yRange: [-2, 16],
      },
    },
    {
      id: 'ex31-37',
      exerciseId: 'ex3_1',
      number: 'Q37',
      page: '3.22',
      level: 'Level 2',
      topic: 'Isosceles Triangle & Altitude Equation',
      statement: 'In a rectangular coordinate plane, △OPQ is an isosceles triangle, where OP = PQ and O is the origin. It is given that the coordinates of P and Q are (7, 9) and (k, -2) respectively. (a) Find k. (b) Let R be a point on OQ such that PR is an altitude of △OPQ. Find the possible equations of the straight line which passes through P and R.',
      parts: [
        {
          label: '(a)',
          prompt: 'Find k from OP = PQ.',
          strategy: 'Equate OP² and PQ².',
          steps: [
            {
              title: 'Form quadratic equation from OP² = PQ²',
              math: '7² + 9² = (k - 7)² + (-2 - 9)² ⇒ 49 + 81 = (k - 7)² + 121',
              explanation: 'Note OP² = 130 and (-11)² = 121.',
            },
            {
              title: 'Solve for k',
              math: '(k - 7)² = 9 ⇒ k - 7 = ±3 ⇒ k = 4 or k = 10',
              explanation: 'So Q is (4, -2) or (10, -2).',
            },
          ],
          answer: '4, 10',
        },
        {
          label: '(b)',
          prompt: 'Find possible equations of altitude PR (PR ⊥ OQ).',
          strategy: 'For each Q, compute slope of OQ, take its negative reciprocal for PR, and pass through P(7, 9).',
          steps: [
            {
              title: 'Case 1: Q(4, -2)',
              math: 'm_OQ = -2/4 = -1/2 ⇒ m_PR = 2 ⇒ y - 9 = 2(x - 7) ⇒ y = 2x - 5',
              explanation: 'PR is perpendicular to OQ and passes through P(7, 9).',
            },
            {
              title: 'Case 2: Q(10, -2)',
              math: 'm_OQ = -2/10 = -1/5 ⇒ m_PR = 5 ⇒ y - 9 = 5(x - 7) ⇒ y = 5x - 26',
              explanation: 'Second altitude equation when k = 10.',
            },
          ],
          answer: 'y = 2x - 5, y = 5x - 26',
        },
      ],
      visual: {
        kind: 'coordinate',
        title: 'Altitudes PR for Q(4, -2) & Q(10, -2)',
        curves: [
          { kind: 'linear', m: 2, c: -5, label: 'y = 2x - 5', color: '#0284c7' },
          { kind: 'linear', m: 5, c: -26, label: 'y = 5x - 26', color: '#9333ea', dashed: true },
        ],
        points: [
          { x: 0, y: 0, label: 'O(0, 0)', color: '#64748b' },
          { x: 7, y: 9, label: 'P(7, 9)', color: '#10b981' },
          { x: 4, y: -2, label: 'Q₁(4, -2)', color: '#f59e0b' },
          { x: 10, y: -2, label: 'Q₂(10, -2)', color: '#f59e0b' },
        ],
        xRange: [-2, 13],
        yRange: [-6, 12],
      },
    },
  ],
};
