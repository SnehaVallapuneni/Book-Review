import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  profile: any;
  constructor() {
    // Sample profile data, you can replace this with dynamic data
    this.profile = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+1234567890',
      bio: 'Full-stack developer with a passion for creating beautiful and responsive web applications.'
    };
  }

}
