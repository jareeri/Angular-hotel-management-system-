import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomDto } from '../../DTOs/RoomDto';

@Injectable({
  providedIn: 'root',
})
export class RoomServiceService {
  private apiUrl = 'http://localhost/hotel/api/Room';

  constructor(private http: HttpClient) {}

  // Existing method to create a room
  createItem(data: RoomDto): Observable<any> {
    debugger;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/AddRoom`, data, { headers });
  }

  // New method to get all rooms
  getAllRooms(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(`${this.apiUrl}/AllRooms`);
  }
  deleteRoom(roomId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${roomId}`);
  }
  getRoomById(roomId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${roomId}`);
  }

  updateRoom(updatedRoom: RoomDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateRoom`, updatedRoom);
  }
}
