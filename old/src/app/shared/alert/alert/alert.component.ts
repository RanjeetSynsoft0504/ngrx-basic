import { AlertService } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  type!: string;
  message!: string;
  show!: boolean;
  classes: any = {};

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe((alert) => {
      this.type = alert.type;
      this.message = alert.message;
      this.classes = {
        'alert-success': this.type === 'success',
        'alert-danger': this.type === 'error'
      };
    });

    this.alertService.showAlert$.subscribe((show) => {
      this.show = show;
    });
  }
}
