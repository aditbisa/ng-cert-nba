import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, ReplaySubject } from 'rxjs';

import { Game, Team } from '../data.models';
import { NbaService } from '../nba.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
})
export class GameResultsComponent {
  team?: Team;
  games$?: Observable<Game[]>;
  nbOfDaysSubject = new ReplaySubject<number>(1);

  constructor(
    private activatedRoute: ActivatedRoute,
    private nbaService: NbaService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.team = this.nbaService
        .getTrackedTeams()
        .find((team) => team.abbreviation === paramMap.get('teamAbbr'));
      if (this.team) {
        this.games$ = this.nbOfDaysSubject.asObservable().pipe(
          mergeMap((nbOfDays) => {
            return this.nbaService.getLastResults(this.team as Team, nbOfDays);
          })
        );
      }
    });
  }

  nbOfDaysChange(nbOfDays: number) {
    this.nbOfDaysSubject.next(nbOfDays);
  }
}
