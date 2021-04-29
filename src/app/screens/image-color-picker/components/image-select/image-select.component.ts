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
    this.readImageFile(event.target.files[0]);
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

  // TODO: 初期読み込み時に取得できるよう修正する
  onChangeTab() {
    const element = document.getElementById('card-paste-area');
    element?.addEventListener('paste', (event) => {
      const items = event.clipboardData?.items;
      if (items === undefined) {
        return;
      }
      // TODO: クソダサループ修正
      /* eslint @typescript-eslint/prefer-for-of: 1 */
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const blob = item.getAsFile();
          if (!blob) {
            return;
          }
          this.readImageFile(blob);
        }
      }
    });
  }

  private readImageFile(blob: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        return;
      }
      this.imageColorPickerService.updateImageSrc(reader.result as string);
    };
    reader.readAsDataURL(blob);
  }

  private showSnackBar(text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
    });
  }
}
