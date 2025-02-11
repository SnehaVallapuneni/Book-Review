import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { BookData } from '../../../data.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent implements OnInit{
  
  @Input() book!: BookData;
  constructor(private apiService:ApiService,private router:Router){}
    
  viewBookDetail(bookId:string) {
    this.router.navigate(['/book-detail', bookId]);
  }
  ngOnInit(): void {
   // this.books=this.apiService.getData();
  }

  get thumbnail(){
    return this.book.volumeInfo.imageLinks.thumbnail;
  }
}
