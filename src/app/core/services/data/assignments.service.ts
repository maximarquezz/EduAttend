import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  Assignment,
  AssignmentPost,
} from '../../models/interfaces/domain/assignment.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private http = inject(HttpClient);

  myAssignments() {
    return this.http.get<Assignment[]>(
      `${environment.prodApiUrl}/my-assignments`
    );
  }

  getAssignments() {
    return this.http.get<Assignment[]>(`${environment.prodApiUrl}/assignment`);
  }

  postAssignment(assignment: AssignmentPost) {
    return this.http.post(`${environment.prodApiUrl}/assignment`, assignment);
  }
}
