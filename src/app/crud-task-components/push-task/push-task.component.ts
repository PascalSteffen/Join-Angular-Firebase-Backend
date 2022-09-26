import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { FirebaseService } from '../../shared/services/firebase-service/firebase.service';

@Component({
  selector: 'app-push-task',
  templateUrl: './push-task.component.html',
  styleUrls: ['./push-task.component.scss']
})

export class PushTaskComponent implements OnInit {

  taskId: string;
  task: Task = this.taskService.taskDefault();

  constructor(public firebaseService: FirebaseService, public taskService: TaskService) { }


  ngOnInit(): void {
  }

}
