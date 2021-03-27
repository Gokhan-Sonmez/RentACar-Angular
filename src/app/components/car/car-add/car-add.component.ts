import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  cars:Car[];
  brands:Brand[];
  colors:Color[];
  carAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,
    private colorService:ColorService,
    private brandService:BrandService,
    private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getColors();
    this.getBrands();
    this.getCars();
  }
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required], 
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      findexScore:["",Validators.required]
    
    })
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

      addCar(){
        if(this.carAddForm.valid){
          let carModel =Object.assign({},this.carAddForm.value) 
          carModel.brandId= parseInt(carModel.brandId.toString())
          carModel.colorId= parseInt(carModel.colorId.toString())
          this.carService.addCar(carModel).subscribe(response=>{
         
            this.toastrService.success(response.messages," Car Added")
          },responseError=>{
            if(responseError.error.Errors.length>0){
              
              for (let i = 0; i < responseError.error.Errors.length; i++) {
    
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"You Cant Add")
                
              }
            }
          })
          
        }else{
          this.toastrService.error("Formunuz Eksik","Dikkat")
    
        }
        this.router.navigate(['cars/add']);
        this.toastrService.success(
          'Ekleme sayfasına yönlendiriliyorsunuz.',
          
        );
      }
      getCars() {
        this.carService.getCars().subscribe((response) => {
          this.cars = response.data;
        });
      }

      updateCar(car:Car){
        if(this.carAddForm.valid){
          let carModel =Object.assign({},this.carAddForm.value)
          carModel.carId= car.carId;
          carModel.brandId= parseInt(carModel.brandId.toString())
          carModel.colorId= parseInt(carModel.colorId.toString())
          this.carService.updateCar(carModel).subscribe(response=>{
         
            this.toastrService.success(response.messages,"Car Updated")
          },responseError=>{
            if(responseError.error.Errors.length>0){
              
              for (let i = 0; i < responseError.error.Errors.length; i++) {
    
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"You Cant Update")
                
              }
            }
          })
          
        }else{
          this.toastrService.error("Formunuz Eksik","Dikkat")
    
        }
        this.router.navigate(['cars/add']);
        this.toastrService.success(
          'Ekleme sayfasına yönlendiriliyorsunuz.',
          
        );
      }

      deleteCar(car: Car){
        this.carService.deleteCar(car).subscribe((response) => {
          this.toastrService.success(response.messages, 'Car deleted');
      });
      this.router.navigate(['cars/add']);
        this.toastrService.success(
          'Ekleme sayfasına yönlendiriliyorsunuz.',
          
        );
      }
    }
