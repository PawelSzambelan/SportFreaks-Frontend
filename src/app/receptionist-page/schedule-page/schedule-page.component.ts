import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DateService} from '../../shared/date.service';
import {UserService} from '../../shared/user.service';
import {LessonService} from '../../shared/lesson.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LessonComponent} from './lesson/lesson.component';
import {DialogService} from '../../shared/dialog.service';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {
  instructors: any = [];
  lessons: any = [];
  maxLessonsPerDay = 11;
  customers: any = [];

  constructor(private router: Router,
              private dateService: DateService,
              private userService: UserService,
              private lessonService: LessonService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private notificationService: NotificationService) {

    // refreshing the schedule after adding or editing
    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit() {
    this.loadInstructors();
    this.loadCustomers();
    this.loadLessons();
  }

  loadInstructors() {
    this.userService.getInstructors().subscribe((data: {}) => {
      this.instructors = data;
    });
  }

  loadCustomers() {
    this.userService.getCustomers().subscribe((data: {}) => {
      this.customers = data;
    });
  }

  loadLessons() {
    this.lessonService.getLessons(this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.lessons = data;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.instructors.length; i++) {
        // każdy instruktor danego dnia może mieć max 11 lekcji
        this.instructors[i][0] = new Array(this.maxLessonsPerDay);
      }
      // wypełnianie lekcjami
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.instructors.length; i++) {
        // przechodzę po wszystkich lekcjach danego dnia
        for (const lesson of this.lessons) {
          if (lesson.instructor === this.instructors[i]._id) {
            // lesson hour must be changed to int from format 13:00
            // tslint:disable-next-line:radix
            this.instructors[i][0][(parseInt(lesson.hour.slice(0, -3))) - 9] = lesson;
            // putting into lesson its customers data
            for (const customer of this.customers) {
              if (customer._id === lesson.customer) {
                lesson[0] = customer;
              }
            }
          }
        }
      }
    });
  }

  nextDay() {
    this.dateService.nextDay();
    this.loadInstructors();
    this.loadCustomers();
    this.loadLessons();
  }

  previousDay() {
    this.dateService.previousDay();
    this.loadInstructors();
    this.loadCustomers();
    this.loadLessons();
  }

  chooseDay() {
    this.dateService.chooseDay();
  }

  addLesson(instructor: string, lessonHour: number, date: string) {
    const dialogConfig = new MatDialogConfig();

    const dataToPopulateForm = {
      instructor,
      lessonHour,
      date
    };

    this.lessonService.populateFormAdding(dataToPopulateForm);
    // cannot close window by cliking outside it or esc
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(LessonComponent, dialogConfig);
  }

  deleteLesson(lessonId: string) {
    this.dialogService.openConfirmDialog('Are you sure about this deletion ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.lessonService.deleteLesson(lessonId).subscribe();
        this.notificationService.warn('Lesson deleted successfully');
        setTimeout(() => {
          this.router.navigate(['/reception/schedule']);
        }, 50);
      }
    });
  }

}
