import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css'],
  providers: [SocketService]
})
export class OrdersAdminComponent implements OnInit {
  message="";
  messageFromServer="";
  
  constructor(private socketService : SocketService) { 
  }
  sendMessageToUser(message: string) {
    this.socketService.sendMessageToUser(message);
  }
  ngOnInit(): void {

    // if(this.socketService.isSocketInit()){
    //   console.log('Ebar Hocche');
      
    //   this.socketService.onMessageFromServer().subscribe((message) => {
    //     this.messageFromServer = message;
    //   });  
    // }

    // Temporary Solution:
    setTimeout(()=>{
      console.log('Ebar Hocche');
      this.socketService.onMessageFromServer().subscribe((message) => {
        this.messageFromServer = message;
      });  

    },5000);
  }

}
