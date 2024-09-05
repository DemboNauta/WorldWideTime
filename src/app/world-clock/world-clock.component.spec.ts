import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldClockComponent } from './world-clock.component';

describe('WorldClockComponent', () => {
  let component: WorldClockComponent;
  let fixture: ComponentFixture<WorldClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
