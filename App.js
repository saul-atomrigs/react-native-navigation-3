import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Image, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Input } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatScreen from './chat/ChatScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    // Navigation tabs (bottom)
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-planet' : 'ios-planet-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Community" component={CommunityScreen} options={{ tabBarBadge: 5 }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="HeaderButton" component={StackScreen} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Connect" component={ChatScreen} options={{ tabBarBadge: 3 }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerLeft: () => (
        <Button
          title="Menu"
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          onPress={() => navigation.navigate('Home')}
        />
      ),
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    // body
    <View style={center}>
      <Text>Home!</Text>
      <Button title="Go to calendar" onPress={() => navigation.navigate('Calendar')} />
      <Button title="Go to community" onPress={() => navigation.navigate('Community')} />
    </View>
  );
}
// Community Screen 
function CommunityScreen({ navigation, RegisterScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerLeft: () => (
        <Button
          title="Menu"
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          onPress={() => navigation.navigate('Home')}
        />
      ),
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    // body
    <View >
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{ type: 'material', name: 'email' }}
        value={email}
        onChengeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        leftIcon={{ type: 'material', name: 'lock' }}
        value={password}
        onChengeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title='Sign In' onPress={() => navigation.navigate('Calendar')} />
      <Button title='Register' onPress={() => navigation.navigate('Register')} />
      <Button title='chat' onPress={() => navigation.navigate('ChatScreen')} />
    </View>
  );
}
// Schedules, birthdays, etc. Screen
function CalendarScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerLeft: () => (
        <Button
          title="Menu"
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          onPress={() => navigation.navigate('Home')}
        />
      ),
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    // body
    <View style={center}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 10, }}>Welcome to Calendar!</Text>
      <Text>You can search KPOP group's schedules, anniversaries, and more.</Text>
      <Button
        title="Start"
        style={{ fontWeight: 'bold', margin: 10, }}
        onPress={() => navigation.navigate('Community')}
      />
    </View>
  );
}
// Test Screen with header 
function StackScreen({ navigation }) {
  const [count, setCount] = useState(0);
  // header buttons
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerLeft: () => (
        <Button
          title="Menu"
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          onPress={() => navigation.navigate('Home')}
        />
      ),
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, count]);
  return (
    // body's header 
    <View style={center}>
      <Text>Test Screen!</Text>
    </View>
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="Register"
    //     component={RegisterScreen}
    //   // options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
    //   />
    // </Stack.Navigator>
  );
}
// Replacing the title with a custom component
function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require('./assets/logo.png')}
    />
  );
}
// Vote counter
function LikeCounter() {
  const [count, setCount] = useState(0);
  return (
    <View style={stack}>
      <Text style={textUpvote}>{count}</Text>
      <Button
        title="Upvote"
        onPress={() => setCount(count + 1)}
      />
      <Button
        title="Downvote"
        onPress={() => setCount(count - 1)}
      />
    </View>
  );
}
// Gifted Chat 
export function Chat() {
  const [messages, setMessages] = useState([]);
  // 
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  // 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  // Chat body
  return (
    <GiftedChat
      style={{ width: '100%' }}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}


// react navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// styling and parameters(options)
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
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
}
const screenOptions = {
  headerTitle: props => <Text {...props} />,
  headerStyle: {
    backgroundColor: '#e6e6e6',
  },
  headerRight: () => (
    <Button
      onPress={() => alert('This is a button!')}
      title="Info"
      color="#000000"
    />
  ),
}
const textUpvote = {
  fontSize: 20,
  fontWeight: "bold",
  color: "black",
  textAlign: "center",
}
const button = {
  backgroundColor: "#000000",
  borderRadius: 5,
  padding: 10,
  margin: 10,
  fontSize: 50,
}
const stack = {
  flex: 1,
  alignItems: 'left',
  padding: 30,
}