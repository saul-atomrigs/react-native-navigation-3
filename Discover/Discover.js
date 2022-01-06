import React, { useState, useCallback, useLayoutEffect } from 'react';
import { SectionList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Discover() {
  const navigation = useNavigation();

  // REFRESH CONTROL
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])


  return (
    <View style={styles.container}
    >
      <SectionList
        sections={dummyData}

        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>
          {section.header} </Text>}

        renderItem={({ item }) =>
          <Text
            style={styles.item}
            onPress={() => navigation.push(
              'DetailedDiscover',
              { param: item }
            )}>
            {item}
          </Text>}

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
  );
}


const dummyData = [
  {
    header: 'TRENDING',
    data: [
      'BTS',
      'aespa',
      'BLACKPINK',
      'TWICE',
      'EXO',
      'JENNIE',
      'NCT 127',
      'Stray Kids',
      'ITZY',
      'TXT',
    ]
  },

  {
    header: 'NEW RELEASES',
    data: [
      'Kep1er',
      'IVE',

    ]
  },
  // {
  //   header: 'POPULAR FANDOMS',
  //   data: [
  //     'Register your fandom'
  //   ]
  // }
]

// HEADER BUTTONS
export const Header = ({ navigation }) => {
  navigation.setOptions({
    // LEFT
    headerTitleAlign: 'left',
    title: 'Discover',
    // RIGHT
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={headerRightButtons}
            source={require('../assets/icons/logo.png')}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
        >
          <Image
            style={headerRightButtons}
            source={require('../assets/icons/dots-nine.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  });
}



// REFRESH CONTROL  
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


// STYLES 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginBottom: 80,
    backgroundColor: '#fff'
  },
  sectionHeader: {
    paddingVertical: 2,
    paddingHorizontal: 20,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 23,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
  headerIcon: {
    marginLeft: 20,
    borderWidth: 1
  },
  item: {
    marginHorizontal: 40,
    padding: 10,
    fontSize: 19,
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
  width: 30,
  height: 30,
  marginRight: WIDTH * 0.05,
}


  // { title: 'A', data: ['AB6IX', 'aespa', 'Ailee', 'AKMU', 'Apink', 'APRIL', 'ASTRO', 'ATEEZ'] },
  // { title: 'B', data: ['B1A4', 'B.A.P', 'Blackpink', 'Brave Girls', 'BTOB'] },
  // { title: 'C', data: ['Chung Ha (청하)', 'Cherry Bullet', 'CL', 'Crayon Pop',] },
  // { title: 'D', data: ['Davichi', 'DIA', 'Dal Shabet', 'Dreamcatcher',] },
  // { title: 'E', data: ['ENHYPHEN', 'EVERGLOW', 'EXID', 'EXO',] },
  // { title: 'F', data: ['FT Island', 'f(x)', 'fromis_9',] },
  // { title: 'G', data: ['(G)I-DLE', 'G-DRAGON', 'Girls Generation', 'Girls Day', 'GOT7', 'Golden Child', 'gugudan'] },
  // { title: 'H', data: ['Hyolyn(효린)', 'HYUKOH(혁오)', 'Heize', 'Hwa Sa(화사)', 'HyunA(현아)',] },
  // { title: 'I', data: [] },
  // { title: 'J', data: [] },
  // { title: 'K', data: [] },
  // { title: 'L', data: [] },
  // { title: 'M', data: [] },
  // { title: 'N', data: [] },
  // { title: 'O', data: [] },
  // { title: 'P', data: [] },
  // { title: 'Q', data: [] },
  // { title: 'R', data: [] },
  // { title: 'S', data: [] },
  // { title: 'T', data: [] },
  // { title: 'U', data: [] },
  // { title: 'V', data: [] },
  // { title: 'W', data: [] },
  // { title: 'X', data: [] },
  // { title: 'Y', data: [] },
  // { title: 'Z', data: ['zo'] },
