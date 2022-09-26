import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { SetUnsetAdminComponent } from './set-unset-admin.component';

describe('SetUnsetAdminComponent', () => {
  let component: SetUnsetAdminComponent;
  let fixture: ComponentFixture<SetUnsetAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetUnsetAdminComponent],
      imports: [MatDialogModule, provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()), AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase), MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetUnsetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
