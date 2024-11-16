import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GuestDto } from '../DTOs/GusetDto';
import { GusetService } from '../Services/guset/guset.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-guset',
  templateUrl: './list-guset.component.html',
  styleUrls: ['./list-guset.component.css'],
})
export class ListGusetComponent implements OnInit, OnChanges {
  guests: GuestDto[] = [];
  loading: boolean = true;
  error: string | null = null;

  @Input() newrecored = true;
  pageSize = 5;
  pageNumber = 1;
  hasNextPage: boolean = false;

  // displayedColumns: string[] = ['guestId', 'name', 'email', 'phone', 'options'];

  constructor(private guestService: GusetService, private router: Router) {}

  ngOnInit(): void {
    this.fetchGuest();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newrecored']) {
      this.fetchGuest();
    }
  }

  fetchGuest() {
    this.guestService.getAllGuset(this.pageSize, this.pageNumber).subscribe({
      next: (data: any) => {
        this.guests = data.guests;
        this.hasNextPage = data.hasNext;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching guests:', error);
        this.error = 'Could not load guests. Please try again later.';
        this.loading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.fetchGuest();
  }

  nextPage() {
    if (this.hasNextPage) {
      this.pageNumber++;
      this.fetchGuest();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchGuest();
    }
  }

  addbook(guestId: Number) {
    // Redirect to 'add-book' route with guestId as a parameter
    this.router.navigate(['/home/add-book', guestId]);
  }

  CheckOut(guestId: Number, name: string) {
    // debugger;
    // this.router.navigate(['/guestbooks', guestId]);
    this.router.navigate(['/home/guestbooks'], {
      queryParams: { guestId: guestId, name: name },
    });
  }
  Delete(guestId: number) {
    this.guestService.delete(guestId).subscribe({
      next: (data: any) => {
        this.guests = data;
        this.loading = false;
        this.fetchGuest();
      },
      error: (error) => {
        console.error('Error fetching guests:', error);
        this.error = 'Could not load guests. Please try again later.';
        this.loading = false;
      },
    });
  }
  ToUpdate(guestId: number) {
    this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/guest'], {
        queryParams: { guestId: guestId },
      });
    });
  }
}
