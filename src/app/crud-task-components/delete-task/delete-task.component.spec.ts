import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { DeleteTaskComponent } from './delete-task.component';

describe('DeleteTaskComponent', () => {
  let component: DeleteTaskComponent;
  let fixture: ComponentFixture<DeleteTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTaskComponent],
      imports: [provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()), AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
