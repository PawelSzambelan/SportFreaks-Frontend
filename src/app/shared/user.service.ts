import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable()
export class UserService {
  readonly apiURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }


  registerUser(user: User) {
    const userBody: User = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      phone: user.phone,
      rule: user.rule,
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL + '/users/signup', userBody, {headers: reqHeader});
  }

  userAuthentication(email: string, password: string) {
    const data = JSON.stringify({email, password});
    console.log(data);
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
