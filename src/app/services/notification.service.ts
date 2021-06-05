import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

type SnackBarContents = {
  message: string;
  action: string;
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  snackBarSubject: Subject<SnackBarContents> = new Subject();

  constructor(private snackBar: MatSnackBar) {
    this.snackBarSubject.subscribe((contents) => {
      this.showSnackBar(contents);
    });
  }

  private showSnackBar(contents: SnackBarContents) {
    this.snackBar.open(contents.message, contents.action, {
      duration: 2000,
    });
  }
}
