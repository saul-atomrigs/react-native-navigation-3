import React, { Component, Fragment, useLayoutEffect, useState, useEffect } from 'react'
import { Text, Image, View, TouchableOpacity, StyleSheet, Button, FlatList, RefreshControl } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Firebase, { FirebaseProvider } from '../src/utils'
import AddPost from './AddPost';
import Icon from 'react-native-vector-icons/Ionicons';
import { Heart, ChatText, Plus } from "phosphor-react-native";
import { CommunityData } from '../data/CommunityData'
// import { Post } from '../data/posts'


export default function Feed() {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.push('DetailedFeed', {
        param: item,
      })}>
      <Divider />
      <View style={styles.post}>
        <View style={styles.content}>
          <Icon style={{ marginRight: 5, marginTop: 5 }} name="ellipse" size={8} color="hotpink" />
          <Text style={styles.text}>
            {item.randomText.length > 90 ? item.randomText.substring(0, 90) + '...' : item.randomText}
          </Text>
        </View>

        <View style={styles.postFooter}>
          <TouchableOpacity
            onPress={() => navigation.push('Home')}
            style={{ flexDirection: 'row', marginLeft: 20 }}
          >
            {/* <Avatar
              rounded
              source={{ uri: item.avatarURI }}
              containerStyle={styles.postAvatar}
            /> */}
            <Text style={styles.author}>
              {item.postTitle}
            </Text>
          </TouchableOpacity>
          <View style={styles.stat}>
            <Text style={[styles.statDetails, { fontWeight: '600' }]}>{item.views} Views</Text>
            <View style={{ flexDirection: 'row' }}>
              <Heart size={15} color='red' />
              <Text style={styles.statDetails}>{item.likes}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <ChatText size={15} color='gray' />
              <Text style={styles.statDetails}>{item.comments}</Text>
            </View>
          </View>
        </View>

      </View>
    </TouchableOpacity >
  )

  // Refresh Control 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  return (
    <Fragment >
      <FirebaseProvider value={Firebase}>
        <FlatList
          style={styles.container}
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
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'pink' }}>Post</Text>

        </TouchableOpacity>
      </FirebaseProvider>
    </Fragment >
  )
}


// Refresh Control 
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


// // data 
// const DATA = [
//   {
//     id: 1,
//     postTitle: 'aespa⭐️viet',
//     avatarURI:
//       'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//     imageURI:
//       'https://pbs.twimg.com/media/FEi4-HRWYAEFDZh?format=jpg&name=900x900',
//     randomText:
//       'MAMA 2021 Predictions Tournament',
//     views: '39',
//     likes: '3',
//     comments: '2',

//   },
//   {
//     id: 2,
//     postTitle: 'BTS 방탄소년단',
//     avatarURI:
//       'https://media.istockphoto.com/photos/young-asian-woman-with-glitter-makeup-wearing-sporty-fashion-picture-id1286624383',
//     imageURI:
//       'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
//     randomText:
//       'Billlie - New Group Profile Photo (with Sheon)',
//     views: '34',
//     likes: '5',
//     comments: '1',
//   },
//   {
//     id: 3,
//     postTitle: 'tree019',
//     avatarURI:
//       'https://media.istockphoto.com/photos/portrait-of-a-young-asian-woman-wearing-street-fashion-picture-id1304661616',
//     // imageURI:
//     // 'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
//     randomText:
//       `TWICE - 3rd Full Album 'Formula of Love: O+T=<3' (Two Weeks Later)`,
//     views: '102',
//     likes: '9',
//     comments: '5',
//   },
//   {
//     id: 4,
//     postTitle: 'BTS-Malaysia',
//     avatarURI:
//       'https://media.istockphoto.com/photos/portrait-of-a-young-asian-woman-wearing-street-fashion-picture-id1304661616',
//     imageURI:
//       'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
//     randomText:
//       'TWICE Jeongyeon - Once again #1 (211127) [Eng Sub]❤️❤️',
//     views: '102',
//     likes: '9',
//     comments: '5',
//   },
//   {
//     id: 5,
//     postTitle: 'once_USA',
//     avatarURI:
//       'https://media.istockphoto.com/photos/portrait-of-a-young-asian-woman-wearing-street-fashion-picture-id1304661616',
//     imageURI:
//       'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
//     randomText:
//       'Ex miss A Fei - "Freaky Cinderella" Image Teaser #1',
//     views: '102',
//     likes: '9',
//     comments: '5',
//   },
//   {
//     id: 6,
//     postTitle: 'BTS 방탄소년단',
//     avatarURI:
//       'https://media.istockphoto.com/photos/portrait-of-a-young-asian-woman-wearing-street-fashion-picture-id1304661616',
//     imageURI:
//       'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
//     randomText:
//       'this is example 2dslfk,sdfjsei? emoji!!❤️❤️',
//     views: '102',
//     likes: '9',
//     comments: '5',
//   },
// ]


//  Styling 
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#eee',
    // marginBottom: 80,
  },
  post: {
    marginTop: 12,
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
    marginVertical: 10,
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