import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {AddItemPage} from "../add-item/add-item";
import {OutfitDisplayPage} from "../outfit-display/outfit-display";
import {WardrobePage} from "../wardrobe/wardrobe";

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
    garment: Garment;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.garment = new Garment();
        this.garment.name = navParams.get('name');
        this.garment.type = navParams.get('type');
        this.garment.color = navParams.get('color');
        this.garment.imageURL = navParams.get('imageURL');
  }

    pushWardrobe() {
        this.navCtrl.push(WardrobePage);
    }

    pushDisplayOutfit(garment) {
        this.navCtrl.push(OutfitDisplayPage, {
            name: garment.name,
            type: garment.type,
            color: garment.color,
            imageURL: garment.imageURL
        });
    }

    pushAddItem() {
        this.navCtrl.setRoot(AddItemPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

}
