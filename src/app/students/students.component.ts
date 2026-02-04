import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  students = [
    { name: 'Juan Dela Cruz', course: 'BSIT', year: '3rd Year' },
    { name: 'Maria Santos', course: 'BSCS', year: '2nd Year' },
    { name: 'Pedro Reyes', course: 'BSIS', year: '4th Year' }
  ];

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }
}
