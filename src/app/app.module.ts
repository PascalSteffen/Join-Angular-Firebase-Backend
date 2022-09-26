import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SummaryComponent } from './nav-components/summary/summary.component';
import { BoardComponent } from './nav-components/board/board.component';
import { AddTaskComponent } from './crud-task-components/add-task/add-task.component';
import { ImprintComponent } from './nav-components/imprint/imprint.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrivacyComponent } from './nav-components/privacy/privacy.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore, Firestore } from '@angular/fire/firestore';
import { TaskFilterPipe } from './shared/pipes/filter-pipes/task-filter.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailComponent } from './crud-task-components/task-detail/task-detail.component';
import { EditTaskComponent } from './crud-task-components/edit-task/edit-task.component';
import { DeleteTaskComponent } from './crud-task-components/delete-task/delete-task.component';
import { PushTaskComponent } from './crud-task-components/push-task/push-task.component';
import { TaskHistoryComponent } from './nav-components/task-history/task-history.component';
import { SearchfilterPipe } from './shared/pipes/filter-pipes/searchfilter.pipe';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth-components/forgot-password/forgot-password.component';
import { AuthService } from "./shared/services/auth-service/auth.service";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MainContentComponent } from './main-content/main-content.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditUserComponent } from './user-components/edit-user/edit-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TeamComponent } from './nav-components/team/team.component';
import { SetUnsetAdminComponent } from './user-components/set-unset-admin/set-unset-admin.component';
import { SortByPipe } from './shared/pipes/sort-pipes/sort-by.pipe';
import { TicketSystemComponent } from './nav-components/ticket-system/ticket-system.component';
import { MatCardModule } from '@angular/material/card';
import { CreateTicketComponent } from './crud-ticket-components/create-ticket/create-ticket.component';
import { TicketPipe } from './shared/pipes/sort-pipes/ticket.pipe';
import { TicketChatComponent } from './crud-ticket-components/ticket-chat/ticket-chat.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    BoardComponent,
    AddTaskComponent,
    ImprintComponent,
    PrivacyComponent,
    TaskFilterPipe,
    TaskDetailComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    PushTaskComponent,
    TaskHistoryComponent,
    SearchfilterPipe,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    MainContentComponent,
    EditUserComponent,
    TeamComponent,
    SetUnsetAdminComponent,
    SortByPipe,
    TicketSystemComponent,
    CreateTicketComponent,
    TicketPipe,
    TicketChatComponent,
  ],
  imports: [
    BrowserModule,
    MatBadgeModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
