import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ScreenOrientation} from 'ionic-native';

ScreenOrientation.lockOrientation('landscape');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }
  
}
