import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

import {InstructorPageComponent} from './instructor-main-page/instructor-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ReceptionistPageComponent} from './receptionist-page/receptionist-page.component';
import {SchedulePageComponent} from './receptionist-page/schedule-page/schedule-page.component';
import {WorkersListPageComponent} from './receptionist-page/workers-list-page/workers-list-page.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'instructor', component: InstructorPageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reception', component: ReceptionistPageComponent, canActivate: [AuthGuard],
    children: [
      {path: 'schedule', component: SchedulePageComponent},
      {path: 'workers', component: WorkersListPageComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [MainPageComponent, InstructorPageComponent, ReceptionistPageComponent,
  SchedulePageComponent, WorkersListPageComponent];
