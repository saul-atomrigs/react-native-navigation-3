import React, { useState } from 'react'
import { StyleSheet, TextInput, View, SafeAreaView, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native'
import KeyboardAvoidingComponent from '../Components/KeyboardAvoidingComponent'
export default function Reply() {
    const [text, onChangeText] = useState("");

    return (
        <KeyboardAvoidingComponent>
            <ScrollView>
                <TextInput
                    style={newsArticleCommentInput}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={'Comment this post'}
                    placeholderTextColor="gray"
                />
            </ScrollView>
        </KeyboardAvoidingComponent>
    )
}


// styling
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const newsArticleCommentInput = {
    position: 'relative',
    height: HEIGHT * 0.05,
    width: WIDTH * 0.9,
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: '#fff',
    padding: 13,
}
const styles = StyleSheet.create({

})
