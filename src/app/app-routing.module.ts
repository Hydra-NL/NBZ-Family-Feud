import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ControlsComponent } from './core/pages/controls/controls.component';
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
      {
        path: 'info',
        children: [
          { path: '', component: InfoComponent },
          { path: 'controls', component: ControlsComponent },
        ],
      },
      { path: 'quiz', component: QuizComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
