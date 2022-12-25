import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '../../core/entity/entity.service';
import { Episode } from './episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService extends EntityService<Episode> {
  constructor(protected override http: HttpClient) {
    super(http, environment.apiUrl, 'episode');
  }

  episodes: Episode[] = [
    {
      _id: '1',
      episodeTitle: 'Episode 1',
      episodeNumber: 1,
      episodeAchievement: '🏆',
      isActive: false,
    },
    {
      _id: '2',
      episodeTitle: 'Episode 2',
      episodeNumber: 2,
      episodeAchievement: '🌊',
      isActive: false,
    },
    {
      _id: '3',
      episodeTitle: 'Episode 3',
      episodeNumber: 3,
      episodeAchievement: '🎅',
      isActive: false,
    },
  ];
}
