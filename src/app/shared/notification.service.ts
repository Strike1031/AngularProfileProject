import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from './notification-data.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification$: Subject<NotificationData> = new Subject();

  /*Não é necesario porem torna mais seguro o get*/
  get notifications() {
    return this.notification$.asObservable()
  }

  constructor() { }

  show(text: string, duration = 5000) {
    this.notification$.next({ text, duration })
  }
}
