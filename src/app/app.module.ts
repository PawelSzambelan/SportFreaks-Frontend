import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserService} from './shared/user.service';
import {DateService} from 'src/app/shared/date.service';
import {AuthGuard} from './auth/auth.guard';


import {MainPageComponent} from './main-page/main-page.component';
import {InstructorPageComponent} from './instructor-page/instructor-page.component';
import { ReceptionistPageComponent } from './receptionist-page/receptionist-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InstructorPageComponent,
    ReceptionistPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    DateService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
