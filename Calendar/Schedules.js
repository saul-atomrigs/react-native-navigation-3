import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AutocompleteField from '../Components/Autocomplete';

export default function Schedules() {
    const navigation = useNavigation();
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <View style={styles.container}>
                <AutocompleteField />
                <SectionList
                    sections={realData}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    renderItem={({ item }) => <Text onPress={() => navigation.navigate('DetailedSchedules', {
                        itemId: 86,
                        param: item,
                        uri: 'https://cdn-icons-png.flaticon.com/512/5463/5463680.png',
                    })} style={styles.item}>{item}</Text>}
                    keyExtractor={(item, index) => index}
                    style={styles.list}
                    indicatorStyle='black'
                />
            </View>
        </ApplicationProvider>
    );
}

// styling 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        width: '100%',
        backgroundColor: '#fff'
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#e6e6e6',
    },
    item: {
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

const realData = [
    {
        title: 'POPULAR',
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