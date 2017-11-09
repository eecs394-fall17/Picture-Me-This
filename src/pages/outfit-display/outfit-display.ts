import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {MatchServiceProvider} from "../../providers/match-service/match-service";
import {Queue} from 'typescript-collections/dist/lib';

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

  matchingColors;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dsp: DataServiceProvider,
              public msp: MatchServiceProvider) {


    this.garment = new Garment();
    this.garment.name = navParams.get('name');
    this.garment.type = navParams.get('type');
    this.garment.color = navParams.get('color');
    this.garment.imageURL = navParams.get('imageURL');

    this.matchingColors = msp.getMatchingColors(this.garment.color);
    console.log(this.matchingColors);

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

  // TODO fix duplicated code
  // TODO how to pick when there are multiple matching garments?

  setMatchingTop() {
    let matchingGarments = [];
    let matchingColors = this.matchingColors;
    let ref = this.dsp.getTops();

    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1) {
          matchingGarments.push(doc);
        }
      });

      let count = matchingGarments.length;
      this.top = matchingGarments[Math.floor(Math.random() * count)].data();
    })
  }

  setMatchingBottom() {
    let matchingGarments = [];
    let matchingColors = this.matchingColors;
    let ref = this.dsp.getBottoms();

    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1) {
          matchingGarments.push(doc);
        }
      });

      let count = matchingGarments.length;
      this.bottom = matchingGarments[Math.floor(Math.random() * count)].data();
    });
  }

  setMatchingShoe() {
    let matchingGarments = [];
    let matchingColors = this.matchingColors;
    let ref = this.dsp.getShoes();

    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1) {
          matchingGarments.push(doc);
        }
      });

      let count = matchingGarments.length;
      this.shoe = matchingGarments[Math.floor(Math.random() * count)].data();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutfitDisplayPage');
    console.log(this.garment.name);
  }

}
