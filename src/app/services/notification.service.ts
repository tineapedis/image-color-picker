import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private showSnackBar(message: string, text: string) {
    this.snackBar.open(message, text, {
      duration: 2000,
    });
  }
}
