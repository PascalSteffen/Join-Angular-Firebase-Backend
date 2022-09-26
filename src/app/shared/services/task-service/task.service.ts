import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  allTodos: Object[];
  allTodosOnBoard: number = 0;
  priorityUrgent: number = 0;
  allTaskTodo: number = 0;
  allTaskInProgress: number = 0;
  allTaskAwaitingFeedback: number = 0;
  allTaskDone: number = 0;
  taskHistory: number = 0;
  nextImportantDate = [];

  constructor(public firebaseService: FirebaseService, public firestore: Firestore) { }


  taskDefault() {
    return {
      title: '',
      description: '',
      categorie: '',
      assignTo: '',
      date: 0,
      priority: '',
      todo: true,
      inProgress: false,
      awaitingFeedback: false,
      done: false,
      history: false,
    };
  }


  /**
  * reset all variablen for correct subscribe
  * @param newTask
  */
  resetForNewSubscribe(newTask: Object[]) {
    this.allTodos = newTask;
    this.allTodosOnBoard = 0;
    this.priorityUrgent = 0;
    this.allTaskTodo = 0;
    this.allTaskDone = 0;
    this.allTaskInProgress = 0;
    this.allTaskAwaitingFeedback = 0;
    this.taskHistory = 0;
    this.nextImportantDate = [];
  }


  /**
   * get all infos for the summary
   * @param newTask
   */
  getSummaryInfos(newTask: Object[]) {
    for (let i = 0; i < newTask.length; i++) {
      const priority = newTask[i]['task']['priority'];
      const todo = newTask[i]['task']['todo']
      const done = newTask[i]['task']['done']
      const inProgress = newTask[i]['task']['inProgress'];
      const awaitingFeedback = newTask[i]['task']['awaitingFeedback'];
      const nextImportantDate = newTask[i]['task']['date'];
      const NoHistory = newTask[i]['task']['history'];
      this.addTaskValues(priority, inProgress, awaitingFeedback, todo, done, nextImportantDate, NoHistory);
    }
  }


  /**
   * update all task values
   * @param priority
   * @param inProgress
   * @param awaitingFeedback
   * @param todo
   * @param done
   * @param nextImportantDate
   */
  addTaskValues(priority: string, inProgress: boolean, awaitingFeedback: boolean, todo: boolean, done: boolean, nextImportantDate: number, NoHistory: boolean) {
    if (priority === 'Urgent' && NoHistory == false) {
      this.nextImportantDate.push(nextImportantDate);
      this.priorityUrgent++
    }
    if (inProgress === true && NoHistory == false) {
      this.allTaskInProgress++
      this.allTodosOnBoard++
    }
    if (awaitingFeedback === true && NoHistory == false) {
      this.allTaskAwaitingFeedback++
      this.allTodosOnBoard++
    }
    if (todo === true && NoHistory == false) {
      this.allTaskTodo++
      this.allTodosOnBoard++
    }
    if (done === true && NoHistory == false) {
      this.allTaskDone++
      this.allTodosOnBoard++
    }
    if (NoHistory == true) {
      this.taskHistory++
    }
  }


  /**
   * find task on Board
   * @param task
   * @returns
   */
  findTodoTask(task: []) {
    return task['task'].todo == true;
  }

  findInProgressTask(task: []) {
    return task['task'].inProgress == true;
  }

  findAwatingFeedbackTask(task: []) {
    return task['task'].awaitingFeedback == true;
  }

  findDoneTask(task: []) {
    return task['task'].done == true;
  }
  findHistoryTask(task: []) {
    return task['task'].history == true;
  }

}
