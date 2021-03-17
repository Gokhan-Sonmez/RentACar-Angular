import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {

  title = 'Cars Detail List';
  carsDetail: CarDetail[] = [];
  imageUrl = environment.baseUrl;
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activetedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCarsDetail();
      }
    });
  }
  getCarsDetail() {
    this.carService.getCarDetail().subscribe((response) => {
      this.carsDetail = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carsDetail = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carsDetail = response.data;
      this.dataLoaded = true;
    });
  }
}
