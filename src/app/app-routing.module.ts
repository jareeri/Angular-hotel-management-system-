import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomFormComponent } from './room-form/room-form.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { GusetComponent } from './gusetForm/guset.component';
import { ListGusetComponent } from './list-guset/list-guset.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './bookForm/book.component';
import { GuestbooksComponent } from './guestbooks/guestbooks.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SigninComponent } from './signin/signin.component';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';
import { authenticationGuard } from './Guards/authentication.guard';
import { AllUserComponent } from './all-user/all-user.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '404', component: Error404Component },
  { path: '401', component: Error401Component },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: '', component: StatisticsComponent },
      { path: 'room', component: RoomFormComponent },
      { path: 'allRooms', component: AllRoomsComponent },
      { path: 'guest', component: GusetComponent },
      { path: 'Allguests', component: ListGusetComponent },
      { path: 'book', component: BookComponent },
      { path: 'add-book/:guestId', component: BookComponent },
      { path: 'guestbooks', component: GuestbooksComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'books', component: AllBooksComponent },
      { path: 'createuser', component: CreateUserComponent },
      { path: 'AllUsers', component: AllUserComponent },
      // { path: 'logout' },
    ],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
