import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Lesson} from '../models/lesson.model';

@Injectable()
export class LessonService {
  readonly apiURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  // data to add lesson
  instructorId: string;
  date: string;
  hour: string;

  lessonForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    customerSurname: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    customerAge: new FormControl('', Validators.required),
    customerQuantity: new FormControl(null, Validators.required),
    date: new FormControl('', Validators.required),
    hour: new FormControl(0, Validators.required),
    instructor: new FormControl(0, Validators.required)
  });

  getLessons(date: string) {
    return this.http.get(this.apiURL + '/lessons/' + date);
  }

  populateFormAdding(dataToPopulateForm) {
    this.lessonForm.patchValue({
      date: dataToPopulateForm.date,
      hour: ((dataToPopulateForm.lessonHour + 9) + ':00'),
      instructor: (dataToPopulateForm.instructor.name + ' ' + dataToPopulateForm.instructor.surname)
    });
    this.instructorId = dataToPopulateForm.instructor._id;
    this.date = dataToPopulateForm.date;
    this.hour = ((dataToPopulateForm.lessonHour + 9) + ':00');
  }

  addLesson(lesson: Lesson) {
    const lessonBody: Lesson = {
      customerName: lesson.customerName,
      customerSurname: lesson.customerSurname,
      phone: lesson.phone,
      customerAge: lesson.customerAge,
      customerQuantity: lesson.customerQuantity,
      date: this.date,
      hour: this.hour,
      instructor: this.instructorId
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL + '/lessons/addLesson', lessonBody, {headers: reqHeader});
  }


  deleteLesson(lessonId: string) {
    return this.http.delete(this.apiURL + '/lessons/deleteLesson/' + lessonId) ;
  }
}
