import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/entities/team/team.model';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
})
export class AddPlayerComponent implements OnInit {
  player!: TeamPlayer;
  subscription!: Subscription;
  teams!: Team[];
  constructor(
    private teamPlayerService: TeamPlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.player = new TeamPlayer('');
  }

  addPlayer(): void {
    this.subscription = this.teamPlayerService.create(this.player).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
