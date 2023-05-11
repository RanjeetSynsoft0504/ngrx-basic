import { authGuard } from '../../services/auth-guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, canActivate: [authGuard] }
    ])
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
