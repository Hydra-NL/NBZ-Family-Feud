import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlsService } from '../controls/controls.service';
import { NavigationStart, Router } from '@angular/router';
import { Team } from 'src/app/entities/team/team.model';
import { Question } from 'src/app/entities/questions/question.model';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { QuestionSpeciality } from 'src/app/entities/questions/question.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  roundPoints = 0;
  team1!: Team;
  team2!: Team;
  playersTeam1!: TeamPlayer[];
  playersTeam2!: TeamPlayer[];
  teamPlayers!: TeamPlayer[];
  questionNumber: number = 0;
  question!: Question;
  questions!: Question[];
  timeRemaining: number = 0;
  timerActive: boolean = false;
  pointsLocked: boolean = false;
  team1Turn: boolean = false;
  team2Turn: boolean = false;
  isInFaceOff: boolean = true;
  isTitleHidden: boolean = false;
  isStrike: boolean = false;

  constructor(
    private controlsService: ControlsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.team1 = {
      _id: '1',
      teamName: 'Steve',
      teamMembers: ['Player 1', 'Player 2'],
      points: 0,
      strikes: 0,
      isPlaying: false,
    };
    this.team2 = {
      _id: '2',
      teamName: 'Harvey',
      teamMembers: ['Player 3', 'Player 4'],
      points: 0,
      strikes: 0,
      isPlaying: false,
    };
    this.questions = [
      {
        _id: '1',
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
        isSpecial: false,
        speciality: QuestionSpeciality.None,
        episode: 1,
      },
      {
        _id: '2',
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
        isSpecial: false,
        speciality: QuestionSpeciality.None,
        episode: 1,
      },
      {
        _id: '3',
        questionTitle: 'Name something that can be put in reverse',
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
        isSpecial: true,
        speciality: QuestionSpeciality.Reverse,
        episode: 1,
      },
    ];
    this.teamPlayers = [
      {
        _id: '1',
        playerName: 'Steve',
        playerTeam: '1',
        isAnswering: false,
        achievements: [''],
      },
      {
        _id: '2',
        playerName: 'Harvey',
        playerTeam: '1',
        isAnswering: false,
        achievements: [''],
      },
      {
        _id: '3',
        playerName: 'Steve',
        playerTeam: '2',
        isAnswering: false,
        achievements: [''],
      },
      {
        _id: '4',
        playerName: 'Harvey',
        playerTeam: '2',

        isAnswering: false,
        achievements: [''],
      },
    ];
    this.playersTeam1 = this.teamPlayers.filter(
      (player) => player.playerTeam == this.team1._id
    );
    this.playersTeam2 = this.teamPlayers.filter(
      (player) => player.playerTeam == this.team2._id
    );
    this.question = this.questions[this.questionNumber];
  }

  // Game actions
  selectTeam(team: Team) {
    var team1 = document.getElementById('team-1');
    var team2 = document.getElementById('team-2');
    this.isInFaceOff = false;

    if (team == this.team1) {
      this.team1Turn = true;
      this.team2Turn = false;
      team1!.classList.add('active');
      team2!.classList.remove('active');
    } else if (team == this.team2) {
      this.team1Turn = false;
      this.team2Turn = true;
      team2!.classList.add('active');
      team1!.classList.remove('active');
    }
  }

  deselectTeam() {
    var team1 = document.getElementById('team-1');
    var team2 = document.getElementById('team-2');
    team1!.classList.remove('active');
    team2!.classList.remove('active');
    this.team1Turn = false;
    this.team2Turn = false;
    this.isInFaceOff = true;
  }

  giveStrike() {
    if (!this.pointsLocked) {
      if (this.team1Turn && this.team1.strikes < 3) {
        this.team1.strikes++;
        this.isStrike = true;
        setTimeout(() => {
          this.isStrike = false;
        }, 900);
        console.log('Team 1 strikes: ' + this.team1.strikes);
        if (this.team2.strikes == 3 && this.team1.strikes == 1) {
          this.selectTeam(this.team2);
          this.pointsLocked = true;
        } else if (this.team1.strikes == 3) {
          this.selectTeam(this.team2);
        }
      } else if (this.team2Turn && this.team2.strikes < 3) {
        this.team2.strikes++;
        this.isStrike = true;
        setTimeout(() => {
          this.isStrike = false;
        }, 900);
        console.log('Team 2 strikes: ' + this.team2.strikes);
        if (this.team1.strikes == 3 && this.team2.strikes == 1) {
          this.selectTeam(this.team1);
          this.pointsLocked = true;
        } else if (this.team2.strikes == 3) {
          this.selectTeam(this.team1);
        }
      }
      this.controlsService.playStrike();
    } else {
      console.log('Points are locked');
    }
  }

  nextQuestion() {
    this.awardPoints();
    this.closeAll();
    this.resetGame();
    this.questionNumber++;

    if (this.questionNumber == this.questions.length) {
      this.router.navigate(['/info']);
    } else {
      this.question = this.questions[this.questionNumber];
      if (this.question.isSpecial) {
        if (this.question.speciality == QuestionSpeciality.Reverse) {
          this.roundPoints = 100 + 100;
          if (this.team1.points > this.team2.points) {
            this.selectTeam(this.team2);
          } else if (this.team2.points > this.team1.points) {
            this.selectTeam(this.team1);
          } else {
            this.isInFaceOff = true;
          }
        }
        // ATTENTION: New specialities go here
      }
    }
  }

  addToRoundPoints(num: number) {
    if (!this.pointsLocked) {
      if (
        (this.team1.strikes == 3 && this.team2Turn) ||
        (this.team2.strikes == 3 && this.team1Turn)
      ) {
        this.pointsLocked = true;
      }
      this.roundPoints += num;
      this.controlsService.playGoodAnswer();
    } else {
      console.log('Points are locked');
    }
  }

  deductFromRoundPoints(num: number) {
    if (!this.pointsLocked) {
      if (
        (this.team1.strikes == 3 && this.team2Turn) ||
        (this.team2.strikes == 3 && this.team1Turn)
      ) {
        this.pointsLocked = true;
      }
      this.roundPoints -= num;
      this.controlsService.playBahBow();
    } else {
      console.log('Points are locked');
    }
  }

  awardPoints() {
    if (this.team1Turn) {
      this.team1.points += this.roundPoints;
    } else if (this.team2Turn) {
      this.team2.points += this.roundPoints;
    }
  }

  // Toggle
  toggleTitle() {
    var x = document.getElementById('question-title');
    var y = document.getElementById('question-title-button');

    x!.style.visibility = 'visible';
    y!.style.visibility = 'hidden';

    this.isTitleHidden = false;
  }

  toggleAnswer(num: number) {
    var x = document.getElementById('answer-' + num);
    var y = document.getElementById('answer-' + num + '-button');
    var z = document.getElementById('points-' + num);

    x!.style.visibility = 'visible';
    y!.style.visibility = 'hidden';
    z!.style.visibility = 'visible';

    if (!this.question.isSpecial) {
      this.addToRoundPoints(parseInt(z!.innerHTML));
    } else if (this.question.isSpecial) {
      if (this.question.speciality == 'Reverse') {
        this.deductFromRoundPoints(parseInt(z!.innerHTML));
      }
      // ATTENTION: New specialities go here
    }
  }

  startTimer() {
    if (this.team1Turn === true || this.team2Turn === true) {
      if (this.timerActive === false) {
        this.timerActive = true;
        console.log('Timer started');
        this.timeRemaining = 30;
        this.controlsService.playTimerTick();
        if (this.timeRemaining > 0) {
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

  // Reset game
  closeAll() {
    var t = document.getElementById('question-title');
    var b = document.getElementById('question-title-button');
    t!.style.visibility = 'hidden';
    b!.style.visibility = 'visible';
    this.isTitleHidden = true;

    for (let i = 1; i < 9; i++) {
      var x = document.getElementById('answer-' + i);
      var y = document.getElementById('answer-' + i + '-button');
      var z = document.getElementById('points-' + i);
      if (x === null || y === null || z === null) return;
      x!.style.visibility = 'hidden';
      y!.style.visibility = 'visible';
      z!.style.visibility = 'hidden';
    }
  }

  resetGame() {
    this.deselectTeam();
    this.team1.strikes = 0;
    this.team2.strikes = 0;
    this.roundPoints = 0;
    this.pointsLocked = false;
    this.isInFaceOff = true;
    this.timerActive = false;
  }

  // Specialities

  // Sounds
  playTheme() {
    this.controlsService.playTheme();
  }
  playBahBow() {
    this.controlsService.playBahBow();
  }
  playFunny() {
    this.controlsService.playFunny();
  }
  playStrike() {
    this.controlsService.playStrike();
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
