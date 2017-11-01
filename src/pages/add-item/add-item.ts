import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {HomePage} from "../home/home";

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  garment: Garment;

  constructor(public navCtrl: NavController,
              public dsp: DataServiceProvider,
              public navParams: NavParams) {
    this.garment = new Garment();
  }

  saveClothing() {
    // TODO don't continue if a field is missing.
    this.garment.color = this.garment.color.toLowerCase();
    this.dsp.addClothing(this.garment.type + "s", this.garment);
    this.navCtrl.pop();
  }

}
