import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DatePipe } from '@angular/common';
import { FindekscheckService } from 'src/app/services/findekscheck.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {
  title = 'Rentals Detail List';
  car: CarDetail;
  customers: CustomerDetail[]=[];
  cars:CarDetail[]=[];
  userId:number;
  constructor(
    private customerService: CustomerService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private router: Router,
    private findeksCheckService:FindekscheckService,
    private authService:AuthService,
  ) {}

  rental: Rental = new Rental();
  rentDate: Date;
  returnDate: Date;
  customerId: number;
  rentable: boolean = true;;
  firstDateSelected: boolean = false;
  minDate: string | null;
  maxDate: string | null;
  findex:boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
     if (params['carId']) {
        this.getCarDetailById(params['carId']); 
      }
      this.currentUserId();
      this.getCustomersDetailByUserId();
      this.checkStatus();
    });
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
  }

  getCustomersDetailByUserId(){
    this.customerService.getCustomersDetailByUserId(this.userId).subscribe((response) => {
      this.customers = response.data;
      this.getCustomerId();
      console.log(this.customers)
    });
  }
 
  currentUserId(){
    this.userId = this.authService.getCurrentUserId()
   
  }

  getCustomerId(){
    this.customers.forEach(element => {
      this.customerId = +element.customerId
      console.log(this.customerId)
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
    let CarModel = {
      carId: this.car.carId,
      dailyPrice : this.car.dailyPrice
    }
   
    this.checkFindeks(this.car.carId,this.customerId)
    if(this.findex==true){
      this.router.navigate(['cars/rental/payment/', JSON.stringify(RentalModel)]);
      this.router.navigate(['cars/rental/payment/', JSON.stringify(CarModel)]);
      this.toastrService.success(
        'Ödeme sayfasına yönlendiriliyorsunuz.',
        'Kiralama başarılı'
      );
    }
    else{
      this.router.navigate(['cars']);
    }
   
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
  checkFindeks(carId:number,customerId:number){
    this.findeksCheckService.findekscheck(customerId,carId).subscribe((response) => {
      this.findex = true;
      this.toastrService.success(response.messages,"Findeks enogh")

    },responseError=>{
      this.findex = false;
              this.toastrService.error(responseError.error.message,"Findeks not enogh")
        });

  }

}


   
    
  



