import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import { MasonryModule } from 'angular2-masonry';
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

  constructor(public navCtrl: NavController,
              public dsp: DataServiceProvider,
              public navParams: NavParams,
              public masonryModule: MasonryModule) {


    this.garment = new Garment();
    this.garment.name = navParams.get('name');
    this.garment.type = navParams.get('type');
    this.garment.color = navParams.get('color');
    this.garment.imageURL = navParams.get('imageURL');

    this.top = new Garment();
    this.bottom = new Garment();
    this.shoe = new Garment();

    if (this.garment.type == "Top") {
      this.top = this.garment;
      this.setMatchingBottom();
      this.setMatchingShoe();
    }
    else if (this.garment.type == "Bottom") {
      this.bottom = this.garment;
      this.setMatchingTop();
      this.setMatchingShoe();
    }
    else{
      this.shoe = this.garment;
      this.setMatchingTop();
      this.setMatchingBottom();
    }
  }

  setMatchingTop() {
    this.dsp.getTops().get().then(snapshot => {
      let count = snapshot.docs.length;
      this.top = snapshot.docs[Math.floor(Math.random() * count)].data();
    })
  }

  setMatchingBottom() {
    this.dsp.getBottoms().get().then(snapshot => {
      let count = snapshot.docs.length;
      this.bottom = snapshot.docs[Math.floor(Math.random() * count)].data();
    })
  }

  setMatchingShoe() {
    this.dsp.getShoes().get().then(snapshot => {
      let count = snapshot.docs.length;
      this.shoe = snapshot.docs[Math.floor(Math.random() * count)].data();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutfitDisplayPage');
    console.log(this.garment.name);
  }

}
