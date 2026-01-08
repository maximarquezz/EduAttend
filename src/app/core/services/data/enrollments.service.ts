import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Enrollment,
  EnrollmentPost,
} from '../../models/interfaces/enrollment.interface';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private http = inject(HttpClient);

  myEnrollments() {
    return this.http.get<Enrollment[]>(`${environment.apiUrl}/my-enrollments`);
  }

  postEnroll(enrollment: EnrollmentPost) {
    return this.http.post(`${environment.apiUrl}/enroll`, enrollment);
  }
}
