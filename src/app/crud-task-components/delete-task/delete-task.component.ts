import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase-service/firebase.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})

export class DeleteTaskComponent implements OnInit {
  taskId: string;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

}
