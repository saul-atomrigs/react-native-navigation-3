import React, { useState, useEffect } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import Onboarding from 'react-native-onboarding-swiper';

export default function CustomButtons() {

  return (
    // <View style={{ marginHorizontal: 50, }}>

    <Onboarding
      DotComponent={Square}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      // DoneButtonComponent={Done}
      // onSkip={}
      // onDone={}
      titleStyles={{ color: 'blue' }} // set default color for the title
      pages={[
        {
          backgroundColor: '#000',
          image: <Image style={imageStyle} source={require('../assets/icons/splash3.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
          // titleStyles: { color: 'red' }, // overwrite default color
          // containerStyles: { width: '50%', height: '50%' },
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image style={imageStyle} source={require('../assets/icons/splash3.png')} />,
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#999',
          image: <Image style={imageStyle} source={require('../assets/icons/splash3.png')} />,
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
          containerStyles: { justifyContent: 'space-evenly', },
        },
      ]}
    />
    // </View>
  )
}



// DOTS
const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Done = ({ isLight, ...props }) => (
  <Button
    title={'Done'}
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      margin: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <View style={{ marginHorizontal: 50, }}>
    <Button
      title={'Skip'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    >
      {skipLabel}
    </Button>
  </View>
);

const Next = ({ isLight, ...props }) => (
  <View style={{ marginHorizontal: 50, }}>
    <Button
      title={'Next'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
        backgroundColor: backgroundColor(isLight),
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    />
  </View>
);

const win = Dimensions.get('window')
const ratio = win.width / win.height

const imageStyle = {
  // width: win.width / 1.5,
  // width: '100%',
  resizeMode: 'contain',
  // aspectRatio: 1,
  height: 600 * ratio,
}
