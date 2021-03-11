import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { CarDetailResponseModel } from '../models/carDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl= 'https://localhost:44398/api/cars/getcardetails';

  constructor(private httpClient: HttpClient) { }
  getCarDetail(): Observable<CarDetailResponseModel>{
    return this.httpClient.get<CarDetailResponseModel>(this.apiUrl)
  }
}
