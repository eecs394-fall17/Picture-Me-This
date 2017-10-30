import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import 'firebase/firestore';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Garment} from "../../models/garment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public db: DataServiceProvider) {

  }

  addGarment() {
    var userKey = "V30pPSFf4O4pT8Mu72YR";
    console.log(this.db.database);

    const input = this.alertCtrl.create({
      title: "Add A Garment",
      inputs: [
        {
          name: "Name",
          placeholder: "Garment Name"
        },
        {
          name: "Type",
          placeholder: "Garment Type"
        },
        {
          name: "Color",
          placeholder: "Garment Color"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Submit",
          handler: data => {
            let g = new Garment(data.Name, data.Type, data.Color);
            console.log(g);
            this.db.database.collection("Users").doc(userKey).collection("Clothes").doc(g.name).set({
              color: g.color,
              type: g.type
            })
          }
        }
      ]
    })

    input.present();
  }

}
