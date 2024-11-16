import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  statistics: any = {};
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient , private userService:UserService) {}

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.userService.getStatistics()
      .subscribe({
        next: (data) => {
          this.statistics = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load statistics';
          console.error(error);
          this.loading = false;
        },
      });
  }
}
