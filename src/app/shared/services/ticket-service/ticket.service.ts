import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  allTicketsLength: number;
  currentDate = new Date().getTime();

  constructor() { }

  ticketDefault() {
    return {
      no: 1,
      date: this.currentDate,
      from: '',
      title: '',
      messages: [{
        from: '',
        date: this.currentDate,
        messages: ''
      }],
      assignedTo: '',
    }
  }

}
