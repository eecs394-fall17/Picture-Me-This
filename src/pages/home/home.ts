import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {DataServiceProvider} from "../../providers/data-service/data-service";

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
  top: Garment = new Garment();
  bottom: Garment = new Garment();
  shoe: Garment = new Garment();

  constructor(public navCtrl: NavController, public navParams: NavParams, public dsp: DataServiceProvider) {
    this.getRandomOutfit();
  }

  getRandomOutfit() {
    this.dsp.getTops().get().then(snapshot => {
      let count = snapshot.docs.length;
      this.top = snapshot.docs[Math.floor(Math.random() * count)].data();
    });

    this.dsp.getBottoms().get().then(snapshot => {
      let count = snapshot.docs.length;
      this.bottom = snapshot.docs[Math.floor(Math.random() * count)].data();
    });

    this.dsp.getShoes().get().then(snapshot => {
      let count = snapshot.docs.length;
      this.shoe = snapshot.docs[Math.floor(Math.random() * count)].data();
    });

  }

}
