export class AttendanceHistoryMapper {
  static toTableRow(att: any) {
    return {
      date: att.attendance_date,
      subject:
        att.enrollment?.mid_comission_subject?.subject?.subject_name || 'N/A',
      status: att.attendance_status, // ← Cambiado: devolver el status original, NO mapeado
    };
  }
}