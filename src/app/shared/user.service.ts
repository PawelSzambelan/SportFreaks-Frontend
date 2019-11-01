import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  readonly apiURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  editEmployeeId: any;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [Validators.required, Validators.minLength(9),  Validators.maxLength(9)]),
    rule: new FormControl(0, Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  addEmployee(employee: User) {
    const userBody: User = {
      name: employee.name,
      surname: employee.surname,
      email: employee.email,
      password: employee.password,
      phone: employee.phone,
      rule: employee.rule,
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL + '/users/signup', userBody, {headers: reqHeader});
  }

  updateEmployee(employee: User) {
    return this.http.put(this.apiURL + '/users/updateUser/' + this.editEmployeeId, employee);
    // return this.http.patch(this.apiURL + '/users/updateUser/' + this.updateEmplyeeId, employee);
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete(this.apiURL + '/users/deleteUser/' + employeeId);
  }

  populateForm(employee) {
    this.editEmployeeId = employee._id;
    this.form.patchValue(_.omit(employee, ['lessons', '_id']));
  }

  userAuthentication(email: string, password: string) {
    const data = JSON.stringify({email, password});
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL + '/users/signin', data, {headers: reqHeader});
  }

  getInstructorLessons(token: string, date: string) {
    const header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/users/userLessons/' + date, {headers: header});
  }

  // getLessons(token: string) {
  //   const header = new HttpHeaders().set('auth-token', token);
  //   return this.http.get(this.apiURL + '/users/userLessons', {headers: header});
  // }

  getLoggedInUser(token: string) {
    const header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/users/user', {headers: header});
  }

  getInstructors() {
    return this.http.get(this.apiURL + '/users/instructors');
    // return this.http.get(this.apiURL + '/users');
  }

  getReceptionists() {
    return this.http.get(this.apiURL + '/users/receptionists');
  }

  getAdmins() {
    return this.http.get(this.apiURL + '/users/admins');
  }

  getRules() {
    return this.http.get(this.apiURL + '/users/rules');
  }

}
