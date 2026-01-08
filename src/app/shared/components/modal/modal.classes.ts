import { Modal } from './modal.interface';

export class ModalStudent implements Modal {
  retrieveData() {
    return {
      modalCols: ['attendance_date', 'attendance_status', 'attendance_notes'],
      modalActions: [
        {
          label: 'Cerrar',
          action: 'close',
          accent: 'tonal',
        },
      ],
      modalData: [],
    };
  }
}

export class ModalTeacher implements Modal {
  retrieveData() {
    return {
      modalCols: [
        'attendance_date',
        'students',
        'attendance_status',
        'acciones',
      ],
      modalActions: [
        {
          label: 'Cerrar',
          action: 'close',
          accent: 'tonal',
        },
        {
          label: 'Tomar asistencia',
          action: 'takeAttendance',
          accent: 'primary',
        },
      ],
      modalData: [],
    };
  }
}

export class ModalAdmin implements Modal {
  retrieveData() {
    return {
      modalCols: [
        'attendance_date',
        'attendance_status',
        'attendance_notes',
        'acciones',
      ],
      modalActions: [
        {
          label: 'Cerrar',
          action: 'close',
          accent: 'tonal',
        },
        {
          label: 'Tomar asistencia',
          action: 'takeAttendance',
          accent: 'primary',
        },
      ],
      modalData: [],
    };
  }
}
