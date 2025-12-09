import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-user-request',
  imports: [
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './user-request.component.html',
  styleUrl: './user-request.component.scss',
})
export class UserRequestComponent {
  @Input() userName!: string;
  @Input() userDni!: number;
  @Input() userEmail!: string;
  @Input() userPhone!: string;
  @Input() userProvince!: string;
  @Input() userCity!: string;
  @Input() userAddress!: string;
  @Input() userRole!: string;
  @Input() userCourseReq!: string;
  @Input() requestDate!: string;
  @Input() userId!: number;

  @Output() accept = new EventEmitter<number>();
  @Output() reject = new EventEmitter<number>();

  onAccept() {
    this.accept.emit(this.userId);
  }

  onReject() {
    this.reject.emit(this.userId);
  }
}
