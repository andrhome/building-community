import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  private show(type, message, duration, action) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      panelClass: type
    });
  }

  public info(message: string, duration: number = 3000, action: string = '') {
    this.show('', message, duration, action);
  }

  public success(message: string, duration: number = 3000, action: string = '') {
    this.show('success', message, duration, action);
  }

  public warning(message: string, duration: number = 3000, action: string = '') {
    this.show('warning', message, duration, action);
  }

  public error(message: string, duration: number = 3000, action: string = '') {
    this.show('error', message, duration, action);
  }
}
