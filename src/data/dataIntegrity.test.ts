import test from 'node:test';
import assert from 'node:assert/strict';
import { EXERCISE_GROUPS, getAllQuestions } from './index';
import { evaluateGeometryScenario } from '../utils/geometryModels';
import { evaluateCurveY, analyzeQuadratic } from '../utils/mathEngine';

test('exercise groups match expected structure and question counts', () => {
  const expected: Record<string, number> = {
    ex4_1: 42,
    ex4_2: 18,
    ex4_3: 44,
    ex4_4: 47,
    check_yourself: 10,
    revision: 63,
    mcq: 13,
    exam_zone: 11,
  };

  assert.equal(EXERCISE_GROUPS.length, 8);
  for (const group of EXERCISE_GROUPS) {
    assert.equal(
      group.questions.length,
      expected[group.id],
      `Expected ${expected[group.id]} questions in ${group.id}, got ${group.questions.length}`
    );
  }
  assert.equal(getAllQuestions().length, 248);
});

test('all questions have unique IDs, non-empty parts, steps, answers, and valid visuals', () => {
  const all = getAllQuestions();
  const seenIds = new Set<string>();

  for (const q of all) {
    assert.ok(q.id.length > 0, 'Question id must be non-empty');
    assert.ok(!seenIds.has(q.id), `Duplicate question id: ${q.id}`);
    seenIds.add(q.id);

    assert.ok(q.statement.trim().length > 0, `${q.id} missing statement`);
    assert.ok(q.parts.length >= 1, `${q.id} must have at least 1 part`);

    for (const part of q.parts) {
      assert.ok(part.steps.length >= 1, `${q.id} part ${part.label} must have >= 1 step`);
      assert.ok(part.answer.trim().length > 0, `${q.id} part ${part.label} missing answer`);
      for (const step of part.steps) {
        assert.ok(step.title.trim().length > 0, `${q.id} step missing title`);
        assert.ok(step.math.trim().length > 0, `${q.id} step missing math`);
        assert.ok(step.explanation.trim().length > 0, `${q.id} step missing explanation`);
      }
    }

    if (q.options) {
      assert.equal(q.options.length, 4, `${q.id} MCQ should have 4 options`);
      assert.ok(
        q.correctOption && ['A', 'B', 'C', 'D'].includes(q.correctOption),
        `${q.id} MCQ missing valid correctOption`
      );
    }

    const v = q.visual;
    if (v.kind === 'geometry-lab') {
      const r = evaluateGeometryScenario(v.scenario, v.defaultX);
      assert.ok(Number.isFinite(r.optPoint.x) && Number.isFinite(r.optPoint.y));
      assert.ok(Number.isFinite(r.curveFn(v.defaultX)));
    } else if (v.kind === 'completing-square') {
      assert.ok(Math.abs(v.a) > 1e-9, `${q.id} completing-square a cannot be 0`);
      const analysis = analyzeQuadratic(v.a, v.b, v.c);
      assert.ok(Number.isFinite(analysis.vertex.x) && Number.isFinite(analysis.vertex.y));
    } else if (v.kind === 'function-machine') {
      for (const ep of v.evalPoints) {
        const val = evaluateCurveY(v.curve, ep.x);
        assert.ok(val === null || Number.isFinite(val));
      }
    }
  }
});

test('section checks exist on Ex 4.1 through Ex 4.4 with valid statements', () => {
  const expectedIds = ['ex4_1', 'ex4_2', 'ex4_3', 'ex4_4'];
  for (const id of expectedIds) {
    const group = EXERCISE_GROUPS.find((g) => g.id === id);
    assert.ok(group?.sectionCheck && group.sectionCheck.length >= 4, `${id} missing sectionCheck`);
  }
});
