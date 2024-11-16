import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.APIUrl + '/Book';
  }

  createIinvoice(invoiceId: number): Observable<any> {
    debugger;
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(`${this.apiUrl}/checkout/${invoiceId}`);
  }

  // getAllbook(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/AllBooks`);
  // }

  // getAllbookForGuest(guestId: number): Observable<any[]> {
  //   // debugger;
  //   return this.http.get<any[]>(
  //     `http://localhost/hotel/api/Invoice/AllInvoicesForGuest/${guestId}`
  //   );
  // }
}
