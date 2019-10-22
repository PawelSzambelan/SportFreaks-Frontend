import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DateService} from '../shared/date.service';
import {UserService} from '../shared/user.service';


@Component({
  selector: 'app-receptionist-page',
  templateUrl: './receptionist-page.component.html',
  styleUrls: ['./receptionist-page.component.css']
})
export class ReceptionistPageComponent implements OnInit {
  instructors: any = [];

  constructor(private router: Router, private dateService: DateService, private userService: UserService) {
  }

  ngOnInit() {
    this.loadInstructors();
  }

  loadInstructors() {
    this.userService.getInstructors().subscribe((data: {}) => {
      this.instructors = data;
      console.log(JSON.stringify(this.instructors));
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

  nextDay() {
    this.dateService.nextDay();
    this.loadInstructors();
  }

  previousDay() {
    this.dateService.previousDay();
    this.loadInstructors();
  }

}
