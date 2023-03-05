import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { NbaService } from '../nba.service';
import { GameStatsComponent } from './game-stats.component';

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;
  let nbaServiceSpy: jasmine.SpyObj<NbaService>;

  beforeEach(async () => {
    nbaServiceSpy = jasmine.createSpyObj('NbaService', [
      'getAllTeams',
      'addTrackedTeam',
      'getTrackedTeams',
    ]);
    nbaServiceSpy.getAllTeams.and.returnValue(of([]));
    nbaServiceSpy.getTrackedTeams.and.returnValue([]);

    await TestBed.configureTestingModule({
      declarations: [GameStatsComponent],
      imports: [FormsModule],
      providers: [{ provide: NbaService, useValue: nbaServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
