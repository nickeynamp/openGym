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
    
  }

  public listDevices(){
    var mac_arduino = "20:16:10:10:18:31";
    BluetoothSerial.enable();
    //IS Bluetooth TURNED ON?
    // BluetoothSerial.isEnabled().then(res =>{
      //LIST DEVICES
      BluetoothSerial.list().then(
        (devices) => {
            // set the list to returned value
            $("#energy").html('Listing devices \n' +devices.length +devices);
            console.log("tracking here");
            console.log("Address type is", typeof devices[4].id);
            devices.forEach(function(device){
              // this.connect(device.address);
              console.log("Condition number is ", device.address.localeCompare(mac_arduino));
              if(device.address.localeCompare(mac_arduino)===0){
                this.connect(device.address);
              }
            })
            //NO DEVICES FOUND
            if(devices.length ===0){
              $("#energy").html("No Bluetooth Device found");
            }
        });
    // }).catch(fail => {
    //         console.log('Fail!');
    //         $("#energy").html('Bluetooth is not enabled/supported');
    //         });
  }

  connect(addr){
    //ATTEMP TO CONNECT
    $("#energy").html("yoohoo");
    console.log("Param id is",addr);
    var deviceReady = function() {
        $("#energy").html("Connected Hooooray");
        BluetoothSerial.subscribeRawData();
        // BluetoothSerial.read().then( 
        //   data =>{
        //     $("#energy").html(data);
        //   }
        // );
      };
    var error = function(){
            $("#energy").html('Fail to connect to Arduino. Have you tried turning it on and off again??');
        };
    BluetoothSerial.connect(addr);
    BluetoothSerial.isConnected().then(deviceReady,error);
  }

}
