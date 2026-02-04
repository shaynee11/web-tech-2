import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  students = [
    { name: 'Sandara Shayne', course: 'BSIT', year: '3rd Year' },
    { name: 'Louisse', course: 'Nursing', year: '2nd Year' },
    { name: 'Christlyn', course: 'BSBA', year: '4th Year' }
  ];

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }

  constructor(private router: Router) {}

  goToCreateStudent() {
    this.router.navigate(['/create-student']);
  }
}
