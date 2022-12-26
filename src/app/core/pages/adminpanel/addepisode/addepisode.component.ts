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

  addEpisode() {}

  async getEpisodes() {
    (await this.episodeService.list()).subscribe((episodes) => {
      this.episodes = episodes!;
    });
  }
}
