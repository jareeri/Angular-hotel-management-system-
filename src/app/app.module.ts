import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { GusetComponent } from './gusetForm/guset.component';
import { ListGusetComponent } from './list-guset/list-guset.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './bookForm/book.component';
import { GuestbooksComponent } from './guestbooks/guestbooks.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SigninComponent } from './signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthenticationInterceptor } from './Interceptor/authentication.interceptor';
import { ErrorhandlingInterceptor } from './Interceptor/errorhandling.interceptor';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';
import { AllUserComponent } from './all-user/all-user.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core'; // Import MatOptionModule

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    RoomFormComponent,
    AllRoomsComponent,
    GusetComponent,
    ListGusetComponent,
    HomeComponent,
    BookComponent,
    GuestbooksComponent,
    InvoiceComponent,
    AllBooksComponent,
    CreateUserComponent,
    SigninComponent,
    Error404Component,
    Error401Component,
    AllUserComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Make sure this is imported if you're using reactive forms
    FormsModule, // FormsModule is already imported
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, // Add MatSelectModule
    MatOptionModule, // Add MatOptionModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
