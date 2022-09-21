import React, { useState, useCallback, useLayoutEffect, useEffect, createContext } from 'react';
import { ScrollView, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl, TextInput, Alert, Keyboard } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'react-native-elements';
import { Menu, MenuOption, MenuOptions, MenuTrigger, } from 'react-native-popup-menu';
import { CheckCircle, Heart, MoreVertical, UserCircle, HandsClapping, } from 'phosphor-react-native';
import Apple from '../Auth/Apple'
import Google from '../Auth/Google'
import Login from '../Auth/Login'

import firebase from 'firebase';

// AWS IMPORT
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createComment, updateComment, deleteComment, updatePost } from '../src/graphql/mutations'
import { listComments, getUser, getComment } from '../src/graphql/queries'
Amplify.configure(config)

import UserProvider from '../Auth/UserProvider';

export default function DetailedFeed({ post }) {
  const { param } = useRoute().params

  const navigation = useNavigation();

  const LikeButton = () => {
    // INITIAL STATES
    const currentUser = firebase.auth().currentUser.uid;
    const checkUser = param.likesByUserArray.includes(currentUser)
    const likesByUsers = param.likesByUserArray.length
    const [liked, setLiked] = useState(checkUser) // true or false
    const [count, setCount] = useState(likesByUsers) // number of users liking the post

    const addLike = async () => {
      try {
        const input = {
          id: param.id,
          likesByUserArray: [
            ...param.likesByUserArray,
            currentUser
          ],
          likesCount: count + 1
        }
        const result = await API.graphql(graphqlOperation(updatePost, { input }))
        setLiked(true)
        setCount(result.data.updatePost.likesCount)
      } catch (err) {
        console.log('error: ', err)
      }
    }

    const removeLike = async () => {
      try {
        const input = {
          id: param.id,
          likesByUserArray: param.likesByUserArray.filter(user => user !== currentUser),
          likesCount: count - 1
        }
        const result = await API.graphql(graphqlOperation(updatePost, { input }))
        setLiked(false)
        setCount(result.data.updatePost.likesCount)
      } catch (err) {
        console.log('error: ', err)
      }
    }

    function handleLike() {
      liked ? removeLike() : addLike()
    }

    return (
      <View>
        <TouchableOpacity
          style={styles.buttons}
          onPress={handleLike}
        >
          {
            liked ?
              <Heart size={25} color="hotpink" weight='duotone' />
              : <Heart size={25} color="gray" />
          }
          <Text>reactions ({count})</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // CLAP BUTTON 
  const ClapButton = () => {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);

    function onLikePressed() {
      setLiked(!liked);
      setCount(count + 1);
    }

    function onDislikePressed() {
      setLiked(!liked);
      setCount(count - 1);
    }

    return (
      // <View onPress={() => setLiked((isLiked) => !isLiked)}>
      <View>
        <TouchableOpacity
          style={styles.buttons}
          onPress={liked == false ? onDislikePressed : onLikePressed}>
          {
            liked ?
              <HandsClapping size={28} color="blue" weight='fill' />
              : <HandsClapping size={28} color="gray" />
          }
          <Text>{count}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // REFRESH CONTROL
  // const [refreshing, setRefreshing] = useState(false);
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  // HEADER BUTTONS 
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  // ADD COMMENT
  const initialStateComment = { content: '' }
  const [formStateComments, setFormStateComments] = useState(initialStateComment)
  const [comments, setComments] = useState([])

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
            postCommentsId: param.id,
            userCommentsId: firebase.auth().currentUser.uid,
          }
        }))
      setComments([...comments, result.data.createComment])
      console.log('🚀 create comment 성공')
    } catch (err) {
      console.log('creating 에러!!', err)
    }
  }
  // let commentsCount = ''

  async function fetchComments() {
    try {
      const commentData = await API.graphql(graphqlOperation(
        // listComments
        listComments, { filter: { postCommentsId: { eq: param.id } } }
      ));
      setComments(commentData.data.listComments.items)
    } catch (err) {
      console.log(err, 'fetching 에러!!!');
    }
  }
  // commentsCount = comments.length

  function setInputComments(key, value) {
    setFormStateComments({ ...formStateComments, [key]: value })
  }

  // GET OWNER OF THE POST
  const [owner, setOwner] = useState([])
  async function fetchOwner() {
    try {
      const ownerData = await API.graphql(graphqlOperation(getUser,
        { id: param.userPostsId }
      ));
      setOwner(ownerData.data.getUser.nickname)
      console.log('owner: ', owner)
    } catch (err) {
      console.log(err, 'owner fetching 에러!!!');
    }
  }
  useEffect(() => {
    fetchOwner()
  }, [])


  const report = () => {
    alert(`Report this post.
    Is this post inappropriate? We will review this report within 24 hrs and if deemed inappropriate the post will be removed within that timeframe. We will also take actions against it's author
    `)
  }

  const block = () => {
    alert(`Confirm you want to block ${owner}`)
  }

  function keyboardDismiss() {
    Keyboard.dismiss()
  }

  // REFRESH THE COMMENT INPUT AFTER COMING BACK FROM SIGN IN
  const isFocused = useIsFocused()
  useEffect(() => {
    fetchComments()
  }, [isFocused])


  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps='handled'
    // refreshControl={
    //   <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //   />
    // }
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.push('Home')}
              style={{ flexDirection: 'row' }}
            >
              <UserCircle size={30} color="#000" />
              <Text style={styles.author} >
                {owner}
              </Text>
            </TouchableOpacity>
            <View style={styles.commentHeader}>
              <View>
                <Menu>
                  <MenuTrigger text='+ more' />
                  <MenuOptions>
                    <MenuOption onSelect={report} >
                      <Text style={{ color: 'red' }}>Report innapropriate</Text>
                    </MenuOption>
                    <MenuOption onSelect={block} >
                      <Text style={{ color: 'red' }}>Block this user</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{param.title}</Text>
          </View>
          {
            firebase.auth().currentUser == null ?
              null
              :
              <View style={styles.btnContainer}>
                <LikeButton />
                {/* <ClapButton /> */}
              </View>
          }
          <Divider />
          <View style={styles.commentsContainer}>
            <ScrollView>
              {
                comments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse()
                  .map((comment, index) => (
                    <View key={comment.id ? comment.id : index} style={styles.comment} >
                      <View style={styles.commentHeader}>
                        <UserCircle size={25} color='#000' />
                        <View style={styles.author}>
                          <Text style={styles.commentAuthor}>{comment?.user?.nickname} </Text>
                        </View>
                      </View>
                      <Text> {comment.content} </Text>
                    </View>
                  ))
              }
              {
                // IF NOT SIGNED IN 
                firebase.auth().currentUser == null ?
                  <>
                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>Sign in to comment</Text>
                    <View style={styles.signIn}>
                      <Apple />
                      <Google />
                    </View>
                  </>
                  :
                  <View style={styles.textInputContainer}>
                    <TextInput
                      onChangeText={val => setInputComments('content', val)}
                      value={formStateComments.content}
                      style={styles.textInput}
                      multiline
                      placeholder="What are your thoughts?"
                      placeholderTextColor={'#777'}
                    />
                    <TouchableOpacity
                      disabled={formStateComments.content.length === 0}
                      onPress={() => {
                        addComment()
                        keyboardDismiss()
                      }
                      }
                    >
                      <CheckCircle size={35} />
                    </TouchableOpacity>
                  </View>
              }
              {/* <Text style={styles.commentsCounter}> {commentsCount} Comments </Text> */}
            </ScrollView>
          </View>
        </View>
      </View >
    </KeyboardAwareScrollView >
  )
}

// REFRESH CONTROL
const wait = (timeout) => {
  fetchComments()
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
  likes: "reactions",
  comments: 'comments',
}
export const UserContext = createContext(userObjectContext)

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
  width: 30,
  height: 30,
  marginRight: WIDTH * 0.03,
}

const styles = StyleSheet.create({
  headerRightButtons: {
    width: 30,
    height: 30,
    // marginRight: WIDTH * 0.05,
  },
  signIn: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  header: {
    paddingTop: 10,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 5,
    color: '#fff',
    flexDirection: 'row',
  },
  contentText: {
    fontWeight: '400',
    marginVertical: 20
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentsCounter: {
    fontWeight: '400',
    fontSize: 11,
  },
  commentHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: '600',
  },
  comment: {
    // borderWidth: 1,
    padding: 7,
    borderRadius: 13,
    backgroundColor: '#eee',
    marginVertical: 5,
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
    borderWidth: 1,
    borderColor: '#666',
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
