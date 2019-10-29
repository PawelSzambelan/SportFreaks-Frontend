import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {ReceptionistPageComponent} from '../receptionist-page.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EmployeeAddComponent} from './employee-add/employee-add.component';

@Component({
  selector: 'app-workers-list-page',
  templateUrl: './workers-list-page.component.html',
  styleUrls: ['./workers-list-page.component.css']
})
export class WorkersListPageComponent implements OnInit {
  instructors: any = [];
  receptionists: any = [];
  admins: any = [];

  constructor(private router: Router, private userService: UserService, private officeComponent: ReceptionistPageComponent,
              private dialog: MatDialog ) {
  }

  ngOnInit() {
    this.loadInstructors();
    this.loadReceptionists();
    this.loadAmins();
  }

  loadInstructors() {
    this.userService.getInstructors().subscribe((data: {}) => {
      this.instructors = data;
    });
  }

  loadReceptionists() {
    this.userService.getReceptionists().subscribe((data: {}) => {
      this.receptionists = data;
    });
  }

  loadAmins() {
    this.userService.getAdmins().subscribe((data: {}) => {
      this.admins = data;
    });
  }

  createEmployee() {
    const dialogConfig = new MatDialogConfig();
    // cannot close window by cliking outside it or ecs
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(EmployeeAddComponent, dialogConfig);
  }

  // editEmployee(employee) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '50%';
  //   this.employeeEdit.loadEmployeeData(employee);
  // }
}
