import React from 'react'
import { View, Text, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
// import NewsPage from './NewsPage'
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function NewsArticles({ NewsPage }) {
    const navigation = useNavigation();

    return (
        <ScrollView style={articleStyle} showsVerticalScrollIndicator={false} >
            <Header />
            <View>
                <ArticleBlock />
                <ArticleBlock />
                <ArticleBlock />
            </View>
            <Button
                title={`Go to ${NewsPage}`}
                onPress={() => navigation.navigate('NewsPage')}
            />
        </ScrollView >

        // <Stack.Navigator>
        //     <Stack.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3, headerShown: false }} />
        // </Stack.Navigator>

    )
}


function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

const text1 = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
const text2 = 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
const text3 = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

// react navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// components 
function Header() {
    return (
        <View>
            <Text style={textTitle}>Today</Text>
            <Text style={textSubtitle}>Discover Latest News Today</Text>
        </View>
    )
}
const ArticleImage = (props) => (
    <View>
        <Image
            source={require('../assets/002.jpeg')}
            style={{
                width: 100,
                height: 100,
                borderRadius: 8,
            }}
        />
    </View>
);
function ArticleBlock() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('LikeCounter')}>
            <View style={articleList}>
                <ArticleImage />
                <View style={articleTextView}>
                    <Text style={articleArtist}>Twice</Text>
                    <Text style={articleTitle}>Title</Text>
                    <Text style={articleSummary}>{text1}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

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
    marginLeft: 15,
    marginRight: 15,
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
    marginRight: 5,
    width: '40%',
}