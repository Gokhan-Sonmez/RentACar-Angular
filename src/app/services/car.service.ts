import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {


  constructor(private httpClient: HttpClient) { }
 
  getCarDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl+ "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl+  "cars/getcarsdetailsbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl+  "cars/getcarsdetailsbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailById(carId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl+ "cars/getcardetailbyId?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
