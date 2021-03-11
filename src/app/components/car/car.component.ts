import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private carService:CarService) { }
  title="Cars Detail List"
  carsDetail:CarDetail[]=[]
  ngOnInit(): void {
    this.getCarsDetail();
  }
  getCarsDetail(){
this.carService.getCarDetail().subscribe((response)=>{
this.carsDetail = response.data;

});
  }
  

}
