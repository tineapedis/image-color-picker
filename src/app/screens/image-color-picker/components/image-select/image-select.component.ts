import { Component, OnInit } from '@angular/core';
import { ImageColorPickerService } from '../../../../services/image-color-picker.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent implements OnInit {
  private regUrl = /https?:\/\/[\w/:%#$&?()~.=+-]+/;
  private regImage = /\.(jpeg|jpg|gif|png)$/;

  constructor(
    private imageColorPickerService: ImageColorPickerService,
    private snackBar: MatSnackBar
  ) {}

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

  onEnter(urlText: string) {
    if (!this.regUrl.test(urlText)) {
      this.showSnackBar('Please Input URL');
      return;
    }

    if (!this.regImage.test(urlText)) {
      this.showSnackBar('Not Image!!');
      return;
    }

    this.imageColorPickerService.updateImageSrc(urlText);
  }

  private showSnackBar(text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
    });
  }
}
