import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation} from 'ionic-native';
import { BluetoothSerial } from 'ionic-native';
import * as $ from 'jquery';

ScreenOrientation.lockOrientation('landscape');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let MAC_bluetooth_module: string = "20:16:10:10:18:31";
    let MAC_Adurino: string = "20:";
    BluetoothSerial.isEnabled().then(res =>{
      BluetoothSerial.list().then(val=>{ $("#energy").text(val);},error=>{console.log("error")});
      BluetoothSerial.connect(MAC_bluetooth_module); // not sure if it works, can someone check how to deal with obsevable ?
      $("#energy").text('connected');

      BluetoothSerial.isConnected().then(success,fail); // needs testing, not sure if works

    }).catch(res => {
            console.log('Fail!');
            console.log(BluetoothSerial.isConnected());
            $("#energy").html('Bluetooth is not enabled');
            });

    var success = function s1(){
      var data = "connected ++" ;
      $("#energy").text(data);


      //BluetoothSerial.read(function(data){console.log(data);},fail);

    };
    function fail(){
      console.log("Operation Failed. Have you tried turning it on and off again??");
      $("#energy").text('Fail to connect to Arduino');
    };


  }

}
