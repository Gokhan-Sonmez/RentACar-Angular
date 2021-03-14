import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private carService:CarService,private activetedRoute:ActivatedRoute
    ) { }
  title="Cars Detail List"
  carsDetail:CarDetail[]=[]
  currentCar : CarDetail;
  apiURL:string= this.carService.apiUrl

  ngOnInit(): void {this.activetedRoute.params.subscribe(params=>{
    if(params["brandId"]){
      this.getCarsByBrand(params["brandId"])
    }
    else if (params["colorId"]) {
      this.getCarsByColor(params["colorId"])
    }
    else{
      this.getCarsDetail()
    }
  })
  }
  getCarsDetail(){
this.carService.getCarDetail().subscribe((response)=>{
this.carsDetail = response.data;

});
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe((response)=>{
    this.carsDetail = response.data;
    
    });
      } 
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe((response)=>{
    this.carsDetail = response.data;
    
    });
      } 
  setCurrentCar(car:CarDetail){
        this.currentCar = car;
      }
  getCarDetailById(carId:number){
        this.carService.getCarDetailById(carId).subscribe((response)=>{
        this.carsDetail = response.data;
        
        });
     }

}
