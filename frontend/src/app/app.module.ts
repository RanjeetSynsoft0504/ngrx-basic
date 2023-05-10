import { RouterModule, Routes } from '@angular/router';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effect';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './components/auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
// import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
// import { HeaderComponent } from './components/layout/header/header.component';
// import { YoutubeLayoutComponent } from './components/layout/youtube-layout/youtube-layout.component';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) }

];


@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // HeaderComponent,
    // YoutubeLayoutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AuthModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
