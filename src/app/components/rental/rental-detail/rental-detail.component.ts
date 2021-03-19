import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  title="Rentals Detail List"
  rentalsDetail:RentalDetail[]=[]
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentalsDetail();
  }
  getRentalsDetail(){
    this.rentalService.getRentalDetail().subscribe((response)=>{
    this.rentalsDetail = response.data;
    
    });
}
}
