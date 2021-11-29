import React from 'react'
import { StyleSheet, Image, Text, View, } from 'react-native'
import { POSTS } from '../data/posts'
import CommunityData from '../data/CommunityData'



const Post = ({ post }) => {
    return (
        <View>
            {/* <Image source={{ uri: post.id }} /> */}
            <Text>{post.likes.toLocaleString('en')}</Text>
        </View>
    )
}
const styles = StyleSheet.create({})


export default Post