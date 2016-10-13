import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Env {
  host: String;

  constructor() {
    this.host = 'https://baapi.unibookkh.com';
    // this.host = 'http://localhost:3001';
  }

  getHost(){
    return this.host;
  }

  getVersion(){
    return '1.21';
  }

}


