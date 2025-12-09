import { EnrollmentStatus } from '../../enums/enrollment-status.enum';

// GET / PUT
export interface Enrollment {
  id?: number;
  user_id: number;
  mid_comission_subject_id: number;
  enrollment_year: number;
  enrollment_status: EnrollmentStatus;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}

// POST
export type EnrollmentPost = Pick<
  Enrollment,
  'mid_comission_subject_id' | 'enrollment_year'
>;
