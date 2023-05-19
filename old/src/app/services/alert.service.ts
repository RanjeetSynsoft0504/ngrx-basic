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


  private readonly PAGE_KEY = 'currentPage';

  getCurrentPage(): string | null {
    return localStorage.getItem(this.PAGE_KEY);
  }

  setCurrentPage(page: string): void {
    localStorage.setItem(this.PAGE_KEY, page);
  }

  clearCurrentPage(): void {
    localStorage.removeItem(this.PAGE_KEY);
  }

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
