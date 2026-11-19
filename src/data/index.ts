import type { ExerciseGroup, ExerciseId, QuestionItem } from '../types/math';
import { CH4_EXERCISES } from './chapters';

export const EXERCISE_GROUPS: ExerciseGroup[] = CH4_EXERCISES;

export function getExerciseById(id: ExerciseId): ExerciseGroup {
  return EXERCISE_GROUPS.find((g) => g.id === id) ?? EXERCISE_GROUPS[0];
}

export function getAllQuestions(): QuestionItem[] {
  return EXERCISE_GROUPS.flatMap((g) => g.questions);
}
