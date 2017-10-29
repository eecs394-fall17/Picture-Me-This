import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from "firebase";
import 'firebase/firestore';
import {DataServiceProvider} from "../../providers/data-service/data-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public db: DataServiceProvider) {

  }

  addTopToUser() {
    var userKey = "hello";
    var picRef = "picRefTest";
    console.log("about to edit database");
    console.log(this.db.database);
    console.log(this.db.database.collection("Users"));

    // firestore is linked, but this line doesn't seem to work - not sure why.
    this.db.database.collection("Users").doc(userKey).collection("Tops").doc(picRef).set({
      color: "blue",
      type: "formal"

    });
  }

}
