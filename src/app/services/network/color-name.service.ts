import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// interface ResJSON {
//   data: any;  // <<<<< 区切りはコンマ(,)ではなくセミコロン(;) <<<<<
// }

@Injectable({
  providedIn: 'root',
})
export class ColorNameService {
  /// https://www.npmjs.com/package/color-name-list/v/4.9.0
  private colorNameUrl = 'api.color.pizza/v1/e7859c';
  private data: string[] = [];

  constructor(private http: HttpClient) {}

  fetchColorName() {
    // return this.http.get<string>(this.colorNameUrl)
    this.http.get(this.colorNameUrl).subscribe(
      (res) => {
        const response = res as any;
        this.data = response;
      },
      (err) => {
        if (err.status === 401) {
          // this.router.navigate(['login']);
        }
      }
    );
  }
}

// {
//   "colors": [
//       {
//           "name": "Hope",
//           "hex": "#e581a0",
//           "rgb": {
//               "r": 229,
//               "g": 129,
//               "b": 160
//           },
//           "hsl": {
//               "h": 341.4,
//               "s": 65.78947368421052,
//               "l": 70.19607843137254
//           },
//           "luminance": 103.70606621601264,
//           "requestedHex": "#e7859c",
//           "distance": 6
//       }
//   ]
// }
