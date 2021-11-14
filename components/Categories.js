import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const items = [
    {
        image: require("../assets/icons/cake.png"),
        text: "Birthday",
    },
    {
        image: require("../assets/icons/gift.png"),
        text: "Gift",
    },
    {
        image: require("../assets/icons/info.png"),
        text: "Info",
    },
    {
        image: require("../assets/icons/ticket.png"),
        text: "Tickets",
    },
];

export default function Categories() {
    return (
        <View
            style={{
                marginTop: 5,
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingLeft: 20,
            }}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => (
                    <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
                        <Image
                            source={item.image}
                            style={{
                                width: 50,
                                height: 40,
                                resizeMode: "contain",
                            }}
                        />
                        <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}