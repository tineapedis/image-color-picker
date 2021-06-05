import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorService } from '../../../../../services/color.service';

@Component({
  selector: 'app-picked-color',
  templateUrl: './picked-color.component.html',
  styleUrls: ['./picked-color.component.scss'],
})
export class PickedColorComponent implements OnInit {
  rgb: RGB = {
    red: 255,
    green: 255,
    blue: 255,
  };
  pointerRGB = '255 255 255';
  pointerHEX = '#FFFFFF';
  pointerCMYK = '0 0 0 0';
  colorService: ColorService;
  isFirst = true;

  constructor(private snackBar: MatSnackBar, colorService: ColorService) {
    this.colorService = colorService;
  }

  ngOnInit(): void {}

  @Input() set setSelectedRGB(value: string) {
    // FIXME: かっこ悪すぎるので良いチェック方法へ修正
    if (this.isFirst) {
      this.isFirst = false;
      return;
    }

    this.colorService.updateRGB(this.rgb);

    const selectedColorDisplay = document.getElementById(
      'selected-color-display'
    );
    if (selectedColorDisplay) {
      selectedColorDisplay.style.backgroundColor = this.colorService.colorCode.hex;
    }
  }

  @Input() set setPointerRGB(value: string) {
    this.pointerRGB = value;
    const rgbArray = value.split(' ');
    this.rgb = {
      red: Number(rgbArray[0]),
      green: Number(rgbArray[1]),
      blue: Number(rgbArray[2]),
    };
    this.pointerHEX = this.colorService.convertRgbToHex(this.rgb);
    this.pointerCMYK = this.colorService.convertRgbToCmykCode(this.rgb);
    const pickerColorDisplay = document.getElementById('picker-color-display');
    if (pickerColorDisplay) {
      pickerColorDisplay.style.backgroundColor = this.pointerHEX;
    }
  }

  onClickRgbButton() {
    this.showSnackBar(`RGB: ${this.colorService.colorCode.rgb}`);
    this.copyTextToClipboard(this.colorService.colorCode.rgb);
  }

  onClickHexButton() {
    this.showSnackBar(`HEX: ${this.colorService.colorCode.hex}`);
    this.copyTextToClipboard(this.colorService.colorCode.hex);
  }

  onClickCmykButton() {
    this.showSnackBar(`CMYK: ${this.colorService.colorCode.cmyk}`);
    this.copyTextToClipboard(this.colorService.colorCode.cmyk);
  }

  private showSnackBar(text: string) {
    this.snackBar.open('Copy！', text, {
      duration: 2000,
    });
  }

  // TODO: 何かしらのServiceに持たせる
  private copyTextToClipboard(text: string) {
    // テキストエリアを用意する
    const copyFrom = document.createElement('textarea');
    // テキストエリアへ値をセット
    copyFrom.textContent = text;
    // bodyタグの要素を取得
    const bodyElm = document.getElementsByTagName('body')[0];
    // 子要素にテキストエリアを配置
    bodyElm.appendChild(copyFrom);
    // テキストエリアの値を選択
    copyFrom.select();
    // コピーコマンド発行
    document.execCommand('copy');
    // 追加テキストエリアを削除
    bodyElm.removeChild(copyFrom);
  }
}
