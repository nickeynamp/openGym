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
  public arduino;
  public mac_arduino = "20:16:10:10:18:31";
  constructor(public navCtrl: NavController) {
  
  }

  listDevices(){
    BluetoothSerial.enable();
    //IS Bluetooth TURNED ON?
    BluetoothSerial.isEnabled().then(res =>{
      //BluetoothSerial.list().then(val=>{ $("#energy").text(val);},error=>{console.log("error")});
      //LIST DEVICES
      BluetoothSerial.list().then(
        (devices) => {
            // set the list to returned value
            $("#energy").html('Listing devices \n' +devices.length +devices);
            console.log("tracking here");
            console.log("Info device is here", devices[0]);
            devices.forEach(function(device){
              if(device.id === this.mac_arduino){
                this.connect();
              }
            })
            if(devices.length ===0){
              $("#energy").html("No Bluetooth Device found");
            }
        });
    }).catch(fail => {
            console.log('Fail!');
            $("#energy").html('Bluetooth is not enabled/supported');
            });
  }

  connect(){
    //ATTEMP TO CONNECT
    this.arduino = this.mac_arduino;
    var deviceReady = function() {
        $("#energy").html("Connected Hooooray");
        BluetoothSerial.subscribeRawData();
        BluetoothSerial.read().then( 
          data =>{
            $("#energy").html(data);
          }
        );
      };
    var error = function(){
            // $("#energy").html('Fail to connect to Arduino. Have you tried turning it on and off again??');
        };
    BluetoothSerial.connect(this.arduino);
    BluetoothSerial.isConnected().then(deviceReady,error);
  }

}
