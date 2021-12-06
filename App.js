import React, { useLayoutEffect, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Divider, Avatar } from 'react-native-elements';
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
import { HandsClapping, ChatsCircle, CalendarPlus, Fingerprint, Compass, } from 'phosphor-react-native';
import ShareComponent from './Components/ShareComponent';
import { Search } from './Components/Search';
import LoginScreen from './screens/LoginScreen';
import Connect from './Components/chat/Connect'
// import Asyncawait from './Asyncawait';
import Amplify from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports'
import { createPost, updatePost, deletePost } from './src/graphql/mutationsO'
import { listPosts } from './src/graphql/queriesO'

Amplify.configure(config)
export default function App() {
  // Stack Navigator
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen name="HomeTabNavigation" component={HomeTabNavigation} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Community" component={Community} /> */}
        {/* <Stack.Screen name="News" component={News} /> */}
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="NewsPage" component={NewsPage} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Me" component={Me} />
        <Stack.Screen name="Calendar" component={Calendar} options={({ route }) => ({ title: route.params.param })} />
        <Stack.Screen name="DetailedFeed" component={DetailedFeed} options={{ title: '' }} />
        <Stack.Screen name="Youtube" component={Youtube} options={{ title: '' }} />
        <Stack.Screen name="Tiktok" component={Tiktok} options={{ title: '' }} />
        <Stack.Screen name="Instagram" component={Instagram} options={{ title: '' }} />
        <Stack.Screen name="Pinterest" component={Pinterest} options={{ title: '' }} />
        <Stack.Screen name="Twitter" component={Twitter} options={{ title: '' }} />
        <Stack.Screen name="Translate" component={Translate} options={{ title: '' }} />
        <Stack.Screen name="AddPost" component={AddPost} options={{ title: '' }} />
        <Stack.Screen name="Discover" component={Discover} options={{ title: '' }} />
        <Stack.Screen name="DetailedDiscover" component={DetailedDiscover} options={{ title: '' }} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} options={{ title: '' }} />
        <Stack.Screen name="Search" component={Search} options={{ title: '' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }} />
        <Stack.Screen name="Connect" component={Connect} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// tab = 밑에 탭 네비게이션 
function HomeTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Community" component={Social} options={{ tabBarBadge: 'new', tabBarBadgeStyle: { backgroundColor: 'pink' } }} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 2, tabBarBadgeStyle: { backgroundColor: 'pink' } }} />
      <Tab.Screen name="Me" component={Me} />
    </Tab.Navigator>
  );
}
const initialStatePost = { title: '' }
// Home Screen ✅
function HomeScreen() {
  const [formStatePosts, setFormStatePosts] = useState(initialStatePost)
  // const [formStateComments, setFormStateComments] = useState(initialStateComment)
  const [posts, setPosts] = useState([])
  // const [comments, setComments] = useState([])

  useEffect(() => {
    fetchPosts()
    // fetchComments()
    // fetchTodos()
  }, [])

  function setInputPosts(key, value) {
    setFormStatePosts({ ...formStatePosts, [key]: value })
  }
  // function setInputComments(key, value) {
  //   setFormStateComments({ ...formStateComments, [key]: value })
  // }

  // FETCH posts
  async function fetchPosts() {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      // setPosts(postData.data.listPosts.items)
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log(err, 'fetching 에러!');
    }
  }

  // CREATE post
  async function addPost() {
    try {
      const post = { ...formStatePosts }
      setPosts([...posts, post])
      setFormStatePosts(initialStatePost)
      await API.graphql(graphqlOperation(createPost, { input: post }))
    } catch (err) {
      console.log('creating 에러!', err)
    }
  }

  // // FETCH comments
  // async function fetchComments() {
  //   try {
  //     const postComment = await API.graphql(graphqlOperation(listComments));
  //     setComments(postComment.data.listComments.items)
  //   } catch (err) {
  //     console.log(err, 'error fetching todos');
  //   }
  // }

  // // CREATE comments
  // async function addComment() {
  //   try {
  //     const comment = { ...formStateComments }
  //     setComments([...comments, comment])
  //     setFormStateComments(initialStateComments)
  //     await API.graphql(graphqlOperation(createComment, { input: comment }))
  //   } catch (err) {
  //     console.log('error creating todo', err)
  //   }
  // }

  return (
    <View style={styles.container}>

      <TextInput
        onChangeText={val => setInputPosts('title', val)}
        value={formStatePosts.title}
        style={styles.input}
        placeholder="Post title"
      />
      <TextInput
        onChangeText={val => setInputPosts('comment', val)}
        value={formStatePosts.comment}
        style={styles.input}
        placeholder="content"
      />
      <Button title="Add Post" onPress={addPost} />
      {/* <Button title="Add Comment" onPress={addComment} /> */}

      {
        posts.map((post, index) => (
          <View key={post.id} style={styles.post} >
            <Text> {post.title} </Text>
            {/* <Text> {post.id} </Text> */}
            {/* <Text> {post.content} </Text> */}
          </View>
        ))
      }
      {/* {
        comments.map((comment, { nextToken }) => (
          <View key={comment.id} style={styles.post} >
            <Text> {comment.id} </Text>
            <Text> {comment.comments} </Text>
          </View>
        ))
      } */}
    </View>
  );
}
// // Community Screen ✅✅
// function Community({ navigation }) {
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
//             onPress={() => navigation.navigate('Notifications')}
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
//     // body
//     <View style={center}>
//       <ScrollView style={communityStyle} showsVerticalScrollIndicator={false} >
//         <CommunityHeader />
//         <View>
//           <CommunityBlock />
//           <CommunityBlock />
//           <CommunityBlock />
//         </View>
//       </ScrollView >
//     </View>
//   );
// }
// // KPOP News ✅✅✅✅
// function News({ navigation }) {
//   const [count, setCount] = useState(0);
//   // header buttons
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
//             onPress={() => navigation.navigate('Notifications')}
//           >
//             <Image
//               style={headerRightButtons}
//               source={require('./assets/icons/dots-nine.png')}
//             />
//           </TouchableOpacity>
//         </View>
//       ),
//     });
//   }, [navigation, count]);
//   return (
//     <View>
//       <ScrollView style={articleStyle} showsVerticalScrollIndicator={false} >
//         <NewsHeader />
//         <ScrollView horizontal={true} style={articleSelectArtist}>
//           <View style={button}>
//             <Button title="BTS" color='#000' onPress={() => navigation.navigate('Register')} />
//           </View>
//           <View style={button}>
//             <Button title="Twice" onPress={() => navigation.push('Calendar')} />
//           </View>
//           <View style={button}>
//             <Button title="aespa" onPress={() => navigation.push('News')} />
//           </View>
//           <View style={button}>
//             <Button title="BTS" onPress={() => navigation.navigate('Register')} />
//           </View>
//           <View style={button}>
//             <Button title="Twice" onPress={() => navigation.push('Calendar')} />
//           </View>
//           <View style={button}>
//             <Button title="aespa" onPress={() => navigation.push('News')} />
//           </View>
//         </ScrollView >
//         <View>
//           <ArticleBlock />
//           <ArticleBlock />
//           <ArticleBlock />
//         </View>
//         <Button
//           title='home'
//           onPress={() => navigation.push('HomeTabNavigation')}
//         />
//       </ScrollView >
//     </View>
//   );
// }
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
            onPress={() => navigation.navigate('Search')}
          >
            <Image
              style={headerRightButtons}
              source={require('./assets/icons/search.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={headerRightButtons}
              source={require('./assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
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
// function CommunityHeader() {
//   return (
//     <View>
//       <Text style={headerTitle}>Community</Text>
//       <Text style={headerSubtitle}>Discover Latest News Today</Text>
//     </View>
//   )
// }
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
// // News components 
// const text1 = 'Lorem Ipsum is simply dummy text of the printing. lorem ipsum..'
// const text2 = 'CL will perform at the 2021 102.7 KIIS FM Jingle Ball Village in Los Angeles on December 3'
// function NewsHeader() {
//   return (
//     <View>
//       <Text style={headerTitle}>Today</Text>
//       <Text style={headerSubtitle}>Discover Latest News Today</Text>
//     </View>
//   )
// }
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
// Notifications screen  
function Notifications({ navigation }) {
  return (
    <View style={center}>
      <Text>Notification!</Text>
    </View>
  )
}
function DetailedDiscover({ navigation }) {
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
            onPress={() => navigation.navigate('Notifications')}
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
    // <TouchableOpacity style={center}>
    <>
      <View style={{
        flexDirection: 'row',
        // flex: 1,
        // marginTop: 5,
        justifyContent: 'space-evenly',
        // backgroundColor: '#fff',
      }}>
        <Text
          onPress={() => navigation.push('Twitter')}
          style={{ marginTop: 15, fontSize: 15, }}
        >Twitter</Text>
        <Text
          onPress={() => navigation.push('Youtube')}
          style={{ marginTop: 15, fontSize: 15, }}
        >Youtube</Text>
        <Text
          onPress={() => navigation.push('Instagram')}
          style={{ marginTop: 15, fontSize: 15, }}
        >Instagram</Text>
        <Text
          onPress={() => navigation.push('Tiktok')}
          style={{ marginTop: 15, fontSize: 15, }}
        >Tiktok</Text>
        <Text
          onPress={() => navigation.push('Pinterest')}
          style={{ marginTop: 15, fontSize: 15, }}
        >Pinterest</Text>
      </View>
      <Twitter />
    </>
    // </TouchableOpacity>
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
            onPress={() => navigation.navigate('Notifications')}
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
    <View style={center}>
      <Avatar
        rounded
        size="large"
        icon={{ name: 'user', type: 'font-awesome', color: '#000' }}
        onPress={() => console.log("user!")}
        // activeOpacity={0.7}
        containerStyle={{ marginLeft: 20, marginTop: 5 }}
      >
        {/* <Avatar.Accessory {...accessoryProps} /> */}
      </Avatar>
      <Text>profile picture</Text>
      <Text>username</Text>
      <Text>My Fandom List</Text>
      <Text>My posts</Text>
      <Text>My Comments</Text>
      <Text>Stats</Text>
      <Button title='connect' onPress={() => navigation.push('Connect')} />
      <View style={{ flexDirection: 'row' }}>
        <HandsClapping />
        <Text>5 Claps received</Text>
      </View>
      {/* <LoginScreen /> */}
      {/* <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} /> */}
      <ShareComponent />
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
  // tabBarIcon: ({ focused, color, size }) => {
  //   let iconName;
  //   if (route.name === 'Home') {
  //     iconName = focused ? 'ios-planet' : 'ios-planet-outline';
  //   } else if (route.name === 'Community') {
  //     iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
  //   } else if (route.name === 'Calendar') {
  //     iconName = focused ? 'today' : 'today-outline';
  //   } else if (route.name === 'News') {
  //     iconName = focused ? 'grid' : 'grid-outline';
  //   } else if (route.name === 'Chat') {
  //     iconName = focused ? 'star' : 'star-outline';
  //   } else if (route.name === 'Me') {
  //     iconName = focused ? 'finger-print' : 'finger-print-outline';
  //   } else if (route.name === 'Discover') {
  //     iconName = focused ? 'Discover' : 'Discover-outline';
  //   }
  //   // return <Ionicons name={iconName} size={size} color={color} />;
  //   return <Ionicons name={iconName} size={size} color={color} />;
  // },
  // TODO:
  // tabBarIcon: ({ focused, color, size }) => {
  //   let iconSource
  //   if (route.name === 'Community') {
  //     iconSource = focused ? require('./assets/icons/chats-circle.png') : require('./assets/icons/megaphone.png')
  //   } else if (route.name === 'Discover') {
  //     iconSource = focused ? require('./assets/icons/Discover-icon.png') : require('./assets/icons/megaphone.png')

  //   }
  //   return (
  //     <Image
  //       // source={require('./assets/icons/calendar-check.png')}
  //       source={iconSource}
  //       style={{ width: 30, height: 30 }}
  //     />
  //   )
  // },
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
  marginBottom: 79,
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
  backgroundColor: "#555",
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  post: { marginBottom: 15 },
  input: { height: 50, backgroundColor: '#eee', marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 }
});
