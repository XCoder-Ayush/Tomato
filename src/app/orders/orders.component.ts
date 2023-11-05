import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [SocketService]

})
export class OrdersComponent implements OnInit {

  message="";
  messageFromServer="";
  constructor(private socketService : SocketService) {
  }
  sendMessageToAdmin(message: string) {
    this.socketService.sendMessageToAdmin(message);
  }
  ngOnInit(): void {
    // this.socketService.onMessageFromServer().subscribe((message) => {
    //   this.messageFromServer = message;
    // });

        // Temporary Solution:
        setTimeout(()=>{
          console.log('Ebar Hocche');
          this.socketService.onMessageFromServer().subscribe((message) => {
            this.messageFromServer = message;
          });  
    
        },5000);
    
  }

}
