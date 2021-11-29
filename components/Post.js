import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { POSTS } from '../data/posts'
import { CommunityData } from '../data/CommunityData'

export default function Post({ post }) {
  return (
    <>
      <View style={{ padding: 30 }}>
        {POSTS.map((post, index) => (
          <View key={index}>
            <Text>{post.user}</Text>
          </View>
        ))}
      </View>
      <View style={{ padding: 30 }}>
        {CommunityData.map((community, index) => (
          <View key={index}>
            <Text>{community.postTitle}</Text>
          </View>
        ))}
      </View>

      {/* <View>
        {post.comments.length && (
          <Text>
            View {post.comments.length > 1 ? 'all ' : ''} {post.comments}
            {post.comments.length > 1 ? ' comments' : ' comment'}
          </Text>
        )}
      </View> */}
      <View style={{ padding: 30 }}>

        {POSTS.map((post, index) => (
          <View key={index}>
            {post.comments.map((comment, index) => (
              <View key={index}>
                <Text>{comment.user}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({})
