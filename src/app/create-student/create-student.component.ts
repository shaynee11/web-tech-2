import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../../services/students/students.service';
import { CreateStudentPayload } from '../../models/student.model';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent {
  private readonly studentsService = inject(StudentsService);
  private readonly router = inject(Router);

  // Use this form for validation and submission
  public form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required]),
    course: new FormControl('', [Validators.required]),
    year_level: new FormControl('', [Validators.required]),
    gpa: new FormControl('', [Validators.required]),
  });

  public async createStudent(): Promise<void> {
    try {
      if (this.form.invalid) {
        return;
      }

      const createStudentPayload: CreateStudentPayload = {
        first_name: this.form.value.first_name ?? '',
        last_name: this.form.value.last_name ?? '',
        email: this.form.value.email ?? '',
        age: this.form.value.age ? Number(this.form.value.age) : 0,
        course: this.form.value.course ?? '',
        year_level: this.form.value.year_level ? Number(this.form.value.year_level) : 0,
        gpa: this.form.value.gpa ? Number(this.form.value.gpa) : 0,
        enrollment_status: 'Active',
      };

      const created = await this.studentsService.createStudent(createStudentPayload);
      // After successful creation, navigate to the students page and pass the created student in state
      this.router.navigate(['/students'], { state: { newStudent: created } });
    } catch (error) {
      console.error(error);
    }
  }

  goBack() {
    this.router.navigate(['/students']);
  }
}