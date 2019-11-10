import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  rules: any = [];

  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<EmployeeComponent>,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loadRules();
  }

  onSubmit() {
    // if below is for check if we want to add or edit employee
    if (!this.userService.editEmployeeId) {
      this.userService.addEmployee(this.userService.form.value).subscribe((data: any) => {
          this.router.navigate(['/reception/employees']);
        });
    } else {
      this.userService.updateEmployee(this.userService.form.value).subscribe((data: any) => {
        this.router.navigate(['/reception/employees']);
        this.userService.editEmployeeId = null;
      });
    }
    this.dialogRef.close();
    this.userService.form.reset();
    this.notificationService.success('Operacja wykonana pomyślnie');
  }

  onClose() {
    this.userService.form.reset();
    this.dialogRef.close();
  }

  loadRules() {
    this.userService.getRules().subscribe((data: {}) => {
      this.rules = data;
    });
  }

}
