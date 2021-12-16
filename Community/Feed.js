import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Dimensions, Text, Image, View, TouchableOpacity, StyleSheet, Button, FlatList, RefreshControl, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { Heart, ChatText, Plus } from "phosphor-react-native";

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost, updatePost, deletePost } from '../src/graphql/mutations'
import { listPosts, listComments } from '../src/graphql/queries'
import { onCreatePost } from '../src/graphql/subscriptions'
Amplify.configure(config)

// export default function Feed({ item }) {
export default function Feed(props) {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()

    // TODO: reload after goBack (navigation)
    //   const willFocusSubscription = props.navigation.addListener('focus', () => {
    //     fetchData();
    // });
    // return willFocusSubscription;

  }, [])

  // FETCH posts
  async function fetchPosts() {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log(err, 'fetching 에러!!');
    }
  }

  // Refresh Control 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  return (
    <>
      <ScrollView>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        <View style={styles.container}>
          {
            posts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post, index) => (
                <TouchableOpacity
                  onPress={() => navigation.push('DetailedFeed', { param: post })}
                >
                  <View key={post.id} style={styles.post} >
                    {/* <Text> {post.title} </Text>
                      <Text> {post.id} </Text>
                       <Text> {post.id} </Text> */}
                    {/* <Text> {post.content} </Text> */}

                    <View style={styles.post}>
                      <View style={styles.content}>
                        <Icon style={{ marginRight: 5, marginTop: 5 }} name="ellipse" size={8} color="hotpink" />
                        <Text style={styles.text}>
                          {/* {item.postTitle.length > 90 ? item.postTitle.substring(0, 90) + '...' : item.postTitle} */}
                          {/* {item.postTitle.length > 90 ? item.postTitle.substring(0, 90) + '...' : item.postTitle} */}
                          <Text> {post.title} </Text>
                        </Text>
                      </View>
                      <View style={styles.postFooter}>
                        <Text style={styles.author}>
                          {/* {item.author} */}
                          {post.createdAt.substring(0, 10)}
                        </Text>
                        <View style={styles.stat}>
                          {/* <Text style={[styles.statDetails, { fontWeight: '600' }]}>{item.views} Views</Text> */}
                          <View style={{ flexDirection: 'row' }}>
                            <Heart size={18} color='red' />
                            {/* <Text style={styles.statDetails}>{item.likes}</Text> */}
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <ChatText size={18} color='gray' />
                            {/* <Text style={styles.statDetails}>{item.comments}</Text> */}
                            <Text> total comment: {
                              // API.graphql(graphqlOperation(
                              // listComments, { filter: { postCommentsId: { eq: comment.id } } }
                              // )).data.listComments.items.length
                            } </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
          }
        </View>

        {/* 
      <FlatList
        style={styles.container}
        // data={CommunityData}
        data={CommunityData}
        // data={DATA}
        renderItem={renderItem}
        keyExtractor={CommunityData.id}
        // keyExtractor={DATA.id}
        maxLength={8}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      /> */}
      </ScrollView>
      <TouchableOpacity style={styles.floatingBtn}
        onPress={() => navigation.navigate('AddPost')}
      >
        <Plus color="pink" size={20} />
        <Text style={{ fontSize: 16, fontWeight: '700', color: 'pink', textDecorationLine: 'underline' }}>Post</Text>
      </TouchableOpacity>
    </>
  )
}


// Refresh Control 
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


//  Styling 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerRightButtons: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
  },
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    marginBottom: 80,
  },
  post: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  author: {
    // marginTop: 5,
    // marginBottom: 10,
    marginLeft: 12,
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 20,
    color: 'gray',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: "#02007F"
  },
  postFooter: {
    marginVertical: 20,
    flexDirection: 'row',
    // paddingTop: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  stat: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    // marginTop: 5,
    flex: 1,
    justifyContent: 'flex-end'
  },
  statDetails: {
    marginRight: 12,
    marginLeft: 5,
    // marginBottom: 10,
    fontSize: 12,
    fontWeight: '600',
  },
  floatingBtn: {
    borderWidth: 1,
    flexDirection: 'row',
    // borderColor: 'hotpink',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    position: 'absolute',
    bottom: 100,
    right: 30,
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
})