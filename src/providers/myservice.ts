import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Myservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Myservice {
  baseURI:String;
  constructor(public http: Http) {
    this.baseURI="http://clients.cloudyfox.com/blog/public/";
  }

  getTasks(){
    return this.http.get(this.baseURI+'photos').map(res => res.json());
  }

  validate(data){
    return this.http.post(this.baseURI+'photos/login',data).map(res => res.json());
  }

  applyLeave(data){
    // console.log(data+'This');
    return this.http.post(this.baseURI+'photos',data).map(res => res.json());
  }
}
