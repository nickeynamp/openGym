import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation} from 'ionic-native';
import { BluetoothSerial } from 'ionic-native';


ScreenOrientation.lockOrientation('landscape');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let UUID: string = "mac_address";
    BluetoothSerial.connect(UUID);
    BluetoothSerial.isConnected().then(success,fail);

    function success(){};
    function fail(){};


  }

}
