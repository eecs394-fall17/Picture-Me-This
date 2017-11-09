import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Queue, LinkedList} from 'typescript-collections/dist/lib';

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

  constructor(public navCtrl: NavController,
              public dsp: DataServiceProvider,
              public navParams: NavParams) {


    this.garment = new Garment();
    this.garment.name = navParams.get('name');
    this.garment.type = navParams.get('type');
    this.garment.color = navParams.get('color');
    this.garment.imageURL = navParams.get('imageURL');

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
        //this.topMatches.enqueue(this.garment.name);
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
      // TODO change to not be random
      let ll = new LinkedList<Garment>();
      let ref = this.dsp.getTops();
      ref.get().then(snapshot => {
          snapshot.forEach(function (doc) {
              ll.add(doc.data());
          })
          //let count = snapshot.docs.length;
          //this.top = snapshot.docs[Math.floor(Math.random() * count)].data();
          this.tops = ll;
          this.top = this.tops.first();
      })      
  }

  setMatchingBottom() {
      // TODO change to not be random
      let ll = new LinkedList<Garment>();
      let ref = this.dsp.getBottoms();
      ref.get().then(snapshot => {
          let count = snapshot.docs.length;
          this.bottom = snapshot.docs[Math.floor(Math.random() * count)].data();
          snapshot.forEach(function (doc) {
              ll.add(doc.data());
          })
          this.bottoms = ll;
      })
  }

  setMatchingShoe() {
      // TODO change to not be random
      let ll = new LinkedList<Garment>();
      let ref = this.dsp.getShoes();
      ref.get().then(snapshot => {
          snapshot.forEach(function (doc) {
              ll.add(doc.data());
          })
          let count = snapshot.docs.length;
          this.shoe = snapshot.docs[Math.floor(Math.random() * count)].data();
          this.shoes = ll;
    })
  }

  changeTop() {
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

  changeBottom() {
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
  changeShoe() {
      if (!this.shoes.isEmpty()) {
          this.sIndex++;
          if (this.sIndex >= this.shoes.size())
          {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutfitDisplayPage');
    console.log(this.garment.name);
  }

}
