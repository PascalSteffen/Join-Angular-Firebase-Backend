import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEventService } from 'src/app/shared/services/calendarEvent-service/calendar-event.service';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DeleteCalendarEventComponent } from '../delete-calendar-event/delete-calendar-event.component';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-show-all-calendar-events',
  templateUrl: './show-all-calendar-events.component.html',
  styleUrls: ['./show-all-calendar-events.component.scss']
})

export class ShowAllCalendarEventsComponent implements OnInit {

  public allCalendarEvents$: Observable<DocumentData[]>;

  constructor(public calendarEventService: CalendarEventService,
    public firebaseService: FirebaseService,
    public dialog: MatDialog,
    public utilityService: UtilityServiceService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.allCalendarEvents$ = this.firebaseService.getAllCalendarEvents();
    this.firebaseService.initAllCalendarEvents();
  }

  openDeleteEventDialog(event: Object) {
    const dialogRef = this.dialog.open(DeleteCalendarEventComponent);
    dialogRef.componentInstance.eventId = event['eventId'];
  }

  showNoYourEventAlert() {
    this.utilityService.alert('You can only delete your own events.', 5000);
  }

}
