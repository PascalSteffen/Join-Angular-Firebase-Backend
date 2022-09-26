import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';
import { SetUnsetAdminComponent } from 'src/app/user-components/set-unset-admin/set-unset-admin.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {

  public allUsers$: Observable<DocumentData[]>
  userId: string;
  ifAdmin: boolean;
  name: string;
  loading: boolean = false;

  constructor(public authService: AuthService,
    public firestore: Firestore,
    public dialog: MatDialog,
    public firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.allUsers$ = this.firebaseService.getAllUsers()
    this.allUsers$.subscribe(allUsers => {
      this.checkIfAdmin(allUsers)
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.firebaseService.initAllUsers();
  }


  /**
   * check if the current user an admin.
   * @param allUsers
   */
  checkIfAdmin(allUsers: DocumentData[]) {
    for (let i = 0; i < allUsers.length; i++) {
      const ifAdmin = allUsers[i]['admin'];
      this.ifAdmin = ifAdmin;
    }
  }


  /**
   * update all admins and push the current id's in the dialog.
   * @param user
   */
  openSetUnsetAdminDialog(user: object) {
    const dialogRef = this.dialog.open(SetUnsetAdminComponent);
    dialogRef.componentInstance.userId = user['userId'];
    dialogRef.componentInstance.ifAdmin = user['admin'];
    dialogRef.componentInstance.username = user['displayName'];
  }
}
