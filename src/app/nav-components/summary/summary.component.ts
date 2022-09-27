import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { EditUserComponent } from 'src/app/user-components/edit-user/edit-user.component';
import { FirebaseService } from '../../shared/services/firebase-service/firebase.service';
import { TaskService } from '../../shared/services/task-service/task.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {

  public allTasks$: Observable<DocumentData[]>;
  currentTime: string;
  loading: boolean = false;

  constructor(public firebaseService: FirebaseService,
    public taskService: TaskService,
    public authService: AuthService,
    public firestore: Firestore,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.allTasks$ = this.firebaseService.getAllTasks();
    this.allTasks$.subscribe(allTask => {
      this.taskService.resetForNewSubscribe(allTask);
      this.taskService.getSummaryInfos(allTask);
      this.taskService.nextImportantDate.sort();
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.currentDayTime();
    this.firebaseService.initAllTasks();
  }


  openEditUsernameDialog() {
    const dialogRef = this.dialog.open(EditUserComponent);
  }


  /**
   * get current day time
   */
  currentDayTime() {
    const date = new Date();
    const hours = date.getHours();
    console.log(hours);


    if (hours >= 6 && hours < 12) {
      this.currentTime = 'Good morning'
    }

    if (hours >= 12 && hours < 18) {
      this.currentTime = 'Good afternoon'
    }

    if (hours >= 18 && hours < 24) {
      this.currentTime = 'Good evening'
    }

    if (hours >= 0 && hours < 6) {
      this.currentTime = 'Good night'
    }
  }

}
