import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { AuthGuard } from './guards/auth.guard';
import { ShopComponent } from './shop/shop.component';
import { OrdersComponent } from './orders/orders.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ForbiddenGuard } from './guards/forbidden.guard';
import { CartComponent } from './shop/cart/cart.component';
import { AuthComponent } from './auth/auth/auth.component';
import { CheckoutComponent } from './shop/cart/checkout/checkout.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate : [AuthGuard]},
  { path: 'search/:searchItem', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'cart',component: CartComponent, canActivate: [AuthGuard]},
  { path: 'empty-cart', component: EmptyCartComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'blog', component:ComingSoonComponent},
  { path : 'about', component: ComingSoonComponent},
  { path: 'contact', component: ComingSoonComponent},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'auth', component: AuthComponent},
  { path : 'checkout',  component:CheckoutComponent},
  { path:'order/:orderId',component:OrderComponent}
  // { path: '**', redirectTo: '/products' } // Redirect to the default route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
