import { Component } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Review } from '../../review';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private reviewService: ReviewService
  ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.bookId = id;
        if (id) {
          this.getReviewsForBook(id);
        }
      });
    }

  getReviewsForBook(bookId: string): void {
    this.reviewService.getReviewsByBookId(bookId).subscribe({
      next: (data: Review[]) => {
        console.log('Fetched reviews:', data);
        this.reviews = data;
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
        alert('Error loading reviews. Please try again.');
      }
    });
  }
  
  editReview(review: Review) {
    this.router.navigate(['/edit-review', review.id]);
  }

  deleteReview(review: Review) {
    const confirmDelete = window.confirm('Are you sure you want to delete this review? This action cannot be undone.');
    
    if (confirmDelete) {
      this.reviewService.deleteReview(review.id).subscribe({
        next: () => {
          // Remove the review from the local array
          this.reviews = this.reviews.filter(r => r.id !== review.id);
          alert('Review deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting review:', error);
          alert('Failed to delete review. Please try again.');
        }
      });
    }
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


