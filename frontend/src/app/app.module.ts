import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapsComponent } from './Pages/Partials/maps/maps.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { FooterComponent } from './Pages/Partials/footer/footer.component';
import { LogInFormComponent } from './Pages/log-in-form/log-in-form.component';
import { MenuBarComponent } from './Pages/Partials/menu-bar/menu-bar.component';
import { CarouselComponent } from './Pages/Partials/carousel/carousel.component';
import { TopperBarComponent } from './Pages/Partials/topper-bar/topper-bar.component';
import { SignupformComponent } from './Pages/signupform/signupform/signupform.component';
import { AddToCartPageComponent } from './Pages/add-to-cart-page/add-to-cart-page.component';
import { ProductsListComponent } from './Pages/Partials/products-list/products-list.component';
import { AddProductFormComponent } from './Pages/Partials/add-product-form/add-product-form.component';

//Maps
import { GoogleMapsModule } from '@angular/google-maps';

//crud data
import { HttpClient, HttpClientModule } from '@angular/common/http';

//add to cart
import { FormsModule } from '@angular/forms';

//Services
import { AuthService } from './Service/AuthService/auth.service';
import { LoggedInService } from './Service/loggenIn/logged-in.service';
import { AddServiceService } from './Service/AddService/add-service.service';
import { AfterLoginService } from './Service/after-login/after-login.service';
import { BeforeLoginService } from './Service/before-login/before-login.service';
import { TokenServiceService } from './Service/tokenService/token-service.service';

//translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationLoaderService } from './Service/translationService/translation-loader.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from './Service/translationService/translation.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomePageComponent,
    AddToCartPageComponent,
    TopperBarComponent,
    MenuBarComponent,
    CarouselComponent,
    FooterComponent,
    MapsComponent,
    ProductsListComponent,
    AddProductFormComponent,
    LogInFormComponent,
    SignupformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationLoaderService,
      },
    }),
  ],
  providers: [
    AuthService,
    AddServiceService,
    TokenServiceService,
    LoggedInService,
    AfterLoginService,
    BeforeLoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
   constructor(private translationService: TranslationService) {
    this.translationService.init();
  }
}
