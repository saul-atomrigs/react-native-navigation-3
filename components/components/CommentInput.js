// import React, { useEffect, useState, Component } from 'react';
// import { View, Image, KeyboardAvoidingView, SafeAreaView, NativeModules, Text, Dimensions, TextInput, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, TouchableOpacity } from 'react-native';


// // const CommentInput = () => {
// //     return (
// //         <KeyboardAvoidingView
// //             behavior={Platform.OS === "ios" ? "padding" : "height"}
// //             style={styles.container}
// //         >
// //             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
// //                 <View >
// //                     <TextInput
// //                         multiline
// //                         numberOfLines={8}
// //                         placeholder="Comment"
// //                         style={styles.textInput}
// //                     />
// //                 </View>
// //             </TouchableWithoutFeedback>
// //         </KeyboardAvoidingView>
// //     );
// // };


// // const WIDTH = Dimensions.get('window').width;
// // const HEIGHT = Dimensions.get('window').height;

// // const styles = StyleSheet.create({
// //     container: {
// //         // height: 100,
// //         marginBottom: 100,
// //         backgroundColor: '#eee',
// //     },
// //     textInput: {
// //         position: 'absolute',
// //         height: HEIGHT * 0.05,
// //         width: WIDTH * 0.9,
// //         marginHorizontal: 20,
// //         marginVertical: 5,
// //         // borderWidth: 1,
// //         // borderColor: 'pink',
// //         borderRadius: 13,
// //         backgroundColor: '#ffffff',
// //         padding: 15,
// //     },
// // });

// // export default CommentInput;

// //TODO:
// const { StatusBarManager } = NativeModules

// const CommentInput = (props) => {
//     useEffect(() => {
//         Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
//             setStatusBarHeight(statusBarFrameData.height)
//         }) : null
//     }, []);

//     const [statusBarHeight, setStatusBarHeight] = useState(0);

//     return (
//         <SafeAreaView >
//             <KeyboardAvoidingView
//                 style={styles.rootContainer}
//                 // behavior={"padding"}
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//             // keyboardVerticalOffset={statusBarHeight + 44}
//             // keyboardVerticalOffset={900}
//             >
//             </KeyboardAvoidingView>
//             <View style={styles.textInputContainer}>
//                 <TextInput
//                     style={styles.textInput}
//                     placeholder="Post your comment"
//                     autoCorrect={false}
//                     multiline
//                     scrollEnabled={false}
//                 />
//                 <TouchableOpacity>
//                     <Image source={require('../assets/icons/megaphone.png')} style={{ width: 30, height: 30 }} />
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     rootContainer: {
//         flex: 1,
//         backgroundColor: "#ffffff"
//     },
//     textInputContainer: {
//         marginTop: "auto",
//         borderWidth: 1,
//         borderColor: "skyblue",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingVertical: 20,
//         paddingHorizontal: 5,
//         flexDirection: 'row',
//     },
//     textInput: {
//         marginHorizontal: 5,
//         width: "90%",
//         fontSize: 15,
//         color: '#000',
//         borderRadius: 10,
//         backgroundColor: "#eee",
//         padding: 10,
//         // position: "relative", 
//         // bottom: 0
//     }
// })

// export default CommentInput

