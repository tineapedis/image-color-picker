import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-picked-color',
  templateUrl: './picked-color.component.html',
  styleUrls: ['./picked-color.component.scss'],
})
export class PickedColorComponent implements OnInit {
  @Input() selectedRGB = '0 0 0';

  constructor() {}

  ngOnInit(): void {}
}
