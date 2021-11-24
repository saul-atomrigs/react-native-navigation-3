import React from 'react';
import { View, KeyboardAvoidingView, Dimensions, TextInput, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';

const CommentInput = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View >
                    <TextInput
                        multiline
                        numberOfLines={8}
                        placeholder="Comment"
                        style={styles.textInput}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        // height: 100,
        marginBottom: 100,
        backgroundColor: '#eee',
    },
    textInput: {
        position: 'absolute',
        height: HEIGHT * 0.1,
        width: WIDTH * 0.9,
        marginHorizontal: 20,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: '#fff',
        padding: 13,
    },
});

export default CommentInput;