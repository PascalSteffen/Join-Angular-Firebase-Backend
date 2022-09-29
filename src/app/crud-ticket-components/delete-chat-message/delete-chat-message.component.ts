import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';

@Component({
  selector: 'app-delete-chat-message',
  templateUrl: './delete-chat-message.component.html',
  styleUrls: ['./delete-chat-message.component.scss']
})

export class DeleteChatMessageComponent implements OnInit {

  allChatMessages: Object[] = [];
  ticketId: string;
  message: Object;
  ticket: any = this.ticketService.ticketDefault();
  currentDate: number;

  constructor(public ticketService: TicketService, public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.messageIteration();
  }


  /**
   * get all messages from current ticket.
   */
  messageIteration() {
    for (let i = 0; i < this.ticket['messages'].length; i++) {
      const allMessages = this.ticket['messages'][i];
      this.allChatMessages.push(allMessages)
    }
  }


  /**
   * update and push ne messages.
   * @param user
   * @param message
   */
  deleteCurrentMessage() {
    this.allChatMessages.splice(this.allChatMessages.indexOf(this.message), 1);
    this.firebaseService.updateTicket(this.ticketId, this.currentDate, this.ticket, this.allChatMessages);
  }

}
