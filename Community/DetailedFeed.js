import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { ScrollView, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../Components/CommentInput';
import { Avatar, Divider } from 'react-native-elements';
import { CommunityData } from '../data/CommunityData';
import Post from '../Components/Post';
import { Heart, UserCircle } from 'phosphor-react-native';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createComment, updateComment, deleteComment, createPost2, createCommentOnPost } from '../src/graphql/mutationsO'
import { getComment, listComments } from '../src/graphql/queriesO'
Amplify.configure(config)

export default function DetailedFeed() {

  const { param } = useRoute().params

  const navigation = useNavigation();

  // Refresh Control 
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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

  // Add Comment
  const initialStateComment = { content: '' }

  const [formStateComments, setFormStateComments] = useState(initialStateComment)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchComments()
  }, [])
  async function addComment() {
    try {
      const comment = { ...formStateComments }
      setComments([...comments, comment])
      setFormStateComments(initialStateComment)
      await API.graphql(graphqlOperation(createComment, { input: comment }))
    } catch (err) {
      console.log('error creating 에러!!', err)
    }
  }
  // FETCH comments
  async function fetchComments() {
    try {
      const commentData = await API.graphql(graphqlOperation(
        // listComments
        listComments, { filter: { postCommentsId: { eq: param.id } } }
      ));
      setComments(commentData.data.listComments.items)
    } catch (err) {
      console.log(err, 'error fetching 에러!!!');
    }
  }

  function setInputComments(key, value) {
    setFormStateComments({ ...formStateComments, [key]: value })
  }

  return (
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
            <Heart />
          </View>
          <Divider />
          <Post />
          <CommentInput />

          <ScrollView>
            {
              comments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse()
                .map((comment, index) => (
                  <View key={comment.id ? comment.id : index} style={styles.comment} >
                    <Text> {comment.content} </Text>
                    {/* <Text> {comment.id} </Text> */}
                    {/* <Text> {param.id === comment.postCommentsId ? comment.content : null} </Text> */}
                    {/* <Text> {comment.createdAt.substring(0, 10)} </Text> */}
                    {/* <Text> {comment.createdAt} </Text> */}
                  </View>
                ))
            }
          </ScrollView>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={val => setInputComments('content', val)}
              value={formStateComments.content}
              style={styles.textInput}
              placeholder="Write a comment..."
            />
            <TouchableOpacity onPress={addComment}>
              <Image source={require('../assets/icons/megaphone.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>

        </View>
      </View >
    </KeyboardAwareScrollView >
  )
}


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
  textInputContainer: {
    marginTop: "auto",
    borderWidth: 1,
    borderColor: "skyblue",
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
