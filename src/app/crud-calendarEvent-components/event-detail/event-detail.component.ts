import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventService } from 'src/app/shared/services/calendarEvent-service/calendar-event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {

  calendarEvent: CalendarEvent[];

  constructor(public calendarEventService: CalendarEventService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
