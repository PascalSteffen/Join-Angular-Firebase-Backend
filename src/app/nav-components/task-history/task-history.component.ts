import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../shared/services/firebase-service/firebase.service';
import { TaskService } from '../../shared/services/task-service/task.service';
import { TaskDetailComponent } from '../../crud-task-components/task-detail/task-detail.component';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent implements OnInit {
  public allTasks$: Observable<DocumentData[]>;

  loading: boolean = false;
  searchTodo: string;
  date: number;

  constructor(public firebaseService: FirebaseService, public firestore: Firestore, public taskService: TaskService, public dialog: MatDialog) { }

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
    this.firebaseService.initAllTasks();
  }


  openDialog(task: Object) {
    const dialogRef = this.dialog.open(TaskDetailComponent);
    dialogRef.componentInstance.task = task['task'];
    dialogRef.componentInstance.taskId = task['taskId'];
  }
}
