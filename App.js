import React, { useLayoutEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import Ionicons from '@expo/vector-icons/Ionicons';
import Chat from './chat/Chat';
import Feeds from './Community/Feed';
import DetailedFeed from './Community/DetailedFeed';
import Calendar from './Calendar/Calendar';
import Twitter from './Radar/Twitter';
import Youtube from './Radar/Youtube';
import Discover from './Radar/Discover';
import Translate from './Radar/Translate';
import Radar from './Radar/Radar';
import AddPost from './Community/AddPost';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
export default function App() {
  // Stack Navigator
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen name="HomeTabNavigation" component={HomeTabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="NewsPage" component={NewsPage} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Me" component={Me} />
        <Stack.Screen name="Calendar" component={Calendar} options={({ route }) => ({ title: route.params.param })} />
        <Stack.Screen name="DetailedFeed" component={DetailedFeed} options={{ title: '' }} />
        <Stack.Screen name="Radar" component={Radar} options={{ title: '' }} />
        <Stack.Screen name="Youtube" component={Youtube} options={{ title: '' }} />
        <Stack.Screen name="Twitter" component={Twitter} options={{ title: '' }} />
        <Stack.Screen name="Translate" component={Translate} options={{ title: '' }} />
        <Stack.Screen name="AddPost" component={AddPost} options={{ title: '' }} />
        <Stack.Screen name="Discover" component={Discover} options={{ title: '' }} />
        <Stack.Screen name="DetailedRadar" component={DetailedRadar} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// tab = 밑에 탭 네비게이션 
function HomeTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Community" component={Social} options={{ tabBarBadge: 'new', tabBarBadgeStyle: { backgroundColor: 'pink' } }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 2, tabBarBadgeStyle: { backgroundColor: 'pink' } }} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Radar" component={Radar} />
      <Tab.Screen name="Me" component={Me} />
    </Tab.Navigator>
  );
}
// Home Screen ✅
function HomeScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
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
              style={headerRightButtons}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={headerRightButtons}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation])
  return (
    // body
    <ScrollView>
      <View style={home}>
        <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.push('RadarOriginal')}>
          <View>
            <Image
              source={require('./assets/001.jpg')}
              style={wrap}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10, }} onPress={() => navigation.push('News')}>
          <View>
            <Image
              source={require('./assets/002.jpeg')}
              style={wrap}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10, }} onPress={() => navigation.push('News')}>
          <View>
            <Image
              source={require('./assets/002.jpeg')}
              style={wrap}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.push('News')}>
          <View>
            <Image
              source={require('./assets/001.jpg')}
              style={wrap}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.push('News')}>
          <View>
            <Image
              source={require('./assets/001.jpg')}
              style={wrap}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.push('News')}>
          <View>
            <Image
              source={require('./assets/001.jpg')}
              style={wrap}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.push('News')}>
          <View>
            <Image
              source={require('./assets/001.jpg')}
              style={wrap}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
// Community Screen ✅✅
function Community({ navigation }) {
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
              style={headerRightButtons}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={headerRightButtons}
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
// // Calendar Screen ✅✅✅
// function Calendar({ navigation }) {
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       // header button left
//       headerTitleAlign: 'left',
//       // header button right
//       headerRight: () => (
//         <View style={{ flexDirection: 'row' }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Home')}
//           >
//             <Image
//               style={headerRightButtons}
//               source={require('./assets/icons/logo.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Settings')}
//           >
//             <Image
//               style={headerRightButtons}
//               source={require('./assets/icons/dots-nine.png')}
//             />
//           </TouchableOpacity>
//         </View>
//       ),
//     });
//   }, [navigation]);
//   return (
//     <View style={calendarCenter}>
//       <Text>You can find or suggest KPOP group's schedules, anniversaries, and more.</Text>
//       <Schedules />
//     </View>
//   );
// }
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
              style={headerRightButtons}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={headerRightButtons}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, count]);
  return (
    <View>
      <ScrollView style={articleStyle} showsVerticalScrollIndicator={false} >
        <NewsHeader />
        <ScrollView horizontal={true} style={articleSelectArtist}>
          <View style={button}>
            <Button title="BTS" color='#000' onPress={() => navigation.navigate('Register')} />
          </View>
          <View style={button}>
            <Button title="Twice" onPress={() => navigation.push('Calendar')} />
          </View>
          <View style={button}>
            <Button title="aespa" onPress={() => navigation.push('News')} />
          </View>
          <View style={button}>
            <Button title="BTS" onPress={() => navigation.navigate('Register')} />
          </View>
          <View style={button}>
            <Button title="Twice" onPress={() => navigation.push('Calendar')} />
          </View>
          <View style={button}>
            <Button title="aespa" onPress={() => navigation.push('News')} />
          </View>
        </ScrollView >
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
//  Social Commmunity Screen 
function Social({ navigation }) {
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
              style={headerRightButtons}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={headerRightButtons}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation])
  return (
    <>
      <Feeds />
    </>
  )
}
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
      <View style={{ height: HEIGHT * 0.8, backgroundColor: 'blue' }}>
        <Text>NewsPage!</Text>
      </View>
      <View
        style={newsArticleCommentInput}
      >
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder={'Comment this news...'}
        />
      </View>
    </>

  )
}
// Settings screen  
function Settings({ navigation }) {
  return (
    <View style={center}>
      <Text>Settings!</Text>
      <Text onPress={() => navigation.navigate('Chat')}>Suggest</Text>
    </View>
  )
}
function DetailedRadar({ navigation }) {
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
              style={headerRightButtons}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={headerRightButtons}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation])
  return (
    // <SafeAreaView>
    <TouchableOpacity style={center}>
      <Text
        onPress={() => navigation.push('Twitter')}
        style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}
      >Twitter</Text>
      <Text
        onPress={() => navigation.push('Youtube')}
        style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}
      >Youtube</Text>
      <Text
        onPress={() => navigation.push('Translate')}
        style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}
      >Translate</Text>
      <Text
        onPress={() => navigation.push('Discover')}
        style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}
      >Discover</Text>
    </TouchableOpacity>
    // </SafeAreaView>
  )
}
function Me({ navigation }) {
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
              style={headerRightButtons}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={headerRightButtons}
              source={require('./assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation])
  return (
    <View>
    </View>
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
      iconName = focused ? 'today' : 'today-outline';
    } else if (route.name === 'News') {
      iconName = focused ? 'grid' : 'grid-outline';
    } else if (route.name === 'Chat') {
      iconName = focused ? 'star' : 'star-outline';
    } else if (route.name === 'Me') {
      iconName = focused ? 'finger-print' : 'finger-print-outline';
    } else if (route.name === 'Radar') {
      iconName = focused ? 'compass' : 'compass-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'gray',
  tabBarActiveBackgroundColor: '#eaf1f8',
  tabBarItemStyle: { borderRadius: 5, paddingBottom: 5, paddingTop: 5 },
  tabBarStyle: { position: 'absolute' }
})


// Authentication component 
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


// styling and parameters(options)
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
const home = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-evenly',
  marginTop: 10,
  backgroundColor: '#fff'
}
const wrap = {
  width: WIDTH * 0.40,
  height: HEIGHT * 0.2,
  borderRadius: 13,
}
const button = {
  boxSizing: "border-box",
  flexShrink: 0,
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  boxShadow: "0px 1px 10px 1px black",
  backgroundColor: "#fff",
  overflow: "visible",
  borderRadius: 13,
  marginBottom: 10,
  marginRight: 10,
  color: '#000'
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
  backgroundColor: '#fff',
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
const articleSelectArtist = {
  marginLeft: 20,
  marginRight: 20,
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
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20,
  height: HEIGHT * 0.1,
  padding: 10,
  borderWidth: 1,
  borderRadius: 13,
  backgroundColor: '#000',

}