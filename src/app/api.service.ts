import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookData } from '../data.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private googleBooksSearchUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getData(): Observable<BookData[]> {
    return this.http.get<{ items: any[] }>(this.googleBooksApiUrl + '?q=fiction').pipe(
      map(response => (response.items || []).map(item => this.transformToBookData(item))),
      catchError(error => {
        console.error('Error fetching books:', error);
        return of([]);
      })
    );
  }

  private transformToBookData(item: any): BookData {
    return {
      id: item?.id || '',
      volumeInfo: {
        title: item?.volumeInfo?.title || 'Untitled',
        subtitle: item?.volumeInfo?.subtitle || '',
        authors: item?.volumeInfo?.authors || ['Unknown Author'],
        publisher: item?.volumeInfo?.publisher || '',
        publishDate: item?.volumeInfo?.publishedDate || '',
        description: item?.volumeInfo?.description || '',
        averageRating: item?.volumeInfo?.averageRating || 0,
        ratingsCount: item?.volumeInfo?.ratingsCount || 0,
        imageLinks: {
          thumbnail: item?.volumeInfo?.imageLinks?.thumbnail || 'assets/default-book.jpg',
          smallThumbnail: item?.volumeInfo?.imageLinks?.smallThumbnail || 'assets/default-book.jpg'
        }
      }
    };
  }

  getBook(title: string): Observable<BookData[]> {
    return this.http.get<{ items: any[] }>(`${this.googleBooksSearchUrl}${encodeURIComponent(title)}`).pipe(
      map(response => (response.items || []).map(item => this.transformToBookData(item))),
      catchError(error => {
        console.error('Error searching books:', error);
        return of([]);
      })
    );
  }

  getBooks(): Observable<BookData[]> {
    return this.http.get<BookData[]>(this.apiUrl);
  }

  getBookById(id: string): Observable<BookData> {
    return this.http.get<any>(`${this.googleBooksApiUrl}/${id}`).pipe(
      map(item => this.transformToBookData(item)),
      catchError(error => {
        console.error('Error fetching book details:', error);
        return of(this.transformToBookData({}));
      })
    );
  }

  searchBooks(title: string): Observable<BookData[]> {
    return this.getBook(title);
  }

  addBook(book: BookData): Observable<BookData> {
    return this.http.post<BookData>(this.apiUrl, book).pipe(
      catchError(error => {
        console.error('Error adding book:', error);
        return of(book);
      })
    );
  }

  updateBook(id: string, book: BookData): Observable<BookData> {
    return this.http.put<BookData>(`${this.apiUrl}/${id}`, book).pipe(
      catchError(error => {
        console.error('Error updating book:', error);
        return of(book);
      })
    );
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting book:', error);
        return of(void 0);
      })
    );
  }
} 
