import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/cards';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CardService } from 'src/app/services/card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardNumber:number;
  nameOnTheCard:string;
  lastName:string;
  expirationDate:string;
  cVV:number;
  rental:Rental;
  moneyPaid:number;

  constructor( private rentalService:RentalService,
    private paymentService:PaymentService,
    private cardService:CardService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params =>{
        if (params["rental"]) {
          this.rental = JSON.parse(params["rental"]);
          
        }
      })
    }
  addRental(){
    let newCard: Card = {
      cardNumber:this.cardNumber,
      nameOnTheCard:this.nameOnTheCard,
      expirationDate:this.expirationDate,
      cVV: +this.cVV
    }

    let newPayment: Payment = {
      rentalId:this.rental.rentalId,
      moneyPaid:this.moneyPaid
    }

    this.rentalService.addRental(this.rental).subscribe(response=>{
      this.toastrService.success(response.messages,"Car Rented");
      this.cardService.addCard(newCard).subscribe(responseCard=>{
        this.paymentService.addPayment(newPayment).subscribe(responsePay=>{
          this.toastrService.success(responsePay.messages,"Success fully Paid");
        },responsePayError=>{
              this.toastrService.error(responsePayError.error.messages,"you cant pay")
        })
        this.toastrService.success(responseCard.messages,"card correct");
      },responseCardError=>{
            this.toastrService.error(responseCardError.error.messages,"card error")
      });
    },responseError=>{
      console.log(responseError.error.messages)
          this.toastrService.error(responseError.error.messages,"you cant rent")               
      } 
    );
  


    this.router.navigate([""]);

    
  }
}



