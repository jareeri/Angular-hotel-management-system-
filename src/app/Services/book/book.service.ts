import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDto } from 'src/app/DTOs/BookDto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.APIUrl + '/Book';
  }

  createItem(data: BookDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddBook`, data, {});
  }

  getAllbook(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(`${this.apiUrl}/AllBooks`);
  }

  getAllbookFilter(
    name: string,
    status: string,
    checkInDate: Date,
    checkOutDate: Date
  ): Observable<BookDto[]> {
    // debugger;
    return this.http.get<BookDto[]>(
      `${this.apiUrl}/AllBooksSearch?Guestname=${name}&status=${status}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    );
  }
  // ?Guestname=${name}&status=${status}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}

  getAllbookForGuest(guestId: number): Observable<BookDto[]> {
    // debugger;
    return this.http.get<BookDto[]>(
      `http://localhost/hotel/api/Invoice/AllInvoicesForGuest/${guestId}`
    );
  }

  delete(bookId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`);
  }

  getAvailableDates(roomId: number): Observable<any> {
    return this.http.get(
      `http://localhost/hotel/api/Room/IsAvilableRoom?roomId=${roomId}`
    );
  }
}
