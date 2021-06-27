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
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.hideMenu();
  }

  ngOnDestroy() {
    this.commonService.showMenu();
  }

  onSubmitButtonTapped() {
    const contactFormJson = JSON.stringify(this.contactForm.value);
    const contactForm = JSON.parse(contactFormJson);
    const name = contactForm.name;
    const email = contactForm.email;
    const title = contactForm.title;
    const message = contactForm.message;
  }
}
