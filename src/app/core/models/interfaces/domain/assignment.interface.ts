import { AssignType } from '../../enums/assign-type.enum';

// GET / PUT
export interface Assignment {
  id?: number;
  user_id: number;
  mid_comissions_subjects_id: number;
  assign_type: AssignType;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}

// POST
export type AssignmentPost = Pick<
  Assignment,
  'mid_comissions_subjects_id' | 'assign_type'
>;
