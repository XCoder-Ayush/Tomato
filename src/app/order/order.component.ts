import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private socketService : SocketService,private apiService : ApiService) {
   }
   order:any;

   ngOnInit(): void { 
    const orderId=this.activatedRoute.snapshot.paramMap.get('orderId')?.toString();
    if(orderId!=undefined){
      // Get Order Details
      this.apiService.getOrder(orderId).subscribe(resp=>{
        this.order=resp;
      })
      // Subscribe to order status updates
      this.socketService.joinOrderRoom(orderId);
      this.socketService.getOrderStatusUpdates().subscribe((data) => {
        // Handle the updated order status here
        const orderId=data.orderId;
        const newStatus=data.newStatus;

        console.log(`Order ${orderId} status is`, newStatus);
      });  

    }
  }

}
