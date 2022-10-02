import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllCalendarEventsComponent } from './show-all-calendar-events.component';

describe('ShowAllCalendarEventsComponent', () => {
  let component: ShowAllCalendarEventsComponent;
  let fixture: ComponentFixture<ShowAllCalendarEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllCalendarEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllCalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
