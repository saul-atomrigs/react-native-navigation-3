import React from 'react';
import { View, KeyboardAvoidingView, Dimensions, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';

const CommentInput = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View >
                    <TextInput placeholder="Comment" style={styles.textInput} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: '#eee',
    },
    textInput: {
        position: 'absolute',
        height: HEIGHT * 0.05,
        width: WIDTH * 0.9,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: '#fff',
        padding: 13,
    },
    btnContainer: {
        height: 40,
        width: WIDTH * 0.9,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: '#fff',
        padding: 10,
    },
    button: {
        // boxSizing: "border-box",
        flexShrink: 0,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        // boxShadow: "0px 1px 10px 1px black",
        backgroundColor: "#fff",
        overflow: "visible",
        borderRadius: 13,
        marginBottom: 10,
        marginRight: 10,
        color: '#000'
    }
});

export default CommentInput;