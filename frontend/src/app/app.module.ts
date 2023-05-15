import { AlertService } from './services/alert.service';
import { HomeComponent } from './components/home/home/home.component';
import { AuthInterceptor } from './auth.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effect';
import { UserEffects } from './store/effects/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './components/auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
// import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
// import { YoutubeLayoutComponent } from './components/layout/youtube-layout/youtube-layout.component';
import { StoreModule } from '@ngrx/store';
import { UsersModule } from './components/users/users.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AlertComponent } from './shared/alert/alert/alert.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) },
  { path: '**', component: HomeComponent }


];


@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    HeaderComponent,
    AlertComponent,
    // YoutubeLayoutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AuthModule,
    UsersModule,
    StoreModule.forRoot(authReducer),
    StoreDevtoolsModule.instrument({
      logOnly: true,
      maxAge: 25, // Retains last 25 states
    }),
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([AuthEffects, UserEffects])
  ],
  providers: [
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private authEffects: AuthEffects) {
    this.authEffects.checkAuthenticationStatus();
  }
}
