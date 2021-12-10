import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
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
        <Button title="Add Post" onPress={addPost} />

        <ScrollView>
          {
            posts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse()
              .map((post, index) => (
                <View key={post.id ? post.id : index} style={styles.post} >
                  <Text> {post.title} </Text>
                  <Text> {post.createdAt} </Text>
                </View>
              ))
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  post: { marginBottom: 15 },
  input: { height: 50, backgroundColor: '#eee', marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 }
});
