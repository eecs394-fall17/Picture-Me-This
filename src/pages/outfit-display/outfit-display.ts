import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";

import {DataServiceProvider} from "../../providers/data-service/data-service";
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
    top: Garment;
    bottom: Garment;
    shoe: Garment;
    outfit: Outfit;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dsp: DataServiceProvider) {
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

    if (type == "Top") {
        this.top = this.garment;
        this.bottom = new Garment();
        this.bottom.name = "test";
        //this.bottom.name = this.dsp.getPieceofClothing("Bottoms", this.garment.color);
        this.shoe = new Garment();
        this.shoe.name = "testShoe";
    }
    else if (type == "Bottom") {
        this.bottom = this.garment;
        this.top = new Garment();
        this.top.name = "testTop";
        this.shoe = new Garment();
        this.shoe.name = "testShoe";
    }
    else{
        this.shoe = this.garment;
        this.top = new Garment();
        this.top.name = "testTop";
        this.bottom = new Garment();
        this.bottom.name = "testBottom";
       
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutfitDisplayPage');
    console.log(this.garment.name);
  }

}
