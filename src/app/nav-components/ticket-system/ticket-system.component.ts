import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateTicketComponent } from 'src/app/crud-ticket-components/create-ticket/create-ticket.component';
import { TicketChatComponent } from 'src/app/crud-ticket-components/ticket-chat/ticket-chat.component';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-ticket-system',
  templateUrl: './ticket-system.component.html',
  styleUrls: ['./ticket-system.component.scss']
})

export class TicketSystemComponent implements OnInit {

  public allTickets$: Observable<DocumentData[]>;
  public allUsers$: Observable<DocumentData[]>
  name: string;
  currentTicketNumber: number = 1;
  loading: boolean = false;

  constructor(public dialog: MatDialog,
    public firebaseService: FirebaseService,
    public ticketService: TicketService,
    public authService: AuthService,
    public router: Router,
    public utilityService: UtilityServiceService) { }

  ngOnInit(): void {
    this.allUsers$ = this.firebaseService.getAllUsers();
    this.firebaseService.initAllUsers();
    this.allTickets$ = this.firebaseService.getAllTickets();
    this.allTickets$.subscribe(allTickets => {
      this.currentTicketNumber = allTickets.length;
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.firebaseService.initAllTickets();
  }


  openCreateTicketDialog() {
    const dialogRef = this.dialog.open(CreateTicketComponent);
    dialogRef.componentInstance.currentTicketNumber = this.currentTicketNumber;
  }


  openTicketChatDialog(ticket: Object) {
    const dialogRef = this.dialog.open(TicketChatComponent);
    dialogRef.componentInstance.ticketId = ticket['ticketId'];
    dialogRef.componentInstance.ticket = ticket['ticket'];
  }


  /**
   * open current ticket. A admin can open all tickets, but not a normal user.
   * @param ticketUser
   * @param currentUser
   * @param currentUserId
   * @param userId
   * @param admin
   * @param ticketRoute
   */
  openTicket(ticketUser: string, currentUser: string, currentUserId: string, userId: string, admin: string, ticketRoute: string) {
    if (ticketUser == currentUser || currentUserId == userId && admin) {
      this.router.navigate(['tickets/' + ticketRoute], {
        skipLocationChange: true
      });
    } else {
      this.utilityService.alert('You do not have enough rights for this ticket.', 5000);
    }
  }

}
