import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
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
  public garment: Garment;

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
    return this.db.collection("Users").doc(this.uid).collection(type);
  }

  getPieceofClothing(type: string, color: string) {
    this.garment = new Garment();
    this.garment.name = "bad";
    this.db.collection("Users").doc(this.uid).collection(type)
      .where("color", "==", color)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          console.log(doc.data().name);

          //below is the value needed but isn't being returned to parent caller
          //using this.garment.name = doc.data().name created undefined error on garment
          //Seems like garment isn't visible inside these functions
          return doc.data().name;
          //this.garment.type = doc.data("type");
          //this.garment.color = doc.data("color");
        });
      });
    return this.garment.name;
  }

  addClothing(type: string, garment: Garment) {
    // TODO check if name is already taken?
    this.db.collection("Users").doc(this.uid).collection(type).doc(garment.name).set({
      name: garment.name,
      type: garment.type,
      color: garment.color,
      imageURL: garment.imageURL
    });
  }

  removeClothing(garment: Garment) {
    // delete image from storage
    const storage_ref = firebase.storage().ref('Users/' + this.uid + '/' + garment.type + "s" + '/' + garment.name.replace(" ", "") + '.jpg');
    storage_ref.delete();

    // delete entry from database
    this.db.collection("Users").doc(this.uid).collection(garment.type + 's').doc(garment.name).delete();
  }

}
