import { Component, OnInit } from '@angular/core';
import { BookData } from '../../../data.model';
import { ApiService } from '../../api.service';
import { BookItemComponent } from '../book-item/book-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{

  book: any;
  bookId: any;

  constructor(
    private route: ActivatedRoute,
    private apiService:ApiService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') || '';
      if (this.bookId) {
        this.apiService.getBookById(this.bookId).subscribe(
          data => {
            this.book = data; 
          },
          error=> {
            console.error('Error fetching book details', error);
          }
        );
      }
    });
  }

  get thumbnail(){
    return this.book.volumeInfo.imageLinks.thumbnail;
  }
 onSubmit(bookId:string){
  this.router.navigate(['/review',bookId]);
 }

 ViewReview(bookId:string) {
  console.log(bookId);
  this.router.navigate(['/view-review',bookId]);
  }
}
