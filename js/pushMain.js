
/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BJE-WAqJ6twKpq7C3S_bKahINQ-UNt6ABrschyJWkrWn4q91ck6pI1bHGJbzHStpOehJcYfFod-3-T-N22cWi1k';

var curlCommandDiv = {"endpoint":"https://fcm.googleapis.com/fcm/send/cnfyOCzkrCY:APA91bFPIIXHrvxfkqX0gYcVT6Ii2GJelUwjygNuzYKwTAg814fbYh-9v1GhTj8jmbR1Cn0yGOa9UY7K3ffsHNtXdKOrUw08KQAhKPo_HOLEr9S-ir9ed8zPB_1yX1cPn3e2HSX_8fSj","expirationTime":null,"keys":{"p256dh":"BLYdwp4I3pPr1FLStQ8STdaXACBlAg-XpOrHvWTH-HQMgkbevDEZz-_rCk5O1F_sjgYd9nLlQVBwF5vEWAlNH5Q=","auth":"8Mxg-D2zNaJVYk4d8r9N9Q=="}}

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('./js/sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);
    initialize();
    swRegistration = swReg;
  })
  .then(function() {
    subscribeUser();
  })
  .catch(function(error) {
    // console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
}

function initialize(){
  swRegistration.pushManager.getSubscription()
  .then(function(subscription){
    isSubscribed = !(subscription === null);
    // subscribeUser();

  })
  .catch(function(err) {
    console.log('Failed to subscribe ', err);
  });
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function subscribe() {
  // Disable the button so it can't be changed while
  // we process the permission request

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {
        // The subscription was successful
        isPushEnabled = true;

        // TODO: Send the subscription subscription.endpoint
        // to your server and save it to send a push message
        // at a later date
        return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          window.Demo.debug.log('Permission for Notifications was denied');
        } else {
          // A problem occurred with the subscription, this can
          // often be down to an issue or lack of the gcm_sender_id
          // and / or gcm_user_visible_only
          window.Demo.debug.log('Unable to subscribe to push.', e);

        }
      });
  });
}

function initialiseState() {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    window.Demo.debug.log('Notifications aren\'t supported.');
    return;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    window.Demo.debug.log('The user has blocked notifications.');
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    window.Demo.debug.log('Push messaging isn\'t supported.');
    return;
  }

  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    // Do we already have a push message subscription?
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        // Enable any UI which subscribes / unsubscribes from
        // push messages.


        if (!subscription) {
          // We aren’t subscribed to push, so set UI
          // to allow the user to enable push
          subscribeUser();
          return;
        }

        // Keep your server in sync with the latest subscription
        sendSubscriptionToServer(subscription);

        // Set your UI to show they have subscribed for
        // push messages

      })
      .catch(function(err) {
      });
  });
}
