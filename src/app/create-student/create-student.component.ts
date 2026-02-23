import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../../services/students/students.service';
import { CreateStudentPayload } from '../../models/student.model';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentsService: StudentsService
  ) {
    this.form = this.fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      year_level: new FormControl('', [Validators.required]),
      gpa: new FormControl('', [Validators.required])
    });
  }

  public async createStudent(): Promise<void> {
    try {
      if (this.form.invalid) {
        return;
      }

      const createStudentPayload: CreateStudentPayload = {
        first_name: this.form.value.first_name ?? '',
        last_name: this.form.value.last_name ?? '',
        email: this.form.value.email ?? '',
        age: Number(this.form.value.age) || 0,
        course: this.form.value.course ?? '',
        year_level: Number(this.form.value.year_level) || 0,
        gpa: Number(this.form.value.gpa) || 0,
        enrollment_status: 'Active'
      };

      const response = await this.studentsService.createStudent(createStudentPayload);
      console.log('Student created successfully:', response);
      
      // Wait a moment for the database to sync, then navigate
      await new Promise(resolve => setTimeout(resolve, 500));
      this.router.navigate(['/students']);
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to create student. Please check the console for details.');
    }
  }

  public goBack() {
    this.router.navigate(['/students']);
  }
}