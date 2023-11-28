import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images = [
    '../../../../assets/carousel/image1.jpeg',
    '../../../../assets/carousel/image2.jpeg',
    '../../../../assets/carousel/image3.jpeg',
  ];
}
