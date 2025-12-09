import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  Enrollment,
  EnrollmentPost,
} from '../../models/interfaces/domain/enrollment.interface';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private http = inject(HttpClient);

  myEnrollments() {
    return this.http.get<Enrollment[]>(
      `${environment.localApiUrl}/my-enrollments`
    );
  }

  postEnroll(enrollment: EnrollmentPost) {
    return this.http.post(`${environment.localApiUrl}/enroll`, enrollment);
  }
}
