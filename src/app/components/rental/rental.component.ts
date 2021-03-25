import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
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
  cars:CarDetail[]=[];
  constructor(
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
  rentable: boolean;
  firstDateSelected: boolean = false;
  minDate: string | null;
  maxDate: string | null;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailById(params['carId']);
        this.getCustomersDetail();
     
      }
      this.checkStatus();
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
 

 
  addRental() {
    let RentalModel = {
      customerId: this.customerId,
      carId: this.car.carId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      status: this.rentable
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

 
  getCarDetailById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.car = response.data[0];
      this.cars = response.data;  
      this.checkStatus();
      console.log( this.cars)
    });
  }

  checkStatus() {
    this.cars.forEach(element => {
     this.rentable  = element.status
     console.log(element.status)
    });
   
  }

}


   
    
  



