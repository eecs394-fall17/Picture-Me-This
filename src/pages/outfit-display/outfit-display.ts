import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {Outfit} from "../../models/outfit";
import {DataServiceProvider} from "../../providers/data-service/data-service";
//import { Collections } from 'typescript-collections';
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
      // TODO change to not be random
      let q = new Queue<string>();
      let ref = this.dsp.getTops();
      ref.get().then(snapshot => {
          snapshot.forEach(function (doc) {
              q.enqueue(doc.id);
          })
          let count = snapshot.docs.length;
          this.top = snapshot.docs[Math.floor(Math.random() * count)].data();
          
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
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutfitDisplayPage');
    console.log(this.garment.name);
  }

}
