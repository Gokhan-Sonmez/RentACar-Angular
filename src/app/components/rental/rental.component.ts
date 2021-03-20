import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  title="Rentals Detail List"
  car :CarDetail;
  customers:CustomerDetail[]=[];
  

  constructor(
    private formBuilder:FormBuilder,
    private rentalService:RentalService,
    private customerService:CustomerService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

    rentalAddForm:FormGroup;
    rental:Rental = new Rental()

    createRentalAddForm(){
      this.rentalAddForm = this.formBuilder.group({
        customerId:["",Validators.required],
        rentDate:["",Validators.required],
        returnDate:["",Validators.required]
      });
    }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["carId"]){
          this.getCarDetail(params["carId"])
        }
      })
      this.getCustomersDetail();
      this.createRentalAddForm();
      }
      getCustomersDetail(){
        this.customerService.getCustomersDetail().subscribe((response)=>{
        this.customers = response.data;
        
        });
    }
    getCarDetail(carId:number) {
      this.carService.getCarDetailById(carId).subscribe((response) => {
        this.car = response.data[0];
      
      });
    }

    addRental(){
  
      this.rental = Object.assign({},this.rentalAddForm.value)
      this.rental.carId = this.car.carId;
      this.rental.customerId=parseInt(this.rental.customerId.toString())
      this.rentalService.addRental(this.rental).subscribe((data)=>{
      data.data = this.rental;
      this.toastrService.success("Araba Kiralandı",data.message)
      },
      (error)=>{
      this.toastrService.error("Araba Kiralanamaz",error.message)
 
      }
      );
      }

    }
  



