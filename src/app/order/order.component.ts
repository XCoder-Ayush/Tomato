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
    const orderId=this.activatedRoute.snapshot.paramMap.get('orderId')
    console.log(orderId);
  }

}
