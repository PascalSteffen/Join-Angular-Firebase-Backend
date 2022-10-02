import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CalendarEventService {

  currentDate = new Date().getTime();

  constructor() { }

  eventDefault() {
    return {
      title: '',
      color: '',
      startDate: this.currentDate,
      endDate: this.currentDate,
    }
  }
}
