import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { listSchedules } from '../src/graphql/queries'


export default function AddSchedule() {
    const [datePickerVisible, setDatePickerVisibility] = useState(false);
    const [text, onChangeText] = useState("");

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
        hideDatePicker();
        onChangeText(date.format("yyyy-MM-dd"))
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    pointerEvents="none"
                    style={styles.textInput}
                    placeholder="1. When is it happening?"
                    placeholderTextColor='#666'
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={text}
                />
                <DateTimePickerModal
                    headerTextIOS="1. When is it happening?"
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <TextInput
                    placeholder="2. Which artist?"
                    style={styles.textInput}
                    placeholderTextColor='#666'
                    autoCompleteType="off"
                    autoCorrect={false}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <TextInput
                    placeholder="3. What's the event?"
                    style={styles.textInput}
                    placeholderTextColor='#666'
                    autoCompleteType="off"
                    autoCorrect={false}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <TextInput
                    placeholderTextColor='#666'
                    placeholder="4. Add details (optional)"
                    style={[styles.textInput,]}
                    multiline
                    numberOfLines={4}
                />
            </TouchableOpacity>
            {/* submit button */}
            <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => navigation.navigate('AddSchedule')}
            >
                <View style={styles.floatingBtn}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: 'pink' }}>Add schedule</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textInput: {
        fontSize: 16,
        color: '#000000',
        height: 50,
        width: 300,
        borderColor: '#666',
        borderWidth: 1,
        borderRadius: 13,
        padding: 10,
        marginBottom: 30,
    },
    floatingBtn: {
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 40,
        position: 'relative',
        // bottom: 100,
        // right: 30,
        backgroundColor: 'black',
        borderRadius: 100,
        // shadow ios:
        shadowColor: 'lightgray',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // shadow android: 
        elevation: 0.8,
    }
})
// export default function AddSchedule() {
//     const [date, setDate] = useState(new Date())
//     return (
//         <View>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Artist"
//                 placeholderTextColor="#999"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Schedule / Event / Anniversary ..."
//                 placeholderTextColor="#999"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//             />
//             <DatePicker date={date} onDateChange={setDate} />
//             <TextInput
//                 style={styles.input}
//                 placeholder="When is this happening?"
//                 placeholderTextColor="#999"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     input: {
//         height: 44,
//         paddingHorizontal: 16,
//         backgroundColor: '#FFF',
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 13,
//         marginTop: 10,
//         marginHorizontal: 10,
//         fontSize: 16,
//     },
// })
