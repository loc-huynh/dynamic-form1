import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { AnswerComponent } from './pages/answer/answer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form/builder',
    pathMatch: 'full',
  }, {
    path: 'form/builder',
    component: FormComponent,
  }, {
    path: 'form/answer',
    component: AnswerComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
