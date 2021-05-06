import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-tools',
  templateUrl: './color-tools.component.html',
  styleUrls: ['./color-tools.component.scss'],
})
export class ColorToolsComponent implements OnInit {
  // TODO: 仮データを置いたので適切な場所に移植
  informationBox: ToolBox = {
    name: 'Color Information',
    tools: [
      { name: 'Simple', caption: 'simple caption' },
      { name: 'Detail', caption: 'detail caption' },
    ],
  };
  pickerToolBox: ToolBox = {
    name: 'Picker',
    tools: [
      {
        name: 'Image Color Picker',
        caption:
          'Pick color from Image. Pick color from Image. Pick color from Image',
        url: '/image-color-picker',
      },
      {
        name: 'Color Picker',
        caption: 'color picker caption',
        url: '/image-color-picker',
      },
      {
        name: 'Image Color Picker',
        caption: 'test2',
        url: '/image-color-picker',
      },
    ],
  };
  toolBoxes = [this.informationBox, this.pickerToolBox];

  constructor() {}

  ngOnInit(): void {}
}
