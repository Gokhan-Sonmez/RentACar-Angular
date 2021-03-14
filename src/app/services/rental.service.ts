import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl= 'https://localhost:44398/';

  constructor(private httpClient: HttpClient) { }

  getRentalDetail(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl +"api/"+ "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
}
