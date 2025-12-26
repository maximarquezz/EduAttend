import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { MidComissionSubject } from '../../models/interfaces/domain/mid-comission-subject.interface';

@Injectable({
  providedIn: 'root',
})
export class MidComissionSubjectService {
  private http = inject(HttpClient);

  getComissionAndSubject() {
    return this.http.get<MidComissionSubject[]>(
      `${environment.prodApiUrl}/comission-subject`
    );
  }
}
