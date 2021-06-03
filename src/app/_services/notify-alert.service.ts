import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class NotifyAlertService {

  constructor(private snotifyService: SnotifyService, public loading : NgxSpinnerService) {

  }

  public success(message){
    this.snotifyService.success(message, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      position: SnotifyPosition.rightTop,
      animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
    });
  }

  public error(message){
    this.snotifyService.error(message, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      position: SnotifyPosition.rightTop,
      animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
    });
  }

  public warning(message){
    this.snotifyService.warning(message, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      position: SnotifyPosition.rightTop,
      animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
    });
  }

  public info(message){
    this.snotifyService.info(message, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      position: SnotifyPosition.rightTop,
      animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
    });
  }

}
