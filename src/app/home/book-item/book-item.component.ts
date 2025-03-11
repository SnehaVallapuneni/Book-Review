import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { BookData } from '../../../data.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent implements OnInit {
  
  @Input() book!: BookData;

  constructor(private apiService: ApiService, private router: Router) {}
    
  viewBookDetail() {
    if (this.book?.id) {
      this.router.navigate(['/book-detail', this.book.id]);
    }
  }

  ngOnInit(): void {}

  get thumbnail(): string {
    return this.book?.volumeInfo?.imageLinks?.thumbnail || 'assets/default-book.jpg';
  }

  get title(): string {
    return this.book?.volumeInfo?.title || 'Untitled';
  }

  get authors(): string {
    return this.book?.volumeInfo?.authors?.join(', ') || 'Unknown Author';
  }
}
