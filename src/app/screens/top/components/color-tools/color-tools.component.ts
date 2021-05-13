import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-color-tools',
  templateUrl: './color-tools.component.html',
  styleUrls: ['./color-tools.component.scss'],
})
export class ColorToolsComponent implements OnInit {
  toolBoxes = this.commonService.toolBoxes;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
}
