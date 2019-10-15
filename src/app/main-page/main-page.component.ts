import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  isLoginError = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  OnSubmit(email, password) {
    this.userService.userAuthentication(email, password).subscribe((data: any) => {
        console.log(data); // wyświetlenie tokenu
        localStorage.setItem('userToken', data.token);
        console.log(data.userRule);
        if (data.userRule === 'instructor') {
          this.router.navigate(['/instructor']);
        } else if (data.userRule === 'receptionist' || data.userRule === 'admin') {
          this.router.navigate(['/reception']);
        }
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

}
