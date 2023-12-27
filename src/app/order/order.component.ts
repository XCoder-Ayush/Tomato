import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private socketService : SocketService) {
   }

   ngOnInit(): void { 
    const orderId=this.activatedRoute.snapshot.paramMap.get('orderId')?.toString();
    if(orderId!=undefined){

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
