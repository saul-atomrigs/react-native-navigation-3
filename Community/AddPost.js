import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost, updatePost, deletePost } from '../src/graphql/mutationsO'
import { listPosts } from '../src/graphql/queriesO'
import { SafeAreaView } from 'react-native-safe-area-context';

Amplify.configure(config)

const initialStatePost = { title: '' }

export default function App() {

  const [formStatePosts, setFormStatePosts] = useState(initialStatePost)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  function setInputPosts(key, value) {
    setFormStatePosts({ ...formStatePosts, [key]: value })
  }

  // FETCH posts
  async function fetchPosts() {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log(err, 'error fetching todos');
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
      console.log('error creating todo', err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
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
            posts.map((post, index) => (
              // <View key={post.id} style={styles.post} >
              <View key={post.id ? post.id : index} style={styles.post} >
                <Text> {post.title} </Text>
                {/* <Text> {index} </Text> */}
                <Text> {post.content} </Text>
              </View>
            ))
          }
        </ScrollView>
      </KeyboardAvoidingView>
      {/* </View> */}
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
