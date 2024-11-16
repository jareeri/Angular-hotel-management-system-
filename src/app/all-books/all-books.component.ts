import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BookService } from '../Services/book/book.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent implements OnInit, AfterViewInit {
  loading = true;
  error: string | null = null;
  Books: any[] = [];
  @ViewChild('searchName') name!: ElementRef;
  @ViewChild('searchStatus') status!: ElementRef;
  @ViewChild('searchCheckInDate') checkInDate!: ElementRef;
  @ViewChild('searchCheckOutDate') checkOutDate!: ElementRef;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    const nameValue = this.name?.nativeElement.value || '';
    const statusValue = this.status?.nativeElement.value || '';
    const checkInDateValue = this.checkInDate?.nativeElement.value || '';
    const checkOutDateValue = this.checkOutDate?.nativeElement.value || '';
    // debugger;
    this.bookService
      .getAllbookFilter(
        nameValue,
        statusValue,
        checkInDateValue,
        checkOutDateValue
      )
      .subscribe({
        next: (data) => {
          this.Books = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching Books:', error);
          this.error = 'Could not load Books. Please try again later.';
          this.loading = false;
        },
      });
  }
  toUpdate(bookId: Number) {}
  delete(bookId: number) {
    this.bookService.delete(bookId).subscribe({
      next: (data) => {
        this.Books = data;
        this.getAllBooks();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error delete Book:', error);
        this.error = 'Could not delete Book. Please try again later.';
        this.loading = false;
      },
    });
  }
}
