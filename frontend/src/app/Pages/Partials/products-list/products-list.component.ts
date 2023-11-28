// products-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AddServiceService } from 'src/app/Service/AddService/add-service.service';
import { DataService } from 'src/app/Service/data-service/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoggedInService } from 'src/app/Service/loggenIn/logged-in.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [
    // AddServiceService
  ]
})
export class ProductsListComponent implements OnInit {  

  constructor(
    private dataService: DataService,
    public popUpService: AddServiceService,
    private sanitizer: DomSanitizer,
    private loggedin: LoggedInService,
  ) { }
  //popup
  openPopup() {
    this.popUpService.togglePopUp();
  }
  public loggedIn: boolean = false;
  
  //get data
  ngOnInit(): void {
    this.loggedin.authStatus.subscribe(value => this.loggedIn = value),
    this.getProductsData();
  }

  products: any;

  getProductsData() {
    // console.log("Products Fetched");
    this.dataService.getData().subscribe((res: any) => {
      // console.log(res);
      if (Array.isArray(res)) {
        this.products = res.map((product: any) => ({
          ...product,
          image: this.sanitizeImage(product.image)
        }));
      } else {
        console.error('Error: The fetched data is not an array.');
      }
    });
  }

  deleteData(id: number) {
    // console.log(id);
    this.dataService.deleteData(id).subscribe(res => {
      this.getProductsData();
    });
  }

  sanitizeImage(image: string): SafeUrl {
    if (image && image.startsWith('data:image')) {
      return this.sanitizer.bypassSecurityTrustUrl(image);
    } else {
      return image;
    }
  }
}
