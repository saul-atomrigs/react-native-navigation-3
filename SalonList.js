import React from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import salon from './salon'

export default function SalonList({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={salon}
                keyExtractor={item => item.key}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => { }} >
                            <View style={{ flex: 1 }}>
                                <View style={bg}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.jobTitle}</Text>
                                    <Image source={{ uri: item.image }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const bg = {
    backgroundColor: 'red',
    width,
    height,
    position: 'absolute',
    borderRadius: 10,
    transform: [{ translateY: height / 2 }],
}
const width = '100%'
const height = '100%'