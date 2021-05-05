import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-tools',
  templateUrl: './color-tools.component.html',
  styleUrls: ['./color-tools.component.scss'],
})
export class ColorToolsComponent implements OnInit {
  tests = ['test', 'test2', 'test3', 'test4'];
  subs = ['sub', 'sub2', 'sub3'];

  constructor() {}

  ngOnInit(): void {}
}
