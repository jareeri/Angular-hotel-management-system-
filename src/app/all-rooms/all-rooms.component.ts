import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RoomServiceService } from '../Services/room/room-service.service';
import { RoomDto } from '../DTOs/RoomDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css'],
  // template: `<p>Hello, {{ newrecored }}!</p>`,
})
export class AllRoomsComponent implements OnInit, OnChanges {
  rooms: RoomDto[] = [];
  loading: boolean = true;
  error: string | null = null;

  @Input() newrecored = true;

  constructor(private roomService: RoomServiceService, private route: Router) {}

  ngOnInit(): void {
    this.fetchRooms();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newrecored']) {
      this.fetchRooms();
    }
    // if (changes[]) {

    // }
  }

  fetchRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (data: RoomDto[]) => {
        this.rooms = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.error = 'Could not load rooms. Please try again later.';
        this.loading = false;
      },
    });
  }

  delete(roomId: number) {
    debugger;
    this.roomService.deleteRoom(roomId).subscribe({
      next: (data) => {
        this.rooms = data;
        this.fetchRooms();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error deleting rooms:', error);
        this.error = 'Could not load rooms. Please try again later.';
        this.loading = false;
      },
    });
  }
  toUpdate(roomId: number) {
    // this.route.navigate(['/room'], {
    //   queryParams: { roomId: roomId },
    // });

    this.route.navigateByUrl(`/`, { skipLocationChange: true }).then(() => {
      this.route.navigate(['/home/room'], {
        queryParams: { roomId: roomId },
      });
    });
  }
}
