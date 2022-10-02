import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEventService } from 'src/app/shared/services/calendarEvent-service/calendar-event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {

  calendarEvent: any = this.calendarEventService.eventDefault();

  constructor(public calendarEventService: CalendarEventService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /*   openDeleteCurrentEventDialog() {
      const dialogRef = this.dialog.open(DeleteCurrenEventComponent);
    } */

}
