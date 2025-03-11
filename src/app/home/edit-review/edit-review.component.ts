import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../review.service';
import { Review } from '../../review';

@Component({
  selector: 'app-edit-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.css'
})
export class EditReviewComponent implements OnInit {
  review: Review = {
    id: 0,
    reviewerName: '',
    comment: '',
    rating: 0,
    bookId: ''
  };
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const reviewId = this.route.snapshot.paramMap.get('id');
    if (reviewId) {
      this.loadReview(Number(reviewId));
    }
  }

  loadReview(reviewId: number): void {
    this.reviewService.getReviewById(reviewId).subscribe({
      next: (review) => {
        this.review = review;
      },
      error: (error) => {
        console.error('Error fetching review:', error);
        alert('Failed to load review details. Please try again.');
        this.router.navigate(['/book-detail', this.review.bookId]);
      }
    });
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.reviewService.editReview(this.review.id, this.review).subscribe({
      next: () => {
        alert('Review updated successfully!');
        this.router.navigate(['/book-detail', this.review.bookId]);
      },
      error: (error) => {
        console.error('Error updating review:', error);
        alert('Failed to update review. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  validateForm(): boolean {
    if (!this.review.reviewerName.trim()) {
      alert('Please enter your name.');
      return false;
    }
    if (!this.review.comment.trim()) {
      alert('Please enter your review comment.');
      return false;
    }
    if (this.review.rating < 1 || this.review.rating > 5) {
      alert('Please select a rating between 1 and 5 stars.');
      return false;
    }
    return true;
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/book-detail', this.review.bookId]);
    }
  }
}
