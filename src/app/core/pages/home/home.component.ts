import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team1 } from 'src/app/entities/team1/team1.model';
import { Team2 } from 'src/app/entities/team2/team2.model';
import { TeamService } from 'src/app/entities/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  team1!: Team1;
  saveTeam1: boolean = false;

  team2!: Team2;
  saveTeam2: boolean = false;
  ngOnInit(): void {
    this.team1 = {
      id: 0,
      team1L: '',
      teamM2: '',
      teamM3: '',
      teamM4: '',
      teamM5: '',
    };
    this.team2 = {
      id: 0,
      team2L: '',
      team2M2: '',
      team2M3: '',
      team2M4: '',
      team2M5: '',
    };
  }

  constructor(private router: Router, private teamService: TeamService) {}

  save1() {
    this.saveTeam1 = true;
    this.team1 = {
      id: this.team1.id,
      team1L: this.team1.team1L,
      teamM2: this.team1.teamM2,
      teamM3: this.team1.teamM3,
      teamM4: this.team1.teamM4,
      teamM5: this.team1.teamM5,
    };
    console.log(this.team1);
    this.teamService.addTeam1(this.team1);
  }

  save2() {
    this.saveTeam2 = true;
    this.team2 = {
      id: this.team2.id,
      team2L: this.team2.team2L,
      team2M2: this.team2.team2M2,
      team2M3: this.team2.team2M3,
      team2M4: this.team2.team2M4,
      team2M5: this.team2.team2M5,
    };
    console.log(this.team2);
    this.teamService.addTeam2(this.team2);
  }

  next() {
    this.playTheme();
    if (this.saveTeam1 == true && this.saveTeam2 == true) {
      this.router.navigate(['/quiz']);
    }
  }

  playTheme() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/intro_theme.mp3';
    audio.load();
    audio.play();
  }
}
