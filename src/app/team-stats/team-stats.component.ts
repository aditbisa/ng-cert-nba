import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Game, Stats, Team } from '../data.models';
import { NbaService } from '../nba.service';
import { ModalService } from '../widges/modal';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
})
export class TeamStatsComponent implements OnInit {
  @Input()
  team!: Team;

  games$!: Observable<Game[]>;
  stats!: Stats;

  constructor(protected nbaService: NbaService, private modal: ModalService) {}

  ngOnInit(): void {
    this.games$ = this.nbaService
      .getLastResults(this.team, 12)
      .pipe(
        tap(
          (games) =>
            (this.stats = this.nbaService.getStatsFromGames(games, this.team))
        )
      );
  }

  async removeTrackedTeam(team: Team) {
    const confirm = await this.modal.show(
      'Untrack Team',
      `Are you sure want to remove team "${team.full_name}"?`,
      'YesNo'
    );
    if (confirm == 'Yes') {
      this.nbaService.removeTrackedTeam(team);
    }
  }
}
