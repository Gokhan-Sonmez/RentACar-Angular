import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';

import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';



@Injectable({
  providedIn: 'root'
})
export class RentalService {


  constructor(private httpClient: HttpClient) { }

  getRentalDetail(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = environment.apiUrl+ "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  addRental(rental:Rental): Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental,httpOptions);
  }

}
