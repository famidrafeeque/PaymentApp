import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetails } from '../shared/payment-details.model';
import { PaymentDetailsService } from '../shared/payment-details.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailsService, public tostr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  
  populateForm(selectedRecord:PaymentDetails){
    this.service.formData= Object.assign({},selectedRecord) ;
  }

  onDelete(id:number){
    if(confirm('Are you Sure to Delete thid record'))
    {
      this.service.deletePaymentDetails(id).subscribe({
        next:res=>{
          this.service.refreshList();
          this.tostr.error('Deleted Successfully','Payment Detail Register')
        },
        error:err=>{console.log(err)
        }
      });
    }
  }
}
