import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { AddServiceService } from 'src/app/Service/AddService/add-service.service';
import { DataService } from 'src/app/Service/data-service/data.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private popUpService: AddServiceService,
    private router: Router
  ) { }

  // PopUp
  showPopUp: boolean = false;

  ngOnInit(): void {
    this.popUpService.showPopUp$.subscribe((showPopUp: boolean) => {
      this.showPopUp = showPopUp;
    });
  }

  closePopUp() {
    this.popUpService.togglePopUp();
  }

  // Add products
  product: Product = new Product('', 0, 0, '');

  // Image: string = ''; // Declare the image property

  onSubmit() {
    const fileInput: any = document.getElementById('image');
    const file = fileInput.files[0];

    if (file) {
      this.getBase64(file).then((base64String: string) => {
        this.product.image = base64String; // Assign base64 string to product.image
        console.log('product details:', this.product);

        // Now you can send the product object (including the base64 image) to the backend
        this.insertData();
      });
    }
  }

  onFileChange(event: any) {
    const fileInput: any = event.target;
    const file = fileInput.files[0];

    if (file) {
      // Update image preview or perform any other necessary actions
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Assuming you have an HTML img element with the id "imagePreview"
        const imagePreview: HTMLImageElement = document.getElementById('imagePreview') as HTMLImageElement;
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getBase64(file: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  error: string = '';

  handleError(error: any): void {
    this.error = error?.error?.error || 'An unexpected error occurred';
  }

  insertData() {
    console.log('submitted');
    console.log(this.product);
    this.dataService.insertData(this.product).subscribe(
      (res) => console.log(res),
      (error) => this.handleError(error)
    );
    this.closePopUp();
    this.router.navigateByUrl('/')
  }
}
