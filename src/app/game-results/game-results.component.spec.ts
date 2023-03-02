import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NbaService } from '../nba.service';
import { GameResultsComponent } from './game-results.component';

const mockParamMap = {
  get: (s) => 'teamAbbr',
} as ParamMap;

describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;
  let nbaServiceSpy: jasmine.SpyObj<NbaService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    nbaServiceSpy = jasmine.createSpyObj('NbaService', [
      'getTrackedTeams',
      'getLastResults',
    ]);
    nbaServiceSpy.getTrackedTeams.and.returnValue([]);
    nbaServiceSpy.getLastResults.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [GameResultsComponent],
      providers: [{ provide: NbaService, useValue: nbaServiceSpy }],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    spyOnProperty(activatedRoute, 'paramMap').and.returnValue(of(mockParamMap));

    fixture = TestBed.createComponent(GameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
