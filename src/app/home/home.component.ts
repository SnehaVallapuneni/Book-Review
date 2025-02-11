import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BookData } from '../../data.model';
import { BookItemComponent } from './book-item/book-item.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValueArrayPipe } from '../value-array.pipe';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookItemComponent,CommonModule,FormsModule,ValueArrayPipe,MyProfileComponent,RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  books!:Observable<BookData[]>;
  title: any;
  data!:Observable<BookData[]>;
 //books!:BookData[]
  constructor(private apiservice:ApiService){}
  ngOnInit():void {
    this.fetchData()
  }
  fetchData(){
  /*  this.books=this.apiservice.getData();
   this.books.subscribe({
      next: data => console.log('Fetched Books:', data),  // Log the actual data
      error: error => console.error('Error fetching books:', error),  // Handle errors
      complete: () => console.log('Book data fetching complete')  // Optional completion callback
    })*/
      this.books = this.apiservice.getData(); 
  }
  searchBook() {
    this.data=this.apiservice.getBook(this.title);
    console.log(this.data)
    }
}