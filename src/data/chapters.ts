import type { ExerciseGroup } from '../types/math';
import { exercise31 } from './ch3_ex_3_1';
import { exercise32 } from './ch3_ex_3_2';
import { exercise33 } from './ch3_ex_3_3';
import { ch3CheckYourselfGroup, revisionExercise3Group } from './ch3_revision';
import { ch3McqGroup, ch3ExamZoneGroup } from './ch3_exam';
import { exercise41 } from './ex_4_1';
import { exercise42 } from './ex_4_2';
import { exercise43 } from './ex_4_3';
import { exercise44 } from './ex_4_4';
import { checkYourselfGroup, revisionExercise4Group } from './ex_revision';
import { mcqGroup, examZoneGroup } from './ex_exam';

export interface ChapterSpec {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  status: 'active' | 'reserved';
  exercises: ExerciseGroup[];
}

export const CH3_EXERCISES: ExerciseGroup[] = [
  exercise31,
  exercise32,
  exercise33,
  ch3CheckYourselfGroup,
  revisionExercise3Group,
  ch3McqGroup,
  ch3ExamZoneGroup,
];

export const CH4_EXERCISES: ExerciseGroup[] = [
  exercise41,
  exercise42,
  exercise43,
  exercise44,
  checkYourselfGroup,
  revisionExercise4Group,
  mcqGroup,
  examZoneGroup,
];

export const CHAPTERS: ChapterSpec[] = [
  {
    id: 'ch1',
    number: 'Ch. 1',
    title: 'Number Systems',
    subtitle: 'Reserved for upcoming chapter upload',
    status: 'reserved',
    exercises: [],
  },
  {
    id: 'ch2',
    number: 'Ch. 2',
    title: 'Quadratic Equations in One Unknown',
    subtitle: 'Reserved for upcoming chapter upload',
    status: 'reserved',
    exercises: [],
  },
  {
    id: 'ch3',
    number: 'Ch. 3',
    title: 'Equations of Straight Lines',
    subtitle: 'Ex 3.1 – 3.3, Check Yourself, Revision 3, MCQs & Exam Zone',
    status: 'active',
    exercises: CH3_EXERCISES,
  },
  {
    id: 'ch4',
    number: 'Ch. 4',
    title: 'Functions and Graphs',
    subtitle: 'Ex 4.1 – 4.4, Check Yourself, Revision 4, MCQs & Exam Zone',
    status: 'active',
    exercises: CH4_EXERCISES,
  },
  {
    id: 'ch5',
    number: 'Ch. 5',
    title: 'More about Polynomials',
    subtitle: 'Reserved for upcoming chapter upload',
    status: 'reserved',
    exercises: [],
  },
  {
    id: 'ch6',
    number: 'Ch. 6',
    title: 'Exponential Functions',
    subtitle: 'Reserved for upcoming chapter upload',
    status: 'reserved',
    exercises: [],
  },
];
