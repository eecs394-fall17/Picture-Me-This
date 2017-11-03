import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import 'firebase/firestore';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Garment} from "../../models/garment";
import {OutfitDisplayPage} from '../outfit-display/outfit-display';
import {AddItemPage} from "../add-item/add-item";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  garmentsT;
  garmentsB;
  garmentsS;
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public dsp: DataServiceProvider) {
    // TODO user key needs to be streamlined, whenever we decide to develop auth.
    // TODO database calls need to be streamlined by creating functions in DataServiceProvider.
      this.garmentsT = this.dsp.afs.collection("Users").doc("hello").collection("Tops").valueChanges();
      this.garmentsB = this.dsp.afs.collection("Users").doc("hello").collection("Bottoms").valueChanges();

      this.garmentsS = this.dsp.afs.collection("Users").doc("hello").collection("Shoes").valueChanges();
    console.log(this.garmentsT);
  }

  pushDisplayOutfit(garment){
    this.navCtrl.push(OutfitDisplayPage, {
      name: garment.name,
      type: garment.type,
      color: garment.color
    });
  }
  addGarment() {

    this.navCtrl.push(AddItemPage);

    // var userKey = "V30pPSFf4O4pT8Mu72YR";
    // console.log(this.dsp.db);
    //
    // const input = this.alertCtrl.create({
    //   title: "Add A Garment",
    //   inputs: [
    //     {
    //       name: "Name",
    //       placeholder: "Garment Name"
    //     },
    //     {
    //       name: "Type",
    //       placeholder: "Garment Type"
    //     },
    //     {
    //       name: "Color",
    //       placeholder: "Garment Color"
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: "Cancel",
    //       role: "cancel"
    //     },
    //     {
    //       text: "Submit",
    //       handler: data => {
    //         // let g = new Garment(data.Name, data.Type, data.Color);
    //         // console.log(g);
    //         // TODO database calls need to be streamlined by creating functions in DataServiceProvider.
    //         this.dsp.db.collection("Users").doc(userKey).collection("Clothes").doc(data.Name).set({
    //           color: data.Color,
    //           type: data.Type,
    //           name: data.Name
    //         })
    //       }
    //     }
    //   ]
    // })

    // input.present();
  }

}
