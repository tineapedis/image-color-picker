import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ColorNameResponse {
  colors: {
    name: string;
    hex: string;
    rgb: { r: string; g: string; b: string };
    hsl: { h: string; s: string; l: string };
    luminance: string;
    requestedHex: string;
    distance: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ColorNameService {
  // TODO: API叩くのやめたい
  /// https://www.npmjs.com/package/color-name-list/v/4.9.0
  private colorNameUrl = 'https://api.color.pizza/v1/';
  private data: string[] = [];

  constructor(private http: HttpClient) {}

  fetchColorName(hex: string): Observable<ColorNameResponse> {
    return this.http.get<ColorNameResponse>(this.colorNameUrl + hex);
  }
}
