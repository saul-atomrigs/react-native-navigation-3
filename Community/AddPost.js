import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { Divider } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommentInput from '../Components/CommentInput'
import PostUploader from '../Components/PostUploader'
import { db } from '../firebase'


export default function AddPost() {
  const navigation = useNavigation()
  // MAGIC!! 
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collectionGroup('posts')
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => doc.data()))
      })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Header />
          <PostUploader />
          <View>

            {posts.map((post, index) => (
              <View key={index} >
                <TouchableOpacity onPress={() => navigation.push('DetailedFeed', {
                })} >
                  <Text>{post.postTitle}</Text>
                </TouchableOpacity>
                <Text>{post.caption}</Text>
                <Text>
                  {/* {new Date(post.createdAt._seconds * 1000).toLocaleDateString("en-US")} */}
                </Text>
                <Text>{post.imageUrl}</Text>
                <Divider />
              </View>
            ))}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Header = () => (
  <KeyboardAwareScrollView>
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Image
          source={require('../assets/icons/user-placeholder.png')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>new post</Text>
    </View>
  </KeyboardAwareScrollView>
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#555',
    fontWeight: '700',
    fontSize: 20,
  },
})




// export default function AddPost() {
//   // MAGIC!! 
//   const [posts, setPosts] = React.useState([])
//   useEffect(() => {
//     db.collectionGroup('posts')
//       .onSnapshot(snapshot => {
//         setPosts(snapshot.docs.map(doc => doc.data()))
//       })
//   }, [])

//   return (
//     <View style={styles.container}>
//       <Header />
//       <PostUploader />
//       <View>

//         {posts.map((post, index) => (
//           <View key={index} >
//             <Text>{post.caption}</Text>
//             <Text>{post.imageUrl}</Text>
//             <Divider />
//           </View>
//         ))}

//       </View>
//     </View>
//   )
// }

// const Header = () => (
//   <KeyboardAwareScrollView>
//     <View style={styles.headerContainer}>
//       <TouchableOpacity>
//         <Image
//           source={require('../assets/icons/user-placeholder.png')}
//           style={{ width: 30, height: 30, marginLeft: 10 }}
//         />
//       </TouchableOpacity>
//       <Text style={styles.headerText}>new post</Text>
//     </View>
//   </KeyboardAwareScrollView>
// )

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerText: {
//     color: '#555',
//     fontWeight: '700',
//     fontSize: 20,
//   },
// })
