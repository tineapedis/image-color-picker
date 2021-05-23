import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-tools',
  templateUrl: './color-tools.component.html',
  styleUrls: ['./color-tools.component.scss'],
})
export class ColorToolsComponent implements OnInit {
  toolBoxes = this.commonService.toolBoxes;

  constructor(private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {}

  navigateTo(urlText: string | undefined) {
    if (urlText === undefined) {
      alert('URL未定義');
    }
    this.router.navigate([urlText]);
  }
}
