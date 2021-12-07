import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost, updatePost, deletePost } from '../src/graphql/mutationsO'
import { listPosts, listPostsByDate } from '../src/graphql/queriesO'

Amplify.configure(config)

const initialStatePost = { title: '' }

export default function AddPost() {

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
      await API.graphql(graphqlOperation(createPost, { input: post }))
    } catch (err) {
      console.log('error creating 에러!!', err)
    }
  }
  // FETCH posts
  async function fetchPosts() {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      // const postDataByDate = postData.sort('createdAt')
      // const postData = await API.graphql(graphqlOperation(recordsByDateCreated, { status: 'unused', limit: 10 }));
      setPosts(postData.data.listPosts.items)
      // setPosts(postDataByDate.data.listPosts.items)
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
                // posts.map((post, index) => (
                // <View key={post.id} style={styles.post} >
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
