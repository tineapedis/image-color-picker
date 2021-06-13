import { Component, OnInit } from '@angular/core';
import { ColorNameService } from 'src/app/services/network/color-name.service';
import { ColorService } from 'src/app/services/color.service';
import { Subscription } from 'rxjs';
import 'vanilla-colorful';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {
  colorService: ColorService;
  private subscription!: Subscription;

  constructor(
    private colorNameService: ColorNameService,
    colorService: ColorService
  ) {
    this.colorService = colorService;
  }

  ngOnInit() {
    const hex = this.colorService.hexColorCode().replace('#', '');
    this.colorNameService.fetchColorName(hex).subscribe(
      (res) => {
        const textColorName = document.getElementById('text-color-name');
        if (textColorName) {
          textColorName.textContent = res.colors[0].name;
        }
      },
      (err) => {
        alert(err.status);
        if (err.status === 401) {
        }
      }
    );

    const cardColor = document.getElementById('card-color');
    this.subscription = this.colorService.rgbObserver$.subscribe((rgb) => {
      if (cardColor) {
        cardColor.style.backgroundColor = this.colorService.hexColorCode();
      }
    });

    this.setUpHexColorPicker();
  }

  private setUpHexColorPicker() {
    const input = document.querySelector('hex-color-picker');
    input?.addEventListener('color-changed', (event) => {
      const newColor = event.detail.value;
      this.colorService.updateHex(newColor);
    });
  }
}
