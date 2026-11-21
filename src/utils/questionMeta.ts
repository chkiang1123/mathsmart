import type { QuestionItem } from '../types/math';

/**
 * Questions whose original textbook statement provides a graph or figure
 * that students must inspect to answer the question.
 * All other questions only provide graphs as optional visual hints.
 */
const GIVEN_GRAPH_QUESTION_IDS = new Set<string>([
  // Chapter 3 given-figure questions (34)
  'ex31-1',
  'ex31-2',
  'ex31-3',
  'ex31-4',
  'ex31-5',
  'ex31-6',
  'ex31-7',
  'ex31-8',
  'ex31-9',
  'ex31-17',
  'ex31-20',
  'ex31-23',
  'ex31-32',
  'ex32-15',
  'ex32-17',
  'ex32-24',
  'ex33-23',
  'ex33-24',
  'ch3-cy-1',
  'ch3-cy-4',
  'ch3-rev-1',
  'ch3-rev-2',
  'ch3-rev-3',
  'ch3-rev-4',
  'ch3-rev-5',
  'ch3-rev-6',
  'ch3-rev-11',
  'ch3-mcq-12',
  'ch3-mcq-13',
  'ch3-mcq-14',
  'ch3-ez-2',
  'ch3-ez-4',
  'ch3-ez-6',
  'ch3-ez-9',
  // Chapter 4 given-figure questions (30)
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
