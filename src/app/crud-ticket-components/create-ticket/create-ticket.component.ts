import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Ticket } from 'src/app/shared/interfaces/ticket';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})

export class CreateTicketComponent implements OnInit {

  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  currentTicketNumber: number;
  ticket: Ticket = this.ticketService.ticketDefault();
  allChatMessages: any = [];
  ticketId: string;
  newMessage: string;
  currentDate = new Date().getTime();

  constructor(public ticketService: TicketService, public firebaseService: FirebaseService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  newTicket(user: string, message: string) {
    let newMessage = {
      date: this.currentDate,
      from: user,
      message: message
    }
    this.allChatMessages.push(newMessage);
    this.firebaseService.saveTicket(this.currentTicketNumber, this.currentDate, user, this.ticket, newMessage);
  }
}
