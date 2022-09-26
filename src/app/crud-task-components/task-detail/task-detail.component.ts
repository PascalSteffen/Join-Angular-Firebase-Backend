import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase-service/firebase.service';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { PushTaskComponent } from '../push-task/push-task.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})

export class TaskDetailComponent implements OnInit {

  public allUsers$: Observable<DocumentData[]>
  taskId: string;
  task: Task;

  constructor(public dialog: MatDialog,
    public firestore: Firestore,
    public authService: AuthService,
    public taskService: TaskService,
    public firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.allUsers$ = this.firebaseService.getAllUsers();
    this.firebaseService.initAllUsers();
  }


  openEditDialog() {
    const dialogRef = this.dialog.open(EditTaskComponent);
    dialogRef.componentInstance.task = this.task;
    dialogRef.componentInstance.taskId = this.taskId;
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteTaskComponent);
    dialogRef.componentInstance.taskId = this.taskId;
  }

  openPushtoNextDialog() {
    const dialogRef = this.dialog.open(PushTaskComponent);
    dialogRef.componentInstance.task = this.task;
    dialogRef.componentInstance.taskId = this.taskId;
  }

}
