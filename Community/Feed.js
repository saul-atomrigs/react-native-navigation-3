import { useNavigation } from '@react-navigation/core';
import { ChatText, Heart, Plus } from "phosphor-react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from './DetailedFeed';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Modal from '../Calendar/Modal';
import config from '../src/aws-exports';
import { listPosts } from '../src/graphql/queries';
Amplify.configure(config)

export default function Feed(props) {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([])

  const context = useContext(UserContext)

  // RERENDER AFTER SUBMIT (GOBACK)
  useEffect(() => {
    fetchPosts();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      fetchPosts();
    });
    return willFocusSubscription;
  }, []);

  async function fetchPosts() {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log(err, 'fetching 에러!!');
    }
  }

  // REFRESH CONTROL 
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    fetchPosts();
  }, []);

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  // MEMORY LEAK WARNING PREVENTION 
  useEffect(() => {
    return () => {
      setPosts([])
    }
  }, [])

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
                <View
                  // key={post.id ? post.id : index}
                  key={index}
                  style={styles.post}
                >
                  <TouchableOpacity
                    onPress={() => navigation.push(
                      'DetailedFeed',
                      { param: post }
                    )}
                  >
                    <View style={styles.post}>
                      <View style={styles.content}>
                        <Icon style={styles.dot} name="ellipse" size={8} color="hotpink" />
                        <Text style={styles.text}>
                          {/* {item.postTitle.length > 90 ? item.postTitle.substring(0, 90) + '...' : item.postTitle} */}
                          {post.title.length > 80 ? post.title.substring(0, 80) + '...' : post.title}
                          {/* <Text> {post.title} </Text> */}
                        </Text>
                      </View>
                      <Divider />
                      <View style={styles.postFooter}>
                        <Text style={styles.createdAt}>
                          {post.createdAt.substring(0, 10)}
                        </Text>
                        <View style={styles.stat}>
                          {/* <Text style={[styles.statDetails, { fontWeight: '600' }]}>{item.views} Views</Text> */}
                          <View style={styles.statDetails}>
                            <Heart size={18} color='black' />
                            <Text> {context.likes} </Text>
                            {/* <Text style={styles.statDetails}>{item.likes}</Text> */}
                          </View>
                          <View style={styles.statDetails}>
                            <ChatText size={18} color='black' />
                            {/* <Text style={styles.statDetails}>{item.comments}</Text> */}
                            {/* <Text> {post.comments.length} </Text> */}
                            <Text> {context.comments} </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
          }
        </View>
      </ScrollView>

      <View style={styles.floatingBtnContainer}>
        <TouchableOpacity style={styles.floatingBtn}
          onPress={() => navigation.navigate('AddPost')}
        >
          <Plus color="white" weight='bold' />
        </TouchableOpacity>
      </View>
    </>
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
        <Modal />
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


//  STYLES 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerRightButtons: {
    width: 30,
    height: 30,
    marginRight: WIDTH * 0.05,
  },
  container: {
    backgroundColor: '#eee',
    marginBottom: 80,
  },
  post: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  dot: {
    marginRight: 5,
    marginTop: 5
  },
  createdAt: {
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
    marginVertical: 10,
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    justifyContent: 'flex-end'
  },
  statDetails: {
    padding: 2,
    backgroundColor: '#eee',
    borderRadius: 13,
    marginHorizontal: 5,
    fontSize: 12,
    fontWeight: '600',
    flexDirection: 'row',
  },
  floatingBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  floatingBtn: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'black',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
})