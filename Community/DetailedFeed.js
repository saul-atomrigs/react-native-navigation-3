import React, { useLayoutEffect, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../Components/CommentInput';
import { Avatar, Divider } from 'react-native-elements';
import { CommunityData } from '../data/CommunityData';
import Post from '../Components/Post';
import { Heart, UserCircle } from 'phosphor-react-native';
import { db } from '../firebase'


export default function DetailedFeed() {

  const { param } = useRoute().params

  const navigation = useNavigation();

  // Refresh Control 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // get data from firebase 
  const [posts, setPosts] = React.useState([])
  useEffect(() => {
    db.collectionGroup('posts')
      .onSnapshot(snapshot => {
        // setPosts(snapshot.docs.map(doc => doc.data()))
        setPosts(snapshot.docs.map(doc => doc.data()))
      })
  }, [])


  // header buttons 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'left',
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={headerRightButtons}
              source={require('../assets/icons/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              style={headerRightButtons}
              source={require('../assets/icons/dots-nine.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation])

  return (
    // <ApplicationProvider {...eva} theme={eva.light}>
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity
              onPress={() => navigation.push('Home')}
              style={{ flexDirection: 'row' }}
            >
              <Avatar
                rounded
                // TODO: unknown avatar if not logged in 
                // source={{ uri: isLogIn ? param.avatarURI : placeholderImage }}
                source={require('../assets/icons/user-placeholder.png')}
                // source={{ uri: param.avatarURI }}
                containerStyle={styles.cardAvatar}
              />
              <Text style={styles.cardTitle}>
                {param.author}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={{ fontSize: 18, fontWeight: '700' }} >{param.postTitle}</Text>
            {/* <Image source={{ uri: param.imageURI }} style={styles.cardImage} /> */}
            <Text style={{ fontWeight: '500', marginVertical: 20 }}>{param.postTitle}</Text>
          </View>
          <Divider style={{ marginBottomm: 5 }} />
          <View style={styles.cardStats}>
            {/* <Text style={styles.cardStatsDetails}>{param.views} Views</Text> */}
            {/* <Text style={styles.cardStatsDetails}>{param.comments} Comments</Text> */}
            <Text style={styles.cardStatsDetails}>{param.likes} </Text>
            <Heart />
          </View>
          <Divider />
          <Post />
          <View>
            {posts.map((post, index) => (
              <View key={index} >
                <Text>{post.postTitle}</Text>
                <Text>{post.caption}</Text>
                {/* <Text>{post.imageUrl}</Text> */}
                <Divider />
              </View>
            ))}
          </View>
          <CommentInput />
        </View>
      </View>
    </KeyboardAwareScrollView>
    // </ApplicationProvider >
  )
}

// <View>
// {POSTS.map((post, index) => {
//     <Post post={post} key={index} />
// })}
// </View>

// Refresh Control 
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

// Comment section 
// const CommentSection = ({ param }) => {
//     return (
//         <Text>
//             {param.commentsSection.length > 1 ? param.commentsSection[0].comment : 'comment'}
//         </Text>
//     )
// }


// const placeholderImage = 'https://www.placecage.com/c/200/200'
// dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
  width: WIDTH * 0.08,
  height: HEIGHT * 0.03,
  marginRight: WIDTH * 0.03,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 5,
  },
  card: {
    marginTop: 10,
    backgroundColor: '#fff',
    flex: 5,
  },
  cardImage: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.3,
    // alignSelf: 'center',
    borderRadius: 13,
    resizeMode: 'cover'
  },
  cardAvatar: {
    marginRight: 10,
    marginLeft: 20
  },
  cardHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  cardTitle: {
    marginTop: 5,
  },
  cardContent: {
    marginLeft: 20,
    // marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 5,
    color: '#fff',
  },
  cardStats: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 20,
    marginTop: 5,
    justifyContent: 'flex-end'
  },
  cardStatsDetails: {
    marginBottom: 10,
    fontSize: 18,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  textInput: {
    position: 'absolute',
    height: HEIGHT * 0.05,
    width: WIDTH * 0.9,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: '#fff',
    padding: 13,
  },
  newsArticleCommentInput: {
    height: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: '#fff',
    padding: 10,
  }
})
