import { Component } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Review } from '../../review';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-review.component.html',
  styleUrl: './view-review.component.css'
})
export class ViewReviewComponent {

  reviews: Review[] = [];
  bookId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id') as string;
        this.bookId = id !== null ? id : '';
        this.getReviewsForBook(id); 
      });
    }

  getReviewsForBook(bookId: string): void {
    this.reviewService.getReviewsByBookId(bookId).subscribe((data: Review[]) => {
      console.log('Fetched reviews:', data); 
      this.reviews = data;
    }, error => {
      console.error('Error fetching reviews:', error);
    });
  }
  
  editReview(review:Review) {
    console.log("clicked");
    this.reviewService.editReview(review.id,review);
  }

  deleteReview(review: Review) {
    this.reviewService.deleteReview(review.id);
  }

 /* getAllReviews(): void {
    if (this.bookId) { 
      this.reviewService.getReviewsByBookId(this.bookId).subscribe((data: Review[]) => {
        this.reviews = data;
      });
    } else {
      console.error('bookId is not valid:', this.bookId);
    }
  }  */  
}


