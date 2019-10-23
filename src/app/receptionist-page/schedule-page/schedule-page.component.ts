import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DateService} from '../../shared/date.service';
import {UserService} from '../../shared/user.service';
import {LessonService} from '../../shared/lesson.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {
  instructors: any = [];
  lessons: any = [];
  maxLessonsPerDay = 11;

  constructor(private router: Router, private dateService: DateService, private userService: UserService,
              private lessonService: LessonService) { }

  ngOnInit() {
    this.loadInstructors();
    this.loadLessons();
  }

  loadInstructors() {
    this.userService.getInstructors().subscribe((data: {}) => {
      this.instructors = data;
      // console.log('instructors bez JSON.stringify: ', this.instructors);
      // console.log('instructors JSON.stringfy: ', JSON.stringify(this.instructors));
    });
  }

  loadLessons() {
    this.lessonService.getLessons(this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.lessons = data;
      // console.log('all lessons today: ', JSON.stringify(this.lessons));


      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.instructors.length; i++) {
        // każdy instruktor danego dnia może mieć max 11 lekcji
        this.instructors[i][0] = new Array(this.maxLessonsPerDay);
      }
      // wypełnianie lekcjami
      // console.log('this.instructors after putting lessons into it', this.instructors);

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.instructors.length; i++) {
        // przechodzę po wszystkich lekcjach danego dnia
        for (const lesson of this.lessons) {
          // console.log('lessson from loop: ', lesson);
          // console.log('lesson.instructor === this.instructors[i].id:  ', lesson.instructor === this.instructors[i]._id);
          // console.log('lesson.instructor;', lesson.instructor);
          // console.log('this.instructors[i].id: ', this.instructors[i]._id);
          if (lesson.instructor === this.instructors[i]._id) {
            this.instructors[i][0][lesson.hour - 9] = lesson;
          }
        }
      }
      console.log('this.instructors after putting lessons into it JSON.stingify ', JSON.stringify(this.instructors));
      // console.log('this.doubleArray after putting lessons into it', this.instructors);
    });
  }

  nextDay() {
    this.dateService.nextDay();
    this.loadInstructors();
    this.loadLessons();
  }

  previousDay() {
    this.dateService.previousDay();
    this.loadInstructors();
    this.loadLessons();
  }

  chooseDay() {
    this.dateService.chooseDay();
  }

}
