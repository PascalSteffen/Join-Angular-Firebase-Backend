import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';

@Component({
  selector: 'app-delete-calendar-event',
  templateUrl: './delete-calendar-event.component.html',
  styleUrls: ['./delete-calendar-event.component.scss']
})

export class DeleteCalendarEventComponent implements OnInit {

  eventId: string;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {

  }

}
