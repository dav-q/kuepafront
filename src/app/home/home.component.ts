import { ChatServiceService } from './../_services/chat-service.service';
import { SnotifyService } from 'ng-snotify';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  currentUser : any

  userChat={
    user:'',
    user_id:'',
    message:'',
    createdAt:null,
    typeUserId:null
  }

  Messages:any=[]

  eventName:string='send-message'

  constructor(
    public _sanitizer:DomSanitizer,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private routerActivate: ActivatedRoute,
    private chatService: ChatServiceService,
    private snotifyService: SnotifyService
  ) {
    this.currentUser = this.authService.currentUserValue
    this.getMessages()
   }

  ngOnInit(): void {
    this.userChat.user=this.currentUser.firstName +' '+ this.currentUser.lastName
    this.userChat.user_id=this.currentUser.id
    this.userChat.typeUserId=this.currentUser.typeUserId
    this.chatService.listen('text-event').subscribe((data)=>{
      this.Messages.push(data[0])
    })
  }

  closeSession(){
    this.authService.logout()
  }

  sendMessage(){
    this.userChat.createdAt=new Date()
    this.chatService.sendMessage(this.userChat).subscribe((res)=>{
      this.chatService.emit(this.eventName,this.userChat)
      this.userChat.message=""
    })
  }

  getMessages(){
    this.chatService.getMessages({}).subscribe((res:any)=>{
      console.log(res.messages);
      var all_mss=[]
      for (let index = 0; index < res.messages.length; index++) {
        const element = res.messages[index];
        let userChat={
          user:element.User.firstName+' '+element.User.lastName,
          user_id:element.user_id,
          message:element.message,
          createdAt:element.createdAt,
          typeUserId:element.User.typeUserId
        }
        all_mss.push(userChat)
      }

      this.Messages=all_mss
    })
  }


  public DateFullSpanish = (date: string, hour = false) => {

    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var current_date = new Date(date);
    let date_return = current_date.getUTCDate() + " de " + months[current_date.getUTCMonth()] + " del " + current_date.getUTCFullYear()

    if (hour) {
        var options = {
            // timeZone: '',
            hour12: true
        };
        var hours = current_date.toLocaleString('en-ES', options);

        date_return += " " + hours
    }

    return date_return;
}


public DateShortSpanish = (date: string, hour = false) => {

    var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    var current_date = new Date(date);

    let date_return = months[current_date.getUTCMonth()] + " " + current_date.getUTCDate() + " de " + current_date.getUTCFullYear()

    if (hour) {
        var options = {
            // timeZone: '',
            hour12: true
        };
        var hours = current_date.toLocaleString('en-ES', options);
        console.log(hours);

        date_return += " " + hours
    }

    return date_return;
}

}
