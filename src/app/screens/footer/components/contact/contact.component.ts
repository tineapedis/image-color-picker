import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.hideMenu();
  }

  ngOnDestroy() {
    this.commonService.showMenu();
  }
}
