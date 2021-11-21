import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feed from '../Community/Feed'

export default function DetailedSchedules() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}












const Stack = createNativeStackNavigator();


const RouteInfo = props => {
    const route = useRoute();
    return (
        <View>
            <Text>Route Name: {route.name}</Text>
            <Text>Route Key: {route.key}</Text>
        </View>
    );
};






const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
