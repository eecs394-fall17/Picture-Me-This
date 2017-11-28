import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {LinkedList} from 'typescript-collections/dist/lib';
import {MatchServiceProvider} from "../../providers/match-service/match-service";


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
  tops: LinkedList<Garment>;
  bottoms: LinkedList<Garment>;
  shoes: LinkedList<Garment>;
  tIndex: number;
  bIndex: number;
  sIndex: number;

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

    this.top = new Garment();
    this.bottom = new Garment();
    this.shoe = new Garment();

    this.tops = new LinkedList<Garment>();
    this.bottoms = new LinkedList<Garment>();
    this.shoes = new LinkedList<Garment>();

    this.tIndex = 0;
    this.bIndex = 0;
    this.sIndex = 0;

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
    else {
      this.shoe = this.garment;
      this.setMatchingTop();
      this.setMatchingBottom();
    }
  }

  // TODO fix duplicated code

  setMatchingTop() {
    let ll = new LinkedList<Garment>();
    let matchingColors = this.matchingColors;
    let ref = this.dsp.getTops();

    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1) {
          ll.add(doc.data());
        }
      });

      this.tops = ll;

      // get random item
      this.tIndex = Math.floor(Math.random() * this.tops.size());
      this.top = this.tops.elementAtIndex(this.tIndex);
    })
  }

  setMatchingBottom() {
    let ll = new LinkedList<Garment>();
    let matchingColors = this.matchingColors;
    let ref = this.dsp.getBottoms();
    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1)
          ll.add(doc.data());
      })
      this.bottoms = ll;

      // get random item
      this.bIndex = Math.floor(Math.random() * this.bottoms.size());
      this.bottom = this.bottoms.elementAtIndex(this.bIndex);
    })
  }

  setMatchingShoe() {
    let ll = new LinkedList<Garment>();

    let matchingColors = this.matchingColors;
    let ref = this.dsp.getShoes();
    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1)
          ll.add(doc.data());
      })

      this.shoes = ll;

      // get random item
      this.sIndex = Math.floor(Math.random() * this.shoes.size());
      this.shoe = this.shoes.elementAtIndex(this.sIndex);
    })

  }

  previousTop() {
    if (!this.tops.isEmpty()) {
      this.tIndex++;
      if (this.tIndex < 0) {
        this.tIndex = this.tops.size() - 1;
        this.top = this.tops.elementAtIndex(this.tIndex);
      }
      else
        this.top = this.tops.elementAtIndex(this.tIndex);
    }
  }

  nextTop() {
    if (!this.tops.isEmpty()) {
      this.tIndex++;
      if (this.tIndex >= this.tops.size()) {
        this.tIndex = 0;
        this.top = this.tops.elementAtIndex(this.tIndex);
      }
      else
        this.top = this.tops.elementAtIndex(this.tIndex);
    }
    else {
      console.log("top broke");
    }
  }

  previousBottom() {
    if (!this.bottoms.isEmpty()) {
      this.bIndex--;
      if (this.bIndex < 0) {
        this.bIndex = this.bottoms.size() - 1;
        this.bottom = this.bottoms.elementAtIndex(this.bIndex);
      }
      else
        this.bottom = this.bottoms.elementAtIndex(this.bIndex);
    }
  }

  nextBottom() {
    if (!this.bottoms.isEmpty()) {
      this.bIndex++;
      if (this.bIndex >= this.bottoms.size()) {
        this.bIndex = 0;
        this.bottom = this.bottoms.elementAtIndex(this.bIndex);
      }
      else
        this.bottom = this.bottoms.elementAtIndex(this.bIndex);
    }
    else {
      console.log("bottom broke");
    }
  }

  previousShoe() {
    if (!this.shoes.isEmpty()) {
      this.sIndex--;
      if (this.sIndex < 0) {
        this.sIndex = this.shoes.size() - 1;
        this.shoe = this.shoes.elementAtIndex(this.sIndex);
      }
      else
        this.shoe = this.shoes.elementAtIndex(this.sIndex);
    }
  }

  nextShoe() {
    if (!this.shoes.isEmpty()) {
      this.sIndex++;
      if (this.sIndex >= this.shoes.size()) {
        this.sIndex = 0;
        this.shoe = this.shoes.elementAtIndex(this.sIndex);
      }
      else
        this.shoe = this.shoes.elementAtIndex(this.sIndex);
    }
    else {
      console.log("shoe broke");
    }
  }

}
