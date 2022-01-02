import React, { useState, useCallback, useLayoutEffect, useEffect, createContext } from 'react';
import { ScrollView, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'react-native-elements';
import { CheckCircle, Heart, Megaphone, UserCircle } from 'phosphor-react-native';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createComment, updateComment, deleteComment, createPostLike } from '../src/graphql/mutations'
import { listComments, listPostLikes } from '../src/graphql/queries'
Amplify.configure(config)

import UserProvider from '../Auth/UserProvider';

import db from '../firebase1'

export default function DetailedFeed({ post }) {

  const { param } = useRoute().params

  const navigation = useNavigation();

  // COUNTER BUTTON STATE
  const [count, setCount] = useState(0)

  // HANDLER FOR LIKES COUNT 
  const handleLike = (post) => {
    const currentLikeStatus = !post.likesByUsers.includes(
      firebase.auth().currentUsers.email
    )
    // ADD OR REMOVE LIKES IN DATABASE

  }

  // CREATE LIKES 
  const [formStatePosts, setFormStatePosts] = useState({ id: '' })
  const [posts, setPosts] = useState([])

  async function addPostLike() {
    try {
      const post = { ...formStatePosts }
      setPosts([...posts, post])
      setFormStatePosts({ id: '' })
      // ✅ REFRESH AFTER SUBMIT:
      const result = await API.graphql(graphqlOperation(
        createPostLike,
        {
          input: post
        }
      ))
      setPosts([...posts, result.data.createPostLike])
      console.log('🚀 createPostLike: ', result)
    } catch (err) {
      console.log('error creating 에러!!', err)
    }
  }

  // PRESS LIKE BUTTON
  function onLikePressed() {
    // setCount(count + 1)
  }

  function getNumberOfLikes() {
    return (count)
  }

  // REFRESH CONTROL
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // HEADER BUTTONS 
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  // ADD COMMENT
  const initialStateComment = { content: '' }
  const [formStateComments, setFormStateComments] = useState(initialStateComment)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchComments()
  }, [])

  // CREATE COMMENT 
  async function addComment() {
    try {
      const comment = { ...formStateComments }
      setComments([...comments, comment])
      setFormStateComments(initialStateComment)
      // ✅ REFRESH AFTER SUBMIT:
      const result = await API.graphql(graphqlOperation(
        createComment,
        {
          input: {
            content: formStateComments.content,
            postCommentsId: param.id
          }
        }))
      setComments([...comments, result.data.createComment])
      console.log('🚀 create comment 성공')
    } catch (err) {
      console.log('creating 에러!!', err)
    }
  }
  let commentsCount = ''
  // FETCH COMMENTS
  async function fetchComments() {
    try {
      const commentData = await API.graphql(graphqlOperation(
        // listComments
        listComments, { filter: { postCommentsId: { eq: param.id } } }
      ));
      setComments(commentData.data.listComments.items)
      const commentsCount = commentData.data.listComments.items.length
      // console.log('number of comments: ', param)
    } catch (err) {
      console.log(err, 'fetching 에러!!!');
    }
  }
  commentsCount = comments.length

  function setInputComments(key, value) {
    setFormStateComments({ ...formStateComments, [key]: value })
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.push('Home')}
              style={{ flexDirection: 'row' }}
            >
              <Text style={styles.author} >
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{param.title}</Text>
          </View>

          <TouchableOpacity
            onPress={onLikePressed}
          >

            <View style={styles.statDetails}>
              <Heart
                size={25}
                color='red'
                weight='regular'
              // weight= post.likesByUser.includes(user.id) ? 'fill' : 'regular'
              />
              <Text style={styles.commentsCounter}> {count} {getNumberOfLikes} likes</Text>
            </View>
          </TouchableOpacity>

          <Divider />
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsCounter}> {commentsCount} Comments </Text>
            <ScrollView>
              {
                comments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse()
                  .map((comment, index) => (
                    <View key={comment.id ? comment.id : index} style={styles.comment} >
                      <Text> {comment.content} </Text>
                    </View>
                  ))
              }
              <UserProvider />
            </ScrollView>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={val => setInputComments('content', val)}
              value={formStateComments.content}
              style={styles.textInput}
              multiline
              placeholder="Write a comment..."
              placeholderTextColor={'#777'}
            />
            <TouchableOpacity onPress={
              addComment
            }>
              <CheckCircle size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View >
    </KeyboardAwareScrollView >
  )
}

// REFRESH CONTROL
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

// HEADER BUTTONS
export const Header = ({ navigation }) => {
  navigation.setOptions({
    // LEFT
    headerTitleAlign: 'left',
    // RIGHT
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={headerRightButtons}
            source={require('../assets/icons/logo.png')}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
        >
          <Image
            style={styles.headerRightButtons}
            source={require('../assets/icons/dots-nine.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  });
}


// CREATE CONTEXT 
const userObjectContext = {
  likes: "likes",
  comments: 'comments',
}
export const UserContext = createContext(userObjectContext)


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
  width: WIDTH * 0.08,
  height: HEIGHT * 0.04,
  marginRight: WIDTH * 0.03,
}

const styles = StyleSheet.create({
  headerRightButtons: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.04,
    // marginRight: WIDTH * 0.05,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: WIDTH * 0.05,
  },
  card: {
    marginTop: 10,
    backgroundColor: '#fff',
    // flex: 5,
  },
  avatar: {
    marginRight: 10,
    // marginLeft: 20
  },
  author: {
    fontSize: 18,
    fontWeight: '700'
  },
  header: {
    paddingTop: 10,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  content: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 5,
    color: '#fff',
  },
  contentText: {
    fontWeight: '500',
    marginVertical: 20
  },
  stats: {
    // marginTop: 5,
    // borderWidth: 1,
    // justifyContent: 'flex-end'
  },
  statDetails: {
    // borderWidth: 1,
    marginBottom: 10,
    fontSize: 18,
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentsCounter: {
    fontWeight: '400',
    fontSize: 11,
  },
  comment: {
    // borderWidth: 1,
    // backgroundColor: '#eee',
    marginVertical: 10,
  },
  textInputContainer: {
    marginTop: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  textInput: {
    marginHorizontal: 5,
    width: "90%",
    fontSize: 15,
    color: '#000',
    borderRadius: 10,
    backgroundColor: "#eee",
    padding: 10,
    height: 70,
  },
})
