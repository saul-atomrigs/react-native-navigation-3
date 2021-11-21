import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// export default function DetailedSchedules({ navigation: { setParams } }) {
//     const navigation = useNavigation();
//     const route = useRoute();
//     // const car = navigation.setParams("name", "novalue")

//     return (
//         <>
//             <Button
//                 onPress={() =>
//                     setParams({
//                         data:
//                             route.params.data[0] === 'Brent'
//                                 ? ['Wojciech', 'Szymon', 'Jakub']
//                                 : ['Brent', 'Satya', 'Michaś'],
//                         title:
//                             route.params.title === "Brent's Profile"
//                                 ? "Lucy's Profile"
//                                 : "Brent's Profile",
//                     })
//                 }
//                 title="Swap title and friends"
//             />
//         </>
//     )
// }
const RouteInfo = props => {
    const route = useRoute();
    return (
        <View>
            <Text>Route Name: {route.name}</Text>
            <Text>Route Key: {route.key}</Text>
        </View>
    );
};

const HomeScreen = props => {
    return (
        <View style={styles.screen}>
            <RouteInfo />
            <Button
                onPress={() => props.navigation.navigate('Product')}
                title="Go To Product Screen"
            />
        </View>
    );
};
const ProductScreen = props => {
    return (
        <View style={styles.screen}>
            <RouteInfo />
        </View>
    );
};
function DetailedSchedules() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Product" component={ProductScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default DetailedSchedules;
/// Just some styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});