import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDoc } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';

@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: ['./ticket-chat.component.scss']
})

export class TicketChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  descriptionFormControl = new FormControl('', [Validators.required]);

  public allUsers$: Observable<DocumentData[]>
  ticket: any = this.ticketService.ticketDefault();
  allChatMessages: any = [];
  ticketId: string;
  newMessage: string;
  currentDate = new Date().getTime();
  loading: boolean = false;


  constructor(private route: ActivatedRoute,
    public firebaseService: FirebaseService,
    public ticketService: TicketService,
    public authService: AuthService,
    public dialog: MatDialog,
    public firestore: Firestore) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.ticketId = paramMap.get('id');
      await this.getTicket();
      this.messageIteration();
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.allUsers$ = this.firebaseService.getAllUsers();
    this.firebaseService.initAllUsers();
    this.scrollToBottom();
  }


  /**
   * get the current Ticket
   *
   */
  async getTicket() {
    const coll = collection(this.firestore, 'tickets');
    const docRef = doc(coll, this.ticketId);
    const docSnap = await getDoc(docRef)
    this.ticket = docSnap.data()['ticket'];
  }


  /**
   * get all messages from DB.
   */
  async messageIteration() {
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
  async newMessages(user: string, message: string) {
    let newMessage = {
      date: this.currentDate,
      from: user,
      message: message
    }
    this.allChatMessages.push(newMessage);
    this.firebaseService.updateTicket(this.ticketId, this.currentDate, this.ticket, this.allChatMessages);
    this.newMessage = '';
    await this.getTicket();
  }


  /**
   * update the current Admin to ticket.
   * @param currentAdmin
   */
  async assignToAdmin(currentAdmin: string) {
    this.firebaseService.updateAssignTo(this.ticketId, this.ticket, currentAdmin);
    await this.getTicket();
  }


  /**
   * scroll auto to bottom in chat.
   */
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

}
