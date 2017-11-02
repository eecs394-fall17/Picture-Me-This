import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";
/**
 * Generated class for the OutfitDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outfit-display',
  templateUrl: 'outfit-display.html',
})
export class OutfitDisplayPage {
  garment: Garment;
  outfit: Outfit;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let name = navParams.get('name');
    let type = navParams.get('type');
    let color = navParams.get('color');
    this.garment = new Garment();
    this.garment.name = name;
    this.garment.type = type;
    this.garment.color = color;

    // Put in random tops, bottoms, and shoes in the empty variables
    // if (type === 'Top') {
    //   let bottom = ;
    //   let shoe = ;
    //   this.outfit = new Outfit(name, bottom, shoe);
    // }
    // else if (type === 'Bottom') {
    //   let top = ;
    //   let shoe = ;
    //   this.outfit = new Outfit(top, name, shoe);
    // }
    // else {
    //   let top = ;
    //   let bottom = ;
    //   this.outfit = new Outfit(top, bottom, name);
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutfitDisplayPage');
    console.log(this.garment.name);
  }

}
