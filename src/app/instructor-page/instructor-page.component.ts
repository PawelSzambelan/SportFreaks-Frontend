import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DateService} from '../shared/date.service';
import {UserService} from '../shared/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.css']
})
export class InstructorPageComponent implements OnInit {
  lessons: any = [];
  lessonsArray: any = [];
  maxLessonsPerDay = 11;
  customers: any = [];
  loggedInUser: any;


  constructor(private router: Router, private dateService: DateService, private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadCustomers();
    this.loadLessons();
    this.getLoggedInUser();
  }

  loadCustomers() {
    this.userService.getCustomers().subscribe((data: {}) => {
      this.customers = data;
    });
  }

  loadLessons() {
    return this.userService.getInstructorLessons(localStorage.getItem('userToken'), this.dateService.getFormattedDate())
      .subscribe((data: {}) => {
        this.lessons = data;
        console.log(JSON.stringify(this.lessons));

        // wpisywanie do lessonsArray, żeby indeks 0 = 9:00, 1 = 10:00 itp. po to,
        // żeby potem nie robić 11 pętli, tylko jedną do wypisywania lekcji
        this.lessonsArray = new Array(this.maxLessonsPerDay);
        // for (let i = 0; i < this.lessonsArray.length; i++) {
        //   // tslint:disable-next-line:prefer-for-of
        //   for (let j = 0; j < this.lessons.length; j++) {
        //     if (this.lessons[j].hour === i + 9) {
        //       this.lessonsArray[i] = this.lessons[j];
        //     }
        //   }
        // }

        // szybsza wersja bez dwóch pętli jak wyżej
        for (const lesson of this.lessons) {
          for (const customer of this.customers) {
            if (customer._id === lesson.customer) {
              lesson[0] = customer;
            }
          }
          // tslint:disable-next-line:radix
          this.lessonsArray[(parseInt(lesson.hour.slice(0, -3))) - 9] = lesson;
        }
      });
  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

  nextDay() {
    this.dateService.nextDay();
    this.loadLessons();
  }

  previousDay() {
    this.dateService.previousDay();
    this.loadLessons();
  }

  chooseDay() {
    this.dateService.chooseDay();
  }

  getLoggedInUser() {
    this.userService.getLoggedInUser(localStorage.getItem('userToken')).subscribe((data: any) => {
      this.loggedInUser = data.user;
      // this.loggedInUserRuleName = data.userRuleName;
    });
  }

  editingProfile() {
    this.userService.populateForm(this.loggedInUser);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(ProfileEditComponent, dialogConfig);
  }
}
