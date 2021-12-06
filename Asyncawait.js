// import React, { useState, useEffect } from 'react';
// import {
//     Button,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
//     Keyboard,
// } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

// // const STORAGE_KEY = '@save_age'

// // const Asyncawait = () => {
// //     const [age, setAge] = useState('')

// //     useEffect(() => {
// //         readData()
// //     }, [])

// //     const saveData = async () => {
// //         try {
// //             await AsyncStorage.setItem(STORAGE_KEY, age)
// //             alert('Data successfully saved')
// //         } catch (e) {
// //             alert('Failed to save the data to the storage')
// //         }
// //     }

// //     const readData = async () => {
// //         try {
// //             const userAge = await AsyncStorage.getItem(STORAGE_KEY)

// //             if (userAge !== null) {
// //                 setAge(userAge)
// //             }
// //         } catch (e) {
// //             alert('Failed to fetch the data from storage')
// //         }
// //     }

// //     const onChangeText = userAge => setAge(userAge)

// //     const onSubmitEditing = () => {
// //         if (!age) return

// //         saveData(age)
// //         setAge('')
// //     }

// //     const clearStorage = async () => {
// //         try {
// //             await AsyncStorage.clear()
// //             alert('Storage successfully cleared!')
// //         } catch (e) {
// //             alert('Failed to clear the async storage.')
// //         }
// //     }

// //     return (
// //         <View style={styles.container}>
// //             <View style={styles.header}>
// //                 <Text style={styles.title}>Comment</Text>
// //             </View>
// //             <View style={styles.panel}>
// //                 <Text>Enter your age here:</Text>
// //                 <TextInput
// //                     style={styles.input}
// //                     value={age}
// //                     placeholder="Age is just a number"
// //                     onChangeText={onChangeText}
// //                     onSubmitEditing={onSubmitEditing}
// //                 />
// //                 <Text style={styles.text}>Your age is {age}</Text>
// //                 <Text style={styles.text}>Your age is {age}</Text>
// //                 <TouchableOpacity onPress={clearStorage} style={styles.button}>
// //                     <Text style={styles.buttonText}>Clear Storage</Text>
// //                 </TouchableOpacity>
// //             </View>
// //         </View>
// //     )
// // }



// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1
// //     },
// //     header: {
// //         width: '100%',
// //         backgroundColor: '#dcdcdc',
// //         padding: 20,
// //         borderBottomWidth: StyleSheet.hairlineWidth,
// //         alignItems: 'center'
// //     },
// //     title: {
// //         fontSize: 22,
// //         color: '#333',
// //         fontWeight: 'bold'
// //     },
// //     panel: {
// //         paddingTop: 40,
// //         alignItems: 'center'
// //     },
// //     text: {
// //         fontSize: 24,
// //         padding: 10,
// //         // backgroundColor: '#dcdcdc'
// //     },
// //     input: {
// //         padding: 15,
// //         height: 50,
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#333',
// //         margin: 10
// //     },
// //     button: {
// //         margin: 10,
// //         padding: 10,
// //         backgroundColor: 'yellow'
// //     },
// //     buttonText: {
// //         fontSize: 18,
// //         color: '#444'
// //     }
// // })
// // export default Asyncawait


// export default function Asyncawait() {
//     const [nickname, setNickname] = useState();

//     // Load data when the app starts
//     useEffect(() => {
//         const firstLoad = async () => {
//             try {
//                 const savedNickname = await AsyncStorage.getItem("@nickname");
//                 setNickname(savedNickname);
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         firstLoad();
//     }, []);

//     // Create or Update nickname
//     const saveNickname = async () => {
//         try {
//             await AsyncStorage.setItem("@nickname", nickname);
//         } catch (err) {
//             console.log(err);
//         }

//         Keyboard.dismiss();
//     };

//     // Delete nickname
//     const removeNickname = async () => {
//         try {
//             await AsyncStorage.removeItem("@nickname");
//             setNickname();
//         } catch (err) {
//             console.log(err);
//         }
//         Keyboard.dismiss();
//     };

//     const importData = async () => {
//         try {
//             const keys = await AsyncStorage.getAllKeys();
//             const result = await AsyncStorage.multiGet(keys);

//             return result.map(req => JSON.parse(req)).forEach(console.log);
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     return (
//         <View style={styles.container}>
//             {nickname ? (
//                 <Text style={styles.heading}>Hello {nickname}</Text>
//             ) : (
//                 <Text style={styles.heading}>Create your nickname</Text>
//             )}

//             <TextInput
//                 placeholder="Enter Your Nickname"
//                 style={styles.textInput}
//                 value={nickname}
//                 onChangeText={(value) => {
//                     setNickname(value);
//                 }}
//             />

//             <View style={styles.buttonContainer}>
//                 <Button title="Save" onPress={saveNickname} />
//                 <Button title="Delete" onPress={removeNickname} />
//                 <Button title="data" onPress={importData} />
//             </View>
//             <Text>{importData}</Text>
//             <Text>{nickname}</Text>
//         </View>
//     );
// }

// // Kindacode.com
// // Just some styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: "column",
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     heading: {
//         fontSize: 24,
//     },
//     textInput: {
//         width: 300,
//         marginVertical: 30,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: "#000",
//         borderRadius: 50,
//     },
//     buttonContainer: {
//         width: 240,
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//     },
// });