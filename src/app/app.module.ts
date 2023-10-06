import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TagsComponent } from './tags/tags.component';
import { FoodpageComponent } from './foodpage/foodpage.component';
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
import { AddFoodComponent } from './add-food/add-food.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginService } from './services/login/login.service';
import { AuthGuard } from './guards/auth.guard';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { LogoutdialogComponent } from './header/logoutdialog/logoutdialog.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './cart-page/checkout/checkout.component';
import {MatStepperModule} from '@angular/material/stepper';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartPageComponent,
    TagsComponent,
    FoodpageComponent,
    NotFoundComponent,
    AddFoodComponent,
    EmptyCartComponent,
    LoginComponent,
    LogoutdialogComponent,
    FooterComponent,
    RegisterComponent,
    CheckoutComponent,
    OrdersComponent,
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
    MatStepperModule
  ],
  providers: [LoginService,AuthGuard,{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
