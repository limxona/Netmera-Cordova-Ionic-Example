import { Component } from '@angular/core';
import { NetmeraPlugin, NetmeraUser, NetmeraEvent, NetmeraInboxFilter, NetmeraPushStatus } from '@ionic-native/netmera-plugin/ngx';

declare var cordova: any;
declare var nonNativeEvent: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private netmera: NetmeraPlugin) {
  }

  callPlugin() {
    // Non native cordova plugin olarak kullanılmak istenirse.
    //let key = ""; // Netmera Key
    //let fcmKey = ""; // FCM Key
    //cordova.plugins.NetmeraPlugin.start(key, fcmKey);

    let key = ""; // Netmera Key
    let fcmKey = ""; // FCM Key
    this.netmera.start(key, fcmKey);
    this.netmera.requestPushNotificationAuthorization();
  }

  requestPushNotificationAuthorization() {
    // Non native cordova plugin olarak kullanılmak istenirse.
    //cordova.plugins.NetmeraPlugin.requestPushNotificationAuthorization();

    this.netmera.requestPushNotificationAuthorization();
  }

  subscribePushNotification() {
    // Non native cordova plugin olarak kullanılmak istenirse.
    // var success = function (result) {
    //   console.log(JSON.stringify(result));
    // }
    // var failure = function (result) {
    //   console.log("registerPushNotification err")
    //   console.log(JSON.stringify(result));
    // }
    //cordova.plugins.NetmeraPlugin.subscribePushNotification(success, failure);

    this.netmera.subscribePushNotification().then(result => {
      console.log("Push Receive: ", result);
    }).catch(err => {
      console.log("Push Receive Error: ", err);
    });

    
  }

  subscribePushClick() {
    // Non native cordova plugin olarak kullanılmak istenirse.
    // var success = function (result) {
    //   console.log(JSON.stringify(result));
    // }
    // var failure = function (result) {
    //   console.log("registerPushNotification err")
    //   console.log(JSON.stringify(result));
    // }
    // cordova.plugins.NetmeraPlugin.subscribePushClick(success, failure);

    this.netmera.subscribePushClick().then(result => {
      console.log("Push click: ", result);
    }).catch(err => {
      console.log("Push click Error: ", err);
    });
  }

  subscribeButtonPushClick() {
    // Non native cordova plugin olarak kullanılmak istenirse.
    // var success = function (result) {
    //   console.log(JSON.stringify(result));
    // }
    // var failure = function (result) {
    //   console.log("registerPushNotification err")
    //   console.log(JSON.stringify(result));
    // }
    // cordova.plugins.NetmeraPlugin.subscribePushButtonClick(success, failure);

    this.netmera.subscribePushButtonClick().then(result => {
      console.log("Push subscribeButtonPushClick: ", result);
    }).catch(err => {
      console.log("Push subscribeButtonPushClick Error: ", err);
    });
  }

  sendEvent() {
    // Non native cordova plugin olarak kullanılmak istenirse.
    // nonNativeEvent.setUserId("userid1234567890");
    //cordova.plugins.NetmeraPlugin.sendEvent(nonNativeEvent);

    let loginEvent = new LoginEvent();
    loginEvent.userId = "userid1234567890";
    this.netmera.sendEvent(loginEvent);
  }

  fetchInboxUsingFilter() {
    // Non native cordova plugin olarak kullanılmak istenirse.
    // let filter = {
    //   status: 3,
    //   pageSize: 20,
    //   categories: ['category1', 'category2'],
    //   shouldIncludeExpiredObjects: true
    // }
    // var success = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    // var failure = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    //cordova.plugins.NetmeraPlugin.fetchInboxUsingFilter(filter, success, failure);
    
    let newFilter: NetmeraInboxFilter = {
      status: NetmeraPushStatus.readAndUnread,
      pageSize: 20
    }
    this.netmera.fetchInboxUsingFilter(newFilter).then(inbox => {
      console.log("FetchInbox Success: ", JSON.stringify(inbox));
    }).catch(err => {
      console.log("FetchInbox Error", err);
    });
  }

  fetchNextPage() {
    // var success = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    // var failure = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    //cordova.plugins.NetmeraPlugin.fetchNextPage(success, failure);

    this.netmera.fetchNextPage().catch(inbox => {
      console.log("FetchNextPage: ", JSON.stringify(inbox));
    }).catch(err => {
      console.log("FetchNextPage error: ",err);
    });    
  }

  countForStatus() {
    // let status = 3; // Read and unread.
    // var success = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    // var failure = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    //cordova.plugins.NetmeraPlugin.countForStatus(status, success, failure);

    this.netmera.countForStatus(NetmeraPushStatus.readAndUnread).then(count => {
      console.log("Count: ", count);
    }).catch(err => {
      console.log(err);
    });
  }

  updatePushStatus() {
    // let index = 0;
    // let length = 5;
    // let status = 2;
    // var success = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    // var failure = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    //cordova.plugins.NetmeraPlugin.updatePushStatus(index, length, status, success, failure);

    let index = 0;
    let length = 5;
    this.netmera.updatePushStatus(index, length, NetmeraPushStatus.read).then(result => {
      console.log("Update Status: ", result);
    }).catch(err => {
      console.log("Update Error: ", err);
    });
  }

  updateUser() {
    // var success = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    // var failure = function (result) {
    //   alert(JSON.stringify(result, undefined, 2));
    // }
    //cordova.plugins.NetmeraPlugin.updateUser(user);
    
    let user = new NetmeraUser();
    user.setUserId = "enis1234567890";
    user.name = "aaaanativesdk-testname";
    this.netmera.updateUser(user);
  }

}

export class LoginEvent extends NetmeraEvent {

  private code = "n:cl"
  private uid: string;

  set userId(value: string) {
      this.uid = value
  }
}

export class MyNetmeraUser extends NetmeraUser {
  private iy: string;

  set hasnametest(value: string) {
    this.iy = value
  }
}

export class CustomEvent extends NetmeraEvent {

  private code = "afe"
  private ee;
  private ea;
  private eb;

  set date(value) {
    this.ee = value
  }
  set testId(value: string) {
    this.ea = value
  }
  set productName(value) {
    this.eb = value
  }
}
