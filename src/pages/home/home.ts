import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'firebase/firestore';
import {DataServiceProvider} from "../../providers/data-service/data-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public db: DataServiceProvider) {

  }

  addTopToUserTest() {
    var userKey = "V30pPSFf4O4pT8Mu72YR";
    var picRef = "picRef";
    console.log("about to edit database");
    console.log(this.db.database);
    console.log(this.db.database.collection("Users"));

    this.db.database.collection("Users").doc(userKey).collection("Tops").doc(picRef).update({
      color: "blue",
      type: "formal"

    });
  }

}
