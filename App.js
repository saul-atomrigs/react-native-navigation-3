import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-planet'
                : 'ios-planet-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Community" component={CommunityScreen} options={{ tabBarBadge: 5 }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={center}>
      <Text>Home!</Text>
      <Button title="Go to calendar" onPress={() => navigation.navigate('Calendar')}
      />
    </View>
  );
}

function CommunityScreen() {
  return (
    <View style={center}>
      <Text>Community!</Text>
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={center}>
      <Text>Calendar!</Text>
    </View>
  );
}


// react navigation
const Tab = createBottomTabNavigator();


// styling 
const grayBox = {
  boxSizing: "border-box",
  flexShrink: 0,
  width: 80,
  height: 80,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: "0px 13px 0px 13px",
  backgroundColor: "#e6e6e6",
  overflow: "visible",
  borderRadius: 5,
}

const center = {
  flex: 1, justifyContent: 'center', alignItems: 'center'
}