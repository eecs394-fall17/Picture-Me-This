import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutfitDisplayPage } from './outfit-display';

@NgModule({
  declarations: [
    OutfitDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(OutfitDisplayPage),
  ],
})
export class OutfitDisplayPageModule {}
