import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { NotificationService } from 'src/app//services/notification.service';

@Component({
  selector: 'app-color-code-list',
  templateUrl: './color-code-list.component.html',
  styleUrls: ['./color-code-list.component.scss'],
})
export class ColorCodeListComponent {
  colorService: ColorService;

  constructor(
    colorService: ColorService,
    private notificationService: NotificationService
  ) {
    this.colorService = colorService;
  }

  showSnackBar(action: string) {
    this.notificationService.snackBarSubject.next({
      message: 'Copy!',
      action,
    });
  }

  onClickColorCodeButton(colorCode: string) {
    this.copyTextToClipboard(colorCode);
    this.showSnackBar(colorCode);
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
