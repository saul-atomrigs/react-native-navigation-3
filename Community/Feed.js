import React, { useState, useEffect } from 'react'
import { Text, Image, View, TouchableOpacity, StyleSheet, Button, FlatList, RefreshControl, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { Heart, ChatText, Plus } from "phosphor-react-native";
// import AddPost from './AddPost';
// import { Post } from '../data/posts'
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost, updatePost, deletePost } from '../src/graphql/mutations'
import { listPosts } from '../src/graphql/queries'
import { onCreatePost } from '../src/graphql/subscriptions'
Amplify.configure(config)

export default function Feed({ item }) {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
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
        <Plus color="pink" size={18} />
        <Text style={{ fontSize: 16, fontWeight: '500', color: 'pink' }}>Post</Text>
      </TouchableOpacity>
    </>
  )
}


// Refresh Control 
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


// const renderItem = ({ item }) => (
//   <>
//     <TouchableOpacity
//       onPress={() => navigation.push('DetailedFeed', {
//         param: item,
//       })}>
//       <Divider />
//       <View style={styles.post}>
//         <View style={styles.content}>
//           <Icon style={{ marginRight: 5, marginTop: 5 }} name="ellipse" size={8} color="hotpink" />
//           <Text style={styles.text}>
//             {/* {item.postTitle.length > 90 ? item.postTitle.substring(0, 90) + '...' : item.postTitle} */}
//             {item.postTitle.length > 90 ? item.postTitle.substring(0, 90) + '...' : item.postTitle}
//           </Text>
//         </View>
//         <View style={styles.postFooter}>
//           <TouchableOpacity
//             onPress={() => navigation.push('Home')}
//             style={{ flexDirection: 'row', marginLeft: 20 }}
//           >
//             <Text style={styles.author}>
//               {item.author}
//             </Text>
//           </TouchableOpacity>
//           <View style={styles.stat}>
//             <Text style={[styles.statDetails, { fontWeight: '600' }]}>{item.views} Views</Text>
//             <View style={{ flexDirection: 'row' }}>
//               <Heart size={18} color='red' />
//               <Text style={styles.statDetails}>{item.likes}</Text>
//             </View>
//             <View style={{ flexDirection: 'row' }}>
//               <ChatText size={18} color='gray' />
//               <Text style={styles.statDetails}>{item.comments}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity >
//   </>
// )


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