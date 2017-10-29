import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from "firebase";
import 'firebase/firestore';
import {FIREBASE_CONFIG} from "../../app/app.firebase.config";

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  public database;

  constructor(public http: Http) {
    // const firebase = require("firebase");
    // // Required for side-effects
    // require("firebase/firestore");

    this.database = firebase.firestore();
  }

}
