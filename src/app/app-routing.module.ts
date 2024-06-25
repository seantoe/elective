import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { VisitorComponent } from './visitor/visitor.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { StudentComponent } from './student/student.component';
import { StudentViolationComponent } from './student-violation/student-violation.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'first', component: FirstComponent},
  { path: 'visitor', component: VisitorComponent},
  { path: 'visitor-list', component: VisitorListComponent},
  { path: 'student', component: StudentComponent},
  { path: 'student-violation', component: StudentViolationComponent},
  { path: '**', component: NotFoundComponent},
  { path: 'visitor/edit/:id', component: VisitorComponent},
  { path: 'logout', component: LogoutComponent },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
