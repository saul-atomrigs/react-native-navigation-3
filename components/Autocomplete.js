import React from 'react';
import { Keyboard, Platform } from 'react-native';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
export default function AutocompleteField() {
    const [value, setValue] = React.useState(null);
    const [data, setData] = React.useState(artists);
    const [placement, setPlacement] = React.useState('bottom');
    const navigation = useNavigation();

    React.useEffect(() => {
        const keyboardShowListener = Keyboard.addListener(showEvent, () => {
            setPlacement('top');
        });

        const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
            setPlacement('bottom');
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    });

    // Called when option is pressed. 
    const onSelect = (index) => {
        setValue(artists[index].title);
    };

    const onChangeText = (query) => {
        setValue(query);
        setData(artists.filter(item => filter(item, query)));
    };

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.title}
        />
    );

    return (
        <Autocomplete
            placeholder='Search KPOP artists...'
            value={value}
            style={autocomplete}
            width='100%'
            placement={placement}
            // accessoryRight={() => navigation.push('News')}
            onChangeText={onChangeText}
            onSelect={onSelect}
        >
            {data.map(renderOption)}
        </Autocomplete>
    );
};


// data 
const artists = [
    { title: 'aespa 에스파' },
    { title: 'BTS 방탄소년단' },
    { title: 'BLACKPINK 블랙핑크' },
    { title: 'EXO 엑소' },
    { title: 'TWICE 트와이스' },
];

const showEvent = Platform.select({
    android: 'keyboardDidShow',
    default: 'keyboardWillShow',
});

const hideEvent = Platform.select({
    android: 'keyboardDidHide',
    default: 'keyboardWillHide',
});

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());


// styling 
const autocomplete = {
    backgroundColor: 'lightgray',
}