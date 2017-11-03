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
  }

}
