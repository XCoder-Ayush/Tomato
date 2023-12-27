import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private room: any;
  private userRole: any;
  constructor(private loginService: LoginService) {
    // Call an asynchronous method to initialize the service
    this.initializeSocket();
  }
  isSocketInit() {
    console.log(this.socket);
    return (this.socket?true:false);
  }

  private async initializeSocket() {
    try {
      // this.userRole = await this.loginService.getCurrentUserRole();
      // console.log(this.userRole);
      // console.log(this.socket);
      this.userRole='ADMIN'
      this.socket = await io('http://localhost:8081', {
        query: { userRole: this.userRole },
      })

      console.log(this.socket);
      
      // Now that the socket is initialized, you can proceed with any further logic here.
      this.room = this.socket.connected;
      console.log(this.room);
    } catch (error) {
      // Handle errors, e.g., network issues or role retrieval failures.
      console.error('Socket initialization error:', error);
    }
  }
  sendMessageToAdmin(message: string) {
    console.log('Aise Hee 1');
    this.room = this.socket.id;
    console.log(this.room);
    console.log(message);
    this.socket.emit('send-message', message,this.room);
  }
  sendMessageToUser(message: string) {
    console.log('Aise Hee 2');
    this.room = this.socket.id;
    console.log(this.room);
    console.log(message);
    this.socket.emit('send-message', message,this.room);
  }

  onMessageFromServer(): Observable<any> {
    console.log('Fuckkkk 1!');
    return new Observable((observer) => {
      console.log('Fuckkkk 2!');
      this.socket.on('dataFromServer', (data) => {
        console.log('Fuckkkk 3!');

        console.log(data);
        // console.log(room);
        observer.next(data);
        console.log('Fuckkkk 4!');
      });
    });
  }

  joinOrderRoom(orderId: string): void {
    console.log(this.socket);
    this.socket.emit('join-order-room', orderId);
  }
  updateOrderStatus(orderId: string, newStatus: string): void {
    this.socket.emit('order-status', orderId, newStatus);
  }
  getOrderStatusUpdates(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('order-status', (resp) => {
        observer.next(resp);
      });
    });
  }
  placeOrder(order){
    this.socket.emit('place-order', order);
  }
}
