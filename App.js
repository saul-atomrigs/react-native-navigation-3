import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import Chat from './Components/chat/Chat';
import Feeds from './Community/Feed';
import DetailedFeed from './Community/DetailedFeed';
import Calendar from './Calendar/Calendar';
import Discover from './Discover/Discover';
import Twitter from './Discover/Twitter';
import Pinterest from './Discover/Pinterest';
import Instagram from './Discover/Instagram';
import Tiktok from './Discover/Tiktok';
import Youtube from './Discover/Youtube';
import Translate from './Discover/Translate';
import AddPost from './Community/AddPost';
import AddSchedule from './Calendar/AddSchedule';
import DetailedSchedule from './Calendar/DetailedSchedule';
import DetailedDiscover from './Discover/DetailedDiscover';
import Me from './Me/Me';
import { HandsClapping, ChatsCircle, CalendarPlus, Fingerprint, Compass, } from 'phosphor-react-native';
import { Search } from './Components/Search';
import LoginScreen from './screens/LoginScreen';
import Connect from './Components/chat/Connect'

// STACK NAVIGATOR
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen name="HomeTabNavigation" component={HomeTabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={Calendar} options={({ route }) => ({ title: route.params.param })} />
        <Stack.Screen name="DetailedSchedule" component={DetailedSchedule} options={({ route }) => ({ title: route.params.param })} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} options={{ title: '' }} />
        <Stack.Screen name="Community" component={Feeds} options={{ title: 'Community' }} />
        <Stack.Screen name="DetailedFeed" component={DetailedFeed} options={{ title: '' }} />
        <Stack.Screen name="AddPost" component={AddPost} options={{ title: '' }} />
        <Stack.Screen name="Discover" component={Discover} options={{ title: '' }} />
        <Stack.Screen name="DetailedDiscover" component={DetailedDiscover} options={{ title: '' }} />
        <Stack.Screen name="Youtube" component={Youtube} options={{ title: '' }} />
        <Stack.Screen name="Tiktok" component={Tiktok} options={{ title: '' }} />
        <Stack.Screen name="Instagram" component={Instagram} options={{ title: '' }} />
        <Stack.Screen name="Pinterest" component={Pinterest} options={{ title: '' }} />
        <Stack.Screen name="Twitter" component={Twitter} options={{ title: '' }} />
        <Stack.Screen name="Translate" component={Translate} options={{ title: '' }} />
        <Stack.Screen name="Me" component={Me} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Search" component={Search} options={{ title: '' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }} />
        <Stack.Screen name="Connect" component={Connect} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// TAB = 밑에 탭 네비게이션 
function HomeTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Community" component={Feeds} options={{ tabBarBadge: 'new', tabBarBadgeStyle: { backgroundColor: 'pink' }, }} />
      <Tab.Screen name="Me" component={Me} />
      {/* <Tab.Screen name="Korean" component={Korean} options={{ tabBarBadge: 2, tabBarBadgeStyle: { backgroundColor: 'pink' } }} /> */}
    </Tab.Navigator>
  );
}
// NOTIFICATION COMPOENT  
function Notifications({ navigation }) {
  return (
    <View style={center}>
      <Text>Notification!</Text>
    </View>
  )
}

// REACT NAVIGATION 
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// SCREEN DIMENSIONS 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


// TAB BAR ICONS 
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconSource
    if (route.name === 'Community') {
      iconSource = focused ? <ChatsCircle weight='fill' size={30} /> : <ChatsCircle weight='duotone' size={25} />
    } else if (route.name === 'Calendar') {
      iconSource = focused ? <CalendarPlus weight='fill' size={30} /> : <CalendarPlus weight='duotone' size={25} />
    } else if (route.name === 'Me') {
      iconSource = focused ? <Fingerprint weight='fill' size={30} /> : <Fingerprint weight='duotone' size={25} />
    } else if (route.name === 'Discover') {
      iconSource = focused ? <Compass weight='fill' size={30} /> : <Compass size={25} />
    }
    return (
      <>
        {iconSource}
      </>
    )
  },
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'gray',
  tabBarActiveBackgroundColor: '#eaf1f8',
  tabBarItemStyle: {
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5
  },
  tabBarStyle: { position: 'absolute' }
})


// AUTHENTICATION  
function AppleSignIn() {
  return (
    <AppleButton
      // buttonStyle={AppleButton.Style.WHITE}
      // buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
    />
  );
}
function FacebookSignIn() {
  return (
    <Button
      title="Facebook Sign-In"
      onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
    />
  );
}

// STYLES 
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    // background: '#fff'
  },
};
const headerRightButtons = {
  width: WIDTH * 0.08,
  height: HEIGHT * 0.03,
  marginRight: WIDTH * 0.05,
}
const center = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}