import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  colors:Color[];
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private router:Router,
   
  ) {}

  ngOnInit(): void {
    
    this.createColorAddForm();
    this.getColors();
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);

      this.colorService.addColor(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Color Added');
          this.router.navigate(["colors/add"]);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'You cant add color'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
    this.router.navigate(['colors/add']);
    this.toastrService.success(
      'Ekleme sayfasına yönlendiriliyorsunuz.',
      
    );
  }

  deleteColor(color: Color){
    this.colorService.deleteColor(color).subscribe((response) => {
      this.toastrService.success(response.message, 'Color deleted');
  });
  this.router.navigate(['colors/add']);
    this.toastrService.success(
      'Ekleme sayfasına yönlendiriliyorsunuz.',
      
    );
  }

  updateColor(color: Color){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      colorModel.colorId = color.colorId;
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Color updated');
          this.router.navigate(["colors/add"]);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'You cant update color'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
    this.router.navigate(['colors/add']);
    this.toastrService.success(
      'Ekleme sayfasına yönlendiriliyorsunuz.',
      
    );
  }


}
