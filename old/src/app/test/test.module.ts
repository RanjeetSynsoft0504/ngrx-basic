import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginTestComponent } from './login-test/login-test.component';
import { Routes } from '@angular/router';


const routes: Routes = [
  {path:"", component : LoginTestComponent}
];

@NgModule({
  declarations: [
    LoginTestComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestModule { }
