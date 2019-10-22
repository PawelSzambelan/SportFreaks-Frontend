import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DateService} from '../shared/date.service';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.css']
})
export class InstructorPageComponent implements OnInit {
  lessons: any = [];
  lessonsArray: any = [];

  constructor(private router: Router, private dateService: DateService, private userService: UserService) {
  }

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    return this.userService.getLessons(localStorage.getItem('userToken'), this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.lessons = data;
      console.log(JSON.stringify(this.lessons));

      // wpisywanie do lessonsArray, żeby indeks 0 = 9:00, 1 = 10:00 itp. po to,
      // żeby potem nie robić 11 pętli, tylko jedną do wypisywania lekcji
      this.lessonsArray = new Array(11);
      for (let i = 0; i < this.lessonsArray.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.lessons.length; j++) {
          if (this.lessons[j].hour === i + 9) {
            this.lessonsArray[i] = this.lessons[j];
          }
        }
      }
    });
  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

  nextDay() {
    this.dateService.nextDay();
    this.loadLessons();
  }

  previousDay() {
    this.dateService.previousDay();
    this.loadLessons();
  }

}
