import { Component, OnInit } from '@angular/core';
import { ColorNameService } from 'src/app/services/network/color-name.service';
import { ColorService } from 'src/app/services/color.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {
  private subscription!: Subscription;

  constructor(
    private colorNameService: ColorNameService,
    private colorService: ColorService
  ) {}

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

    this.setUpCardColor();
  }

  private setUpCardColor() {
    const cardColor = document.getElementById('card-color');
    if (cardColor) {
      cardColor.style.backgroundColor = this.colorService.hexColorCode();
    }
  }
}
