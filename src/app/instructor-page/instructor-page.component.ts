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

  constructor(private router: Router, private dateService: DateService, private userService: UserService) {
  }

  ngOnInit() {
    this.loadLessons();
  }

  // loadLessons() {
  //   return this.userService.getLessons(localStorage.getItem('userToken')).subscribe((data: {}) => {
  //     this.lessons = data;
  //     console.log(JSON.stringify(this.lessons));
  //   });
  // }

  loadLessons() {
    return this.userService.getLessons(localStorage.getItem('userToken'), this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.lessons = data;
      console.log(JSON.stringify(this.lessons));
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
