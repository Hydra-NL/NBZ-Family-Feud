import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/entities/episodes/episode.model';
import { EpisodeService } from 'src/app/entities/episodes/episode.service';

@Component({
  selector: 'app-addepisode',
  templateUrl: './addepisode.component.html',
})
export class AddEpisodeComponent implements OnInit {
  episode!: Episode;
  episodes!: Episode[];
  constructor(private episodeService: EpisodeService) {}

  ngOnInit() {
    this.episode = new Episode('');
    this.getEpisodes();
  }

  addEpisode() {
    if (
      !/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(
        this.episode.episodeAchievement
      )
    ) {
      this.episode.episodeNumber = this.episodes.length + 1;
      this.episodeService.create(this.episode).subscribe({
        next: () => {
          this.episode = new Episode('');
          this.getEpisodes();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      alert('The achievement must be an emoji (WIN + .)');
    }
  }

  async getEpisodes() {
    this.episodes = [];
    (await this.episodeService.list()).subscribe((episodes) => {
      this.episodes = episodes!;
      console.log(this.episodes.length);
    });
  }
}
