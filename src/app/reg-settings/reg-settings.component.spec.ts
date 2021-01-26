import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSettingsComponent } from './reg-settings.component';

describe('RegSettingsComponent', () => {
  let component: RegSettingsComponent;
  let fixture: ComponentFixture<RegSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
