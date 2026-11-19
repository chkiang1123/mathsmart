import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { EXERCISE_GROUPS, getAllQuestions } from '../data/index';
import { tokenizeLatexSegments, mathToLatex } from './latexFormatter';

test('mathToLatex converts fractions, square roots, superscripts, and symbols cleanly', () => {
  assert.ok(mathToLatex('x² + 4x + 7').includes('x^{2}'));
  assert.ok(mathToLatex('f(x) = 2x / (x - 3)').includes('\\frac{2x}{x - 3}'));
  assert.ok(mathToLatex('y = ±√(x + 7)').includes('\\pm \\sqrt{x + 7}'));
  assert.ok(mathToLatex('Δ = b² - 4ac ≥ 0').includes('\\Delta'));
  const segs = tokenizeLatexSegments('If f(x) = 3(x + 1)² - 2, find:');
  assert.ok(
    segs.some((s) => s.type === 'math' && s.value.includes('3(x + 1)^{2} - 2')),
    `Expected 3(x + 1)^{2} - 2 in one math segment, got ${JSON.stringify(segs)}`
  );
});

test('every question text, step, answer, option, and section check compiles cleanly with KaTeX', () => {
  const all = getAllQuestions();
  const stringsToVerify: { ctx: string; text: string }[] = [];

  for (const q of all) {
    stringsToVerify.push({ ctx: `${q.id}.statement`, text: q.statement });
    if (q.options) {
      q.options.forEach((o, i) => stringsToVerify.push({ ctx: `${q.id}.opt${i}`, text: o }));
    }
    q.parts.forEach((p, pi) => {
      if (p.prompt) stringsToVerify.push({ ctx: `${q.id}.p${pi}.prompt`, text: p.prompt });
      if (p.strategy) stringsToVerify.push({ ctx: `${q.id}.p${pi}.strategy`, text: p.strategy });
      stringsToVerify.push({ ctx: `${q.id}.p${pi}.answer`, text: p.answer });
      p.steps.forEach((s, si) => {
        stringsToVerify.push({ ctx: `${q.id}.p${pi}.s${si}.math`, text: s.math });
        stringsToVerify.push({ ctx: `${q.id}.p${pi}.s${si}.expl`, text: s.explanation });
      });
    });
  }

  for (const g of EXERCISE_GROUPS) {
    g.sectionCheck?.forEach((sc) => {
      stringsToVerify.push({ ctx: `sc.${sc.id}.stmt`, text: sc.statement });
      stringsToVerify.push({ ctx: `sc.${sc.id}.expl`, text: sc.explanation });
    });
  }

  for (const item of stringsToVerify) {
    const segs = tokenizeLatexSegments(item.text);
    for (const seg of segs) {
      if (seg.type === 'math') {
        assert.doesNotThrow(
          () => katex.renderToString(seg.value, { throwOnError: true, strict: false }),
          `KaTeX failed on ${item.ctx}: "${seg.value}" (from "${item.text}")`
        );
      }
    }
  }
});
