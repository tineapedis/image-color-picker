import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLight = true;

  constructor() {}
  ngOnInit() {}

  onClickThemeToggleButton() {
    this.isLight = !this.isLight;
  }
}
