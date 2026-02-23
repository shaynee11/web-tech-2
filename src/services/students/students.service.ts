import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GetStudent, CreateStudentPayload } from '../../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly STUDENTS_API = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  async getStudents(): Promise<GetStudent[]> {
    const response = await firstValueFrom(this.http.get<GetStudent[]>(this.STUDENTS_API));
    return response ?? [];
  }

  async createStudent(student: CreateStudentPayload): Promise<GetStudent> {
    return await firstValueFrom(this.http.post<GetStudent>(this.STUDENTS_API, student));
  }

  async deleteStudent(studentId: string): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${this.STUDENTS_API}/${studentId}`));
  }
}