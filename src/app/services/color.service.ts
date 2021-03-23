import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }


  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = environment.apiUrl+ "colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color): Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "colors/add"
    return this.httpClient.post<ResponseModel>(newPath,color,httpOptions);
  }
  deleteColor(color:Color): Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "colors/delete"
    return this.httpClient.post<ResponseModel>(newPath,color,httpOptions);
  }
  updateColor(color:Color): Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "colors/update"
    return this.httpClient.post<ResponseModel>(newPath,color,httpOptions);
  }
}
