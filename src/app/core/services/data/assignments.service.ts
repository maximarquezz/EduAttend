import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Assignment,
  AssignmentPost,
} from '../../models/interfaces/assignment.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private http = inject(HttpClient);

  myAssignments() {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/my-assignments`);
  }

  getAssignments() {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignment`);
  }

  postAssignment(assignment: AssignmentPost) {
    return this.http.post(`${environment.apiUrl}/assignment`, assignment);
  }
}
