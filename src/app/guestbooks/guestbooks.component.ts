import { Component, OnInit } from '@angular/core';
import { GusetService } from '../Services/guset/guset.service';
import { BookDto } from '../DTOs/BookDto';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../Services/book/book.service';
import { InvoiceService } from '../Services/Invoice/invoice.service';

@Component({
  selector: 'app-guestbooks',
  templateUrl: './guestbooks.component.html',
  styleUrls: ['./guestbooks.component.css'],
})
export class GuestbooksComponent implements OnInit {
  books: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  guestId!: number;
  name!: string;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    // debugger
    this.guestId = parseInt(this.route.snapshot.queryParams['guestId']);
    this.name = this.route.snapshot.queryParams['name'];
    this.loadBooks();
  }

  loadBooks() {
    // debugger;
    this.bookService.getAllbookForGuest(this.guestId).subscribe(
      (data: any[]) => {
        this.books = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching books:', error);
        this.error = 'Could not load guests. Please try again later.';
        this.loading = false;
      }
    );
  }

  PrintInvoice(invoiceId: number) {
    debugger;
    this.router.navigate(['/home/invoice'], {
      queryParams: { invoiceId: invoiceId },
    });
  }
}
