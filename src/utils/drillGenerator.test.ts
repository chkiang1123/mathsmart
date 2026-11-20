import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { getAllQuestions } from '../data';
import { tokenizeLatexSegments } from './latexFormatter';
import { formatQuestionStatement } from './statementFormatter';
import {
  checkDrillAnswer,
  classifyQuestionArchetype,
  findRelatedTextbookQuestions,
  generateDrillQuestion,
  type DrillArchetype,
} from './drillGenerator';

function assertLatexValid(raw: string, context: string) {
  const segments = tokenizeLatexSegments(raw);
  for (const seg of segments) {
    if (seg.type === 'math') {
      assert.doesNotThrow(
        () => katex.renderToString(seg.value, { throwOnError: true }),
        `KaTeX error in ${context}: "${seg.value}" from "${raw}"`
      );
    }
  }
}

test('all 248 textbook questions classify and generate valid KaTeX drill variations across seeds', () => {
  const all = getAllQuestions();
  assert.equal(all.length, 248);

  const seenArchetypes = new Set<DrillArchetype>();

  for (let i = 0; i < all.length; i++) {
    const q = all[i];
    const arch = classifyQuestionArchetype(q);
    seenArchetypes.add(arch);

    const drill = generateDrillQuestion(q, 1001 + i * 97, 1);
    assert.ok(drill.question.parts.length > 0, `Drill parts missing for ${q.id}`);
    assert.ok(drill.acceptableAnswers.length > 0, `Drill answers missing for ${q.id}`);

    const formatted = formatQuestionStatement(drill.question.statement, drill.question.parts);
    if (formatted.intro) {
      assertLatexValid(formatted.intro, `${drill.id} intro`);
    }
    for (const item of formatted.items) {
      if (item.text) assertLatexValid(item.text, `${drill.id} item ${item.marker}`);
      for (const sub of item.nested ?? []) {
        assertLatexValid(sub.text, `${drill.id} nested ${sub.marker}`);
      }
    }

    for (const part of drill.question.parts) {
      assert.ok(part.steps.length > 0, `Steps missing for ${drill.id} ${part.label}`);
      if (part.prompt) assertLatexValid(part.prompt, `${drill.id} prompt`);
      if (part.strategy) assertLatexValid(part.strategy, `${drill.id} strategy`);
      assertLatexValid(part.answer, `${drill.id} answer`);
      for (const step of part.steps) {
        assertLatexValid(step.title, `${drill.id} step title`);
        assertLatexValid(step.math, `${drill.id} step math`);
        assertLatexValid(step.explanation, `${drill.id} step explanation`);
      }
    }
  }

  assert.equal(seenArchetypes.size, 11, 'All 11 drill archetypes should be represented');
});

test('multiple random seeds produce distinct variations for key archetypes including rev-42', () => {
  const all = getAllQuestions();
  const rev42 = all.find((q) => q.id === 'rev-42');
  assert.ok(rev42);
  assert.equal(classifyQuestionArchetype(rev42), 'unknown-coeff-two-points');

  const d1 = generateDrillQuestion(rev42, 4201, 1);
  const d2 = generateDrillQuestion(rev42, 8999, 2);
  assert.notEqual(d1.question.statement, d2.question.statement);
  assert.equal(d1.question.visual.kind, 'coordinate');
  if (d1.question.visual.kind === 'coordinate') {
    assert.equal(d1.question.visual.curves.length, 2);
  }
});

test('checkDrillAnswer handles exact numbers, inequalities, tuples, and Yes/No', () => {
  assert.equal(checkDrillAnswer('15', ['15']).status, 'correct');
  assert.equal(checkDrillAnswer('k = 4', ['4', 'k=4', 'k = 4']).status, 'correct');
  assert.equal(checkDrillAnswer('k<4', ['k < 4']).status, 'correct');
  assert.equal(checkDrillAnswer('(2,-5)', ['(2, -5)']).status, 'correct');
  assert.equal(checkDrillAnswer('-0.5', ['-1/2']).status, 'correct');
  assert.equal(checkDrillAnswer('YES', ['yes']).status, 'correct');
  assert.equal(checkDrillAnswer('99', ['15']).status, 'incorrect');
  assert.equal(checkDrillAnswer('   ', ['15']).status, 'empty');
});

test('findRelatedTextbookQuestions finds relevant cross-section questions excluding source', () => {
  const all = getAllQuestions();
  const rev42 = all.find((q) => q.id === 'rev-42')!;
  const related = findRelatedTextbookQuestions(rev42, all, 4);
  assert.ok(related.length >= 2 && related.length <= 4);
  assert.ok(related.every((r) => r.id !== 'rev-42'));
});
