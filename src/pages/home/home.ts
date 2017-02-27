import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation} from 'ionic-native';
import { BluetoothSerial } from 'ionic-native';
import * as $ from "jquery";

ScreenOrientation.lockOrientation('landscape');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let UUID: string = "20:16:10:10:18:31";
    BluetoothSerial.isEnabled().then(res =>{
      BluetoothSerial.connect(UUID); // not sure if it works, can someone check how to deal with obsevable ?
      BluetoothSerial.isConnected().then(success,fail); // needs testing, not sure if works

    }).catch(res => {
            console.log('Fail!');
            $("div.t1").text('It does not work');
            });

    function success(){
      var data = "connected ++" ;
      $("div.t1").text('data');


      //BluetoothSerial.read(function(data){console.log(data);},fail);

    };
    function fail(){
      console.log("Operation Failed. Have you tried turning it on and off again?? ;)s");


    };


  }

}
