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
  public lists = [];

  constructor(public navCtrl: NavController) {
    this.connect();
  }

  connect(){

    BluetoothSerial.isEnabled().then(res =>{
      //BluetoothSerial.list().then(val=>{ $("#energy").text(val);},error=>{console.log("error")});

      //LIST DEVICES
      BluetoothSerial.list().then(
        (allDevices) => {
            // set the list to returned value
            this.lists = allDevices;
            $("#energy").text('Listing devices' + this.lists.toString);
            if(this.lists.length == 0){
               $("#energy").text('No devices found');
            }
        });

      //ATTEMP TO CONNECT
      BluetoothSerial.connect('20:16:10:10:18:31');
      BluetoothSerial.isConnected().then(
        success => {
          $("#energy").text("Connected Hooooray");
          BluetoothSerial.subscribeRawData();
          //BluetoothSerial.read(function(data){console.log(data);},fail);
        }).catch(
          fail=>{
            // $("#energy").text('Fail to connect to Arduino. Have you tried turning it on and off again??');
          });

    }).catch(fail => {
            console.log('Fail!');
            console.log("Promise type is " + BluetoothSerial.list());
            $("#energy").html('Bluetooth is not enabled/supported');
            });
  }

}
