import test from 'node:test';
import assert from 'node:assert/strict';
import { computeGraphStepHighlights } from './graphStepHighlighter';
import { getAllQuestions } from '../data/index';

test('returns clean neutral state when stepNumber is 0', () => {
  const q = getAllQuestions().find((item) => item.id === 'rev-42')!;
  if (q.visual.kind !== 'coordinate') throw new Error('Expected coordinate');

  const res = computeGraphStepHighlights({
    step: null,
    stepNumber: 0,
    totalSteps: 2,
    curves: q.visual.curves,
    points: q.visual.points ?? [],
    xRange: q.visual.xRange,
    yRange: q.visual.yRange,
  });

  assert.deepEqual(res.activeCurveIndices, [0, 1]);
  assert.deepEqual(res.mutedCurveIndices, []);
  assert.equal(res.highlightVertex, false);
  assert.equal(res.highlightRoots, false);
  assert.equal(res.highlightPointIndices.length, 0);
  assert.equal(res.verticalShiftGuide, undefined);
});

test('highlights vertical shift arrow & G curve on Revision 4 Q42 Part (b)', () => {
  const q = getAllQuestions().find((item) => item.id === 'rev-42')!;
  if (q.visual.kind !== 'coordinate') throw new Error('Expected coordinate');

  const partB = q.parts[1];
  const resStep1 = computeGraphStepHighlights({
    step: partB.steps[0],
    stepNumber: 1,
    totalSteps: partB.steps.length,
    curves: q.visual.curves,
    points: q.visual.points ?? [],
    xRange: q.visual.xRange,
    yRange: q.visual.yRange,
  });

  assert.deepEqual(resStep1.activeCurveIndices, [1]);
  assert.deepEqual(resStep1.mutedCurveIndices, [0]);
  assert.ok(resStep1.verticalShiftGuide, 'Expected vertical shift guide from f(x) to G');
  assert.equal(resStep1.verticalShiftGuide?.label, '-17');
  assert.ok(
    resStep1.highlightPointIndices.length > 0 || resStep1.synthesizedFocusPoints.length > 0,
    'Expected y-intercept focus point on G'
  );
});

test('highlights vertex and axis of symmetry when mentioned in completing-the-square step', () => {
  const res = computeGraphStepHighlights({
    step: {
      title: 'Read vertex & axis of symmetry',
      math: 'Vertex = (3, -8), axis x = 3',
      explanation: 'Minimum value is -8.',
    },
    stepNumber: 2,
    totalSteps: 2,
    curves: [{ kind: 'quadratic', a: 1, b: -6, c: 1 }],
    points: [{ x: 0, y: 1, label: '(0, 1)' }],
    xRange: [-2, 8],
    yRange: [-10, 10],
    showAxisOfSymmetry: 3,
    showVertex: { x: 3, y: -8 },
    showRoots: [3 - Math.sqrt(8), 3 + Math.sqrt(8)],
  });

  assert.equal(res.highlightAxisOfSymmetry, true);
  assert.equal(res.highlightVertex, true);
  assert.equal(res.highlightRoots, false);
});

test('highlights matching existing points or synthesizes focus points from coordinates in step text', () => {
  const res = computeGraphStepHighlights({
    step: {
      title: 'Substitute passing points',
      math: 'Pass through (1, 13) and (-4, -37)',
      explanation: 'Substitute into f(x).',
    },
    stepNumber: 1,
    totalSteps: 2,
    curves: [{ kind: 'quadratic', a: -3, b: 1, c: 15 }],
    points: [{ x: 1, y: 13, label: '(1, 13)' }],
    xRange: [-5, 5],
    yRange: [-42, 20],
  });

  assert.deepEqual(res.highlightPointIndices, [0]);
  assert.equal(res.synthesizedFocusPoints.length, 1);
  assert.equal(res.synthesizedFocusPoints[0].x, -4);
  assert.equal(res.synthesizedFocusPoints[0].y, -37);
});
