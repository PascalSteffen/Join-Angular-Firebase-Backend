import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { FirebaseService } from '../../shared/services/firebase-service/firebase.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {

  public allUsers$: Observable<DocumentData[]>;
  task: Task;
  taskId: string;
  date: Date;

  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  categorieFormControl = new FormControl('', [Validators.required]);
  assignToFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);


  constructor(public firebaseService: FirebaseService,
    public taskService: TaskService) { }


  ngOnInit(): void {
    this.allUsers$ = this.firebaseService.getAllUsers();
    this.firebaseService.initAllUsers();
  }

}
