import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookItemComponent } from './home/book-item/book-item.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,BookItemComponent,HomeComponent,MyProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bookshelf';
}