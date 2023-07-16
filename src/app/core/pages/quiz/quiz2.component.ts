import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Episode } from 'src/app/entities/episodes/episode.model';
import { EpisodeService } from 'src/app/entities/episodes/episode.service';
import {
  Question,
  QuestionSpeciality,
} from 'src/app/entities/questions/question.model';
import { QuestionService } from 'src/app/entities/questions/question.service';
import { Team } from 'src/app/entities/team/team.model';
import { TeamService } from 'src/app/entities/team/team.service';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';
import { ControlsService } from '../controls/controls.service';

@Component({
  selector: 'app-quiz2',
  templateUrl: './quiz2.component.html',
})
export class Quiz2Component implements OnInit, OnDestroy {
  roundPoints = 0;
  team1!: Team;
  team2!: Team;
  teams!: Team[];
  playersTeam1!: TeamPlayer[];
  playersTeam2!: TeamPlayer[];
  teamPlayers!: TeamPlayer[];
  questionNumber: number = 0;
  question!: Question;
  questions!: Question[];
  timeRemaining: number = 0;
  timerActive: boolean = false;
  multiplier: number = 1;
  pointsLocked: boolean = false;
  team1Turn: boolean = false;
  team2Turn: boolean = false;
  isInFaceOff: boolean = true;
  isTitleHidden: boolean = false;
  isStrike: boolean = false;
  episodes!: Episode[];
  activeEpisode!: Episode;
  subscription!: Subscription;

  constructor(
    private controlsService: ControlsService,
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService,
    private questionService: QuestionService,
    private episodeService: EpisodeService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.team1 = {
      _id: '123abc',
      teamName: '',
      teamMembers: [],
      points: 0,
      strikes: 0,
      isPlaying: true,
    };
    this.team2 = {
      _id: '123abc',
      teamName: '',
      teamMembers: [],
      points: 0,
      strikes: 0,
      isPlaying: true,
    };
    this.question = {
      _id: '123abc',
      questionTitle: 'I am a question title',
      answer1: 'I am answer 1',
      answer2: 'I am answer 2',
      answer3: 'I am answer 3',
      answer4: 'I am answer 4',
      answer5: 'I am answer 5',
      answer6: 'I am answer 6',
      answer7: 'I am answer 7',
      answer8: 'I am answer 8',
      points1: 1,
      points2: 2,
      points3: 3,
      points4: 4,
      points5: 5,
      points6: 6,
      points7: 7,
      points8: 8,
      isSpecial: true,
      speciality: QuestionSpeciality.Reverse,
      episode: 3,
    };
    this.timeRemaining = 0;
    this.getEpisodes();
    this.getTeams();
    this.getQuestions();
  }

  async ngOnDestroy() {
    (await this.teamService.list()).subscribe((teams) => {
      for (let i = 0; i < teams!.length; i++) {
        if (teams![i].isPlaying) {
          teams![i].isPlaying = false;
          this.teamService.update(teams![i]).subscribe();
        }
      }
    });
  }

  // Get
  async getTeams() {
    this.teams = [];
    this.subscription = (await this.teamService.list()).subscribe({
      next: (teams) => {
        for (let i = 0; i < teams!.length; i++) {
          if (teams![i].isPlaying) {
            this.teams.push(teams![i]);
          }
        }
        if (this.teams.length != 2) {
          alert('You are not allowed to be here!');
          this.router.navigate(['/']);
        } else {
          this.team1 = this.teams[0];
          this.team2 = this.teams[1];
          console.log('Team 1: ' + this.team1.teamName);
          console.log('Team 2: ' + this.team2.teamName);
          this.getTeamPlayers();
        }
      },
    });
  }

  async getTeamPlayers() {
    this.teamPlayers = [];
    this.playersTeam1 = [];
    this.playersTeam2 = [];
    this.subscription = (await this.teamPlayerService.list()).subscribe(
      (players) => {
        for (let i = 0; i < players!.length; i++) {
          if (players![i].playerTeam == this.team1._id) {
            this.playersTeam1.push(players![i]);
          } else if (players![i].playerTeam == this.team2._id) {
            this.playersTeam2.push(players![i]);
          }
        }
        console.log('Team 1 players: ' + this.playersTeam1.length);
        console.log('Team 2 players: ' + this.playersTeam2.length);
      }
    );
  }

  async getQuestions() {
    this.questions = [];
    this.subscription = (await this.questionService.list()).subscribe(
      (questions) => {
        for (let i = 0; i < questions!.length; i++) {
          if (questions![i].episode == this.activeEpisode.episodeNumber) {
            this.questions.push(questions![i]);
          }
        }
        console.log('Questions: ' + this.questions.length);
        this.question = this.questions[this.questionNumber];
      }
    );
  }

  async getEpisodes() {
    this.episodes = [];
    this.subscription = (await this.episodeService.list()).subscribe({
      next: (episodes) => {
        this.episodes = episodes!;
        console.log('Episodes: ' + this.episodes.length);
        this.activeEpisode = this.episodes.find(
          (episode) => episode.isActive == true
        )!;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  async nextQuestion() {
    if (this.questionNumber + 1 < this.questions.length / 3) {
      this.multiplier = 1;
    } else if (this.questionNumber + 1 < (this.questions.length / 3) * 2) {
      this.multiplier = 2;
    } else {
      this.multiplier = 3;
    }
    this.awardPoints();
    this.closeAll();
    this.resetGame();
    this.questionNumber++;

    (await this.teamService.update(this.team1)).subscribe();
    (await this.teamService.update(this.team2)).subscribe();

    if (this.questionNumber == this.questions.length) {
      console.log('team1: ' + this.team1.points);
      console.log('team2: ' + this.team2.points);

      // update teams + give achievements to players
      this.router.navigate(['/quiz/final']);
      this.controlsService.playOutro();
    } else {
      this.question = this.questions[this.questionNumber];
      if (this.question.isSpecial) {
        if (this.question.speciality == QuestionSpeciality.Reverse) {
          this.roundPoints = 100 * this.multiplier + 100;
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
      this.roundPoints += num * this.multiplier;
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
    if (this.question.speciality == QuestionSpeciality.Reverse) {
      this.pointsLocked = true;
    }
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
        this.deductFromRoundPoints(parseInt(z!.innerHTML) * this.multiplier);
      }
      // ATTENTION: New specialities go here
      if (this.question.speciality == 'AI') {
        this.addToRoundPoints(parseInt(z!.innerHTML));
      }
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
  playPipes() {
    this.controlsService.playPipes();
  }
  playShadow() {
    this.controlsService.playShadow();
  }
}
