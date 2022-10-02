import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SignUpComponent } from '../auth-components/sign-up/sign-up.component';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { FirebaseService } from '../shared/services/firebase-service/firebase.service';
import { TicketService } from '../shared/services/ticket-service/ticket.service';
import { EditUserComponent } from '../user-components/edit-user/edit-user.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})

export class MainContentComponent implements OnInit {

  public allUsers$: Observable<DocumentData[]>;
  public allTickets$: Observable<DocumentData[]>;
  public allCalendarEvents$: Observable<DocumentData[]>;
  public allTasks$: Observable<DocumentData[]>;

  showFiller = false;

  constructor(public authService: AuthService,
    public firestore: Firestore,
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    public ticketService: TicketService) { }


  ngOnInit(): void {
    this.allCalendarEvents$ = this.firebaseService.getAllCalendarEvents();
    this.firebaseService.initAllCalendarEvents();

    this.allUsers$ = this.firebaseService.getAllUsers();
    this.firebaseService.initAllUsers();

    this.allTasks$ = this.firebaseService.getAllTasks();
    this.firebaseService.initAllTasks();

    this.allTickets$ = this.firebaseService.getAllTickets();
    this.allTickets$.subscribe(allTickets => {
      this.ticketService.allTicketsLength = allTickets.length
    })
    this.firebaseService.initAllTickets();
  }


  openEditUser() {
    const dialogRef = this.dialog.open(EditUserComponent);
  }


  openAddNewUser() {
    const dialogRef = this.dialog.open(SignUpComponent);
  }

}
