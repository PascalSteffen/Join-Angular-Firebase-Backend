import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Event } from 'src/app/shared/interfaces/event';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { CalendarEventService } from '../../shared/services/calendarEvent-service/calendar-event.service';
import { FirebaseService } from '../../shared/services/firebase-service/firebase.service';

@Component({
  selector: 'app-add-calendar-event',
  templateUrl: './add-calendar-event.component.html',
  styleUrls: ['./add-calendar-event.component.scss']
})

export class AddCalendarEventComponent implements OnInit {
  titleFormControl = new FormControl('', [Validators.required]);
  startDateFormControl = new FormControl('', [Validators.required]);
  endDateFormControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);

  calendarEvent: Event = this.calendarEventService.eventDefault();
  startDate: Date;
  endDate: Date;

  constructor(public calendarEventService: CalendarEventService, public firebaseService: FirebaseService, public authService: AuthService) { }

  ngOnInit(): void {
  }

}
