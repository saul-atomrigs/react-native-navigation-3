import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default ColorScreen = () => {
    // const color = navigation.getParam("color", "white"); ❌
    const { color } = useRoute().params;
    const { text } = useRoute().params

    return (
        <View style={{ flex: 1, backgroundColor: color }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text>{text}</Text>
                <Text>{ColorScreenRoute.params.text}</Text>
                <Text>{ColorScreenRoute.name}</Text>
                <Text>{dummy[0].data[0]}</Text>
            </View>
        </View >
    )
};

const ColorScreenRoute = {
    name: "ColorScreen",
    params: {
        color: "white",
        text: "white"
    }
}


const dummy = [
    {
        title: "Main dishes",
        data: ["Pizza", "Burger", "Risotto"],
    },
    {
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
        title: "Drinks",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"]
    }
];