import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HronologyComponent } from './hronology.component';

describe('HronologyComponent', () => {
  let component: HronologyComponent;
  let fixture: ComponentFixture<HronologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HronologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HronologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
