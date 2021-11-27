import React, { useLayoutEffect } from 'react';
import { SectionList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AutocompleteField from '../Components/Autocomplete';

export default function Compass() {
    const navigation = useNavigation();

    // Refresh Control 
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            // header button left
            headerTitleAlign: 'left',
            title: 'Compass',
            // header button right
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Image
                            style={headerRightButtons}
                            source={require('../assets/icons/logo.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Image
                            style={headerRightButtons}
                            source={require('../assets/icons/dots-nine.png')}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])

    return (
        // <ApplicationProvider {...eva} theme={eva.light}>
        <View style={styles.container}
        >
            {/* <AutocompleteField /> */}
            <SectionList
                sections={realData}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                renderItem={({ item }) => <Text onPress={() => navigation.push('DetailedCompass', {
                    itemId: 86,
                    param: item,
                    // uri: 'https://cdn-icons-png.flaticon.com/512/5463/5463680.png',
                    uri: 'https://oncejapan.com/static/twice/fanclub/top/202110/ph_main_sp_202110_6847c8fbd1cc0651e0527f575dbf5b4f.jpg',
                    title: schedules,
                })} style={styles.item}>{item}</Text>}
                keyExtractor={(item, index) => index}
                style={styles.list}
                indicatorStyle='black'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
        // </ApplicationProvider>
    );
}


// Refresh Control 
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


// styling 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginBottom: 80,
        backgroundColor: '#fff'
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#eee',
    },
    item: {
        marginHorizontal: 40,
        padding: 10,
        fontSize: 25,
        height: 50,
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: '#fff',
        padding: 10,
    },
    list: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
})
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const headerRightButtons = {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
}

const schedules = ' OOO 방송출연'

const realData = [
    {
        title: 'POPULAR GROUPS',
        data: [
            'BTS (방탄소년단)',
            'BLACKPINK (블랙핑크)',
            'TWICE (트와이스)'
        ]
    },
    { title: 'A', data: ['AB6IX', 'AKMU', 'AOA', 'APRIL', 'ASTRO'] },
    { title: 'B', data: ['BLACKPINK', 'Dan', 'Dominic'] },
    { title: 'C', data: ['C<<', 'Dan', 'Dominic'] },
    { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
    { title: 'E', data: [] },
    { title: 'F', data: [] },
    { title: 'G', data: [] },
    { title: 'H', data: [] },
    { title: 'I', data: [] },
    { title: 'J', data: [] },
    { title: 'K', data: [] },
    { title: 'L', data: [] },
    { title: 'M', data: [] },
    { title: 'N', data: [] },
    { title: 'O', data: [] },
    { title: 'P', data: [] },
    { title: 'Q', data: [] },
    { title: 'R', data: [] },
    { title: 'S', data: [] },
    { title: 'T', data: [] },
    { title: 'U', data: [] },
    { title: 'V', data: [] },
    { title: 'W', data: [] },
    { title: 'X', data: [] },
    { title: 'Y', data: [] },
    { title: 'Z', data: ['zo'] },
]