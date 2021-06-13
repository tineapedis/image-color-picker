import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../../../services/color.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  colorService: ColorService;
  private subscription!: Subscription;

  constructor(colorService: ColorService) {
    this.colorService = colorService;
  }

  ngOnInit() {
    const cardColor = document.getElementById('card-color-in-slider');
    const textHex = document.getElementById('text-hex');
    this.subscription = this.colorService.rgbObserver$.subscribe(() => {
      if (cardColor && textHex) {
        textHex.style.color = this.colorService.getBlackWhite();
        cardColor.style.backgroundColor = this.colorService.hexColorCode();
      }
    });
  }
}
