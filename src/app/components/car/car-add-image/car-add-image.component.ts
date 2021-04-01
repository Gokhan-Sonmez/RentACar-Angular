import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';

import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-car-add-image',
  templateUrl: './car-add-image.component.html',
  styleUrls: ['./car-add-image.component.css'],
})
export class CarAddImageComponent implements OnInit {
  fileData: File = null;
  cars: Car[];
  currentCar:Car;
  imageAddForm: FormGroup;
  constructor(
    private imageService: CarImageService,
    private carService:CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}
  selectedFile: ImageSnippet;
  ngOnInit(): void {
    this.createCarImageAddForm();
    this.getCars()
  }
  

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  addImage() {
    const reader = new FileReader();
    console.log(this.imageAddForm.value)
    let carModel = Object.assign({}, this.imageAddForm.value);
    carModel.carId = parseInt(carModel.carId.toString());
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, this.fileData);

      this.imageService.uploadImage(this.selectedFile.file, carModel.carId).subscribe(
        (response) => {
          this.toastrService.success(response.messages, 'Image Added');
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
    });

    reader.readAsDataURL(this.fileData);
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  createCarImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
    });
  }

}
