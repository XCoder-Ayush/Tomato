import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FoodpageComponent } from './foodpage/foodpage.component';
import { HomeComponent } from './home/home.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate : [AuthGuard]},
  { path: 'search/:searchItem', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodpageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path : 'add-food', component: AddFoodComponent },
  { path: 'empty-cart', component: EmptyCartComponent },
  { path: 'login', component: LoginComponent },


  // { path: '**', redirectTo: '/products' } // Redirect to the default route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
