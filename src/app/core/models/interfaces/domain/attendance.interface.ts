import { AttendanceStatus } from '../../enums/attendance-status.enum';

// GET / POST / PUT
export interface Attendance {
  id?: number;
  enrollment_id: number;
  attendance_date: string | Date;
  attendance_status: AttendanceStatus;
  attendance_notes: string | null;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}
