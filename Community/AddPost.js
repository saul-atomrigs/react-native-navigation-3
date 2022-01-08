import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost, } from '../src/graphql/mutations'
import { listPosts } from '../src/graphql/queries'
Amplify.configure(config)

export default function AddPost({ navigation }) {

  const initialStatePost = { title: '' }
  const [formStatePosts, setFormStatePosts] = useState(initialStatePost)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  // CREATE POST
  async function addPost() {
    try {
      const post = { ...formStatePosts }
      setPosts([...posts, post])
      setFormStatePosts(initialStatePost)
      // ✅ REFRESH AFTER SUBMIT:
      const result = await API.graphql(graphqlOperation(
        createPost,
        {
          input: post
        }
      ))
      setPosts([...posts, result.data.createPost])
      console.log('🚀 createPost: ', result)
    } catch (err) {
      console.log('error creating 에러!!', err)
    }
  }
  // FETCH POSTS
  async function fetchPosts() {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log(err, 'error fetching 에러!!!');
    }
  }

  function setInputPosts(key, value) {
    setFormStatePosts({ ...formStatePosts, [key]: value })
  }

  function goBack() {
    navigation.goBack()
  }

  function forceUpdate() {
    fetchPosts()
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <TextInput
          value={formStatePosts.title}
          onChangeText={val => setInputPosts('title', val)}
          style={styles.input}
          placeholder="Write a post"
          placeholderTextColor={'#777'}
          multiline
        />
        <TouchableOpacity
          onPress={() => {
            addPost()
            goBack()
            forceUpdate()
          }}
        >
          <View style={styles.floatingBtn}>
            <Text style={styles.floatingBtnText}>Upload</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  todo: {
    marginBottom: 15
  },
  post: {
    marginBottom: 15
  },
  input: {
    fontSize: 16,
    color: '#000000',
    height: 250,
    width: 300,
    borderColor: '#e6e6e6',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    marginBottom: 30,
  },
  todoName: {
    fontSize: 18
  },
  floatingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 40,
    position: 'relative',
    backgroundColor: 'black',
    borderRadius: 100,
    // shadow ios:
    shadowColor: 'lightgray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // shadow android: 
    elevation: 0.8,
  },
  floatingBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    textDecorationLine: 'underline'
  }
});
