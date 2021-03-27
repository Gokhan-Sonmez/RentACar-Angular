import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/cards';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient:HttpClient) { }

  addCard(card:Card):Observable<ResponseModel> {
    const httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    let newPath = environment.apiUrl+ "cards/add"
    return this.httpClient.post<ResponseModel>(newPath,card,httpOptions);
  }

  getall(): Observable<ListResponseModel<Card>> {
    let newPath = environment.apiUrl+ "cards/getall"
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  get(cardId:Card): Observable<ListResponseModel<Card>> {
    let newPath = environment.apiUrl+ "cards/get?cardId="+cardId
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
}
