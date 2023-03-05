import { Component } from '@angular/core';

import { Team } from '../data.models';
import { NbaService } from '../nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent {
  allTeams: Team[] = [];
  allConferences: string[] = [];

  loading = true;
  conference = '';
  division = '';
  filteredDivisions: string[] = [];
  filteredTeams: Team[] = [];

  constructor(protected nbaService: NbaService) {
    nbaService.getAllTeams().subscribe((data) => {
      this.allTeams = data;
      this.allTeams.sort((a, b) => {
        if (a.full_name < b.full_name) return -1;
        if (a.full_name > b.full_name) return 1;
        return 0;
      });

      this.allConferences = data
        .map((team) => team.conference)
        .filter((v, i, a) => a.indexOf(v) === i);
      this.allConferences.sort();

      this.loading = false;
      this.filterByConference();
    });
  }

  filterByConference() {
    this.filteredDivisions = this.allTeams
      .filter((team) =>
        this.conference ? team.conference == this.conference : true
      )
      .map((team) => team.division)
      .filter((v, i, a) => a.indexOf(v) === i);

    if (!this.filteredDivisions.includes(this.division)) {
      this.division = '';
      this.filterByDivision();
    }
  }

  filterByDivision() {
    this.filteredTeams = this.allTeams.filter((team) => {
      let check = true;
      if (this.conference) check = check && team.conference == this.conference;
      if (this.division) check = check && team.division == this.division;
      return check;
    });
  }

  trackTeam(teamId: string): void {
    let team = this.allTeams.find((team) => team.id == Number(teamId));
    if (team) this.nbaService.addTrackedTeam(team);
  }

  getTrackedTeams(): Team[] {
    return this.nbaService.getTrackedTeams();
  }
}
