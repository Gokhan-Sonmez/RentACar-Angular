import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCarDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      environment.apiUrl + 'cars/getcarsdetailsbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      environment.apiUrl + 'cars/getcarsdetailsbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailById(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl + 'cars/getcardetailbyId?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsBySelect(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      environment.apiUrl +
      'cars/getbyselected?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addCar(car: Car): Observable<ResponseModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let newPath = environment.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car, httpOptions);
  }
  deleteCar(car: Car): Observable<ResponseModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let newPath = environment.apiUrl + 'cars/delete';
    return this.httpClient.post<ResponseModel>(newPath, car, httpOptions);
  }
  updateCar(car: Car): Observable<ResponseModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let newPath = environment.apiUrl + 'cars/update';
    return this.httpClient.post<ResponseModel>(newPath, car, httpOptions);
  }
}
