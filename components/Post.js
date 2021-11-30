import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { POSTS } from '../data/posts'
import { CommunityData } from '../data/CommunityData'
import { Avatar } from 'react-native-elements'

export default function Post({ post }) {
  return (
    <>
      <View style={{ marginRight: 10 }}>
        {POSTS.map((post, index) => (
          <View key={index} >
            {post.comments.map((comment, index) => (
              <View key={index} style={{ flexDirection: 'row', marginHorizontal: 5, marginVertical: 5 }}>
                <Avatar rounded source={{ uri: post.profilePicture }} />
                <Text style={{ fontWeight: '800', marginLeft: 10, marginTop: 5 }}>{comment.user}</Text>
                <Text style={{ marginLeft: 5, marginTop: 5, marginRight: 20 }}>{comment.comment}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      {/* <View style={{ padding: 30 }}>
        {CommunityData.map((community, index) => (
          <View key={index}>
            <Text>{community.postTitle}</Text>
          </View>
        ))}
      </View> */}

      {/* <View>
        {post.comments.length && (
          <Text>
            View {post.comments.length > 1 ? 'all ' : ''} {post.comments}
            {post.comments.length > 1 ? ' comments' : ' comment'}
          </Text>
        )}
      </View> */}
    </>
  )
}

const styles = StyleSheet.create({})
