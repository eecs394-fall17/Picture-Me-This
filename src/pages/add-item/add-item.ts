import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Camera} from "@ionic-native/camera";
import {ImageServiceProvider} from "../../providers/image-service/image-service";
import * as firebase from "firebase";

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
  base64Prefix: string;

  constructor(public navCtrl: NavController,
              public dsp: DataServiceProvider,
              public camera: Camera,
              public isp: ImageServiceProvider,
              public navParams: NavParams) {
    this.garment = new Garment();
    this.base64Image = null;

    // this prefix is needed for the img tag to display it properly in add-item.html
    this.base64Prefix = "data:image/jpeg;base64,";
  }

  saveClothing() {
    // TODO don't continue if a field is missing.
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

    // pop back to the home page.
    this.navCtrl.pop();
  }

  takePicture() {

    // take a picture!
    this.camera.getPicture(this.isp.cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string

      // base64Image will store the raw image as base64.
      this.base64Image = imageData;

      // base64Prefix stores the raw image as well, but with a prefix beforehand (see constructor).
      // TODO probably better not to store giant image string twice...
      // TODO maybe just prepend prefix in a function before sending to html.
      this.base64Prefix += imageData;

      var button = document.getElementById("take");
      button.style.display = "none";
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    if (!this.base64Image) {
      this.takePicture();
    }
  }

}
