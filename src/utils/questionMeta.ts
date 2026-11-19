import type { QuestionItem } from '../types/math';

/**
 * Questions whose original textbook statement provides a graph or figure
 * that students must inspect to answer the question.
 * All other questions only provide graphs as optional visual hints.
 */
const GIVEN_GRAPH_QUESTION_IDS = new Set<string>([
  'ex42-1',
  'ex42-2',
  'ex42-8',
  'ex42-9',
  'ex42-10',
  'ex42-15',
  'ex43-1',
  'ex43-2',
  'ex43-3',
  'ex43-4',
  'ex43-25',
  'ex43-26',
  'ex43-27',
  'ex43-31',
  'ex43-35',
  'ex43-36',
  'ex44-10',
  'cy-2',
  'cy-3',
  'rev-9',
  'rev-10',
  'rev-11',
  'rev-12',
  'rev-24',
  'rev-40',
  'rev-43',
  'mcq-5',
  'mcq-6',
  'mcq-11',
  'ez-11',
]);

export function hasGivenGraphInQuestion(question: Pick<QuestionItem, 'id' | 'statement'>): boolean {
  if (GIVEN_GRAPH_QUESTION_IDS.has(question.id)) {
    return true;
  }
  return /\b(?:the figure shows|shown in the figure|from the graph|using the given graph|using the graph of)\b/i.test(
    question.statement
  );
}
