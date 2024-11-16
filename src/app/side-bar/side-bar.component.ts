import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/User/user.service';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  isCollapsed = false;
  userRole!: string;
  menuItems = [
    { label: 'room', link: 'room', role: 'Admin' },
    { label: 'All Room', link: 'allRooms' },
    { label: 'Guest', link: 'guest' },
    // { label: 'Guest Books', link: 'guestbooks' },
    { label: 'Allguests', link: 'Allguests' },
    { label: 'Allbooks', link: 'books' },
    { label: 'Create User', link: 'createuser', role: 'Admin' },
    { label: 'All Users', link: 'AllUsers', role: 'Admin' },
    // { label: 'ChickIn', link: 'book' },
    // { label: 'Logout', link: 'logout' },
  ];

  filteredMenu: any[] = [];

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {
    // debugger;
    this.sideBar();
  }

  sideBar() {
    // debugger;
    this.userRole = JSON.parse(JSON.stringify(localStorage.getItem('Roles')));

    this.filteredMenu = this.menuItems.filter(
      (item) => !item.role || item.role === this.userRole
    );
  }

  logout() {
    this.userservice.logout();
  }

  isActive(link: string): boolean {
    return this.router.isActive(link, true); // This will check exact match and ignore query params
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
