import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageColorPickerService {
  imageSrcObserver$;
  private imageSrcSubject = new BehaviorSubject<string>(
    '/assets/images/techi.jpeg'
  );

  constructor() {
    this.imageSrcObserver$ = this.imageSrcSubject.asObservable();
  }

  updateImageSrc(imageSrc: string) {
    this.imageSrcSubject.next(imageSrc);
  }
}
