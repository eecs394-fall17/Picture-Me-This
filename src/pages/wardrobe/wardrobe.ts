import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import 'firebase/firestore';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {OutfitDisplayPage} from '../outfit-display/outfit-display';
import {AddItemPage} from "../add-item/add-item";
import {MatchServiceProvider} from "../../providers/match-service/match-service";

@Component({
  selector: 'page-wardrobe',
  templateUrl: 'wardrobe.html'
})
export class WardrobePage {
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
      color: garment.color,
      imageURL: garment.imageURL
    });
  }

  removeGarment(garment) {
    this.alertCtrl.create({
      title: "Delete Clothing",
      message: "Are you sure you want to delete? This action cannot be undone.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.dsp.removeClothing(garment);
          }
        }
      ]
    }).present();
  }

}
