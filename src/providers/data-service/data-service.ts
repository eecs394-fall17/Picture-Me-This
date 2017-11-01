import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from "firebase";
import 'firebase/firestore';
import {AngularFirestore} from "angularfire2/firestore";
import {Garment} from "../../models/garment";

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
  public uid; //user id for authentication later

  constructor(public http: Http, public afs: AngularFirestore) {
    this.db = firebase.firestore();
    this.uid = "hello"; //for now, hard code user id. TODO update later
  }

  getTops() {
    return this.getClothes("Tops");
  }

  getBottoms() {
    return this.getClothes("Bottoms");
  }

  getShoes() {
    return this.getClothes("Shoes");
  }

  addTop(garment: Garment) {
    this.addClothing("Tops", garment);
  }

  addBottom(garment: Garment) {
    this.addClothing("Bottoms", garment);
  }

  addShoe(garment: Garment) {
    this.addClothing("Shoes", garment);
  }

  getClothes(type: string) {
    return this.db.collection("Users").doc(this.uid).collection(type).get();
  }

  addClothing(type: string, garment: Garment) {
    // TODO check if name is already taken?
    this.db.collection("Users").doc(this.uid).collection(type).set(garment);
  }

}
