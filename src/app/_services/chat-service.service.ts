import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {io} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  socket:any
  // server=environment.apiUrl+'/storeMessage'
  server='http://localhost:8081/api/v1/storeMessage'

  constructor(
    private httpClient: HttpClient,
    public loading : NgxSpinnerService
  ) {
    console.log(this.server);

    this.socket= io(this.server)
  }

  listen(eventName:string){
    return new Observable((Subscriber)=>{
      this.socket.on(eventName,(data)=>{
        Subscriber.next(data)
      })
    })
  }

  emit(eventName:string,data:any){
    this.socket.emit(eventName,data)
  }

  sendMessage(user) {
    var url = environment.apiUrl + '/storeMessage';
    return this.httpClient.post(url, user);
  }

  getMessages({}) {
    var url = environment.apiUrl + '/getMessages';
    return this.httpClient.get(url, {});
  }

}
