import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-picked-color',
  templateUrl: './picked-color.component.html',
  styleUrls: ['./picked-color.component.scss'],
})
export class PickedColorComponent implements OnInit {
  selectedRGB = '0 0 0';
  selectedHEX = '#FFFFFF';
  pointerRGB = '0 0 0';
  pointerHEX = '#FFFFFF';

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  @Input() set setSelectedRGB(value: string) {
    this.selectedRGB = value;
    const rgbArray = value.split(' ');
    this.selectedHEX = this.convertRgbToHex(
      rgbArray[0],
      rgbArray[1],
      rgbArray[2]
    );
    const selectedColorDisplay = document.getElementById(
      'selected-color-display'
    );
    if (selectedColorDisplay) {
      selectedColorDisplay.style.backgroundColor = this.selectedHEX;
    }
  }

  @Input() set setPointerRGB(value: string) {
    this.pointerRGB = value;
    const rgbArray = value.split(' ');
    this.pointerHEX = this.convertRgbToHex(
      rgbArray[0],
      rgbArray[1],
      rgbArray[2]
    );
    const pickerColorDisplay = document.getElementById('picker-color-display');
    if (pickerColorDisplay) {
      pickerColorDisplay.style.backgroundColor = this.pointerHEX;
    }
  }

  // TODO: 以下メソッド別ファイルに移植する -----------------------
  convertRgbToHex(red: string, green: string, blue: string) {
    return (
      '#' +
      this.toHex(Number(red)) +
      this.toHex(Number(green)) +
      this.toHex(Number(blue))
    );
  }

  toHex(color: number) {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
  // ---------------------------------------------------------

  onClickRgbButton() {
    this.showSnackBar(`RGB: ${this.selectedRGB}`);
    this.copyTextToClipboard(this.selectedRGB);
  }

  onClickHexButton() {
    this.showSnackBar(`HEX: ${this.selectedHEX}`);
    this.copyTextToClipboard(this.selectedHEX);
  }

  private showSnackBar(text: string) {
    this.snackBar.open('Copy！', text, {
      duration: 2000,
    });
  }

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
