import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Garment} from "../../models/garment";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Camera} from "@ionic-native/camera";
import {ImageServiceProvider} from "../../providers/image-service/image-service";
import * as firebase from "firebase";
import {WardrobePage} from "../wardrobe/wardrobe";
import {HomePage} from "../home/home";
import {OptionsPage} from "../options/options";

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  garment: Garment;
  base64Image: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public dsp: DataServiceProvider,
              public camera: Camera,
              public isp: ImageServiceProvider,
              public navParams: NavParams) {
    this.garment = new Garment();

  }

  saveClothing() {

    if (!this.base64Image || !this.garment.name || !this.garment.type || !this.garment.color || !this.garment.style) {

      let msg = "You didn't fill out all the fields! Please enter the following: ";

      let fields = [
        [this.base64Image, "Picture"], [this.garment.name, "Name"],
        [this.garment.type, "Type"], [this.garment.color, "Color"], [this.garment.style, "Style"]
      ];

      // report each field that user didn't fill out:
      fields.forEach(field => {
        if (!field[0]) {
          msg += field[1] + ", "
        }
      });

      msg = msg.substring(0,msg.length-2);

      this.alertCtrl.create({
        title: "Incomplete Fields",
        message: msg,
        buttons: ['Ok']
      }).present();

      return;
    }


    this.garment.color = this.garment.color.toLowerCase();

    // get a reference to a location in storage:
    const ref = firebase.storage().ref('Users/hello/' + this.garment.type + "s" + '/' + this.garment.name.replace(" ","") + '.jpg');

    // store the image at that reference
    ref.putString(this.base64Image, 'base64', { contentType: 'image/jpg' }).then(snapshot => {
      // get the URL for the image and save it to garment.
      this.garment.imageURL = snapshot.downloadURL;

      // save the garment!
      this.dsp.addClothing(this.garment.type + "s", this.garment);
    }, err => {
      console.log(err);
    });


    // feedback: tell user garment has been saved.
    this.toastCtrl.create({
      message: this.garment.name + " was successfully added",
      duration: 3000,
      position: 'top'
    }).present();

    // continue to wardrobe.
    //this.navCtrl.setRoot(HomePage);
    this.pushOptions(this.garment);
  }

  takePicture() {

    // take a picture!
    this.camera.getPicture(this.isp.cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string

      // base64Image will store the raw image as base64.
      this.base64Image = imageData;

    }, (err) => {
      console.log(err);
    });
  }

  pushOptions(garment) {
      this.navCtrl.push(OptionsPage, {
          name: garment.name,
          type: garment.type,
          color: garment.color,
          imageURL: garment.imageURL
      });
  }

  ionViewDidEnter() {
    if (!this.base64Image) {
      this.takePicture();
    }
  }

}
