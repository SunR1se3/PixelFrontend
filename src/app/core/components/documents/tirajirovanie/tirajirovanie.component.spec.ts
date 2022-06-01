import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirajirovanieComponent } from './tirajirovanie.component';

describe('TirajirovanieComponent', () => {
  let component: TirajirovanieComponent;
  let fixture: ComponentFixture<TirajirovanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TirajirovanieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TirajirovanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
