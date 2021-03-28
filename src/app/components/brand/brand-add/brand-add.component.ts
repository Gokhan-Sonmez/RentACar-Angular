import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brands: Brand[];
  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
    this.getBrands();
  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);

      this.brandService.addBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.messages, 'Brad Added');
          setTimeout(function () {
            location.reload();
          }, 100);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'You Cant Added'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  deleteBrand(brand: Brand) {
    this.brandService.deleteBrand(brand).subscribe((response) => {
      this.toastrService.success(response.messages, 'Brand Deleted');
      setTimeout(function () {
        location.reload();
      }, 100);
    });

    this.toastrService.success('Ekleme sayfasına yönlendiriliyorsunuz.');
  }

  updateBrand(brand: Brand) {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      brandModel.brandId = brand.brandId;
      this.brandService.updateBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.messages, 'Brand Updated');
          setTimeout(function () {
            location.reload();
          }, 100);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'You cant Updated'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
    setTimeout(function () {
      location.reload();
    }, 100);
    this.toastrService.success('Ekleme sayfasına yönlendiriliyorsunuz.');
  }
}
