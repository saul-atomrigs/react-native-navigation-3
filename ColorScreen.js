import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default ColorScreen = ({ navigation, route }) => {
    // const color = navigation.getParam("color", "white"); ❌
    const { color } = useRoute().params;
    const { text } = useRoute().params

    return (
        <View style={{ flex: 1, backgroundColor: color }}>
            <Text>{text}</Text>
        </View >
    )
};

ColorScreen.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam("color", "White")
});