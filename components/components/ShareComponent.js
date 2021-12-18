// import React from 'react';
// import { Share, View, Text } from 'react-native';

// const ShareComponent = () => {
//     const onShare = async () => {
//         try {
//             const result = await Share.share({
//                 message:
//                     'React Native | A framework for building native apps using React',
//             });
//             if (result.action === Share.sharedAction) {
//                 if (result.activityType) {
//                     // shared with activity type of result.activityType
//                 } else {
//                     // shared
//                 }
//             } else if (result.action === Share.dismissedAction) {
//                 // dismissed
//             }
//         } catch (error) {
//             alert(error.message);
//         }
//     };
//     return (
//         <View>
//             <Text onPress={onShare}>Share dailyKPOP to the world</Text>
//         </View>
//     );
// };

// export default ShareComponent;