import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";
import {DataServiceProvider} from "../../providers/data-service/data-service";
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
  topMatches: Queue<string>;
  bottomMatches: Queue<string>;
  shoeMatches: Queue<string>;

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
    this.topMatches = new Queue<string>();
    this.bottomMatches = new Queue<string>();
    this.shoeMatches = new Queue<string>();

    if (this.garment.type == "Top") {
        this.top = this.garment;
        this.topMatches.enqueue(this.garment.name);
        this.setMatchingBottom();
        this.setMatchingShoe();
    }
    else if (this.garment.type == "Bottom") {
        this.bottom = this.garment;
        this.bottomMatches.enqueue(this.bottom.name);
        this.setMatchingTop();
        this.setMatchingShoe();
    }
    else{
        this.shoe = this.garment;
        this.shoeMatches.enqueue(this.shoe.name);
        this.setMatchingTop();
        this.setMatchingBottom();
    }
  }

  setMatchingTop() {
      // TODO change to not be random
      let q = new Queue<string>();
      let ref = this.dsp.getTops();
      ref.get().then(snapshot => {
          snapshot.forEach(function (doc) {
              q.enqueue(doc.id);
          })
          let count = snapshot.docs.length;
          this.top = snapshot.docs[Math.floor(Math.random() * count)].data();
          this.topMatches = q;
          console.log(this.topMatches.isEmpty());
      })      
  }

  setMatchingBottom() {
      // TODO change to not be random
      let q = new Queue<string>();
      let ref = this.dsp.getBottoms();
      ref.get().then(snapshot => {
          let count = snapshot.docs.length;
          this.bottom = snapshot.docs[Math.floor(Math.random() * count)].data();
          snapshot.forEach(function (doc) {
              q.enqueue(doc.id);
          })
          this.bottomMatches = q;
      })
  }

  setMatchingShoe() {
      // TODO change to not be random
      let q = new Queue<string>();
      let ref = this.dsp.getShoes();
      ref.get().then(snapshot => {
          snapshot.forEach(function (doc) {
              q.enqueue(doc.id);
          })
          let count = snapshot.docs.length;
          this.shoe = snapshot.docs[Math.floor(Math.random() * count)].data();
          this.shoeMatches = q;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutfitDisplayPage');
    console.log(this.garment.name);
  }

}
