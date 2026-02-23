import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { StudentsService } from '../../services/students/students.service';
import type { GetStudent } from '../../models/student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: GetStudent[] = [];
  loading = true;
  error = '';
  deletingId: string | null = null;
  private routerSub: Subscription | null = null;

  constructor(private studentsService: StudentsService, private router: Router, private cd: ChangeDetectorRef) {
    const initialUrl = this.router.url;
    this.routerSub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const url = ev.urlAfterRedirects ?? ev.url;
        if (url && url.startsWith('/students') && url !== initialUrl) {
          this.loadStudents();
        }
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadStudents();
  }

  public ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private async loadStudents(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      const students = await this.studentsService.getStudents();
      this.students = students;
      try { this.cd.detectChanges(); } catch {}
    } catch (error) {
      this.error = 'Failed to load students';
      console.error(error);
    } finally {
      this.loading = false;
      try { this.cd.detectChanges(); } catch {}
    }
  }

  public async deleteStudent(id: string | number): Promise<void> {
    this.deletingId = String(id);
    try {
      await this.studentsService.deleteStudent(String(id));
      this.students = this.students.filter(s => String(s.id) !== String(id));
    } catch (error) {
      alert('Failed to delete student');
      console.error(error);
    } finally {
      this.deletingId = null;
    }
  }

  trackById(_index: number, student: GetStudent) {
    return student.id;
  }

  navigateToCreate() {
    this.router.navigate(['/students/create']);
  }
}
