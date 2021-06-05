import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-code-list',
  templateUrl: './color-code-list.component.html',
  styleUrls: ['./color-code-list.component.scss'],
})
export class ColorCodeListComponent implements OnInit {
  colorService: ColorService;

  constructor(colorService: ColorService) {
    this.colorService = colorService;
  }

  ngOnInit() {}
}
