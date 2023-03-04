import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Team } from '../data.models';
import { NbaService } from '../nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent {
  teams$: Observable<Team[]>;
  allTeams: Team[] = [];
  allConferences: string[] = [];
  allDivisions: string[] = [];

  constructor(protected nbaService: NbaService) {
    this.teams$ = nbaService.getAllTeams().pipe(
      tap((data) => {
        this.allTeams = data;
        this.allConferences = data
          .map((team) => team.conference)
          .filter((v, i, a) => a.indexOf(v) === i);
        this.allDivisions = data
          .map((team) => team.division)
          .filter((v, i, a) => a.indexOf(v) === i);
        console.log(this.allConferences);
        console.log(this.allDivisions);
      })
    );
  }

  trackTeam(teamId: string): void {
    let team = this.allTeams.find((team) => team.id == Number(teamId));
    if (team) this.nbaService.addTrackedTeam(team);
  }

  getTrackedTeams(): Team[] {
    return this.nbaService.getTrackedTeams();
  }
}
