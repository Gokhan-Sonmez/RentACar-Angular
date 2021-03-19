import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private httpClient: HttpClient) { }
 

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = environment.apiUrl+ "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomersDetail(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = environment.apiUrl+ "customers/getcustomersdetail"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }
}
