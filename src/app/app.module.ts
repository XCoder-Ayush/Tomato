import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'
import { MatChipsModule } from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginService } from './services/login/login.service';
import { AuthGuard } from './guards/auth.guard';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { LogoutdialogComponent } from './header/logoutdialog/logoutdialog.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import {MatStepperModule} from '@angular/material/stepper';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { SocketService } from './services/socket/socket.service';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CartComponent } from './shop/cart/cart.component';
import { AuthComponent } from './auth/auth/auth.component';
import { CheckoutComponent } from './shop/cart/checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { MatPaginatorModule } from '@angular/material/paginator';

// import { TokenExpirationService } from './services/TokenExpiration/token-expiration.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    EmptyCartComponent,
    LogoutdialogComponent,
    FooterComponent,
    RegisterComponent,
    OrdersComponent,
    ShopComponent,
    ComingSoonComponent,
    ForbiddenComponent,
    CartComponent,
    AuthComponent,
    CheckoutComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatBadgeModule,
    MatExpansionModule,
    MatSelectModule,
    MatSliderModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatStepperModule,
    MatPaginatorModule
  ],
  providers: [LoginService,AuthGuard,{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
