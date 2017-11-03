import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item/add-item';
import { OutfitDisplayPage} from '../pages/outfit-display/outfit-display';

import { HttpModule } from '@angular/http';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Camera } from '@ionic-native/camera';
import { Environment } from './app.environment.config';
import { ImageServiceProvider } from '../providers/image-service/image-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OutfitDisplayPage,
    AddItemPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OutfitDisplayPage,
    AddItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    ImageServiceProvider
  ]
})
export class AppModule {}
