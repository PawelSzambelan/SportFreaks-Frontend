import {Component, OnInit} from '@angular/core';
import {LessonService} from '../../../shared/lesson.service';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {NotificationService} from '../../../shared/notification.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  constructor(private lessonService: LessonService,
              public dialogRef: MatDialogRef<LessonComponent>,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.lessonService.lessonForm.get('date').disable();
    this.lessonService.lessonForm.get('instructor').disable();
    this.lessonService.lessonForm.get('hour').disable();
  }

  onClose() {
    this.lessonService.lessonForm.reset();
    this.dialogRef.close();
  }

  onSubmit() {
    this.lessonService.addLesson(this.lessonService.lessonForm.value).subscribe((data: any) => {
      this.router.navigate(['/reception/schedule']);
    });
    this.dialogRef.close();
    this.lessonService.lessonForm.reset();
    this.notificationService.success('Operacja wykonana pomyślnie');
  }
}
