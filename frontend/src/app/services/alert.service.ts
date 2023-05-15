import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface Alert {
  type: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  alert$ = this.alertSubject.asObservable();
  private showAlertSubject = new Subject<boolean>();
  showAlert$ = this.showAlertSubject.asObservable();
  init() {
    this.alert$ = this.alertSubject.asObservable();
    this.showAlert$ = this.showAlertSubject.asObservable();
  }
  success(message: string) {
    const alert: Alert = { type: 'success', message };
    this.alertSubject.next(alert);
    this.showAlertSubject.next(true);
    setTimeout(() => {
      this.showAlertSubject.next(false);
    }, 5000);
  }

  error(message: string) {
    alert();
    const alertd: Alert = { type: 'error', message };
    this.alertSubject.next(alertd);
    this.showAlertSubject.next(true);
    setTimeout(() => {
      this.showAlertSubject.next(false);
    }, 5000);
  }
}
