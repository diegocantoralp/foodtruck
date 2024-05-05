import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {FoodTrucksManagementComponent} from "./owners/pages/food-trucks-management/food-trucks-management.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'owners/food-trucks/new', component: FoodTrucksManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
