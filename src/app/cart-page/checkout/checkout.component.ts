import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WindowRefService } from 'src/app/services/window-ref/window-ref.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [WindowRefService]
})
export class CheckoutComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,private http : HttpClient,private winRef: WindowRefService) { }

  ngOnInit(): void {
  }
  firstFormGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
    contactNumber: ['', Validators.required],
    address1: ['', Validators.required],
    address2: '',
    postalCode : ['', Validators.required],

  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isOptional = true;

  openPaymentRequest(){
    console.log('Payment Started');
    const amount=5000;
    if(amount==null || amount==undefined){
        return;
    }
    const body={amount : amount};
    this.http.post<any>(`http://localhost:8080/payment/createorder`,body).subscribe(resp=>{
      console.log('Order Created Succesfully');
      var options = {
        "key": "rzp_test_jjYAvVxoTUmjSI", // Enter the Key ID generated from the Dashboard
        "amount": "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Tomato",
        "description": "Transaction",
        "image": "https://img.icons8.com/fluency/96/lasagna.png",
        "order_id": resp.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": (response)=>{
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "notes": {
            "address": "Tomato"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const rzp1 = new this.winRef.nativeWindow.Razorpay(options)
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();

  },err=>{
      console.log(err);
    })
  }
  showSweetAlert(){

  }
}
