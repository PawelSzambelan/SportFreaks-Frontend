import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-receptionist-page',
  templateUrl: './receptionist-page.component.html',
  styleUrls: ['./receptionist-page.component.css']
})
export class ReceptionistPageComponent implements OnInit {
  loggedInUser: any;
  loggedInUserRuleName: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.userService.getLoggedInUser(localStorage.getItem('userToken')).subscribe((data: any) => {
      this.loggedInUser = data.user;
      this.loggedInUserRuleName = data.userRuleName;
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

}
