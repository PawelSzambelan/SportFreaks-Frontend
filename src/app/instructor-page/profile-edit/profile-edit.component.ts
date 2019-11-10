import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../shared/notification.service';
import {InstructorPageComponent} from '../instructor-page.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  rules: any = [];

  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<ProfileEditComponent>,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loadRules();
    this.userService.form.get('rule').disable();
  }

  onSubmit() {
    this.userService.form.value.rule = this.userService.form.get('rule').value;

    this.userService.updateEmployee(this.userService.form.value).subscribe();
    this.router.navigate(['/instructor']);
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
