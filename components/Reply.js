import React, { useState } from 'react'
import { StyleSheet, TextInput, View, SafeAreaView, Dimensions } from 'react-native'

export default function Reply() {
    const [text, onChangeText] = useState("");

    return (
        <SafeAreaView>
            <View style={newsArticleCommentInput} >
                <TextInput
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={'Comment this post'}
                    placeholderTextColor="gray"
                />
            </View>
        </SafeAreaView>
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
    // marginVertical: 20,
    // marginHorizontal: 20,
    margin: 20,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: '#fff',
    padding: 13,
}
const styles = StyleSheet.create({

})
