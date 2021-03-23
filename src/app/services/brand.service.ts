import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }
  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = environment.apiUrl+ "brands/getall"

    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand): Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand,httpOptions);
  }
  deleteBrand(brand:Brand): Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "brands/delete"
    return this.httpClient.post<ResponseModel>(newPath,brand,httpOptions);
  }
  updateBrand(brand:Brand): Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "brands/update"
    return this.httpClient.post<ResponseModel>(newPath,brand,httpOptions);
  }
}
