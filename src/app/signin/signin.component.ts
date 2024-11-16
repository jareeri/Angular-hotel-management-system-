import { Component } from '@angular/core';
import { UserService } from '../Services/User/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signinForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Signin() {
    // debugger;
    this.userService.Signin(this.signinForm.value).subscribe({
      next: (data) => {
        this.GetUserRoles(this.signinForm.value['username']);
        localStorage.setItem('Token', data.token);
        // console.log(data);
      },
      error: (error) => {
        console.log('error hapend', error);
        
      },
    });
  }

  GetUserRoles(username: string) {
    this.userService.UserRoles(username).subscribe({
      next: (data) => {
        console.log(data);

        localStorage.setItem('Roles', data);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('error hapend', error);
      },
    });
  }
}
