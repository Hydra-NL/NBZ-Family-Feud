import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/pages/home/home.component';
import { InfoComponent } from './core/pages/info/info.component';
import { QuizComponent } from './core/pages/quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'info', component: InfoComponent },
      { path: 'quiz', component: QuizComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
