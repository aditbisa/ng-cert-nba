import { Component, Input, OnInit } from '@angular/core';
import { mergeMap, Observable, ReplaySubject, startWith, tap } from 'rxjs';

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
  stats: Stats = {} as Stats;

  nbOfDaysSubject = new ReplaySubject<number>(1);

  constructor(protected nbaService: NbaService, private modal: ModalService) {}

  ngOnInit(): void {
    this.games$ = this.nbOfDaysSubject.asObservable().pipe(
      mergeMap((nbOfDays) => {
        return this.nbaService.getLastResults(this.team, nbOfDays);
      }),
      tap(
        (games) =>
          (this.stats = this.nbaService.getStatsFromGames(games, this.team))
      ),
      startWith([])
    );
  }

  nbOfDaysChange(nbOfDays: number) {
    this.nbOfDaysSubject.next(nbOfDays);
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
