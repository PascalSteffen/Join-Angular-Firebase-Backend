import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';

@Component({
  selector: 'app-set-unset-admin',
  templateUrl: './set-unset-admin.component.html',
  styleUrls: ['./set-unset-admin.component.scss']
})

export class SetUnsetAdminComponent implements OnInit {

  public allUsers$: Observable<DocumentData[]>

  userId: string;
  username: string;
  ifAdmin: boolean;

  constructor(public firebaseService: FirebaseService,
    public authService: AuthService,
    public firestore: Firestore,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.allUsers$ = this.firebaseService.getAllUsers();
    this.firebaseService.initAllUsers();
  }

}
