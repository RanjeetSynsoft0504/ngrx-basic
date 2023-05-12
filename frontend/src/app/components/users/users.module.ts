import { userReducer } from './../../store/reducers/user.reducer';
import { authGuard } from './../../services/auth-guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthEffects } from './../../store/effects/auth.effect';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [authGuard] }
];


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [UserService]
})
export class UsersModule { }
