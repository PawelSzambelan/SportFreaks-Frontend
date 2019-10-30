import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {NavigationEnd, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  user: User;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/;
  phonePattern = /^[0-9]{9}$/;
  rules: any = [];


  isRegisterError = false;

  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<EmployeeAddComponent>,
  ) { }

  ngOnInit() {
    this.resetForm();
    this.loadRules();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      name: '',
      surname: '',
      email: '',
      password: '',
      phone: null,
      rule: '',
    };
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);
    this.userService.addEmployee(form.value).subscribe((data: any) => {
        this.router.navigate(['/reception/workers']);
      },
      (err: HttpErrorResponse) => {
        this.isRegisterError = true;
      });
    this.dialogRef.close();
    window.location.reload();
  }


  loadRules() {
    this.userService.getRules().subscribe((data: {}) => {
      this.rules = data;
    });
  }

}
