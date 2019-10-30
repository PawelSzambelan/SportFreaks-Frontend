import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserService} from './shared/user.service';
import {DateService} from 'src/app/shared/date.service';
import {LessonService} from './shared/lesson.service';
import {AuthGuard} from './auth/auth.guard';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';


import {MainPageComponent} from './main-page/main-page.component';
import {InstructorPageComponent} from './instructor-main-page/instructor-page.component';
import {ReceptionistPageComponent} from './receptionist-page/receptionist-page.component';
import {SchedulePageComponent} from './receptionist-page/schedule-page/schedule-page.component';
import {WorkersListPageComponent} from './receptionist-page/workers-list-page/workers-list-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatGridListModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {EmployeeAddComponent} from './receptionist-page/workers-list-page/employee-add/employee-add.component';
import { EmployeesListPageComponent } from './receptionist-page/employees-list-page/employees-list-page.component';
import { EmployeeComponent } from './receptionist-page/employees-list-page/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InstructorPageComponent,
    ReceptionistPageComponent,
    SchedulePageComponent,
    WorkersListPageComponent,
    EmployeeAddComponent,
    EmployeesListPageComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    DateService,
    AuthGuard,
    LessonService,
    MatSnackBar
  ],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeAddComponent, EmployeeComponent]
})
export class AppModule {
}
