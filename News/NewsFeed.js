import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { StreamApp, FlatFeed } from 'expo-activity-feed';

const NewsFeed = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StreamApp
                apiKey='tc7ru58bttgf'
                appId='1148469'
                token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYmx1ZS1zbm93Zmxha2UtOSJ9.FtfCE_KCRxfqBMm7B_jcxKqh3YVi3FYFCUUvWkebjYw'>
                <FlatFeed />
            </StreamApp>
        </SafeAreaView>
    );
};

export default NewsFeed;