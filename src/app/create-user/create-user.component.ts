import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupDTO } from '../DTOs/SignupDTO';
import { UserService } from '../Services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  signupForm: FormGroup;
  roles: any[] = [];
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = fb.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        roleName: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(24),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.getRoles();
  }

  // Custom validator to check that password and confirm password match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  createUser() {
    this.userService.createUser(this.signupForm.value).subscribe({
      next: (data) => {
        console.log(data);

        Swal.fire({
          icon: 'success',
          title: 'User Created',
          text: `User created successfully!`,
          confirmButtonText: 'OK',
          timer: 2000, // Optional: Auto-close after 2 seconds
          timerProgressBar: true, // Optional: Shows a timer progress bar
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
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
}
