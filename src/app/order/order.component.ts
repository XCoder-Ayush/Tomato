import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { ApiService } from '../services/api/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private apiService: ApiService,
    private http: HttpClient
  ) {}
  order: any = '';

  orderStatus: string = 'placed';
  deliveryAgentId: string = '';
  deliveryAgentAssigned: boolean = false;

  deliveryAgentLatitude?: number;
  deliveryAgentLongitude?: number;

  ngOnInit(): void {
    const orderId = this.activatedRoute.snapshot.paramMap
      .get('orderId')
      ?.toString();
    if (orderId != undefined) {
      // Get Order Details
      this.apiService.getOrder(orderId).subscribe((resp) => {
        this.order = resp;
        this.orderStatus = this.order.status;
        this.changeOrderStatusInUI();
      });

      // Subscribe to order status updates
      this.socketService.joinOrderRoom(orderId);
      this.socketService.getOrderStatusUpdates().subscribe((data) => {
        // Handle the updated order status here
        const orderId = data.orderId;
        const newStatus = data.newStatus;
        const deliveryAgentId = data.deliveryAgentId;

        console.log(deliveryAgentId);
        if (deliveryAgentId != '' && this.deliveryAgentAssigned == false) {
          this.deliveryAgentId = deliveryAgentId;
          this.deliveryAgentAssigned = true;

          // Set Interval For Getting Location Updates:
          // Polling Server:
          // SSE Future Work:
          
          setInterval(() => {
            this.apiService
              .fetchLocationOfDeliveryAgent(this.deliveryAgentId)
              .subscribe((resp) => {
                this.deliveryAgentLatitude = resp.value.latitude;
                this.deliveryAgentLongitude = resp.value.longitude;
                console.log(
                  this.deliveryAgentLatitude + ' ' + this.deliveryAgentLongitude
                );
              });
          }, 3000);
        }

        this.orderStatus = newStatus;
        this.changeOrderStatusInUI();
        console.log(`Order ${orderId} status is`, newStatus);
      });
    }
  }
  changeOrderStatusInUI() {
    const statusPlaced = document.querySelector(
      '#status-placed'
    ) as HTMLElement;
    const statusConfirmed = document.querySelector(
      '#status-confirmed'
    ) as HTMLElement;
    const statusOFD = document.querySelector('#status-ofd') as HTMLElement;
    const statusDelivered = document.querySelector(
      '#status-delivered'
    ) as HTMLElement;
    (
      document.querySelector('#confirm-cancel-status') as HTMLElement
    ).innerHTML = 'Order<br>Confirmed';
    if (this.orderStatus === 'placed') {
      if (statusPlaced) statusPlaced.classList.add('active');
      if (statusConfirmed) statusConfirmed.classList.remove('active');
      if (statusConfirmed) statusConfirmed.classList.remove('cactive');
      if (statusOFD) statusOFD.classList.remove('active');
      if (statusDelivered) statusDelivered.classList.remove('active');
    } else if (this.orderStatus === 'confirmed') {
      if (statusPlaced) statusPlaced.classList.add('active');
      if (statusConfirmed) statusConfirmed.classList.add('active');
      statusConfirmed.classList.remove('cactive');
      if (statusOFD) statusOFD.classList.remove('active');
      if (statusDelivered) statusDelivered.classList.remove('active');
    } else if (this.orderStatus === 'cancelled') {
      if (statusPlaced) statusPlaced.classList.add('active');
      statusConfirmed.classList.remove('cactive');

      if (statusConfirmed) {
        statusConfirmed.classList.add('cactive');
        (
          document.querySelector('#confirm-cancel-status') as HTMLElement
        ).innerHTML = 'Order<br>Cancelled';
      }

      if (statusOFD) statusOFD.classList.remove('active');
      if (statusDelivered) statusDelivered.classList.remove('active');
    } else if (this.orderStatus === 'outfordelivery') {
      if (statusPlaced) statusPlaced.classList.add('active');
      if (statusConfirmed) statusConfirmed.classList.add('active');
      statusConfirmed.classList.remove('cactive');

      if (statusOFD) statusOFD.classList.add('active');
      if (statusDelivered) statusDelivered.classList.remove('active');
    } else if (this.orderStatus == 'delivered') {
      if (statusPlaced) statusPlaced.classList.add('active');
      if (statusConfirmed) statusConfirmed.classList.add('active');
      statusConfirmed.classList.remove('cactive');

      if (statusOFD) statusOFD.classList.add('active');
      if (statusDelivered) statusDelivered.classList.add('active');
    }
  }
}
