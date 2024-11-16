import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
})
export class AllUserComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.GetUsers();
    this.getRoles();
  }

  getRoles() {
    this.userService.GetRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
      },
    });
  }
  GetUsers() {
    this.userService.GetUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {},
    });
  }
  Delete(username: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete method only if the user confirms
        this.userService.deleteUser(username).subscribe({
          next: () => {
            // Refresh the user list after deletion
            this.GetUsers();
            // Show success message
            Swal.fire({
              title: 'Deleted!',
              text: 'The user has been deleted successfully.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.log(error);
            // Show an error message if deletion fails
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while trying to delete the user.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  toUpdate(username: string) {
    debugger;
    const user = this.users.find((u) => u.username === username);
    if (user) {
      user.isEditing = !user.isEditing; // Toggle edit mode
    }
  }

  toUpdateRole(userId: string) {
    debugger;
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.isEditingRole = !user.isEditingRole; // Toggle edit mode
    }
  }

  saveUser(user: any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save changes to this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Set editing mode off after saving
        user.isEditing = false;

        // Call the update user service to save changes
        this.userService.updateUser(user).subscribe({
          next: () => {
            // Refresh the user list after update
            this.GetUsers();
            // Show success message
            Swal.fire({
              title: 'Updated!',
              text: 'The user has been updated successfully.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.error(error);
            // Show an error message if update fails
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while trying to update the user.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  saveRole(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save changes to this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        // Set editing mode off after saving
        user.isEditingRole = false;
        console.log(user.roleName);
        // Call the update user service with the role's ID
        this.userService.updateUserRole(user.id, user.roleName).subscribe({
          next: () => {
            // Refresh the user list after update
            this.GetUsers();
            // Show success message
            Swal.fire({
              title: 'Updated!',
              text: 'The user role has been updated successfully.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.error(error);
            // Show an error message if update fails
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while trying to update the user role.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
