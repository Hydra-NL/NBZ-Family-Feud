import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/entities/team/team.model';
import { TeamService } from 'src/app/entities/team/team.service';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
})
export class AddTeamComponent implements OnInit {
  team!: Team;
  subscription!: Subscription;
  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {
    this.team = new Team('');
  }

  addTeam(): void {
    this.subscription = this.teamService.create(this.team).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
