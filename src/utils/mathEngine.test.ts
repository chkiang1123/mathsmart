import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeQuadratic,
  evaluateCurveY,
  evaluateVerticalIntersections,
  formatNum,
  sampleCurvePoints,
} from './mathEngine';
import { evaluateGeometryScenario } from './geometryModels';

test('analyzeQuadratic handles two roots, double root, and no real roots', () => {
  const twoRoots = analyzeQuadratic(1, -2, -1);
  assert.equal(twoRoots.opens, 'upwards');
  assert.equal(twoRoots.rootCount, 2);
  assert.equal(twoRoots.vertex.x, 1);
  assert.equal(twoRoots.vertex.y, -2);

  const doubleRoot = analyzeQuadratic(4, -12, 9);
  assert.equal(doubleRoot.discriminant, 0);
  assert.equal(doubleRoot.rootCount, 1);
  assert.equal(doubleRoot.roots[0], 1.5);

  const noRoots = analyzeQuadratic(-1, 2, -3);
  assert.equal(noRoots.opens, 'downwards');
  assert.equal(noRoots.rootCount, 0);
  assert.equal(noRoots.discriminant, -8);
});

test('evaluateVerticalIntersections distinguishes functions from non-functions', () => {
  const fnPts = evaluateVerticalIntersections({ kind: 'quadratic', a: 1, b: 0, c: 1 }, 2);
  assert.deepEqual(fnPts, [5]);

  const nonFnPts = evaluateVerticalIntersections({ kind: 'relation-y2', m: 1, c: 1 }, 3);
  assert.equal(nonFnPts.length, 2);
  assert.deepEqual(nonFnPts, [-2, 2]);
});

test('rational curve breaks cleanly across asymptote', () => {
  const segments = sampleCurvePoints(
    { kind: 'rational', num: [0, 1, -1], den: [0, 1, 2] },
    -6,
    6,
    -10,
    10
  );
  assert.ok(segments.length >= 2);
  assert.equal(evaluateCurveY({ kind: 'rational', num: [0, 1, -1], den: [0, 1, 2] }, -2), null);
});

test('geometry scenarios match exact textbook optimal values', () => {
  const river = evaluateGeometryScenario('river-fence', 7.5);
  assert.equal(river.optPoint.y, 112.5);

  const wire = evaluateGeometryScenario('wire-squares', 8);
  assert.equal(wire.optPoint.y, 100);
  assert.equal(wire.threshold?.pass, false);

  const apq = evaluateGeometryScenario('square-triangle-apq', 6);
  assert.equal(apq.optPoint.y, 36);

  const gardens = evaluateGeometryScenario('three-gardens', 6);
  assert.equal(gardens.optPoint.y, 504);

  const proj55 = evaluateGeometryScenario('projectile-55', 1.5);
  assert.equal(proj55.optPoint.y, 73.25);
});

test('formatNum strips negative zero cleanly', () => {
  assert.equal(formatNum(-0.00000001), '0');
  assert.equal(formatNum(3.5), '3.5');
});
