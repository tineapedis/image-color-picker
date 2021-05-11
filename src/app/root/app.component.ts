import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav/drawer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  // TODO: 仮データを置いたので適切な場所に移植
  informationBox: ToolBox = {
    name: 'Color Information',
    tools: [
      { name: 'Simple', caption: 'simple caption', url: '' },
      { name: 'Detail', caption: 'detail caption', url: '' },
    ],
  };
  pickerToolBox: ToolBox = {
    name: 'Picker',
    tools: [
      {
        name: 'Image Color Picker',
        caption:
          'Pick color from Image. Pick color from Image. Pick color from Image',
        url: '/image-color-picker',
      },
      {
        name: 'Color Picker',
        caption: 'color picker caption',
        url: '/image-color-picker',
      },
      {
        name: 'Image Color Picker',
        caption: 'test2',
        url: '/image-color-picker',
      },
    ],
  };
  toolBoxes = [this.informationBox, this.pickerToolBox];
  isLight = true;
  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.commonService.setDrawer(this.drawer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
