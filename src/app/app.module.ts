import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './core/pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './core/pages/quiz/quiz.component';
import { InfoComponent } from './core/pages/info/info.component';
import { ControlsComponent } from './core/pages/controls/controls.component';
import { AdminComponent } from './core/pages/adminpanel/admin.component';
import { DemoComponent } from './core/pages/demo/demo.component';
import { HalloffameComponent } from './core/pages/halloffame/halloffame.component';
import { NavComponent } from './nav/nav.component';
import { AddQuestionComponent } from './core/pages/adminpanel/addquestion/addquestion.component';
import { AddPlayerComponent } from './core/pages/adminpanel/addplayer/addplayer.component';
import { AddTeamComponent } from './core/pages/adminpanel/addteam/addteam.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    InfoComponent,
    ControlsComponent,
    AdminComponent,
    DemoComponent,
    HalloffameComponent,
    NavComponent,
    AddQuestionComponent,
    AddPlayerComponent,
    AddTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
