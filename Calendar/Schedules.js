import React, { useState } from 'react'
import { SectionList, StyleSheet, Text, View, TextInput } from 'react-native';

export default function Schedules() {
    const [text, onChangeText] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={'Search kpop'}
            />
            <SectionList
                sections={[
                    { title: 'POPULAR', data: ['BTS (방탄소년단)', 'BLACKPINK (블랙핑크)', 'TWICE (트와이스)'] },
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
                    { title: 'Z', data: [] },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        width: '100%',
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
        margin: 12,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: '#fff',
        padding: 10,
    },
})
