import { environment } from './../../../../environments/environment.development';
import { Component, inject, Inject, ViewChild, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Role } from '../../../core/models/enums/role.enum';
import { MatIconModule } from '@angular/material/icon';
import { AttendanceStatusComponent } from '../attendance-status/attendance-status.component';
import { ModalMapper } from './modal.mapper';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StatusComponent } from '../status/status.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    AttendanceStatusComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    StatusComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  private mapper = new ModalMapper();
  private attendanceService = inject(AttendanceService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  Role = Role;
  role = environment.userRole as Role;
  modalCols: string[];
  modalActions!: {
    label: string;
    action: string;
    accent: string;
  }[];
  modalData: MatTableDataSource<any>;
  columnNames: Record<string, string> = this.mapper.getColumnNames();

  attendanceForm!: FormGroup;
  students: any[] = [];
  isLoadingStudents = false;
  showAttendanceForm = false;

  // Propiedades para edición
  isEditingAttendance = false;
  editingAttendance: any = null;
  editAttendanceForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cardImageUrl: string;
      cardTitle: string;
      cardSubtitle: string;
      cardPercentageLabel: string;
      cardPercentage: number;
      cardDateLabel: string;
      cardDate: Date | string;
      modalCols: string[];
      modalActions: {
        label: string;
        action: string;
        accent: string;
      }[];
      modalData: any[];
      role: Role;
      midComissionSubjectId?: number;
    }
  ) {
    this.role = data.role;
    this.modalCols = data.modalCols;
    this.modalActions = data.modalActions;
    const safeTableData = Array.isArray(data.modalData) ? data.modalData : [];
    this.modalData = new MatTableDataSource(safeTableData);

    console.log('🏗️ CONSTRUCTOR - Modal Data recibida:', safeTableData);
    console.log('📋 CONSTRUCTOR - Columnas:', this.modalCols);
    console.log('👤 CONSTRUCTOR - Rol:', this.role);

    if (safeTableData.length > 0) {
      safeTableData.forEach((item, index) => {
        console.log(`🔍 CONSTRUCTOR - Registro ${index}:`, {
          attendance_date: item.attendance_date,
          students: item.students,
        });
      });
    }
  }

  ngOnInit() {
    console.log('🎬 ngOnInit ejecutado');
    console.log('🔍 midComissionSubjectId:', this.data.midComissionSubjectId);
    console.log('🔍 Rol:', this.role);

    // CARGAR ESTUDIANTES para formulario (Teacher y Admin)
    if (
      this.data.midComissionSubjectId &&
      (this.role === Role.Teacher || this.role === Role.Admin)
    ) {
      this.loadStudents();
    }

    // CARGAR ASISTENCIAS según el rol
    this.loadAttendancesData();
  }

  // ✅ NUEVO MÉTODO para cargar asistencias
  private loadAttendancesData() {
    console.log('📊 Cargando asistencias...');

    // TEACHER y ADMIN
    if (
      (this.role === Role.Teacher || this.role === Role.Admin) &&
      this.data.midComissionSubjectId
    ) {
      this.attendanceService.getTeacherAttendances().subscribe({
        next: (data) => {
          console.log('✅ Datos de profesor recibidos:', data);

          // Filtrar por la materia actual
          const subjectData = data.find(
            (item: any) =>
              item.mid_comission_subject_id === this.data.midComissionSubjectId
          );

          if (subjectData && subjectData.attendances) {
            console.log('✅ Asistencias encontradas:', subjectData.attendances);
            this.modalData.data = subjectData.attendances;
          } else {
            console.log('⚠️ No hay asistencias para esta materia');
            this.modalData.data = [];
          }

          // Forzar actualización de la tabla
          this.modalData._updateChangeSubscription();
        },
        error: (err) => {
          console.error('❌ Error al cargar asistencias:', err);
          this.modalData.data = [];
        },
      });
    }
    // STUDENT
    else if (this.role === Role.Student) {
      console.log('👨‍🎓 Modo estudiante - datos ya pasados por card component');
      // Los datos ya vienen en this.modalData del constructor
    }
  }

  loadStudents() {
    console.log('📚 Cargando estudiantes...');
    this.isLoadingStudents = true;
    this.attendanceService
      .getEnrollmentsByComissionSubject(this.data.midComissionSubjectId!)
      .subscribe({
        next: (enrollments) => {
          this.students = enrollments.map((enrollment: any) => ({
            enrollment_id: enrollment.id,
            student_name: enrollment.user.name,
            dni: enrollment.user.dni,
            attendance_status: 'PRESENTE',
          }));
          this.buildForm();
          this.isLoadingStudents = false;
          console.log('✅ Estudiantes cargados:', this.students);
        },
        error: (err) => {
          console.error('❌ Error al cargar estudiantes:', err);
          this.isLoadingStudents = false;
          this.openSnackBar('Error al cargar estudiantes.', 'Cerrar', true);
        },
      });
  }

  buildForm() {
    console.log('📝 Construyendo formulario...');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const localDate = `${year}-${month}-${day}`;

    console.log('📅 Fecha local para formulario:', localDate);
    console.log('🕐 Date object:', today);

    const controls: any = {
      attendance_date: [localDate],
    };

    this.students.forEach((student) => {
      controls[`status_${student.enrollment_id}`] = [
        student.attendance_status || 'PRESENTE',
      ];
      controls[`notes_${student.enrollment_id}`] = [''];
    });

    this.attendanceForm = this.fb.group(controls);
  }

  updateStudentStatus(enrollmentId: number, newStatus: string) {
    this.attendanceForm.get(`status_${enrollmentId}`)?.setValue(newStatus);

    const student = this.students.find((s) => s.enrollment_id === enrollmentId);
    if (student) {
      student.attendance_status = newStatus;
    }
  }

  getColumnName(col: string): string {
    return this.columnNames[col] || col;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.modalData.paginator = this.paginator;
    if (this.sort) {
      this.modalData.sort = this.sort;
      setTimeout(() => {
        if (this.sort) {
          this.sort.active = 'attendance_date';
          this.sort.direction = 'desc';
          this.sort.sortChange.emit();
        }
      });
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }

    const dateStringFixed = dateString.includes('T')
      ? dateString
      : dateString + 'T00:00:00';

    const date = new Date(dateStringFixed);

    const formatted = date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return formatted;
  }

  isStudentsColumn(col: string): boolean {
    return col === 'students';
  }

  getStudentsDisplay(element: any): string {
    if (!element.students || !Array.isArray(element.students)) return '-';

    return element.students
      .map((student: any) => student.student_name)
      .join('<br>');
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      PRESENTE: 'Presente',
      AUSENTE: 'Ausente',
      TARDE: 'Tarde',
      JUSTIFICADO: 'Justificado',
    };
    return statusMap[status] || status;
  }

  getStudentsCount(element: any): number {
    if (!element.students || !Array.isArray(element.students)) return 0;
    return element.students.length;
  }

  handleAction(modalActions: string) {
    console.log('🎬 handleAction:', modalActions);
    switch (modalActions) {
      case 'close':
        this.close();
        break;

      case 'takeAttendance':
        this.toggleAttendanceForm();
        break;
    }
  }

  toggleAttendanceForm() {
    console.log('🔄 Toggle attendance form');
    this.showAttendanceForm = !this.showAttendanceForm;
  }

  submitAttendance() {
    if (!this.attendanceForm.valid) {
      this.openSnackBar('Por favor complete el formulario.', 'Cerrar', true);
      return;
    }

    const selectedDate = this.attendanceForm.get('attendance_date')?.value;
    const now = new Date();

    const dateTimeString = `${selectedDate}T${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    const attendances = this.students.map((student) => ({
      enrollment_id: student.enrollment_id,
      attendance_date: dateTimeString,
      attendance_status: this.attendanceForm.get(
        `status_${student.enrollment_id}`
      )?.value,
      attendance_notes:
        this.attendanceForm.get(`notes_${student.enrollment_id}`)?.value ||
        null,
    }));

    console.log('📤 Enviando asistencias:', attendances);

    this.attendanceService.storeBulkAttendances(attendances).subscribe({
      next: (response) => {
        console.log('✅ Asistencias guardadas:', response);
        this.openSnackBar('Asistencia tomada correctamente.', 'Cerrar', false);

        // Recargar asistencias después de guardar
        this.loadAttendancesData();

        // Ocultar formulario
        this.showAttendanceForm = false;
      },
      error: (err) => {
        console.error('❌ Error al guardar asistencias:', err);
        let errorMsg = 'Error al registrar asistencias.';

        if (err.error?.message) {
          const errorMessage = err.error.message.toLowerCase();

          if (
            errorMessage.includes('duplicate entry') ||
            errorMessage.includes('duplicate key') ||
            errorMessage.includes('1062')
          ) {
            errorMsg =
              'Ya existe una asistencia registrada para esta fecha. No se pueden registrar asistencias duplicadas para el mismo día.';
          } else if (err.error.error) {
            errorMsg = err.error.error;
          }
        } else if (err.error?.error) {
          errorMsg = err.error.error;
        }

        this.openSnackBar(errorMsg, 'Cerrar', true);
      },
    });
  }

  // MÉTODO PARA EDITAR ASISTENCIA
  editAttendance(student: any, attendanceDate: string) {
    console.log('✏️ Editando asistencia:', student);
    console.log('📅 Fecha:', attendanceDate);

    this.isEditingAttendance = true;
    this.editingAttendance = {
      ...student,
      attendance_date: attendanceDate,
    };

    // Crear formulario de edición con los datos actuales
    this.editAttendanceForm = this.fb.group({
      attendance_status: [student.attendance_status || 'PRESENTE'],
      attendance_notes: [student.attendance_notes || ''],
    });

    console.log(
      '📝 Formulario de edición creado:',
      this.editAttendanceForm.value
    );
  }

  // MÉTODO PARA GUARDAR LA EDICIÓN
  saveEditedAttendance() {
    console.log('💾 Guardando asistencia editada...');

    if (!this.editAttendanceForm.valid) {
      this.openSnackBar('Por favor complete el formulario.', 'Cerrar', true);
      return;
    }

    const attendanceId = this.editingAttendance.id;
    const updatedData = {
      attendance_status:
        this.editAttendanceForm.get('attendance_status')?.value,
      attendance_notes:
        this.editAttendanceForm.get('attendance_notes')?.value || null,
    };

    console.log('📤 Datos a actualizar:', updatedData);
    console.log('🆔 ID de asistencia:', attendanceId);

    this.attendanceService
      .updateAttendance(attendanceId, updatedData)
      .subscribe({
        next: (response) => {
          console.log('✅ Asistencia actualizada:', response);

          // Actualizar los datos en la tabla
          this.modalData.data.forEach((element: any) => {
            const studentIndex = element.students.findIndex(
              (s: any) => s.id === attendanceId
            );

            if (studentIndex !== -1) {
              element.students[studentIndex].attendance_status =
                updatedData.attendance_status;
              element.students[studentIndex].attendance_notes =
                updatedData.attendance_notes;
            }
          });

          // Forzar actualización de la tabla
          this.modalData._updateChangeSubscription();

          this.openSnackBar(
            'Asistencia actualizada correctamente',
            'Cerrar',
            false
          );
          this.cancelEdit();
        },
        error: (err) => {
          console.error('❌ Error al actualizar:', err);
          const errorMsg =
            err.error?.error || 'Error al actualizar la asistencia';
          this.openSnackBar(errorMsg, 'Cerrar', true);
        },
      });
  }

  // MÉTODO PARA CANCELAR LA EDICIÓN
  cancelEdit() {
    console.log('❌ Cancelando edición');
    this.isEditingAttendance = false;
    this.editingAttendance = null;
    this.editAttendanceForm.reset();
  }

  // MÉTODO PARA ACTUALIZAR EL STATUS EN EL FORMULARIO DE EDICIÓN
  updateEditStatus(newStatus: string) {
    this.editAttendanceForm.get('attendance_status')?.setValue(newStatus);
  }

  // MÉTODO PARA ELIMINAR ASISTENCIA
  deleteAttendance(student: any, element: any) {
    console.log('🗑️ Eliminando asistencia:', student);

    const attendanceId = student.id;

    if (!attendanceId) {
      this.openSnackBar('No se pudo identificar la asistencia', 'Cerrar', true);
      return;
    }

    if (confirm('¿Está seguro de que desea eliminar esta asistencia?')) {
      this.attendanceService.deleteAttendance(attendanceId).subscribe({
        next: (response) => {
          console.log('✅ Asistencia eliminada:', response);

          // Remover el estudiante del array students del elemento
          const studentIndex = element.students.findIndex(
            (s: any) => s.id === attendanceId
          );

          if (studentIndex !== -1) {
            element.students.splice(studentIndex, 1);
          }

          // Si no quedan más estudiantes en esa fecha, remover el elemento completo
          if (element.students.length === 0) {
            const data = this.modalData.data.filter(
              (item: any) => item !== element
            );
            this.modalData.data = data;
          }

          // Forzar actualización de la tabla
          this.modalData._updateChangeSubscription();

          this.openSnackBar(
            'Asistencia eliminada correctamente',
            'Cerrar',
            false
          );
        },
        error: (err) => {
          console.error('❌ Error al eliminar:', err);
          const errorMsg =
            err.error?.error || 'Error al eliminar la asistencia';
          this.openSnackBar(errorMsg, 'Cerrar', true);
        },
      });
    }
  }

  close() {
    console.log('🚪 Cerrando modal');
    this.dialogRef.close();
  }

  private openSnackBar(
    message: string,
    action = 'Cerrar',
    isError = false
  ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
    });
  }
}
