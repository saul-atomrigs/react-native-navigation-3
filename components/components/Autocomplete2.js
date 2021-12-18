// import Autocomplete from 'react-native-autocomplete-input';
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Platform, } from 'react-native';
// // import { SWAPI, Movies, Movie } from './swapi';
// // import { MovieDetails } from './MovieDetails';


// export default function AutocompleteField2() {
//     const [allMovies, setAllMovies] = useState < Movies | null > (null);
//     const [query, setQuery] = useState('');
//     const queriedMovies = allMovies?.query(query);
//     const isLoading = !allMovies?.length;
//     const placeholder = isLoading
//         ? 'Loading data...'
//         : 'Enter Star Wars film title';

//     useEffect(() => {
//         (async function fetchMovies() {
//             setAllMovies(await SWAPI.fetchMovies());
//         })();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <View style={styles.autocompleteContainer}>
//                 <Autocomplete
//                     editable={!isLoading}
//                     autoCorrect={false}
//                     data={
//                         queriedMovies?.length === 1 && queriedMovies[0].compareTitle(query)
//                             ? [] // Close suggestion list in case movie title matches query
//                             : queriedMovies
//                     }
//                     value={query}
//                     onChangeText={setQuery}
//                     placeholder={placeholder}
//                     flatListProps={{
//                         keyboardShouldPersistTaps: 'always',
//                         keyExtractor: (movie: Movie) => movie.id,
//                         renderItem: ({ item: { title } }: Movie) => (
//                             <TouchableOpacity onPress={() => setQuery(title)}>
//                                 <Text style={styles.itemText}>{title}</Text>
//                             </TouchableOpacity>
//                         ),
//                     }}
//                 />
//             </View>

//             <View style={styles.descriptionContainer}>
//                 {queriedMovies?.length > 0 ? (
//                     <MovieDetails movie={queriedMovies[0]} />
//                 ) : (
//                     <Text style={styles.infoText}>Enter Title of a Star Wars movie</Text>
//                 )}
//             </View>
//         </View>
//     );
// };


// // styling 
// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         backgroundColor: '#F5FCFF',
//         flex: 1,

//         // Android requiers padding to avoid overlapping
//         // with content and autocomplete
//         paddingTop: 50,

//         // Make space for the default top bar
//         ...Platform.select({
//             web: {
//                 marginTop: 0,
//             },
//             default: {
//                 marginTop: 25,
//             },
//         }),
//     },
//     itemText: {
//         fontSize: 15,
//         margin: 2,
//     },
//     descriptionContainer: {
//         // `backgroundColor` needs to be set otherwise the
//         // autocomplete input will disappear on text input.
//         backgroundColor: '#F5FCFF',
//         marginTop: 8,
//     },
//     infoText: {
//         textAlign: 'center',
//     },
//     autocompleteContainer: {
//         // Hack required to make the autocomplete
//         // work on Andrdoid
//         flex: 1,
//         left: 0,
//         position: 'absolute',
//         right: 0,
//         top: 0,
//         zIndex: 1,
//         padding: 5,
//     },
// });
