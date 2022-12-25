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
  achievements!: any[];
  constructor(
    private teamPlayerService: TeamPlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.player = new TeamPlayer('');
    // ATTENTION: Episode wins go here
    this.achievements = [
      { id: 1, selected: false, value: '🏆' },
      { id: 2, selected: false, value: '🌊' },
    ];
  }

  onChange($event: any) {
    const value = $event.target.value;
    const isChecked = $event.target.checked;

    if (isChecked) {
      this.player.achievements.push(value);
      console.log(this.player.achievements);
    } else {
      const index = this.player.achievements.indexOf(value);
      this.player.achievements.splice(index, 1);
    }
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
