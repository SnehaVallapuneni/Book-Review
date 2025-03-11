import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BookData } from '../../data.model';
import { BookItemComponent } from './book-item/book-item.component';
import { Observable, Subject, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValueArrayPipe } from '../value-array.pipe';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookItemComponent, CommonModule, FormsModule, ValueArrayPipe, MyProfileComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  books!: Observable<BookData[]>;
  title: string = '';
  isSearching: boolean = false;
  hasSearched: boolean = false;
  private searchTerms = new Subject<string>();

  constructor(private apiservice: ApiService) {
    // Set up search observable
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term.trim()) {
          this.isSearching = false;
          this.hasSearched = false;
          return this.apiservice.getData(); // Return all books when search is cleared
        }
        this.isSearching = true;
        this.hasSearched = true;
        return this.apiservice.searchBooks(term).pipe(
          finalize(() => {
            this.isSearching = false;
          })
        );
      })
    ).subscribe(books => {
      this.books = of(books); // Update the books observable with search results
    });
  }

  ngOnInit(): void {
    this.fetchData(); // Load all books initially
  }

  fetchData() {
    this.books = this.apiservice.getData();
  }

  searchBook() {
    this.searchTerms.next(this.title);
  }

  onSearchInput(event: any) {
    const term = event.target.value;
    this.searchTerms.next(term);
  }

  clearSearch() {
    this.title = '';
    this.searchTerms.next('');
  }
}