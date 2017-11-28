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

  topItems;
  bottomItems;
  shoeItems;

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


    // package info as objects that can be passed into functions
    this.topItems = {
      item: this.top,
      list: this.tops,
      index: this.tIndex
    };

    this.bottomItems = {
      item: this.bottom,
      list: this.bottoms,
      index: this.bIndex
    };

    this.shoeItems = {
      item: this.shoe,
      list: this.shoes,
      index: this.sIndex
    };

    if (this.garment.type == "Top") {
      this.topItems.item = this.garment;
      this.setMatchingBottom();
      this.setMatchingShoe();
    }
    else if (this.garment.type == "Bottom") {
      this.bottomItems.item = this.garment;
      this.setMatchingTop();
      this.setMatchingShoe();
    }
    else {
      this.shoeItems.item = this.garment;
      this.setMatchingTop();
      this.setMatchingBottom();
    }
  }

  setMatchingTop() {
    let ref = this.dsp.getTops();
    this.setMatchingItem(this.topItems, ref);
  }

  setMatchingBottom() {
    let ref = this.dsp.getBottoms();
    this.setMatchingItem(this.bottomItems, ref);
  }

  setMatchingShoe() {
    let ref = this.dsp.getShoes();
    this.setMatchingItem(this.shoeItems, ref);
  }

  previousTop() {
    this.previousItem(this.topItems);
  }

  nextTop() {
    this.nextItem(this.topItems);
  }

  previousBottom() {
    this.previousItem(this.bottomItems);
  }

  nextBottom() {
    this.nextItem(this.bottomItems);
  }

  previousShoe() {
    this.previousItem(this.shoeItems);
  }

  nextShoe() {
    this.nextItem(this.shoeItems);
  }

  setMatchingItem(items, ref) {
    let ll = new LinkedList<Garment>();

    let matchingColors = this.matchingColors;
    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1)
          ll.add(doc.data());
      });

      items.list= ll;

      // get random item
      items.index = Math.floor(Math.random() * items.list.size());
      items.item = items.list.elementAtIndex(items.index);
    });
  }

  previousItem(items) {
    if (!items.list.isEmpty()) {
      items.index--;
      if (items.index < 0) {
        items.index = items.list.size() - 1;
        items.item = items.list.elementAtIndex(items.index);
      }
      else
        items.item = items.list.elementAtIndex(items.index);
    }
  }

  nextItem(items) {
    if (!items.list.isEmpty()) {
      items.index++;
      if (items.index >= items.list.size()) {
        items.index = 0;
        items.item = items.list.elementAtIndex(items.index);
      }
      else
        items.item = items.list.elementAtIndex(items.index);
    }
  }

}
