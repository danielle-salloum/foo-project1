import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Pages
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AddToCartPageComponent } from './Pages/add-to-cart-page/add-to-cart-page.component';
import { AddProductFormComponent } from './Pages/Partials/add-product-form/add-product-form.component';
import { SignupformComponent } from './Pages/signupform/signupform/signupform.component';
import { LogInFormComponent } from './Pages/log-in-form/log-in-form.component';

//services
import { BeforeLoginService } from './Service/before-login/before-login.service';
import { AfterLoginService } from './Service/after-login/after-login.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home'

  },
  {
    path: 'login',
    component: LogInFormComponent,
    title: 'Log In',
    canActivate: [BeforeLoginService]

  },
  {
    path: 'cart',
    component: AddToCartPageComponent,
    title: 'Cart',
    canActivate: [AfterLoginService]
  },
  {
    path: 'add-product',
    component: AddProductFormComponent,
    title: 'Add Product',
    canActivate: [AfterLoginService]
  },
  {
    path: 'sign-up',
    component: SignupformComponent,
    title: 'Sign Up',
    canActivate: [BeforeLoginService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
