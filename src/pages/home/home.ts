import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WardrobePage} from "../wardrobe/wardrobe";
import {AddItemPage} from "../add-item/add-item";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToWardrobe() {
    this.navCtrl.push(WardrobePage);
  }

  goToAddItem() {
    this.navCtrl.push(AddItemPage);
  }

}
