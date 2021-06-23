import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.hideMenu();
  }

  ngOnDestroy() {
    this.commonService.showMenu();
  }

  onSubmitButtonTapped() {
    alert('test');
  }
}
