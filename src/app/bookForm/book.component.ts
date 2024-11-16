import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookDto } from '../DTOs/BookDto';
import { BookService } from '../Services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDto } from '../DTOs/RoomDto';
import { RoomServiceService } from '../Services/room/room-service.service';
import Swal from 'sweetalert2';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit, OnChanges {
  itemForm: FormGroup;
  rooms: RoomDto[] = [];
  bookedDate: Date[] = [];
  hasOverlap: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookservice: BookService,
    private route: ActivatedRoute,
    private roomService: RoomServiceService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    const currentDate = new Date();
    const checkOutDate = new Date(currentDate);
    checkOutDate.setDate(currentDate.getDate() + 1);
    this.itemForm = this.fb.group({
      room: ['', Validators.required],
      CheckInDate: [
        currentDate.toISOString().split('T')[0],
        Validators.required,
      ],
      CheckOutDate: [
        checkOutDate.toISOString().split('T')[0],
        Validators.required,
      ],
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const checkInDate = this.normalizeDate(
        new Date(this.itemForm.get('CheckInDate')?.value)
      );
      const checkOutDate = this.normalizeDate(
        new Date(this.itemForm.get('CheckOutDate')?.value)
      );
      const currentCellDate = this.normalizeDate(new Date(cellDate));

      // Check if the currentCellDate is in the bookedDate array first
      const isBooked = this.bookedDate.some((bookedDate) => {
        return bookedDate.getTime() === currentCellDate.getTime();
      });

      if (isBooked) {
        return 'booked-date-class'; // Apply style for booked dates
      }

      // Apply style if the date is within the check-in and check-out range
      if (currentCellDate >= checkInDate && currentCellDate <= checkOutDate) {
        return 'example-custom-date-class';
      }
    }

    return ''; // No class for other dates
  };

  normalizeDate(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  onRoomChange() {
    this.getAvailableDates();
    this.checkOverlap();
  }

  getAvailableDates() {
    const roomId = this.itemForm.get('room')?.value;
    if (roomId) {
      this.bookservice.getAvailableDates(roomId).subscribe({
        next: (data) => {
          this.bookedDate = []; // Clear previous bookings
          data.forEach((booking: any) => {
            const checkIn = new Date(booking.chickInDate);
            const checkOut = new Date(booking.chickOutDate);
            let currentDate = this.normalizeDate(new Date(checkIn));
            const normalizedCheckOut = this.normalizeDate(new Date(checkOut));
            while (currentDate <= normalizedCheckOut) {
              if (
                !this.bookedDate.some(
                  (d) => d.getTime() === currentDate.getTime()
                )
              ) {
                this.bookedDate.push(new Date(currentDate));
              }
              currentDate.setDate(currentDate.getDate() + 1);
            }
          });
          this.cdRef.detectChanges(); // Trigger change detection
          this.checkOverlap(); // Check overlap after dates load
        },
        error: (error) => {
          console.error('Error fetching available dates:', error);
        },
      });
    }
  }

  checkOverlap() {
    const checkInDate = this.normalizeDate(
      new Date(this.itemForm.get('CheckInDate')?.value)
    );
    const checkOutDate = this.normalizeDate(
      new Date(this.itemForm.get('CheckOutDate')?.value)
    );

    this.hasOverlap = this.bookedDate.some(
      (bookedDate) => bookedDate >= checkInDate && bookedDate <= checkOutDate
    );
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const itemData: BookDto = {
        checkInDate: this.itemForm.get('CheckInDate')?.value,
        checkOutDate: this.itemForm.get('CheckOutDate')?.value,
        roomId: Number(this.itemForm.get('room')?.value),
        guestId: Number(this.route.snapshot.paramMap.get('guestId')),
      };

      this.bookservice.createItem(itemData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Booking Confirmed!',
            text: 'Your booking has been successfully added.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.itemForm.reset();
          this.router.navigate(['/home/Allguests']);
        },
        error: (error) => {
          console.error('Error creating booking:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  LoodAllRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (value) => {
        this.rooms = value;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
      },
    });
  }

  ngOnInit(): void {
    this.LoodAllRooms();
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
