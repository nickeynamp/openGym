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
    BluetoothSerial.isEnabled().then(res =>{
      BluetoothSerial.connect(UUID); // not sure if it works, can someone check how to deal with obsevable ?
      BluetoothSerial.isConnected().then(success,fail); // needs testing, not sure if works

    }).catch(res => {
            console.log('Fail!');
            });

    function success(){
      console.log("Operation Succeeded");

      var reading = BluetoothSerial.read();

    };
    function fail(){
      console.log("Operation Failed. Have you tried turning it on and off again?? ;)s");


    };


  }

}
