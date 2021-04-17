import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent implements OnInit {
  imageElement = document.createElement('image') as HTMLImageElement;

  constructor() {}

  ngOnInit() {}

  onChangeInputImage(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        return;
      }
      this.imageElement.src = reader.result as string;
      const image = document.querySelector('#photo') as HTMLImageElement;
      image.src = this.imageElement.src;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
