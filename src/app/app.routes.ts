import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { BookDetailComponent } from './home/book-detail/book-detail.component';
import { ReviewComponent } from './home/review/review.component';
import { ViewReviewComponent } from './home/view-review/view-review.component';

export const routes: Routes = [
    {path:'',component:LoginPageComponent},
    {path:'home',component:HomeComponent},
    {path:'book-detail/:id',component:BookDetailComponent},
    {path:'review/:id',component:ReviewComponent},
    {path:'view-review/:id',component:ViewReviewComponent},
    {path:'my-profile',component:MyProfileComponent}
];
