import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestDto } from '../DTOs/GusetDto';
import { GusetService } from '../Services/guset/guset.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guset',
  templateUrl: './guset.component.html',
  styleUrls: ['./guset.component.css'],
})
export class GusetComponent implements OnInit {
  itemForm: FormGroup;
  isEdit = false;
  guestId!: number;

  newrecored = true;

  constructor(
    private fb: FormBuilder,
    private guestService: GusetService,
    private activeroute: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^07[789][0-9]{7}$')],
      ],
    });
  }

  ngOnInit(): void {
    if (this.activeroute.snapshot.queryParams['guestId'] != undefined) {
      this.guestId = parseInt(this.activeroute.snapshot.queryParams['guestId']);
      this.isEdit = true;
      this.edit();
    }
  }

  onSubmit() {
    debugger;
    if (this.itemForm.valid) {
      const itemData: GuestDto = this.itemForm.value; // Type the form data with ItemDTO

      this.guestService.createItem(itemData).subscribe({
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
  edit() {
    this.guestService.getGuestById(this.guestId).subscribe({
      next: (data) => {
        this.itemForm.controls['name'].setValue(data.name);
        this.itemForm.controls['phone'].setValue(data.phone);
        this.itemForm.controls['email'].setValue(data.email);
      },
      error: (error) => {
        console.log(`error getting user data ${error}`);
      },
    });
  }

  update() {
    debugger;
    if (this.itemForm.valid) {
      let updatedGuest = new GuestDto();
      updatedGuest.guestId = this.guestId;
      updatedGuest.name = this.itemForm.value['name'];
      updatedGuest.email = this.itemForm.value['email'];
      updatedGuest.phone = this.itemForm.value['phone'];
      this.guestService.updateRoom(updatedGuest).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Guest Updated',
            text: 'Guest Updated successfully!',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            this.newrecored = !this.newrecored;
            this.router.navigate(['/Guest']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update Guest. Please try again.',
          });
          console.error('Error updating Guest', error);
        },
      });
    }
  }
}
