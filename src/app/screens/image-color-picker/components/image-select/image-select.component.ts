import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageColorPickerService } from '../../../../services/image-color-picker.service';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent implements OnInit {
  imageElement = document.createElement('image') as HTMLImageElement;
  private subscription!: Subscription;

  constructor(private imageColorPickerService: ImageColorPickerService) {}

  ngOnInit() {}

  onChangeInputImage(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        return;
      }
      this.imageColorPickerService.updateImageSrc(reader.result as string);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
