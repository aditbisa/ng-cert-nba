import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Team, Stats } from '../data.models';
import { NbaService } from '../nba.service';
import { TeamStatsComponent } from './team-stats.component';

const mockTeam = {
  full_name: 'full_name',
  conference: 'conference',
  abbreviation: 'abbreviation',
} as Team;
const mockStats = {
  averagePointsScored: 0,
  averagePointsConceded: 0,
  lastGames: ['W'],
} as Stats;

describe('TeamStatsComponent', () => {
  let component: TeamStatsComponent;
  let fixture: ComponentFixture<TeamStatsComponent>;
  let nbaServiceSpy: jasmine.SpyObj<NbaService>;

  beforeEach(async () => {
    nbaServiceSpy = jasmine.createSpyObj('NbaService', [
      'getLastResults',
      'getStatsFromGames',
    ]);
    nbaServiceSpy.getLastResults.and.returnValue(of([]));
    nbaServiceSpy.getStatsFromGames.and.returnValue(mockStats);

    await TestBed.configureTestingModule({
      declarations: [TeamStatsComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: NbaService, useValue: nbaServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamStatsComponent);
    component = fixture.componentInstance;
    component.team = mockTeam;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
