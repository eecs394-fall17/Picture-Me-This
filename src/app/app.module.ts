import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {WardrobePage} from '../pages/wardrobe/wardrobe';
import {AddItemPage} from '../pages/add-item/add-item';
import {OutfitDisplayPage} from '../pages/outfit-display/outfit-display';

import {HttpModule} from '@angular/http';
import {DataServiceProvider} from '../providers/data-service/data-service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {Camera} from '@ionic-native/camera';
import {Environment} from './app.environment.config';
import {ImageServiceProvider} from '../providers/image-service/image-service';
import {HomePage} from "../pages/home/home";
import {MatchServiceProvider} from '../providers/match-service/match-service';
import {OptionsPage} from "../pages/options/options";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WardrobePage,
    OutfitDisplayPage,
    AddItemPage,
    OptionsPage
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
    WardrobePage,
    OutfitDisplayPage,
    AddItemPage,
    OptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    ImageServiceProvider,
    MatchServiceProvider
  ]
})
export class AppModule {
}
