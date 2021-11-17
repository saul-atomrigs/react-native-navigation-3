import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'

const text1 = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
const text2 = 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
const text3 = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

export default function NewsArticles({ marginLeft }) {
    return (
        <ScrollView style={articleStyle} showsVerticalScrollIndicator={false} >
            <View>
                <View>
                    <Text style={textTitle}>Today</Text>
                    <Text style={textSubtitle}>Discover Latest News Today</Text>
                </View>
                <View style={articleList}>
                    <ArticleImage marginLeft={marginLeft ? marginLeft : 0} />
                    <View style={articleTextView}>
                        <Text style={articleArtist}>Twice</Text>
                        <Text style={articleTitle}>Title</Text>
                        <Text style={articleSummary}>{text1}</Text>
                    </View>
                </View>
                <View style={articleList}>
                    <ArticleImage marginLeft={marginLeft ? marginLeft : 0} />
                    <View style={articleTextView}>
                        <Text style={articleArtist}>Twice</Text>
                        <Text style={articleTitle}>Title</Text>
                        <Text style={articleSummary}>{text2}</Text>
                    </View>
                </View>
                <View style={articleList}>
                    <ArticleImage marginLeft={marginLeft ? marginLeft : 0} />
                    <View style={articleTextView}>
                        <Text style={articleArtist}>Twice</Text>
                        <Text style={articleTitle}>Title</Text>
                        <Text style={articleSummary}>{text3}</Text>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}


// components 
const ArticleImage = (props) => (
    <View>
        <Image
            source={require('../assets/001.jpg')}
            style={{
                width: 100,
                height: 100,
                borderRadius: 8,
            }}
        />
    </View>
);


// styles 
const articleStyle = {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // margin: 10,
    width: '100%',
}
const textTitle = {
    fontWeight: 'bold',
    fontSize: 50,
}
const textSubtitle = {
    fontSize: 12,
    color: '#000',
    margin: 5,
}
const articleList = {
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 13,
}
const articleTextView = {
    marginLeft: 10,
}
const articleArtist = {
    marginLeft: 5,
    color: 'gray',
}
const articleTitle = {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
}
const articleSummary = {
    marginLeft: 5,
}