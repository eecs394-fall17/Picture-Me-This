import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from "firebase";
import 'firebase/firestore';
import {AngularFirestore} from "angularfire2/firestore";

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Provider for Database Services using Firebase's Firestore.
  All other modules interacting with the database should use this provider
    by injecting it in the .ts constructor.
*/
@Injectable()
export class DataServiceProvider {
  public db;

  constructor(public http: Http, public afs: AngularFirestore) {
    this.db = firebase.firestore();
  }

}
