import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Camera} from "@ionic-native/camera";

/*
  Generated class for the ImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServiceProvider {
  cameraOptions;

  constructor(public http: Http, public camera: Camera) {
    this.cameraOptions = {
      quality: 80, // arbitrary choice. Adjust for better results.
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 500, // arbitrary choice. Adjust for better results.
      targetHeight: 500 // arbitrary choice. Adjust for better results.
    }
  }

}
