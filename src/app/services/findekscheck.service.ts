import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindekscheckService {

  constructor(private httpClient:HttpClient) { }

  findekscheck(customerId:number,carId:number): Observable<ResponseModel> {
    let newPath = environment.apiUrl+ "findekscheck/findekscheck?customerId="+customerId+"&carId="+carId
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
