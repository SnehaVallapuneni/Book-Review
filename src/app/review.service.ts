import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  Basic_URL:any;
  data:any;

  constructor(private hs:HttpClient) {
    this.Basic_URL="http://localhost:8080/api/reviews";
   }

   getReviews():Observable<Review[]>{
    return this.hs.get<Review[]>(this.Basic_URL);
   }

  /* createNewReview(review: Review): Observable<Review> {
    return this.hs.post<Review>(`${this.Basic_URL}`, review); // Correctly call the base URL
  }*/

    createReview(bookId: string, review: Review) {
      return this.hs.post(`${this.Basic_URL}/${bookId}`, review);
    }

   getReviewsByBookId(bookId: string): Observable<Review[]> {
    return this.hs.get<Review[]>(`${this.Basic_URL}/${bookId}`);
   }  

  deleteReview(id: number): Observable<void> {
    return this.hs.delete<void>(`${this.Basic_URL}/${id}`);
  }

  editReview(id: number, review: Review): Observable<Review> {
    return this.hs.put<Review>(`${this.Basic_URL}/${id}`, review);
  }
}
