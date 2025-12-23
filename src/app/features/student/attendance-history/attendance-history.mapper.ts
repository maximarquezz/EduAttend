export class AttendanceHistoryMapper {
  static toTableRow(att: any) {
    return {
      date: att.attendance_date,
      subject:
        att.enrollment?.mid_comission_subject?.subject?.subject_name || 'N/A',
      state: AttendanceHistoryMapper.mapStatus(att.attendance_status),
    };
  }

  private static mapStatus(status: string): string {
    const statusMap: Record<string, string> = {
      PRESENTE: 'Presente',
      AUSENTE: 'Ausente',
      TARDE: 'Tarde',
      JUSTIFICADO: 'Justificado',
    };
    return statusMap[status] ?? status;
  }
}
