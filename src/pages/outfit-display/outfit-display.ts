import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  outfit: Outfit; // currently not being used

  topItems;
  bottomItems;
  shoeItems;

  matchingColors;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public dsp: DataServiceProvider,
              public msp: MatchServiceProvider) {


    this.garment = new Garment();
    this.garment.name = navParams.get('name');
    this.garment.type = navParams.get('type');
    this.garment.color = navParams.get('color');
    this.garment.imageURL = navParams.get('imageURL');

    this.matchingColors = msp.getMatchingColors(this.garment.color);

    // package info as objects that can be passed into functions
    this.topItems = this.newItems();
    this.bottomItems = this.newItems();
    this.shoeItems = this.newItems();

    if (this.garment.type != "Top")
      this.setMatchingItem(this.topItems, this.dsp.getTops());

    if (this.garment.type != "Bottom")
      this.setMatchingItem(this.bottomItems, this.dsp.getBottoms());

    if (this.garment.type != "Shoe")
      this.setMatchingItem(this.shoeItems, this.dsp.getShoes());
  }

  newItems() {
    return {
      item: this.garment,
      list: new LinkedList<Garment>(),
      index: 0
    }
  }

  setMatchingItem(items, ref) {
    let ll = new LinkedList<Garment>();

    let matchingColors = this.matchingColors;
    ref.get().then(snapshot => {
      snapshot.forEach(function (doc) {
        if (matchingColors.indexOf(doc.data().color) > -1)
          ll.add(doc.data());
      });

      items.list = ll;

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

  displayInfo(item) {
    let msg = "Name: " + item.name + "<br/>Color: " + item.color + "<br/>Type: " + item.type;
    this.alertCtrl.create({
      title: "Clothing Info",
      message: msg,
      buttons: ['Close']
    }).present();
  }
}
