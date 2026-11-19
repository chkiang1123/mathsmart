import test from 'node:test';
import assert from 'node:assert/strict';
import { hasGivenGraphInQuestion } from './questionMeta';
import { getAllQuestions } from '../data/index';

test('identifies given-figure questions vs hint-only graph questions accurately', () => {
  const all = getAllQuestions();
  const byId = new Map(all.map((q) => [q.id, q]));

  // Revision 4 Q42 from user screenshot has NO figure in textbook -> hint only
  assert.equal(hasGivenGraphInQuestion(byId.get('rev-42')!), false);
  // Algebraic evaluation / completing the square without figure -> hint only
  assert.equal(hasGivenGraphInQuestion(byId.get('ex41-7')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('cy-1')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('ez-1')!), false);

  // Textbook figure-reading questions MUST have graph shown immediately
  assert.equal(hasGivenGraphInQuestion(byId.get('ex42-8')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex43-3')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('rev-24')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('mcq-6')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ez-11')!), true);

  const givenCount = all.filter((q) => hasGivenGraphInQuestion(q)).length;
  assert.equal(givenCount, 30);
});
