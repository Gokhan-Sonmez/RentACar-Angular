import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient:HttpClient) { }

  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = environment.apiUrl+ "carImages/getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath = environment.apiUrl+ "carImages/all"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  uploadImage(image: File,carId:number):Observable<ResponseModel> {

    const formData:FormData = new FormData();

    formData.append('Image', image);
    formData.append('CarId',carId.toString());
    let newPath=environment.apiUrl+'carImages/add';
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress: true,
      responseType: 'json',
    });

}


}
