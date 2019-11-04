import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../shared/user.service';
import {ReceptionistPageComponent} from '../receptionist-page.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EmployeeComponent} from './employee/employee.component';
import {NotificationService} from '../../shared/notification.service';
import {DialogService} from '../../shared/dialog.service';

@Component({
  selector: 'app-employees-list-page',
  templateUrl: './employees-list-page.component.html',
  styleUrls: ['./employees-list-page.component.css']
})
export class EmployeesListPageComponent implements OnInit {
  instructors: any = [];
  receptionists: any = [];
  admins: any = [];

  constructor(private router: Router,
              private userService: UserService,
              private officeComponent: ReceptionistPageComponent,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogService: DialogService) {

    // refreshing the list of employyes after adding or editing
    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });


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
    // cannot close window by cliking outside it or esc
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(EmployeeComponent, dialogConfig);
    this.userService.form.reset();
  }

  editEmployee(employee) {
    this.userService.populateForm(employee);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(EmployeeComponent, dialogConfig);
    this.router.navigate(['/reception/employees']);
  }

  deleteEmployee(employeeId) {
    this.dialogService.openConfirmDialog('Are you sure about this deletion ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteEmployee(employeeId).subscribe();
        this.notificationService.warn('Employee deleted successfully');
        setTimeout(() => {
          this.router.navigate(['/reception/employees']);
        }, 50);
      }
    });
  }
}
