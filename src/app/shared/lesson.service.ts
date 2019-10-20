import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LessonService {
  readonly apiURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }


}
