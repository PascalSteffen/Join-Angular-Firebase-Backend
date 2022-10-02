import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { FirebaseService } from '../../shared/services/firebase-service/firebase.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  categorieFormControl = new FormControl('', [Validators.required]);
  assignToFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);

  public allUsers$: Observable<DocumentData[]>;
  task: Task = this.taskService.taskDefault();
  date: Date;

  constructor(public firebaseService: FirebaseService, public firestore: Firestore, public taskService: TaskService) { }


  ngOnInit(): void {
    this.allUsers$ = this.firebaseService.getAllUsers();
    this.firebaseService.initAllUsers();
  }


  /**
   * clear the form values.
   * @param form
   */
  clearForm(form: any) {
    form.reset();
  }

}
