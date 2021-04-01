import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss'],
})
export class ImageDisplayComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const canvas = document.getElementById('image-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context == null) {
      return;
    }
    const img = new Image();
    // 画像読み込み終了してから描画
    img.onload = () => {
      const canvasAspect = context.canvas.width / context.canvas.height; // canvasのアスペクト比
      const imgAspect = img.width / img.height; // 画像のアスペクト比
      let left = 0;
      let top = 0;
      let width = 0;
      let height = 0;

      if (imgAspect >= canvasAspect) {
        // 画像が横長
        left = 0;
        width = context.canvas.width;
        height = context.canvas.width / imgAspect;
        top = (context.canvas.height - height) / 2;
      } else {
        // 画像が縦長
        top = 0;
        height = context.canvas.height;
        width = context.canvas.height * imgAspect;
        left = (context.canvas.width - width) / 2;
      }
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        left,
        top,
        width,
        height
      );
    };
    img.src = 'https://source.unsplash.com/random/600x600';
  }
}
