import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookData } from '../data.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  apiUrl="https://www.googleapis.com/books/v1/volumes?q=fiction&key=AIzaSyBwEKJzX9HF51z4btVROK8QooZx7uG-5ww";
  apiUrl1 = "https://www.googleapis.com/books/v1/volumes"
  apiUrl2="https://www.googleapis.com/books/v1/volumes?q="  
  constructor(private http:HttpClient) { }
 /* getData():Observable<BookData[]>{
    return this.http.get<BookData[]>(this.apiUrl);
  }
 //getData():any{
  return this.http.get(this.apiUrl)
 }*/
  getData(): Observable<BookData[]> {
    return this.http.get<{ items: any[] }>(this.apiUrl).pipe(
      map(response => response.items.map(item => this.transformToBookData(item)))
    );
  }

  private transformToBookData(item: any): BookData {
    return {
      id: item.id,
      volumeInfo: {
        title: item.volumeInfo.title,
        subtitle: item.volumeInfo.subtitle,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        publishDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        averageRating: item.volumeInfo.averageRating,
        ratingsCount: item.volumeInfo.ratingsCount,
        imageLinks: {
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
          smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail
        }
      }
    };
  }
  getBook(title: string): Observable<BookData[]> {
    const url = `${this.apiUrl2}?q=${encodeURIComponent(title)}&key=AIzaSyBwEKJzX9HF51z4btVROK8QooZx7uG-5ww`;
    return this.http.get<{ items: any[] }>(url).pipe(
      map(response => response.items.map(item => this.transformToBookData(item)))
    );
  }
  
  getBookById(bookId: any) {
    const url = `${this.apiUrl1}/${bookId}?key=AIzaSyBwEKJzX9HF51z4btVROK8QooZx7uG-5ww`; 

    return this.http.get<any>(url).pipe(
      map(response => this.transformToBookData(response)),
      catchError(error => {
        console.error('Error fetching book details', error);
        return of(this.defaultBookData());
      })
    );
  }
  private defaultBookData() {
    return {
      title: 'No title available',
      authors: 'No authors available',
      description: 'No description available',
      thumbnail: 'path/to/default-thumbnail.jpg'
    };
  }
} 
