export class ModalMapper {
  private columnNames: Record<string, string> = {
    attendance_date: 'Fecha',
    attendance_status: 'Estado',
    attendance_notes: 'Notas',
    students: 'Alumnos',
    acciones: 'Acciones',
    id: 'ID',
  };

  getColumnNames() {
    return this.columnNames;
  }
}
