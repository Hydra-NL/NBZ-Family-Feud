import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './core/pages/adminpanel/admin.component';
import { ControlsComponent } from './core/pages/controls/controls.component';
import { HomeComponent } from './core/pages/home/home.component';
import { InfoComponent } from './core/pages/info/info.component';
import { QuizComponent } from './core/pages/quiz/quiz.component';
import { DemoComponent } from './core/pages/demo/demo.component';
import { HalloffameComponent } from './core/pages/halloffame/halloffame.component';
import { AddQuestionComponent } from './core/pages/adminpanel/addquestion/addquestion.component';
import { AddPlayerComponent } from './core/pages/adminpanel/addplayer/addplayer.component';
import { AddTeamComponent } from './core/pages/adminpanel/addteam/addteam.component';

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
      {
        path: 'quiz',
        children: [
          { path: '', component: QuizComponent },
        ],
      },
      {
        path: 'admin',
        children: [
          { path: '', component: AdminComponent },
          { path: 'addquestion', component: AddQuestionComponent},
          { path: 'addplayer', component: AddPlayerComponent},
          { path: 'addteam', component: AddTeamComponent},
        ],
      },
      { path: 'halloffame', component: HalloffameComponent},
      { path: 'demo', component: DemoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
