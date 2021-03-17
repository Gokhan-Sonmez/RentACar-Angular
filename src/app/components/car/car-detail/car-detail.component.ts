import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { environment } from 'src/environments/environment';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  cars: CarDetail[] = [];
  images: CarImage[] = [];
  imageUrl = environment.baseUrl;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activetedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      this.getCarDetailById(params['carId']);
      this.getCarImageByCarId(params['carId']);
    });
  }
  getCarDetailById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarImageByCarId(carId: number) {
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.images = response.data;
      this.setGallery();
    });
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.images.length; i++) {
      imageUrls.push({
        small: this.imageUrl + this.images[i].imagePath,
        medium: this.imageUrl + this.images[i].imagePath,
        big: this.imageUrl + this.images[i].imagePath,
      });
    }
    return imageUrls;
  }
  setGallery() {
    this.galleryOptions = [
      {
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }
}
