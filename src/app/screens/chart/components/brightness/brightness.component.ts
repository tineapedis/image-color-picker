import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { NotificationService } from 'src/app//services/notification.service';

interface ChartNumber {
  value: string;
  viewValue: string;
}

interface Chart {
  hex: string;
  rgb: string;
  value: string;
}

@Component({
  selector: 'app-brightness',
  templateUrl: './brightness.component.html',
  styleUrls: ['./brightness.component.scss'],
})
export class BrightnessComponent implements OnInit {
  colorService: ColorService;
  chartList: Chart[] = [];
  selectedNumber = '12';
  chartNumbers: ChartNumber[] = [
    { value: '8', viewValue: '8' },
    { value: '12', viewValue: '12' },
    { value: '16', viewValue: '16' },
    { value: '20', viewValue: '20' },
    { value: '24', viewValue: '24' },
    { value: '28', viewValue: '28' },
    { value: '32', viewValue: '32' },
  ];
  hsl: HSL;

  constructor(
    colorService: ColorService,
    private notificationService: NotificationService
  ) {
    this.colorService = colorService;
    this.hsl = colorService.convertRgbToHsl();
    this.updateChartList();
  }

  ngOnInit(): void {}

  onSelectNumber() {
    this.chartList = [];
    this.updateChartList();
  }

  updateChartList() {
    const MAX = Number(this.selectedNumber);
    for (let i = 0; i < MAX; i++) {
      const lightness = i * (100 / MAX);
      const rgb = this.colorService.convertHslToRgb({
        hue: this.hsl.hue,
        saturation: this.hsl.saturation,
        lightness,
      });
      this.chartList.push({
        hex: this.colorService.convertRgbToHex(rgb),
        rgb: `${rgb.red}, ${rgb.green}, ${rgb.blue}`,
        value: lightness.toString(),
      });
    }
  }

  onClickColorCodeButton(colorCode: string) {
    this.copyTextToClipboard(colorCode);
    this.showSnackBar(colorCode);
  }

  showSnackBar(action: string) {
    this.notificationService.snackBarSubject.next({
      message: 'Copy!',
      action,
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
