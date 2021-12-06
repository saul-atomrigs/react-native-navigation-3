import React, { Component, Fragment, useLayoutEffect, useState, useEffect } from 'react'
import { Text, Image, View, TouchableOpacity, StyleSheet, Button, FlatList, RefreshControl } from 'react-native'
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Firebase, { FirebaseProvider } from '../src/utils'
import Icon from 'react-native-vector-icons/Ionicons';
import { Heart, ChatText, Plus } from "phosphor-react-native";
import { CommunityData } from '../data/CommunityData'
// import AddPost from './AddPost';
// import { Post } from '../data/posts'
import { db } from '../firebase'
import Amplify from 'aws-amplify';
import config from '../src/aws-exports'
Amplify.configure(config)

export default function Feed({ item }) {
  const navigation = useNavigation();

  // MAGIC!! 
  // const [posts, setPosts] = useState([])
  // useEffect(() => {
  //   db.collectionGroup('posts')
  //     .onSnapshot(snapshot => {
  //       setPosts(snapshot.docs.map(doc => doc.data()))
  //     })
  // }, [])

  const renderItem = ({ item }) => (
    <>

      <TouchableOpacity
        onPress={() => navigation.push('DetailedFeed', {
          param: item,
        })}>
        <Divider />
        <View style={styles.post}>
          <View style={styles.content}>
            <Icon style={{ marginRight: 5, marginTop: 5 }} name="ellipse" size={8} color="hotpink" />
            <Text style={styles.text}>
              {/* {item.postTitle.length > 90 ? item.postTitle.substring(0, 90) + '...' : item.postTitle} */}
              {item.postTitle.length > 90 ? item.postTitle.substring(0, 90) + '...' : item.postTitle}
            </Text>
          </View>
          <View style={styles.postFooter}>
            <TouchableOpacity
              onPress={() => navigation.push('Home')}
              style={{ flexDirection: 'row', marginLeft: 20 }}
            >
              <Text style={styles.author}>
                {item.author}
              </Text>
            </TouchableOpacity>
            <View style={styles.stat}>
              <Text style={[styles.statDetails, { fontWeight: '600' }]}>{item.views} Views</Text>
              <View style={{ flexDirection: 'row' }}>
                <Heart size={18} color='red' />
                <Text style={styles.statDetails}>{item.likes}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <ChatText size={18} color='gray' />
                <Text style={styles.statDetails}>{item.comments}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity >
    </>
  )
  // Refresh Control 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  return (
    <Fragment >
      {/* <FirebaseProvider value={Firebase}> */}
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
      />
      <TouchableOpacity style={styles.floatingBtn}
        onPress={() => navigation.navigate('AddPost')}
      >
        {/* <Image
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        source={require('../assets/icons/plus.png')}
                    /> */}
        <Plus color="pink" size={18} />
        <Text style={{ fontSize: 16, fontWeight: '500', color: 'pink' }}>Post</Text>

      </TouchableOpacity>
      {/* </FirebaseProvider> */}
    </Fragment >

  )
}


// Refresh Control 
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

//  Styling 
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    marginBottom: 80,
  },
  post: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  postImage: {
    // width: '90%',
    // height: 300,
    // alignSelf: 'center',
    // borderRadius: 13,
  },
  author: {
    // marginTop: 5,
    // marginBottom: 10,
    marginLeft: 12,
  },
  postAvatar: {
    // marginRight: 10,
    // marginLeft: 20
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
  actionButtonIcon: {
    // fontSize: 20,
    // height: 22,
    // color: 'white',
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