import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomServiceService } from '../Services/room/room-service.service';
import { RoomDto } from '../DTOs/RoomDto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
  // template: `<app-all-rooms [newrecored]="newrecored"></app-all-rooms>`,
})
export class RoomFormComponent implements OnInit {
  itemForm: FormGroup;
  rooms: RoomDto[] = [];
  loading: boolean = true;
  error: string | null = null;
  roomId!: number;
  isEdit: boolean = false;
  newrecored = true;

  constructor(
    private fb: FormBuilder,
    private roomServiceService: RoomServiceService,
    private activeroute: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    debugger;
    if (this.activeroute.snapshot.queryParams['roomId'] != undefined) {
      this.roomId = parseInt(this.activeroute.snapshot.queryParams['roomId']);
      this.isEdit = true;
      this.edit();
    }
  }
  edit() {
    this.roomServiceService.getRoomById(this.roomId).subscribe({
      next: (data) => {
        this.itemForm.controls['name'].setValue(data.name);
        this.itemForm.controls['capacity'].setValue(data.capacity);
        this.itemForm.controls['price'].setValue(data.price);
        this.itemForm.controls['status'].setValue(data.status);
      },
      error: (error) => {
        console.log(`error getting user data ${error}`);
      },
    });
  }

  onSubmit() {
    debugger;
    if (this.itemForm.valid) {
      const itemData: RoomDto = this.itemForm.value; // Type the form data with ItemDTO

      this.roomServiceService.createItem(itemData).subscribe({
        next: (response) => {
          console.log('Item created successfully:', response);
          this.itemForm.reset();
          this.newrecored = !this.newrecored;
        },
        error: (error) => {
          console.error('Error creating item:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // updateChildData() {
  //   this.newrecored = 'Updated Data from Parent';
  // }

  update() {
    debugger;
    if (this.itemForm.valid) {
      let updatedroom = new RoomDto();
      updatedroom.roomID = this.roomId;
      updatedroom.name = this.itemForm.value['name'];
      updatedroom.price = this.itemForm.value['price'];
      updatedroom.capacity = this.itemForm.value['capacity'];
      updatedroom.status = this.itemForm.value['status'];
      this.roomServiceService.updateRoom(updatedroom).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Room Updated',
            text: 'Room Updated successfully!',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            this.newrecored = !this.newrecored;
            this.router.navigate(['/allRooms']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update Room. Please try again.',
          });
          console.error('Error updating Room', error);
        },
      });
    }
  }
}
