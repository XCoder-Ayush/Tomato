import { Component, OnInit } from '@angular/core';
import { Address } from '../../../shared/models/Address'
import { FoodcartService } from 'src/app/services/foodcart/foodcart.service';
import { CartItem } from 'src/app/shared/models/CartItem';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { WindowRefService } from 'src/app/services/window-ref/window-ref.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService : FoodcartService,private _formBuilder: FormBuilder,
    private http: HttpClient,
    private winRef: WindowRefService) { }

  couponCode = '';
  addressList : Address[]=[];
  addressListToDisplay = [];
  cartItems : CartItem[] = [];
  checkOutItems : CartItem[] = [];
  selectedAddress : any;
  currentPaymentMode:any;
  discountAmount:number=0;

  async ngOnInit(): Promise<void> {
    // REST API Call
    this.addressList=[
      {
        id:"1",
        addressLine1: "CB 1/1 Railpukur Road",
        addressLine2: "Swapna Neer Apt, Flat 1/6",
        pincode: 700059,
        landmark : "Baguiati",
        city : "Kolkata",
        country :"India"
      },
      {
        id:"2",
        addressLine1: "CB 1/1 Railpukur Road",
        addressLine2: "Swapna Neer Apt, Flat 1/6",
        pincode: 700059,
        landmark : "Baguiati",
        city : "Kolkata",
        country :"India"
      },
    ]    

    this.cartItems=await this.cartService.getCartItems();
    this.discountAmount=this.cartService.getDiscountAmount();

    this.cartItems.forEach((cartItem)=>{
      if(cartItem.quantity>0){
        this.checkOutItems.push(cartItem);
      }
    })
  }
  onAddressClick(address : Address,event : any){
    
    const divList=document.querySelectorAll('.address-list');
    // Make All Active Status Off
    divList.forEach((addressDiv)=>{
      addressDiv.classList.remove('active-address');
      // console.log(addressDiv.childNodes);
      (addressDiv.childNodes[1] as HTMLElement).classList.remove('active-address-icon');
    })
    // Make Current Status As Active
    divList.forEach((addressDiv)=>{
      if(addressDiv.id==event.target.id){
        addressDiv.classList.add('active-address');
        (addressDiv.childNodes[1] as HTMLElement).classList.add('active-address-icon');
        this.selectedAddress=address;
        // console.log(addressDiv.classList);
      }
    })

  }
  getDeliveryCost():any{
    if(this.selectedAddress==null || this.selectedAddress==undefined){
      return "Select an address to calculate delivery charges."
    }
    // Calculate cost acc to distance between current point and delivery address
    // ***Big Task** , For Now Returning 50
    return 50;
  }

  getDiscountAmount(){
    if(this.selectedAddress==null || this.selectedAddress==undefined){
      return "Select an address to calculate discount."
    }
    return this.discountAmount;  
  }

  getTotalCost(){
    if(this.selectedAddress==null || this.selectedAddress==undefined){
      return "Select an address to calculate total cost."
    }

    let cost=0;
    this.checkOutItems.forEach((item)=>{
      cost+=item.getPrice();
    })
    cost+=this.getDeliveryCost();
    cost-=this.discountAmount;
    return cost;
  }

  selectPaymentMode(paymentMode:string){
    // console.log(event.target);
    // const paymentMode=event.target.id;
    // console.log(paymentMode);
    
    this.currentPaymentMode=paymentMode;
    const codDiv= document.querySelector('.payment-cash') as HTMLElement;
    const onlineDiv= document.querySelector('.payment-card') as HTMLElement;

    if(this.currentPaymentMode=='cod'){
      onlineDiv.classList.remove('active-payment-mode');
      codDiv.classList.remove('active-payment-mode');

      codDiv.classList.add('active-payment-mode');
    }else{
      onlineDiv.classList.remove('active-payment-mode');
      codDiv.classList.remove('active-payment-mode');

      onlineDiv.classList.add('active-payment-mode');
    }
  }

  isOptional = true;

  openPaymentRequest() {
    console.log('Payment Started');
    let amount:any = this.getTotalCost();
    if (amount == null || amount == undefined || amount == "Select an address to calculate total cost.") {
      return;
    }
    amount*=100;
    amount=amount.toString();
    const body = { amount: amount };
    this.http
      .post<any>(`http://localhost:8080/payment/createorder`, body)
      .subscribe(
        (resp) => {
          console.log('Order Created Succesfully');
          var options = {
            key: 'rzp_test_jjYAvVxoTUmjSI', // Enter the Key ID generated from the Dashboard
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'Tomato',
            description: 'Transaction',
            image: 'https://img.icons8.com/fluency/96/lasagna.png',
            order_id: resp.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: (response) => {
              Swal.fire(
                'Thank You :)',
                'The Complete Payment Process Has Been Done.',
                'success'
              );
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);

              // After Payment Done Logic:
            },
            prefill: {
              name: '',
              email: '',
              contact: '',
            },
            notes: {
              address: 'Tomato',
            },
            theme: {
              color: '#3399cc',
            },
          };
          const rzp1 = new this.winRef.nativeWindow.Razorpay(options);
          rzp1.on('payment.failed', function (response) {
            Swal.fire(
              'OOPS :(',
              'The Payment Process Has Terminated Due To Some Error. Please Retry',
              'error'
            );

            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
          rzp1.open();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  showSweetAlert() {
    Swal.fire(
      'Thank You :)',
      'Your Order Has Been Placed. Please Pay To The Delivery Agent',
      'success'
    );
  }

  onPlaceOrder(){
    if(this.currentPaymentMode=="cod"){
      this.showSweetAlert();
    }else{
      this.openPaymentRequest();
    }
  }
}
