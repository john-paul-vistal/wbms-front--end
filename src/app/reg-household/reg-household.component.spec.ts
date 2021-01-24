import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegHouseholdComponent } from './reg-household.component';

describe('RegHouseholdComponent', () => {
  let component: RegHouseholdComponent;
  let fixture: ComponentFixture<RegHouseholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegHouseholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
