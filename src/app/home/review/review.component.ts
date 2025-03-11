import { Component, OnInit } from '@angular/core';
import { Review } from '../../review';
import { ReviewService } from '../../review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookData } from '../../../data.model';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviews: Review[] = [];
  review: Review = {
    reviewerName: '',
    comment: '',
    rating: 0,
    id: 0,
    bookId: ''
  };

  book!:BookData;
  bookId!: string;

  constructor(private rs: ReviewService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') || '';
    //  this.getAllReviews(); 
    });
  }

 /* getAllReviews(): void {
    this.rs.getReviewsByBookId(this.bookId).subscribe((data: Review[]) => {
      this.reviews = data;
    });
  }*/

  onSubmit(): void {

    this.review.bookId = this.bookId;
  
    this.rs.createReview(this.bookId, this.review).subscribe(
      response => {
        console.log('Review submitted successfully', response);
        const newReview = response as Review; 
          if (newReview && newReview.id) {
          this.reviews.push(newReview); 
        } else {
          console.error('Unexpected response structure:', response);
        }
        
        this.resetReview(); 
      },
      error => {
        console.error('Error submitting review', error);
      }
    );
  }
  

  onCancel(): void {
    this.resetReview();
    const dialog = document.querySelector('dialog');
    this.router.navigate(['/book-detail', { id: this.bookId }]);
    if (dialog) {
      dialog.close();
    }
  }

  resetReview(): void {
    this.review = {
      reviewerName: '',
      comment: '',
      rating: 0,
      id: 0,
      bookId: ''
    };
  }

}
