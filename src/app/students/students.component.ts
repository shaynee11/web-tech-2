import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { StudentsService } from '../../services/students/students.service';
import { GetStudent } from '../../models/student.model';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students = signal<GetStudent[]>([]);
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  ngAfterViewInit(): void {
    // If navigation passed a newly created student via state, append it to the list
    if (isPlatformBrowser(this.platformId)) {
      const newStudent = (history.state && history.state.newStudent) ? history.state.newStudent as GetStudent : null;
      if (newStudent) {
        this.students.update(list => [...list, newStudent]);
      }
    }
  }

  async getStudents(): Promise<void> {
    const studentsList = await this.studentsService.getStudents();
    this.students.set(studentsList);
  }

  public async deleteStudent(studentId: string): Promise<void> {
    try {
      await this.studentsService.deleteStudent(studentId);
      // After successful deletion, remove the student from the list
      this.students.set(this.students().filter(student => student.id !== studentId));
    } catch (error) {
      console.error(error);
    }
  }

  goToCreateStudent(): void {
    this.router.navigate(['/create-student']);
  }
}
