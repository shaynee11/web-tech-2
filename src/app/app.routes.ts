import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  {
    path: 'students',
    loadComponent: () =>
      import('./students/students.component').then(
        (m) => m.StudentsComponent
      )
  },
  {
    path: 'students/create',
    loadComponent: () =>
      import('./create-student/create-student.component').then(
        (m) => m.CreateStudentComponent
      )
  },
  { path: '**', redirectTo: 'students' }
];