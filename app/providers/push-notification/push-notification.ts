import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class PushNotification {
  data: any;
  host: any;

  constructor(private http: Http) {
    // this.host = 'http://192.168.8.101:3000';
    this.host = 'https://khmergoo.com';
  }

  insert(deviceToken) {
    return new Promise(resolve => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'authorization': '04;oCMQmit>Q8_LxYg4<BS6x%8eX$F7z4d1cl:a0h5CIr9Q!}a2O+6W@Ho5dM@'
      });
      let options = new RequestOptions({ headers: headers });
      let body = {deviceToken: deviceToken};
      this.http.post(this.host + '/createDeviceToken', body, options)
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          console.log("Oooops!");
        });
    });
  }
}

