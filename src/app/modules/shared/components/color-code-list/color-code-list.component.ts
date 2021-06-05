import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { NotificationService } from 'src/app//services/notification.service';

@Component({
  selector: 'app-color-code-list',
  templateUrl: './color-code-list.component.html',
  styleUrls: ['./color-code-list.component.scss'],
})
export class ColorCodeListComponent implements OnInit {
  colorService: ColorService;

  constructor(
    colorService: ColorService,
    notificationService: NotificationService
  ) {
    this.colorService = colorService;
  }

  ngOnInit() {}
}
