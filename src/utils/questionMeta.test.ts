import test from 'node:test';
import assert from 'node:assert/strict';
import { hasGivenGraphInQuestion } from './questionMeta';
import { getAllChapterQuestions } from '../data/index';

test('identifies given-figure questions vs hint-only graph questions accurately across Ch. 3 & Ch. 4', () => {
  const all = getAllChapterQuestions();
  const byId = new Map(all.map((q) => [q.id, q]));

  // Ch. 4 figureless vs given-figure
  assert.equal(hasGivenGraphInQuestion(byId.get('rev-42')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex41-7')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('cy-1')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('ez-1')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex42-8')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex43-3')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('rev-24')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('mcq-6')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ez-11')!), true);

  // Ch. 3 figureless vs given-figure
  assert.equal(hasGivenGraphInQuestion(byId.get('ex31-10')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex33-9')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex33-30')!), false);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex31-1')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex32-15')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ex33-23')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ch3-mcq-12')!), true);
  assert.equal(hasGivenGraphInQuestion(byId.get('ch3-ez-9')!), true);

  const givenCount = all.filter((q) => hasGivenGraphInQuestion(q)).length;
  assert.equal(givenCount, 64);
});
