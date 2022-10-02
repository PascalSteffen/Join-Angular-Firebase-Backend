import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { UtilityServiceService } from '../utility-service/utility-service.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private allUsers$ = new BehaviorSubject<DocumentData[]>([]);
  private usersFromFirebase$: Observable<DocumentData[]>;
  private allTasks$ = new BehaviorSubject<DocumentData[]>([]);
  private tasksFromFirebase$: Observable<DocumentData[]>;
  private allTickets$ = new BehaviorSubject<DocumentData[]>([]);
  private ticketsFromFirebase$: Observable<DocumentData[]>;
  private allCalendarEvents$ = new BehaviorSubject<DocumentData[]>([]);
  private calendarEventsFromFirebase$: Observable<DocumentData[]>;

  constructor(public firestore: Firestore, public router: Router, public authService: AuthService, public utilityService: UtilityServiceService) { }


  /**
   * subscribe all Tasks from Firebase.
   */
  public initAllTasks(): void {
    const coll = collection(this.firestore, 'tasks');
    this.tasksFromFirebase$ = collectionData(coll, { idField: "taskId" });
    this.tasksFromFirebase$.subscribe((allTasks) => {
      this.allTasks$.next(allTasks);
    })
  }


  public getAllTasks(): Observable<DocumentData[]> {
    return this.allTasks$;
  }


  /*******************************************************************************************************************************************************************/


  /**
   * subscribe all Users from Firebase.
   */
  public initAllUsers(): void {
    const coll = collection(this.firestore, 'users');
    this.usersFromFirebase$ = collectionData(coll, { idField: "userId" });
    this.usersFromFirebase$.subscribe((allUsers) => {
      this.allUsers$.next(allUsers);
    })
  }


  public getAllUsers(): Observable<DocumentData[]> {
    return this.allUsers$;
  }


  /*******************************************************************************************************************************************************************/


  /**
   * subscribe all Tickets from Firebase.
   */
  public initAllTickets(): void {
    const coll = collection(this.firestore, 'events');
    this.calendarEventsFromFirebase$ = collectionData(coll, { idField: "eventId" });
    this.calendarEventsFromFirebase$.subscribe((allEvents) => {
      this.allCalendarEvents$.next(allEvents);
    })
  }


  public getAllCalendarEvents(): Observable<DocumentData[]> {
    return this.allCalendarEvents$;
  }


  /*******************************************************************************************************************************************************************/


  /**
   * subscribe all Tickets from Firebase.
   */
  public initAllCalendarEvents(): void {
    const coll = collection(this.firestore, 'tickets');
    this.ticketsFromFirebase$ = collectionData(coll, { idField: "ticketId" });
    this.ticketsFromFirebase$.subscribe((allTickets) => {
      this.allTickets$.next(allTickets);
    })
  }


  public getAllTickets(): Observable<DocumentData[]> {
    return this.allTickets$;
  }


  /************************************************************************************TASK-ACTION********************************************************************/
  /**
  * save a new task to the DB.
  *
  */
  saveTask(task: any, date: Date, form: any) {
    task.date = date.getTime();
    const coll = collection(this.firestore, 'tasks');
    addDoc(coll, {
      task: {
        'title': task.title,
        'description': task.description,
        'categorie': task.categorie,
        'assignTo': task.assignTo,
        'date': task.date,
        'priority': task.priority,
        'todo': true,
        'inProgress': false,
        'awaitingFeedback': false,
        'done': false,
        'history': false,
      }
    }).then(() => {
      form.reset();
      this.router.navigate(['board']);
      this.utilityService.alert('Task created successfully.', 5000);
    });
  }


  /**
  * update the current task.
  *
  */
  async updateTask(taskId: string, date: Date, task: any) {
    task.date = date.getTime();
    const coll = collection(this.firestore, 'tasks');
    const docRef = doc(coll, taskId);
    await updateDoc(docRef, {
      task: {
        'title': task.title,
        'description': task.description,
        'categorie': task.categorie,
        'assignTo': task.assignTo,
        'date': task.date,
        'priority': task.priority,
        'todo': task.todo,
        'inProgress': task.inProgress,
        'awaitingFeedback': task.awaitingFeedback,
        'done': task.done,
        'history': task.history,
      }
    }).then(() => {
      this.utilityService.alert('Task updated successfully.', 5000);
    });
  }


  /**
   * update current task.
   * @param taskId
   * @param task
   * @param todo
   * @param inProgress
   * @param awaitingFeedback
   * @param done
   * @param history
   */
  async PushTask(taskId: string, task: any, todo: boolean, inProgress: boolean, awaitingFeedback: boolean, done: boolean, history: boolean) {
    const coll = collection(this.firestore, 'tasks');
    const docRef = doc(coll, taskId);
    await updateDoc(docRef, {
      task: {
        'title': task.title,
        'description': task.description,
        'categorie': task.categorie,
        'assignTo': task.assignTo,
        'date': task.date,
        'priority': task.priority,
        'todo': todo,
        'inProgress': inProgress,
        'awaitingFeedback': awaitingFeedback,
        'done': done,
        'history': history,
      }
    }).then(() => {
      this.utilityService.alert('Task passed successfully.', 5000);
    });
  }


  /**
  * delete the current task.
  *
  */
  async deleteTask(taskId: string) {
    const coll = collection(this.firestore, 'tasks');
    const docRef = doc(coll, taskId);
    await deleteDoc(docRef).then(() => {
      this.utilityService.alert('Task deleted successfully.', 5000)
    });
  }


  /************************************************************************************ADMIN-ACTION********************************************************************/
  /**
   * set an admin by the userId
   * @param userId
   */
  async setAdmin(userId: string) {
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, userId);
    await updateDoc(docRef, {
      'admin': true
    }).then(() => {
      this.utilityService.alert('Admin successfully set.', 5000);
    });
  }


  /**
   * unset an admin by the userId
   * @param userId
   */
  async unsetAdmin(userId: string) {
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, userId);
    await updateDoc(docRef, {
      'admin': false
    }).then(() => {
      this.utilityService.alert('Admin successfully unset.', 5000);
    });
  }


  /************************************************************************************TICKET-ACTION********************************************************************/
  /**
  * save a new ticket to the DB.
  *
  */
  saveTicket(no: number, date: any, user: Object, ticket: any, allMessages: Object) {
    const coll = collection(this.firestore, 'tickets');
    addDoc(coll, {
      ticket: {
        'no': no,
        'date': date,
        'from': user,
        'title': ticket.title,
        'messages': [allMessages],
        'assignTo': 'not assigned'
      }
    }).then(() => {
      this.utilityService.alert('Ticket created successfully.', 5000);
    });
  }


  /**
  * update the current ticket.
  *
  */
  async updateTicket(ticketId: string, date: number, ticket: any, allMessages: Object) {
    const coll = collection(this.firestore, 'tickets');
    const docRef = doc(coll, ticketId);
    await updateDoc(docRef, {
      ticket: {
        'no': ticket.no,
        'date': date,
        'from': ticket.from,
        'title': ticket.title,
        'messages': allMessages,
        'assignTo': ticket.assignTo
      }
    }).then(() => {
      this.utilityService.alert('Messages have been updated successfully.', 5000);
    });
  }


  /**
  * update the assignTo.
  *
  */
  async updateAssignTo(ticketId: string, ticket: any, assignTo: string) {
    const coll = collection(this.firestore, 'tickets');
    const docRef = doc(coll, ticketId);
    await updateDoc(docRef, {
      ticket: {
        'no': ticket.no,
        'date': ticket.date,
        'from': ticket.from,
        'title': ticket.title,
        'messages': ticket.messages,
        'assignTo': assignTo
      }
    }).then(() => {
      this.utilityService.alert('You have successfully accepted the ticket.', 5000);
    });
  }


  /**
  * delete/close the current ticket.
  *
  */
  async deleteTicket(ticketId: string) {
    const coll = collection(this.firestore, 'tickets');
    const docRef = doc(coll, ticketId);
    await deleteDoc(docRef).then(() => {
      this.utilityService.alert('Ticket closed successfully.', 5000)
      this.router.navigate(['tickets']);
    });
  }


  /************************************************************************************EVENT-ACTION********************************************************************/
  /**
  * save a new event to the DB.
  *
  */
  saveCalendarEvent(event: any, startDate: Date, currentUser: string, endDate: Date) {
    event.startDate = startDate.getTime();
    event.endDate = endDate.getTime();
    const coll = collection(this.firestore, 'events');
    addDoc(coll, {
      event: {
        'title': event.title,
        'from': currentUser,
        'color': event.color,
        'startDate': event.startDate,
        'endDate': event.endDate
      }
    }).then(() => {
      this.utilityService.alert('Calendar event created successfully.', 5000);
    });
  }


  /**
  * delete the current event.
  *
  */
  async deleteEvent(eventId: string) {
    const coll = collection(this.firestore, 'events');
    const docRef = doc(coll, eventId);
    await deleteDoc(docRef).then(() => {
      this.utilityService.alert('Event was successfully deleted.', 5000);
      this.router.navigate(['calendar']);
    });
  }

}
