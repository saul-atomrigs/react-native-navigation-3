import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    StreamApp,
    FlatFeed,
    Activity,
    StatusUpdateForm,
    LikeButton,
    UserBar,
} from 'react-native-activity-feed';

const Stream = () => {
    // Hooks
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to call backend API endpoint to get user private token
    const callApi = async () => {
        const response = await fetch('http://localhost:3000');
        const userResponse = await response.json();
        return userResponse;
    };

    // When our application starts, we will call the API endpoint
    useEffect(() => {
        callApi().then(response => {
            setUserToken(response.userToken);
            setLoading(false);
        });
    }, []);

    // GetStream API KEY and APP ID

    const STREAM_API_KEY = '5htg57uxmqts';
    const STREAM_APP_ID = '1148468';

    // Custom header for our Global feed posts
    const renderHeader = props => {
        const { activity } = props;
        const { actor } = activity;
        return (
            <View style={{ marginLeft: 10 }}>
                <UserBar username={actor.data.name || 'Unknown User'} avatar={actor.data.profileImage} />
            </View>
        );
    };

    // Each post/activity will contain the custom header and a like button
    const renderActivity = props => {
        return (
            <Activity
                Header={renderHeader(props)}
                {...props}
                Footer={<LikeButton {...props} />}
            />
        );
    };

    // While our applications brings the secret user token, we will render a spinner
    return loading ? (
        <ActivityIndicator />
    ) : (
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
            <Text style={styles.title}>Global Feed</Text>
            <StreamApp
                apiKey={STREAM_API_KEY}
                appId={STREAM_APP_ID}
                token={userToken}
                userId="tester">
                <FlatFeed Activity={renderActivity} notify />
                <StatusUpdateForm feedGroup={'timeline'} />
            </StreamApp>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        height: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
    },
});

export default Stream;