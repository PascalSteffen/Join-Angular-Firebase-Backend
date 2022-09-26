import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { TicketChatComponent } from './ticket-chat.component';

describe('TicketChatComponent', () => {
  let component: TicketChatComponent;
  let fixture: ComponentFixture<TicketChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketChatComponent],
      imports: [MatDialogModule, RouterModule.forRoot([]), provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()), AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase), MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TicketChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
