import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


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
  filterText = '';

  constructor(
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsBySelect(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
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
  getCarsBySelect(brandId: number, colorId: number) {
    this.carService.getCarsBySelect(brandId, colorId).subscribe((response) => {
      this.carsDetail = response.data;
      this.dataLoaded = true;
      if (this.carsDetail.length == 0) {
        this.toastr.info(
          'Arama sonuçunuza ait bir araç bulunmamaktadır.',
          response.messages
        );
      }
    });
  }

}
