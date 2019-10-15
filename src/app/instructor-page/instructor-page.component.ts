import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.css']
})
export class InstructorPageComponent implements OnInit {

  constructor(private router: Router, private dateService: DateService) {
  }

  ngOnInit() {
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

  nextDay() {
    this.dateService.nextDay();
  }

  previousDay() {
    this.dateService.previousDay();
  }

}
