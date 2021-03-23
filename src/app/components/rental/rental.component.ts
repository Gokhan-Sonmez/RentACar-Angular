import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {
  title = 'Rentals Detail List';
  car: CarDetail;
  customers: CustomerDetail[] = [];
  rentals:Rental[]=[];
  constructor(
    private rentalService: RentalService,
    private customerService: CustomerService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  rental: Rental = new Rental();
  rentDate: Date;
  returnDate: Date;
  customerId: number;
  rentable: boolean = true;
  firstDateSelected: boolean = false;
  minDate: string | null;
  maxDate: string | null;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailById(params['carId']);
        this.getCustomersDetail();
       // this.CheckStatus(params['carId']);
        // this.getRentalsByCarId(params['carId']);
      }
    });
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
  }
  getCustomersDetail() {
    this.customerService.getCustomersDetail().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getCarDetailById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.car = response.data[0];
    });
  }

 
  addRental() {
    let RentalModel = {
      customerId: this.customerId,
      carId: this.car.carId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    this.router.navigate(['cars/rental/payment/', JSON.stringify(RentalModel)]);
    this.toastrService.success(
      'Ödeme sayfasına yönlendiriliyorsunuz.',
      'Kiralama başarılı'
    );
  }
 
  setCustomerId(customerId: any) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }
  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  /* getRentalsByCarId(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {
      if (response.data[response.data.length - 1]) {
        this.rental = response.data[response.data.length - 1];
      }
    });
  }

  CheckStatus(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.rentable = response.data[0].status;
    });
  }*/
}


   
    
  



