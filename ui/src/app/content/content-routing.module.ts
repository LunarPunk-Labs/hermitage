import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from "./profile/profile.component";
import { PersonaComponent } from "./persona/persona.component";



// Import all the components for which navigation service has to be activated
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },

  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "profile/:id",
    component: ProfileComponent
  },
  {
    path: "persona",
    component: PersonaComponent
  },
  {
    path: "persona/:id",
    component: ProfileComponent
  },
  {
    path: '**', // If no matching route found, go back to home route
    component: HomeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
