import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Env provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Env {
  host: String;

  constructor() {
    // this.host = 'https://api.unibookkh.com';
    this.host = 'http://localhost:3000';
  }

  getHost(){
    return this.host;
  }

  getVersion(){
    return '1.20';
  }

}


