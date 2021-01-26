import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegReadingComponent } from './reg-reading.component';

describe('RegReadingComponent', () => {
  let component: RegReadingComponent;
  let fixture: ComponentFixture<RegReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegReadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
