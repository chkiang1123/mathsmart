import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { formatQuestionStatement } from './statementFormatter';
import { tokenizeLatexSegments } from './latexFormatter';
import { getAllQuestions } from '../data/index';

test('formats Revision 4 Q42 into intro, (a), (b) and nested (i), (ii)', () => {
  const q = getAllQuestions().find((item) => item.id === 'rev-42')!;
  const res = formatQuestionStatement(q.statement, q.parts);

  assert.equal(
    res.intro,
    'Let f(x) = ax² + x + b passing through (1, 13) and (-4, -37).'
  );
  assert.equal(res.items.length, 2);
  assert.equal(res.items[0].marker, '(a)');
  assert.equal(res.items[0].text, 'Find f(0).');
  assert.equal(res.items[1].marker, '(b)');
  assert.equal(res.items[1].text, 'Let G be y = f(x) - 17. Find:');
  assert.equal(res.items[1].nested?.length, 2);
  assert.equal(res.items[1].nested?.[0].marker, '(i)');
  assert.equal(res.items[1].nested?.[0].text, 'y-intercept of G');
  assert.equal(res.items[1].nested?.[1].marker, '(ii)');
  assert.equal(res.items[1].nested?.[1].text, 'whether G cuts the x-axis at two distinct points.');
});

test('formats shared leading verb questions like ex41-7 cleanly', () => {
  const q = getAllQuestions().find((item) => item.id === 'ex41-7')!;
  const res = formatQuestionStatement(q.statement, q.parts);

  assert.equal(res.intro, 'If f(x) = 2x² - 5x + 1, find the values of the function when:');
  assert.deepEqual(
    res.items.map((i) => `${i.marker} ${i.text}`),
    ['(a) x = 0', '(b) x = 3', '(c) x = -4.']
  );
});

test('derives (a), (b) lines from parts when statement only contains stem (e.g. ex41-24)', () => {
  const q = getAllQuestions().find((item) => item.id === 'ex41-24')!;
  const res = formatQuestionStatement(q.statement, q.parts);

  assert.equal(
    res.intro,
    'Let f(x) = 2x² - kx + 1, where k is a constant. It is given that f(3) = -2.'
  );
  assert.equal(res.items.length, 2);
  assert.equal(res.items[0].marker, '(a)');
  assert.equal(res.items[0].text, 'Find k.');
  assert.equal(res.items[1].marker, '(b)');
  assert.equal(res.items[1].text, 'If f(m) = 16, find m.');
});

test('splits I., II., III. statements cleanly (e.g. mcq-12)', () => {
  const q = getAllQuestions().find((item) => item.id === 'mcq-12')!;
  const res = formatQuestionStatement(q.statement, q.parts);

  assert.equal(res.items.length, 3);
  assert.deepEqual(
    res.items.map((i) => i.marker),
    ['I.', 'II.', 'III.']
  );
});

test('all 248 formatted question lines remain valid KaTeX expressions', () => {
  const all = getAllQuestions();
  const checkStr = (s: string, ctx: string) => {
    for (const seg of tokenizeLatexSegments(s)) {
      if (seg.type === 'math') {
        assert.doesNotThrow(
          () => katex.renderToString(seg.value, { throwOnError: true, strict: 'ignore' }),
          `KaTeX error in ${ctx}: ${seg.value}`
        );
      }
    }
  };

  for (const q of all) {
    const formatted = formatQuestionStatement(q.statement, q.parts);
    assert.ok(
      formatted.intro.length > 0 || formatted.items.length > 0,
      `${q.id} formatted statement should not be empty`
    );
    if (formatted.intro) checkStr(formatted.intro, `${q.id}.intro`);
    for (const item of formatted.items) {
      assert.ok(
        item.text.length > 0 || (item.nested && item.nested.length > 0),
        `${q.id} ${item.marker} should have text or nested subitems`
      );
      if (item.text) checkStr(item.text, `${q.id}.${item.marker}`);
      for (const sub of item.nested ?? []) {
        assert.ok(sub.text.length > 0, `${q.id} ${item.marker}${sub.marker} text should not be empty`);
        checkStr(sub.text, `${q.id}.${item.marker}${sub.marker}`);
      }
    }
  }
});
