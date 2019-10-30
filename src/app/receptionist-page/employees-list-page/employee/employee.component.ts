import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  rules: any = [];
  mySubscription: any;

  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<EmployeeComponent>,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loadRules();
  }

  onSubmit() {
    if (this.userService.form.valid) {
      if (!this.userService.form.get('email').value) {
        this.userService.addEmployee(this.userService.form.value).subscribe((data: any) => {
            this.router.navigate(['/reception/employees']);
          },
        );
      } else {
        this.userService.updateEmployee(this.userService.form.value).subscribe((data: any) => {
            this.router.navigate(['/reception/employees']);
          },
        );
      }

      this.dialogRef.close();
      // window.location.reload();
      this.userService.form.reset();
      this.notificationService.success('Operacja wykonana pomyślnie');
    }
  }

  loadRules() {
    this.userService.getRules().subscribe((data: {}) => {
      this.rules = data;
    });
  }

}
