import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  colorListFilter=0;
  brandListFilter=0;
  colors: Color[] = [];
  brands: Brand[] = [];
  constructor( private colorService: ColorService,
    private brandService: BrandService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();

  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  
  getSelectedColor(colorId: number) {
    if (this.colorListFilter===colorId) {
      return true
    } else {
      return false
    }
  }
  getSelectedBrand(brandId: number) {
    if (this.colorListFilter === brandId) {
      return true
    } else {
      return false
    }
  }
}
