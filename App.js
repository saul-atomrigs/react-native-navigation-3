import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StreamApp } from 'expo-activity-feed';
import { GiftedChat } from 'react-native-gifted-chat';
import { Divider } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import Schedules from './Calendar/Schedules';
import Connect from './chat/Connect';


export default function App() {
  // Stack Navigator
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="HomeTabNavigation" component={HomeTabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Connect" component={Connect} />
        <Stack.Screen name="NewsPage" component={NewsPage} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// tab = 밑에 탭 네비게이션 
function HomeTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Community" component={Community} options={{ tabBarBadge: 5 }} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Connect" component={Connect} />
    </Tab.Navigator>
  );
}
// Home Screen ✅
function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerTitleAlign: 'left',
      title: 'KPOP',
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
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={{ width: 30, height: 30, margin: 10, }}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation])
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
          <Button title="Calendar" onPress={() => navigation.push('Calendar')} />
        </View>
        <View style={button}>
          <Button title="News" onPress={() => navigation.push('News')} />
        </View>
      </View >
    </>
  );
}
// Community Screen ✅✅
function Community({ navigation }) {
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
            onPress={() => navigation.navigate('Settings')}
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
      <ScrollView style={communityStyle} showsVerticalScrollIndicator={false} >
        <CommunityHeader />
        <View>
          <CommunityBlock />
          <CommunityBlock />
          <CommunityBlock />
        </View>
      </ScrollView >
    </View>
  );
}
// Calendar Screen ✅✅✅
function Calendar({ navigation }) {
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
            onPress={() => navigation.navigate('Settings')}
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
    <View style={calendarCenter}>
      <Text>You can find or suggest KPOP group's schedules, anniversaries, and more.</Text>
      <Schedules />
    </View>
  );
}
// KPOP News ✅✅✅✅
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
            onPress={() => navigation.navigate('Settings')}
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
      <ScrollView style={articleStyle} showsVerticalScrollIndicator={false} >
        <NewsHeader />
        <View>
          <ArticleBlock />
          <ArticleBlock />
          <ArticleBlock />
        </View>
        <Button
          title='home'
          onPress={() => navigation.push('HomeTabNavigation')}
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
  tabBarInactiveTintColor: 'gray',
  tabBarActiveBackgroundColor: '#eaf1f8',
  tabBarItemStyle: { borderRadius: 5, paddingBottom: 5, paddingTop: 5 },
  tabBarStyle: { position: 'absolute' }
})


// header options 
const headerOptions = ({ navigation }) => (
  {
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
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            style={{ width: 30, height: 30, margin: 10, }}
            source={require('./assets/icons/dots-nine.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  }
)


// Community components 
function CommunityHeader() {
  return (
    <View>
      <Text style={headerTitle}>Community</Text>
      <Text style={headerSubtitle}>Discover Latest News Today</Text>
    </View>
  )
}
function CommunityBlock() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.push('NewsPage')}>
      <View style={communityList}>
        <View style={communityTextView}>
          <Text style={communityArtist}>Twice</Text>
          <Text style={communityTitle}>Title</Text>
          <Text style={communitySummary}>{text2}</Text>
          <Divider style={{ margin: 7 }} />
          <View style={communityStats}>
            <Text style={communityStatsDetails}>3 Likes</Text>
            <Text style={communityStatsDetails}>2 Comments</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// News components 
const text1 = 'Lorem Ipsum is simply dummy text of the printing. lorem ipsum..'
const text2 = 'CL will perform at the 2021 102.7 KIIS FM Jingle Ball Village in Los Angeles on December 3'
function NewsHeader() {
  return (
    <View>
      <Text style={headerTitle}>Today</Text>
      <Text style={headerSubtitle}>Discover Latest News Today</Text>
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
    <TouchableOpacity onPress={() => navigation.push('NewsPage')}>
      <View style={articleList}>
        <ArticleImage />
        <View style={articleTextView}>
          <Text style={articleArtist}>Twice</Text>
          <Text style={articleTitle}>Title</Text>
          <Text style={articleSummary}>{text1}</Text>
          <View style={articleStats}>
            <Text style={articleStatsDetails}>3 Likes</Text>
            <Text style={articleStatsDetails}>2 Comments</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
function NewsPage() {
  const [text, onChangeText] = useState("");
  return (
    <>
      <View style={center}>
        <Text>NewsPage!</Text>
      </View>
      <SafeAreaView>
        <View
          style={newsArticleCommentInput}
        >
          <TextInput
            onChangeText={onChangeText}
            value={text}
            placeholder={'Comment this news...'}
          />
        </View>
      </SafeAreaView>
    </>
  )
}


// Settings component 
function Settings() {
  return (
    <View style={center}>
      <Text>Settings!</Text>
      <Text>Suggest</Text>
    </View>
  )
}


// styling and parameters(options)
const center = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
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
// Community styles 
const communityStyle = {
  width: '100%',
}
const communityList = {
  marginTop: 10,
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#fff',
}
const communityTextView = {
  marginLeft: 15,
  marginRight: 15,
}
const communityArtist = {
  marginLeft: 5,
  color: 'gray',
}
const communityTitle = {
  marginLeft: 5,
  fontSize: 20,
  fontWeight: 'bold',
}
const communitySummary = {
  marginLeft: 5,
  marginRight: 5,
  width: '80%',
  color: 'gray'
}
const communityStats = {
  flexDirection: 'row',
  marginLeft: 5,
  marginTop: 5,
}
const communityStatsDetails = {
  marginLeft: 5,
}
// Calendar Styles 
const calendarCenter = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  marginTop: 10,
  marginBottom: 50,
}
// News styles 
const articleStyle = {
  width: '100%',
}
const headerTitle = {
  fontWeight: 'bold',
  fontSize: 50,
  paddingLeft: 20,
}
const headerSubtitle = {
  fontSize: 12,
  color: '#000',
  margin: 5,
  paddingLeft: 20,
}
const articleList = {
  marginTop: 10,
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#fff',
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
  width: '60%',
  color: 'gray'
}
const articleStats = {
  flexDirection: 'row',
  marginLeft: 5,
  marginTop: 5,
}
const articleStatsDetails = {
  marginLeft: 5,
}
const newsArticleCommentInput = {
  height: 40,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20,
  borderWidth: 1,
  borderRadius: 13,
  backgroundColor: '#fff',
  padding: 10,
}