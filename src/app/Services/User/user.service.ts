import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninDTO } from 'src/app/DTOs/SigninDTO';
import { SignupDTO } from 'src/app/DTOs/SignupDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiurl = 'http://localhost/hotel/api/account';
  constructor(private http: HttpClient, private router: Router) {}

  createUser(signupData: SignupDTO): Observable<any> {
    return this.http.post(`${this.apiurl}`, signupData);
  }

  GetRoles(): Observable<any> {
    return this.http.get(`${this.apiurl}/getroles`);
  }

  Signin(signin: SigninDTO): Observable<any> {
    return this.http.post(`${this.apiurl}/login`, signin);
  }

  UserRoles(username: string): Observable<any> {
    return this.http.get(`${this.apiurl}/getUserRoles/${username}`);
  }

  GetUsers(): Observable<any> {
    return this.http.get(`${this.apiurl}/GetAllUsers`);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiurl}/deleteUser${username}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiurl}/updateUser`, user);
  }

  updateUserRole(userId: string, newRole: String): Observable<any> {
    debugger;
    return this.http.put(
      `${this.apiurl}/updateUserRole?userId=${userId}&roleName=${newRole}`,
      {}
    );
  }

  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiurl}/GetStatistics`);
  }

  logout() {
    // Perform logout logic (e.g., clearing tokens, session data)
    localStorage.clear();
    // Navigate to login or any other page after logout
    this.router.navigate(['/signin']);
  }
}
