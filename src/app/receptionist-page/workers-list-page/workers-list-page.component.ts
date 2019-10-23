import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workers-list-page',
  templateUrl: './workers-list-page.component.html',
  styleUrls: ['./workers-list-page.component.css']
})
export class WorkersListPageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  loadInstructors() {
    this.userService.getInstructors().subscribe((data: {}) => {
      // this.instructors = data;
      // console.log('instructors bez JSON.stringify: ', this.instructors);
      // console.log('instructors JSON.stringfy: ', JSON.stringify(this.instructors));
    });
  }


}
