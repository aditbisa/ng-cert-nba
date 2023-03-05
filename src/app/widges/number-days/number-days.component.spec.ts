import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberDaysComponent } from './number-days.component';

describe('NumberDaysComponent', () => {
  let component: NumberDaysComponent;
  let fixture: ComponentFixture<NumberDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberDaysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
