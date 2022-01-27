import { Injectable } from '@angular/core';
import { PaymentDetails } from './payment-details.model';
import {HttpClient} from "@angular/common/http"
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  constructor(private http:HttpClient) { }
  readonly baseURL= 'http://localhost:22789/api/PaymentDetail'
  
  formData:PaymentDetails=new PaymentDetails();
  list:PaymentDetails[];

  postPaymentDetails(){
    return this.http.post(this.baseURL,this.formData);
  }

  putPaymentDetails(){
    return this.http.put(`${this.baseURL}/${this.formData.paymentDetailId}`,this.formData);
  }

  deletePaymentDetails(id:number){
    return this.http.delete(`${this.baseURL}/${id}`)
  }

  public async refreshList(){
    const list$ =this.http.get(this.baseURL);
    await lastValueFrom(list$)
    .then(res=> this.list=res as PaymentDetails[]);
  }

}
