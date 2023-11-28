import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data-service/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AddServiceService } from 'src/app/Service/AddService/add-service.service';
@Component({
  selector: 'app-add-to-cart-page',
  templateUrl: './add-to-cart-page.component.html',
  styleUrls: ['./add-to-cart-page.component.css']
})
export class AddToCartPageComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    ) { }
    
  //get data
  ngOnInit(): void {
    this.getProductsData();
  }
 
  //Add to cart
  products: any;

  getProductsData() {
    // console.log("Products Fetched");
    this.dataService.getData().subscribe(res => {
      // console.log(res);
      this.products = res;
    });
  }

  chosenProducts: ChosenProduct[] = [];

  calculateTotal(): number {
    return this.chosenProducts.reduce((total, chosenProduct) => total + chosenProduct.totalPrice, 0);
  }

  // Inside the AddToCartPageComponent class
  addToCart(product: Product, chosenQuantity: number): void {
    
    if (chosenQuantity >= 0 && chosenQuantity <= product.quantity) {
      const existingProductIndex = this.chosenProducts.findIndex(p => p.id === product.id);
      if (chosenQuantity === 0 && existingProductIndex !== -1) {
        // this.chosenProducts.splice(existingProductIndex, 1);
        this.removeFromCart(product);
      }
      else {
        if (existingProductIndex !== -1) {
          this.chosenProducts[existingProductIndex].quantityPurchased = chosenQuantity;
          this.chosenProducts[existingProductIndex].totalPrice = chosenQuantity * product.price;
        }
        else {
          if(chosenQuantity != 0){
          this.chosenProducts.push({
            id: product.id,
            title: product.title,
            quantityPurchased: chosenQuantity,
            totalPrice: chosenQuantity * product.price
          });
          }
        }
      }
    }
  }

  removeFromCart(chosenProduct: any): void {
  const index = this.chosenProducts.findIndex(p => p.id === chosenProduct.id);
  if (index !== -1) {
    if (chosenProduct.quantityPurchased === 0) {
      this.chosenProducts.splice(index, 1);
    } else {
      this.chosenProducts.splice(index, 1);
    }
  }

  // Remove the green border when the product is removed from the cart
  const productCard = document.getElementById(`productCard${chosenProduct.id}`);
  if (productCard) {
    productCard.style.borderColor = '#d2d2d2';
  }

  const quantityInput = document.getElementById(`quantityInput${chosenProduct.id}`) as HTMLInputElement;
  if (quantityInput) {
    quantityInput.value = '0';
  }
}

 sanitizeImage(image: string): SafeUrl {
    if (image && image.startsWith('data:image')) {
      return this.sanitizer.bypassSecurityTrustUrl(image);
    } else {
      return image;
    }
  }
  
}

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface ChosenProduct {
  id: number;
  title: string;
  quantityPurchased: number;
  totalPrice: number;
}
