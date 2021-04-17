import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent implements OnInit {
  imageSrc: string | ArrayBuffer = '';

  constructor() {}

  ngOnInit() {}

  onChangeInputImage(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
      if (!reader.result) {
        return;
      }
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
