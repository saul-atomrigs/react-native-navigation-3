import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatScreen from './chat/ChatScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Input } from 'react-native-elements';
import LoginScreen from './screens/LoginScreen';
import { StreamApp } from 'expo-activity-feed';
import Swiper from 'react-native-swiper'
import Categories from './components/Categories'
import NewsArticles from './News/NewsArticles'
import NewsFeed from './News/NewsFeed'
import Schedules from './Calendar/Schedules'
import { useNavigation } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeStackScreen} options={{ tabBarBadge: 3, headerShown: false }} />
        <Stack.Screen name="Community" component={CommunityScreen} options={{ tabBarBadge: 5 }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="News" component={News} options={{ tabBarBadge: 3 }} />
        <Stack.Screen name="Connect" component={ChatScreen} options={{ tabBarBadge: 3 }} />
      </Stack.Navigator>
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
          title='home'
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
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    // body
    <>
      <View style={{ height: '30%' }}>
        <Swiper showButtons={true} loop={false}>
          <TouchableOpacity onPress={() => navigation.push('News')}>
            <View>
              <Image
                source={require('./assets/001.jpg')}
                style={wrap}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push('News')}>
            <View>
              <Image
                source={require('./assets/002.jpeg')}
                style={wrap}
              />
            </View>
          </TouchableOpacity>
        </Swiper>
      </View>
      <View style={center}>
        <View style={button}>
          <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
        <View style={button}>
          <Button title="Community" onPress={() => navigation.push('Community')} />
        </View>
        <View style={button}>
          <Button title="News" onPress={() => navigation.push('News')} />
        </View>
      </View >
    </>
  );
}
function HomeStackScreen() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ tabBarBadge: 5 }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="News" component={News} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Connect" component={ChatScreen} options={{ tabBarBadge: 3 }} />
    </Tab.Navigator>
  );
}
// Community Screen 
function CommunityScreen({ navigation, ChatScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerTitleAlign: 'left',
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    // body
    <View >
      <Button title='Calendar' onPress={() => navigation.navigate('Calendar')} />
      <Button title='Register' onPress={() => navigation.navigate('Register')} />
      <Button title='chat' onPress={() => navigation.navigate('Connect')} />
    </View>

  );
}
// Calendar Screen 
function CalendarScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      // headerLeft: () => (
      //   <Button
      //     title="Menu"
      //     options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      //     onPress={() => navigation.navigate('Home')}
      //   />
      // ),
      // header button left
      headerTitleAlign: 'left',
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    // body
    <View style={center}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, }}>Welcome to Calendar!</Text>
      <Text style={{ margin: 10 }}>You can find or suggest KPOP group's schedules, anniversaries, and more.</Text>
      {/* <View style={button}>
        <Button
          title="Start"
          onPress={() => navigation.navigate('Schedules')}
        />
      </View> */}
      <Schedules />
    </View>
  );
}
// KPOP News
function News({ navigation }) {
  const [count, setCount] = useState(0);
  // header buttons
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerTitleAlign: 'left',
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, count]);
  return (
    // body 
    <View style={center}>
      {/* <NewsArticles /> */}
      <ScrollView style={articleStyle} showsVerticalScrollIndicator={false} >
        <Header />
        <View>
          <ArticleBlock />
          <ArticleBlock />
          <ArticleBlock />
        </View>
        <Button
          title='home'
          onPress={() => navigation.navigate('Home')}
        />
      </ScrollView >
    </View>
  );
}
// Replacing the title with a custom component
function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require('./assets/icons/logo.png')}
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
// Stream Feed 
function StreamFeed() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StreamApp apiKey='tc7ru58bttgf' appId='1148469' token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY3VybHktc3Vuc2V0LTIifQ.HzD3xfFPGfM0MMXuQEx-cPaF53AYdYYjxx9RcdZiun0' />
    </SafeAreaView>
  )
}
function getHeaderTitle(route) {
  // tab navigator의 `route.state` state를 사용한다
  const routeName = route.state
    ? route.state.routes[route.state.index].name // 현재 active된 route name을 tab navigator에서 가져온다
    : route.params?.screen || 'Home';

  switch (routeName) {
    case 'Home':
      return 'GEAGURI';
    case 'Settings':
      return 'GEAGURI Setting';
  }
}


// react navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Swiper slide images dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


// tab bar icon
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused ? 'ios-planet' : 'ios-planet-outline';
    } else if (route.name === 'Community') {
      iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
    } else if (route.name === 'Calendar') {
      iconName = focused ? 'calendar' : 'calendar-outline';
    } else if (route.name === 'News') {
      iconName = focused ? 'grid' : 'grid-outline';
    } else if (route.name === 'Connect') {
      iconName = focused ? 'star' : 'star-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'black',
})


// News components 
const text1 = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
function Header() {
  return (
    <View>
      <Text style={textTitle}>Today</Text>
      <Text style={textSubtitle}>Discover Latest News Today</Text>
    </View>
  )
}
const ArticleImage = (props) => (
  <View>
    <Image
      source={require('./assets/002.jpeg')}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
      }}
    />
  </View>
);
function ArticleBlock() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View style={articleList}>
        <ArticleImage />
        <View style={articleTextView}>
          <Text style={articleArtist}>Twice</Text>
          <Text style={articleTitle}>Title</Text>
          <Text style={articleSummary}>{text1}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


// styling and parameters(options)
const center = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
}
const textUpvote = {
  fontSize: 20,
  fontWeight: "bold",
  color: "black",
  textAlign: "center",
}
const stack = {
  flex: 1,
  alignItems: 'left',
  padding: 30,
}
const wrap = {
  width: WIDTH,
  height: HEIGHT * 0.35,
}
const button = {
  boxSizing: "border-box",
  flexShrink: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 1px 10px 1px black",
  backgroundColor: "#fff",
  overflow: "visible",
  borderRadius: 13,
  marginBottom: 10,
}
// News styles 
const articleStyle = {
  width: '100%',
}
const textTitle = {
  fontWeight: 'bold',
  fontSize: 50,
}
const textSubtitle = {
  fontSize: 12,
  color: '#000',
  margin: 5,
}
const articleList = {
  marginTop: 10,
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#fff',
  borderRadius: 13,
}
const articleTextView = {
  marginLeft: 15,
  marginRight: 15,
}
const articleArtist = {
  marginLeft: 5,
  color: 'gray',
}
const articleTitle = {
  marginLeft: 5,
  fontSize: 20,
  fontWeight: 'bold',
}
const articleSummary = {
  marginLeft: 5,
  marginRight: 5,
  width: '40%',
}