import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GuestDto } from 'src/app/DTOs/GusetDto';

@Injectable({
  providedIn: 'root',
})
export class GusetService {
  private apiUrl = 'http://localhost/hotel/api/guest';

  constructor(private http: HttpClient) {}

  // Existing method to create a guset
  createItem(data: GuestDto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`http://localhost/hotel/api/Guest/AddGuest`, data, {
      headers,
    });
  }

  // New method to get all guset
  getAllGuset(pageSize: number, pageNumber: number): Observable<GuestDto[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/AllGuests/${pageSize}/${pageNumber}`
    );
  }

  delete(guestId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${guestId}`);
  }
  getGuestById(guestId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${guestId}`);
  }

  updateRoom(updatedGuest: GuestDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateGuest`, updatedGuest);
  }
}
