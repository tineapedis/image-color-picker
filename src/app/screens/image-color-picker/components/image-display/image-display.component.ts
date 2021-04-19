import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageColorPickerService } from '../../../../services/image-color-picker.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss'],
})
export class ImageDisplayComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() eventSelectRGB = new EventEmitter<RGB>();
  @Output() eventPointerRGB = new EventEmitter<RGB>();
  private canvas?: HTMLCanvasElement;
  private windowWidth = 0;
  private image = new Image();
  private imageSrc = '';
  private subscription!: Subscription;

  constructor(private imageColorPickerService: ImageColorPickerService) {}

  ngOnInit() {
    this.canvas = document.getElementById('image-canvas') as HTMLCanvasElement;

    window.onresize = () => {
      if (!this.canvas || window.innerWidth === this.windowWidth) {
        return;
      }
      this.image.src = this.imageSrc;
      this.canvas.width = window.innerWidth * 0.8;
      this.windowWidth = window.innerWidth;
      this.drawImage();
    };

    this.setUpMouseEvent();

    this.subscription = this.imageColorPickerService.imageSrcObserver$.subscribe(
      (imageSrc) => {
        this.imageSrc = imageSrc;
        this.image.src = imageSrc;
        this.drawImage();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    if (!this.canvas) {
      return;
    }

    const containerPickerColor = document.getElementById(
      'container-picker-color'
    );

    this.canvas.width = window.innerWidth * 0.8;
    this.windowWidth = window.innerWidth;
    this.canvas.height =
      containerPickerColor === null ? 0 : containerPickerColor.clientHeight;
  }

  private setUpMouseEvent() {
    const context = this.canvas?.getContext('2d');
    if (!this.canvas || !context) {
      return;
    }

    this.canvas.onclick = (evt: MouseEvent) => {
      const color = this.extractColor(context, evt);
      this.eventSelectRGB.emit(color);
    };

    this.canvas.onmousemove = (evt: MouseEvent) => {
      const color = this.extractColor(context, evt);
      this.eventPointerRGB.emit(color);
    };
  }

  private drawImage() {
    const context = this.canvas?.getContext('2d');
    context?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0);

    this.image.onload = () => {
      if (!context) {
        return;
      }

      const canvas = context.canvas;
      const canvasAspect = canvas.width / canvas.height;
      const imageAspect = this.image.width / this.image.height;
      let left = 0;
      let top = 0;
      let width = 0;
      let height = 0;

      if (imageAspect >= canvasAspect) {
        // 画像横長
        width = canvas.width;
        height = canvas.width / imageAspect;
        top = (canvas.height - height) / 2;
      } else {
        // 画像縦長
        height = canvas.height;
        width = canvas.height * imageAspect;
        left = (canvas.width - width) / 2;
      }
      context.drawImage(
        this.image,
        0,
        0,
        this.image.width,
        this.image.height,
        left,
        top,
        width,
        height
      );
    };
  }

  private extractColor(
    context: CanvasRenderingContext2D,
    event: MouseEvent
  ): RGB {
    const imagedata = context.getImageData(event.offsetX, event.offsetY, 1, 1);
    return {
      red: imagedata.data[0],
      green: imagedata.data[1],
      blue: imagedata.data[2],
    };
  }
}
