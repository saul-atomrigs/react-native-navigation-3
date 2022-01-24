// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const auth = {
//   phone: '010-0000-0000',
//   token: firebase.auth().currentUser.uid,
// };

// // CREATE CONTEXT
// const AuthContext = createContext({});

// // PROVIDER 
// const AuthProvider = ({ children }) => {
//   const [auth, setAuthState] = useState(initialState);

//   // GET CURRENT AUTH STATE FROM ASYNC STORAGE
//   const getAuthState = async () => {
//     try {
//       const authDataString = await AsyncStorage.getItem("auth");
//       const authData = JSON.parse(authDataString || {});
//       // AXIOS HEADERS
//       configureAxiosHeaders(authData.token, authData.phone);
//       setAuthState(authData);
//     } catch (err) {
//       setAuthState({});
//     }
//   };

//   // UPDATE ASYNC STORAGE & CONTEXT STATE
//   const setAuth = async (auth) => {
//     try {
//       await AsyncStorage.setItem("auth", JSON.stringify(auth));
//       // AXIOS HEADERS
//       configureAxiosHeaders(auth.token, auth.phone);
//       setAuthState(auth);
//     } catch (error) {
//       Promise.reject(error);
//     }
//   };

//   // EXECUTE 
//   useEffect(() => {
//     getAuthState();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
