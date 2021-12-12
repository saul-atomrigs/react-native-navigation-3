import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost, updatePost, deletePost } from '../src/graphql/mutations'
import { listPosts } from '../src/graphql/queries'
Amplify.configure(config)
// import { v4 as uuid } from 'uuid'
// const CLIENT_ID = uuid()

export default function AddPost() {

  const initialStatePost = { title: '' }
  const [formStatePosts, setFormStatePosts] = useState(initialStatePost)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  // CREATE post
  async function addPost() {
    try {
      const post = { ...formStatePosts }
      setPosts([...posts, post])
      setFormStatePosts(initialStatePost)
      // ✅ Refresh after submitting:
      const result = await API.graphql(graphqlOperation(createPost, { input: post }))
      setPosts([...posts, result.data.createPost])
      console.log('🚀 createPost: ', result)
    } catch (err) {
      console.log('error creating 에러!!', err)
    }
  }
  // FETCH posts
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <TextInput
          onChangeText={val => setInputPosts('title', val)}
          value={formStatePosts.title}
          style={styles.input}
          placeholder="Post title"
        />
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={addPost}
        >
          <View style={styles.floatingBtn}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: 'pink', textDecorationLine: 'underline' }}>Upload</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  todo: { marginBottom: 15 },
  post: { marginBottom: 15 },
  // input: { height: 50, backgroundColor: '#eee', marginBottom: 10, padding: 8 },
  input: {
    fontSize: 16,
    color: '#000000',
    height: 50,
    width: 300,
    borderColor: '#e6e6e6',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    marginBottom: 30,
  },
  todoName: { fontSize: 18 },
  floatingBtn: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 40,
    position: 'relative',
    // bottom: 100,
    // right: 30,
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
  }
});
