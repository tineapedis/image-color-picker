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
    if (this.regUrl.test(urlText)) {
    } else {
      this.showSnackBar('Please Input URL');
    }
  }

  private showSnackBar(text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
    });
  }
}
