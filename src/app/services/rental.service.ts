import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';



@Injectable({
  providedIn: 'root'
})
export class RentalService {


  constructor(private httpClient: HttpClient) { }

  getRentalDetail(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = environment.apiUrl+ "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  addRental(rental:Rental): Observable<ItemResponseModel<Rental>> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "rentals/add"
    return this.httpClient.post<ItemResponseModel<Rental>>(newPath,rental,httpOptions);
  }

}
