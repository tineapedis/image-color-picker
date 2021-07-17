import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hue',
  templateUrl: './hue.component.html',
  styleUrls: ['./hue.component.scss'],
})
export class HueComponent implements OnInit {
  hexList = [
    '#F30100',
    '#F33E00',
    '#F37B00',
    '#F3B700',
    '#F2F300',
    '#B5F300',
    '#79F300',
  ];
  constructor() {}

  ngOnInit() {}
}
