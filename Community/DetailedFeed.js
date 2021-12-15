import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { ScrollView, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, Divider } from 'react-native-elements';
import { CheckCircle, Heart, Megaphone, UserCircle } from 'phosphor-react-native';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createComment, updateComment, deleteComment } from '../src/graphql/mutations'
import { listComments } from '../src/graphql/queries'
Amplify.configure(config)

export default function DetailedFeed() {

  const { param } = useRoute().params

  const navigation = useNavigation();

  // REFRESH CONTROL
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // HEADER BUTTONS 
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

  // ADD COMMENT
  const initialStateComment = { content: '' }
  const [formStateComments, setFormStateComments] = useState(initialStateComment)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchComments()
  }, [])

  // CREATE Comment
  async function addComment() {
    try {
      const comment = { ...formStateComments }
      setComments([...comments, comment])
      setFormStateComments(initialStateComment)
      // ✅ Refresh after submitting:
      const result = await API.graphql(graphqlOperation(
        createComment,
        {
          // input: comment,
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
  // FETCH comments
  async function fetchComments() {
    try {
      const commentData = await API.graphql(graphqlOperation(
        // listComments
        listComments, { filter: { postCommentsId: { eq: param.id } } }
      ));
      setComments(commentData.data.listComments.items)
      const commentsCount = commentData.data.listComments.items.length
      console.log('number of comments: ', commentsCount)
    } catch (err) {
      console.log(err, 'fetching 에러!!!');
    }
  }
  commentsCount = comments.length

  function setInputComments(key, value) {
    setFormStateComments({ ...formStateComments, [key]: value })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
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
                // source={{ uri: param.avatarURI }}
                source={require('../assets/icons/user-placeholder.png')}
                containerStyle={styles.cardAvatar}
              />
              <Text style={{ fontSize: 18, fontWeight: '700' }} >{param.title}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            {/* <Image source={{ uri: param.imageURI }} style={styles.cardImage} /> */}
            {/* <Text style={{ fontWeight: '500', marginVertical: 20 }}>{param.postTitle}</Text> */}
            <Text style={{ fontWeight: '500', marginVertical: 20 }}>{param.id}</Text>
          </View>
          <Divider style={{ marginBottomm: 5 }} />
          <View style={styles.cardStats}>
            {/* <Text style={styles.cardStatsDetails}>{param.views} Views</Text> */}
            {/* <Text style={styles.cardStatsDetails}>{param.comments} Comments</Text> */}
            <Text style={styles.cardStatsDetails}>{param.likes} </Text>
            <Heart size={30} weight='fill' color='red' />
          </View>
          <Divider />
          <View style={styles.commentsContainer}>
            <Text> Total comments: {commentsCount}</Text>
            <ScrollView>
              {
                comments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse()
                  .map((comment, index) => (
                    <View key={comment.id ? comment.id : index} style={styles.comment} >
                      <Text> {comment.content} </Text>
                      {/* <Text> id: {comment.id} </Text> */}
                      {/* <Text> postCommentsId: {comment.postCommentsId} </Text> */}
                      {/* <Text> {comment.createdAt} </Text> */}
                      {/* <Text> {comment.post.title} </Text> */}
                      {/* <Text> {comment.post.id} </Text> */}
                      {/* <Text> {param.id} </Text> */}
                      {/* <Text> {param.id === comment.postCommentsId ? comment.content : null} </Text> */}
                      {/* <Text> {comment.createdAt.substring(0, 10)} </Text> */}
                    </View>
                  ))
              }
              {/* <Text> {test + test2} </Text> */}
            </ScrollView>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={val => setInputComments('content', val)}
              value={formStateComments.content}
              style={styles.textInput}
              multiline
              placeholder="Write a comment..."
            />
            <TouchableOpacity onPress={addComment}>
              {/* <Image source={require('../assets/icons/megaphone.png')} style={{ width: 30, height: 30 }} /> */}
              <CheckCircle size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView >
    </View >
  )
}

// REFRESH CONTROL
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


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
  width: WIDTH * 0.08,
  height: HEIGHT * 0.03,
  marginRight: WIDTH * 0.03,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    marginTop: 10,
    backgroundColor: '#fff',
    // flex: 5,
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
  cardContent: {
    marginHorizontal: 20,
    // marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 5,
    color: '#fff',
  },
  cardStats: {
    flexDirection: 'row',
    // marginLeft: 5,
    marginHorizontal: 20,
    marginTop: 5,
    justifyContent: 'flex-end'
  },
  cardStatsDetails: {
    marginBottom: 10,
    fontSize: 18,
  },
  commentsContainer: {
    marginHorizontal: 20,
  },
  comment: {
    marginTop: 10,
  },
  textInputContainer: {
    marginHorizontal: 20,
    marginTop: "auto",
    // borderWidth: 1,
    // borderColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
  },
})
