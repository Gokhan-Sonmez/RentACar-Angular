import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl= 'https://localhost:44398';

  constructor(private httpClient: HttpClient) { }
 
  getCarDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl +"/api/"+ "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl+"/api/"+  "cars/getcarsbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl +"/api/"+  "cars/getcarsbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailById(carId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl +"/api/"+ "cars/getcardetailbyId?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
