import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { PaymentDetails } from 'src/app/shared/payment-details.model';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service:PaymentDetailsService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId == 0)
    {
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetails().subscribe({
      next:res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted Successfully','Payment Detail Register');
      },
      error:err=>{console.log(err)},      
    }
    );
  }

  updateRecord(form:NgForm){
    this.service.putPaymentDetails().subscribe({
      next:res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated Successfully','Payment Detail Register');
      },
      error:err=>{console.log(err)},
      
    }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetails();
  }

}
