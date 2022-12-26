import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EpisodeService } from 'src/app/entities/episodes/episode.service';
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
    private episodeService: EpisodeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.player = new TeamPlayer('');
    // ATTENTION: Episode wins go here
    this.achievements = [];
    this.getEpisodeAchievements();
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

  async getEpisodeAchievements() {
    (await this.episodeService.list()).subscribe((episodes) => {
      if (episodes) {
        for (let i = 0; i < episodes.length; i++) {
          this.achievements.push({
            name: episodes[i].episodeTitle,
            selected: false,
            value: episodes[i].episodeAchievement,
            id: episodes[i].episodeNumber,
          });
        }
      }
    });
  }
}
