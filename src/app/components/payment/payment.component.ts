import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Card } from 'src/app/models/cards';
import { Customer } from 'src/app/models/customer';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CardService } from 'src/app/services/card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cardNumber: number;
  nameOnTheCard: string;
  lastName: string;
  expirationDate: string;
  cvv: number;

  rental: Rental;
  rentals: Rental;
  moneyPaid: number;
  car: Car;
  dailyPrice: number;
  customer: Customer;
  cardId: number;
  customerCard: Card[] = [];

  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private carService: CarService,
    private formBuilder: FormBuilder
  ) {}
  cardAddForm: FormGroup;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
      }
    });
    this.getCar();
    this.getCustomerCard();
    this.setCreditCardForm();
  }

  setCreditCardForm() {
    this.cardAddForm = this.formBuilder.group({
      customerCard: [''],
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }
  addRental() {
    console.log('çalıştı');
    this.rentalService.addRental(this.rental).subscribe(
      (response) => {
        this.toastrService.success(response.messages, 'Car Rented');
        this.getRentalId();
      },
      (responseError) => {
        console.log(responseError.error.messages);
        this.toastrService.error(responseError.error.messages, 'you cant rent');
      }
    );
  }

  saveCard() {
    let newCard: Card = {
      cardNumber: this.cardNumber,
      nameOnTheCard: this.nameOnTheCard,
      expirationDate: this.expirationDate,
      cvv: +this.cvv,
      customerId: this.rental.customerId,
    };

    this.cardService.addCard(newCard).subscribe(
      (responseCard) => {
        this.toastrService.success(responseCard.messages, 'card saved');
        this.addPayment();
      },
      (responseCardError) => {
        this.toastrService.error(
          responseCardError.error.messages,
          'card error'
        );
      }
    );
  }
  noSaveCard() {
    this.addPayment();
  }

  getCar() {
    console.log(this.rental.carId);
    console.log(this.rental.customerId);

    this.carService
      .getCarDetailById(this.rental.carId)
      .subscribe((response) => {
        this.car = response.data[0];

        console.log(this.car.dailyPrice);
      });
  }

  getCustomerCard() {
    this.cardService
      .getByCustomerId(this.rental.customerId)
      .subscribe((response) => {
        this.customerCard = response.data;
        console.log(this.customerCard);
        this.setCard();
      });
  }

  setCard() {
    this.customerCard.forEach((element) => {
      this.cardNumber = element.cardNumber;
      this.nameOnTheCard = element.nameOnTheCard;
      this.expirationDate = element.expirationDate;
      this.cvv = element.cvv;
      console.log(element.cvv);
    });
  }

  setCardInfos() {
    this.cardAddForm.patchValue({
      cardNumber: this.cardNumber,
      nameOnTheCard: this.nameOnTheCard,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
    });
  }

  getRentalId() {
    this.rentalService
      .getRentalsByCarId(this.rental.carId)
      .subscribe((response) => {
        this.rentals = response.data[0];
        console.log(this.car.dailyPrice);
        console.log(this.rentals);
      });
  }

  addPayment() {
    let newPayment: Payment = {
      rentalId: this.rentals.rentalId,
      moneyPaid: this.car.dailyPrice,
    };
    console.log('kiralama no' + this.rental.rentalId);
    this.paymentService.addPayment(newPayment).subscribe(
      (responsePay) => {
        this.toastrService.success(responsePay.messages, 'Success fully Paid');
      },
      (responsePayError) => {
        this.toastrService.error(
          responsePayError.error.messages,
          'you cant pay'
        );
      }
    );

    this.router.navigate(['']);
  }
}
