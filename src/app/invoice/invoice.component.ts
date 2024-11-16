import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../Services/Invoice/invoice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceId!: number;
  loading = true;
  error: string | null = null;
  invoice!: any;
  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.invoiceId = parseInt(this.route.snapshot.queryParams['invoiceId']);
    this.printinvoice();
  }
  printinvoice() {
    this.invoiceService.createIinvoice(this.invoiceId).subscribe(
      (data: any[]) => {
        console.log(data);
        this.invoice = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error creating invoice:', error);
        this.error = 'Could not generate invoice. Please try again later.';
      }
    );
  }
}
