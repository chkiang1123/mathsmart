import type { ExerciseGroup, ExerciseId, QuestionItem } from '../types/math';
import { CH3_EXERCISES, CH4_EXERCISES } from './chapters';

export { CH3_EXERCISES, CH4_EXERCISES };

export const EXERCISE_GROUPS: ExerciseGroup[] = CH4_EXERCISES;

export const ALL_EXERCISE_GROUPS: ExerciseGroup[] = [...CH3_EXERCISES, ...CH4_EXERCISES];

export function getExerciseById(id: ExerciseId): ExerciseGroup {
  return ALL_EXERCISE_GROUPS.find((g) => g.id === id) ?? ALL_EXERCISE_GROUPS[0];
}

export function getAllQuestions(): QuestionItem[] {
  return EXERCISE_GROUPS.flatMap((g) => g.questions);
}

export function getAllChapterQuestions(): QuestionItem[] {
  return ALL_EXERCISE_GROUPS.flatMap((g) => g.questions);
}
