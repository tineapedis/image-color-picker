import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss'],
})
export class ImageDisplayComponent implements OnInit, AfterViewInit {
  @Output() eventSelectRGB = new EventEmitter<RGB>();
  private canvas?: HTMLCanvasElement;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = document.getElementById('image-canvas') as HTMLCanvasElement;
    const context = this.canvas.getContext('2d');

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
    img.src = '/assets/images/techi.jpeg';

    this.canvas.onclick = (evt: MouseEvent) => {
      const color = this.extractColor(context, evt);
      this.eventSelectRGB.emit(color);
    };

    this.canvas.onmousemove = (evt: MouseEvent) => {
      const color = this.extractColor(context, evt);
    };
  }

  private extractColor(
    context: CanvasRenderingContext2D,
    evt: MouseEvent
  ): RGB {
    const imagedata = context.getImageData(evt.offsetX, evt.offsetY, 1, 1);
    return {
      red: imagedata.data[0],
      green: imagedata.data[1],
      blue: imagedata.data[2],
    };
  }
}
