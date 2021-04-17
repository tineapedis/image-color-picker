import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageColorPickerService {
  imageObserver$;
  private imageSubject = new BehaviorSubject<Image>();

  constructor() {}
}
