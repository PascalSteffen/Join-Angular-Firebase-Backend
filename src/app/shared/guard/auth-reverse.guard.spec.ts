import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { AuthReverseGuard } from './auth-reverse.guard';

describe('AuthReverseGuard', () => {
  let guard: AuthReverseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()), AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), MatSnackBarModule]
    });
    guard = TestBed.inject(AuthReverseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
