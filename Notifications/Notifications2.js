// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { Notifications, NotificationAction, NotificationCategory } from 'react-native-notifications';

// export default function Notifications2() {

//   // UPVOTE
//   let upvoteAction = new NotificationAction({
//     activationMode: "background",
//     title: String.fromCodePoint(0x1F44D),
//     identifier: "UPVOTE_ACTION",
//     textInput: {
//       buttonTitle: 'title',
//       placeholder: 'placeholder text'
//     }
//   });

//   // REPLY
//   let replyAction = new NotificationAction({
//     activationMode: "background",
//     title: "Reply",
//     authenticationRequired: true,
//     identifier: "REPLY_ACTION"
//   });

//   // GROUP UPVOTE AND REPLY
//   let exampleCategory = new NotificationCategory({
//     identifier: "EXAMPLE_CATEGORY",
//     actions: [upvoteAction, replyAction]
//   });

//   // REGISTER DEVICE TO PUSH NOTIFICATIONS WITH THE CATEGORY
//   Notifications.setCategories([exampleCategory]);

//   return (
//     <View style={styles.text}>
//       <Text>Notifications</Text>
//     </View>
//   );
// }

// export function foreground() {
//   // REGISTER (REQUEST PERMISSIONS ON IOS, REFRESH TOKEN ON ANDROID)
//   Notifications.registerRemoteNotifications();

//   // FOREGROUND
//   Notifications.events().registerNotificationReceivedForeground(
//     (notification, completion) => {
//       console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
//       // COMPLETION CALLBACK
//       completion({ alert: false, sound: false, badge: false });
//     });

//   // 
//   Notifications.events().registerNotificationOpened(
//     (notification, completion) => {
//       console.log(`Notification opened: ${notification.payload}`);
//       // COMPLETION CALLBACK
//       completion();
//     });
// }

// export function background() {
//   // BACKGROUND
//   Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
//     console.log("Notification Received - Background", notification.payload);
//     // COMPLETION CALLBACK
//     completion({ alert: true, sound: true, badge: false });
//   });
// }

// // IOS LOCAL NOTIFICATIONS
// let localNotification = Notifications.postLocalNotification({
//   body: "Local notification!",
//   title: "Local Notification Title",
//   sound: "chime.aiff",
//   silent: false,
//   category: "EXAMPLE_CATEGORY",
//   userInfo: {},
//   fireDate: new Date(), // WHEN TO FIRE NOTIFICATION (SCHEDULED)
// });

// export function cancelNotification() {
//   Notifications.cancelLocalNotification(localNotification);
// }

// export function iosInitial() {
//   Notifications.getInitialNotification()
//     .then((notification) => {
//       console.log("Initial notification was:", (notification ? notification.payload : 'N/A'));
//     })
//     .catch((err) => console.error("getInitialNotifiation() failed", err));

// }

// export function checkPermissions() {
//   // CHECK IF THE USER GRANTED PERMISSIONS ON IOS 
//   Notifications.ios.checkPermissions().then((currentPermissions) => {
//     console.log('Badges enabled: ' + !!currentPermissions.badge);
//     console.log('Sounds enabled: ' + !!currentPermissions.sound);
//     console.log('Alerts enabled: ' + !!currentPermissions.alert);
//     console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
//     console.log('Critical Alerts enabled: ' + !!currentPermissions.criticalAlert);
//     console.log('Provisioanl enabled: ' + !!currentPermissions.provisional);
//     console.log('Provides App Notification Settings enabled: ' + !!currentPermissions.providesAppNotificationSettings);
//     console.log('Announcement enabled: ' + !!currentPermissions.announcement);
//   });
// }

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 18,
//     marginVertical: 20,
//   }
// });
