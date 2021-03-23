import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "payments/add"
    return this.httpClient.post<ResponseModel>(newPath,payment,httpOptions);
  }

}
