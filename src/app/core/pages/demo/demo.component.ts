import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlsService } from '../controls/controls.service';
import { Router } from '@angular/router';
import { Team } from 'src/app/entities/team/team.model';
import { Question } from 'src/app/entities/questions/question.model';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  teams: Team[] | null = null;
  team!: Team;
  team1!: Team;
  team2!: Team;
  question!: Question;
  questions: Question[] | null = null;
  count: number = 1;
  teamPlayers: TeamPlayer[] | null = null;
  roundPoints: number = 0;
  team1Turn: boolean = false;
  team2Turn: boolean = false;
  pointsEnabled: boolean = true;
  timeRemaining: number = 30;
  timerActive: boolean = false;

  constructor(
    private controlsService: ControlsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.team1 = {
      id: 1,
      teamName: 'Steve',
      points: 0,
      strikes: 0,
      isPlaying: false,
    };
    this.team2 = {
      id: 2,
      teamName: 'Harvey',
      points: 0,
      strikes: 0,
      isPlaying: false,
    };
    this.questions = [
      {
        id: 1,
        questionTitle: 'Name a name that is fitting for a demo',
        answer1: 'Demo',
        answer2: 'Demo 2',
        answer3: 'Demo 3: The demo',
        answer4: 'Demo 4',
        answer5: 'Demo: Reborn',
        answer6: 'Demo: Reborn 2',
        answer7: 'Demo 5',
        answer8: 'Demo: busted',
        points1: 20,
        points2: 18,
        points3: 16,
        points4: 14,
        points5: 12,
        points6: 10,
        points7: 8,
        points8: 2,
        totalPoints: 100,
      },
      {
        id: 2,
        questionTitle: 'What is the name of the demo?',
        answer1: 'Demo',
        answer2: 'Demo 2',
        answer3: 'Demo 3: The demo',
        answer4: 'Demo 4',
        answer5: 'Demo: Reborn',
        answer6: 'Demo: Reborn 2',
        answer7: 'Demo 5',
        answer8: 'Demo: busted',
        points1: 20,
        points2: 18,
        points3: 16,
        points4: 14,
        points5: 12,
        points6: 10,
        points7: 8,
        points8: 2,
        totalPoints: 100,
      },
    ];
    this.teamPlayers = [
      {
        id: 1,
        teamId: 1,
        playerName: 'Steve',
        theirTurn: false,
      },
      {
        id: 2,
        teamId: 1,
        playerName: 'Harvey',
        theirTurn: false,
      },
      {
        id: 3,
        teamId: 2,
        playerName: 'Steve',
        theirTurn: false,
      },
      {
        id: 4,
        teamId: 2,
        playerName: 'Harvey',
        theirTurn: false,
      },
    ];
  }

  giveStrike() {
    var team1Selected = document.getElementById('team-box-1');
    var team2Selected = document.getElementById('team-box-2');
    var team1Points = document.getElementById('team-points-1');
    var team2Points = document.getElementById('team-points-2');
    var bigStrike = document.getElementById('big-strike');
    if (this.team1Turn === true && this.team1.strikes < 3) {
      this.team1.strikes += 1;
      bigStrike!.style.visibility = 'visible';
      setTimeout(() => {
        bigStrike!.style.visibility = 'hidden';
      }, 500);

      if (this.team2.strikes === 3 && this.team1.strikes === 1) {
        this.team2Turn = true;
        this.team1Turn = false;
        team1Selected!.style.borderColor = '#cccccc';
        team2Selected!.style.borderColor = '#00ff00';
        team1Points!.style.borderColor = '#cccccc';
        team2Points!.style.borderColor = '#00ff00';
        this.disablePoints();
      } else if (this.team1.strikes === 3) {
        this.team2Turn = true;
        this.team1Turn = false;
        team1Selected!.style.borderColor = '#cccccc';
        team2Selected!.style.borderColor = '#00ff00';
        team1Points!.style.borderColor = '#cccccc';
        team2Points!.style.borderColor = '#00ff00';
      }
      this.controlsService.playStrike();
    } else if (this.team2Turn === true && this.team2.strikes < 3) {
      this.team2.strikes += 1;
      bigStrike!.style.visibility = 'visible';
      setTimeout(() => {
        bigStrike!.style.visibility = 'hidden';
      }, 500);
      if (this.team1.strikes === 3 && this.team2.strikes === 1) {
        this.team1Turn = true;
        this.team2Turn = false;
        team2Selected!.style.borderColor = '#cccccc';
        team1Selected!.style.borderColor = '#00ff00';
        team2Points!.style.borderColor = '#cccccc';
        team1Points!.style.borderColor = '#00ff00';
        this.disablePoints();
      } else if (this.team2.strikes === 3) {
        this.team1Turn = true;
        this.team2Turn = false;
        team1Selected!.style.borderColor = '#00ff00';
        team2Selected!.style.borderColor = '#cccccc';
        team1Points!.style.borderColor = '#00ff00';
        team2Points!.style.borderColor = '#cccccc';
      }
      this.controlsService.playStrike();
    }
  }

  nextQuestion() {
    if (this.count < 2) {
      var double = document.getElementById('double-points');
      double!.style.visibility = 'visible';
    }
    if (this.team1Turn === true) {
      this.team1.points += this.roundPoints;
      this.team1.strikes = 0;
    } else if (this.team2Turn === true) {
      this.team2.points += this.roundPoints;
      this.team2.strikes = 0;
    }
    if (this.count < this.questions!.length) {
      this.count++;
      this.pointsEnabled = true;
      this.roundPoints = 0;
      this.team1Turn = false;
      this.team2Turn = false;
      this.team1.strikes = 0;
      this.team2.strikes = 0;
      var team1Selected = document.getElementById('team-box-1');
      var team2Selected = document.getElementById('team-box-2');
      var team1Points = document.getElementById('team-points-1');
      var team2Points = document.getElementById('team-points-2');
      var button = document.getElementById('show-title-button');
      var selectTeam = document.getElementById('select-teams');
      var lock = document.getElementById('lock-points');
      var timer = document.getElementById('timer');
      lock!.style.visibility = 'hidden';
      button!.style.visibility = 'visible';
      team1Selected!.style.borderColor = '#cccccc';
      team2Selected!.style.borderColor = '#cccccc';
      team1Points!.style.borderColor = '#cccccc';
      team2Points!.style.borderColor = '#cccccc';
      selectTeam!.style.visibility = 'visible';
      timer!.style.visibility = 'hidden';
    } else {
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  disablePoints() {
    var lock = document.getElementById('lock-points');
    lock!.style.visibility = 'visible';
    this.pointsEnabled = false;
  }

  toggleTitle() {
    var button = document.getElementById('show-title-button');
    var title = document.getElementById('question-title');

    title!.style.visibility = 'visible';
    button!.style.visibility = 'hidden';
  }

  toggleAnswer(number: Number) {
    var answer = document.getElementById(`answer-` + number);
    var points = document.getElementById(`points-` + number);
    var button = document.getElementById(`btn-answer-` + number);

    answer!.style.visibility = 'visible';
    points!.style.visibility = 'visible';
    button!.style.visibility = 'hidden';

    if (this.pointsEnabled === true) {
      if (this.count < 2) {
        this.roundPoints += parseInt(points!.innerHTML);
      } else if (this.count < 3) {
        this.roundPoints += parseInt(points!.innerHTML) * 2;
      }

      if (this.team1.strikes === 3 && this.team2Turn) {
        this.controlsService.playGoodAnswer();
        setTimeout(() => {
          this.controlsService.playApplause();
        }, 700);
        this.disablePoints();
      } else if (this.team2.strikes === 3 && this.team1Turn) {
        this.controlsService.playGoodAnswer();
        setTimeout(() => {
          this.controlsService.playApplause();
        }, 700);
        this.disablePoints();
      } else {
        this.controlsService.playGoodAnswer();
        setTimeout(() => {
          this.controlsService.playApplause();
        }, 700);
      }
    }
  }

  selectTeam(team: Team) {
    var team1Selected = document.getElementById('team-box-1');
    var team2Selected = document.getElementById('team-box-2');
    var team1Points = document.getElementById('team-points-1');
    var team2Points = document.getElementById('team-points-2');
    var selectedTeam = document.getElementById('select-teams');
    selectedTeam!.style.visibility = 'hidden';
    if (team.id === this.team1.id) {
      team1Selected!.style.borderColor = '#00ff00';
      team1Points!.style.borderColor = '#00ff00';
      this.team1Turn = true;
    } else {
      team2Selected!.style.borderColor = '#00ff00';
      team2Points!.style.borderColor = '#00ff00';
      this.team2Turn = true;
    }
  }

  toggleTimer() {
    if (this.team1Turn === true || this.team2Turn === true) {
      if (this.timerActive === false) {
        this.timerActive = true;
        this.timeRemaining = 30;
        this.controlsService.playTimerTick();
        if (this.timeRemaining > 0) {
          var timer = document.getElementById('timer');
          timer!.style.visibility = 'visible';
          const intervalId = setInterval(() => {
            this.timeRemaining -= 1;

            if (this.timeRemaining < 1) {
              clearInterval(intervalId);
              this.controlsService.playTimerDing();
              this.timerActive = false;
            }
          }, 1000);
        }
      }
    }
  }
  playTheme() {
    this.controlsService.playTheme();
  }
  playBahBow() {
    this.controlsService.playBahBow();
  }
  playFunny() {
    this.controlsService.playFunny();
  }
  playBadum() {
    this.controlsService.playBadum();
  }
  playApplause() {
    this.controlsService.playApplause();
  }
  playLaughtrack() {
    this.controlsService.playLaughtrack();
  }
  playCricket() {
    this.controlsService.playCricket();
  }
  playTrombone() {
    this.controlsService.playTrombone();
  }
  playGoofy() {
    this.controlsService.playGoofy();
  }
  playOoh() {
    this.controlsService.playOoh();
  }
}
