import { nonAuthGuard } from './../../services/auth-guards/non-auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../../services/auth.service';
import { authReducer } from '../../store/reducers/auth.reducer';
import { AuthEffects } from '../../store/effects/auth.effect';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [nonAuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule {}
