// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import SignupForm from '../screens/SignupForm';
import PostUploader from './PostUploader';


export const Search = props => (
  <Formik
    initialValues={{ artist: '' }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          onChangeText={handleChange('artist')}
          onBlur={handleBlur('artist')}
          value={values.artist}
          placeholder="artist"
          style={{ width: '80%', height: 20, borderColor: 'gray', borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
        />
        <Button onPress={handleSubmit} title="Submit" />
        <View>
          <Text>{values.artist}</Text>
        </View>
        <PostUploader />
      </View>
    )}
  </Formik>
);



// const upload = Yup.object().shape({
//   imageURI: Yup.string().url().required('a url is required')
//   , caption: Yup.string().max(2200, 'caption has reached the limit')
// })

// const Search = () => {
//   return (
//     <Formik
//       initialValues={{ caption: '' }}
//       onSubmit={(values) => console.log(values)}
//       validationSchema={upload}
//       validateOnMount={true}
//     >
//       {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) =>
//         <>
//           <View>
//           </View>
//           <TextInput
//             placeholder="caption"
//             placeholderTextColor="gray"
//             multiline
//             onChangeText={handleChange('caption')}
//             onBlur={handleBlur('caption')}
//             value={values.caption}
//           />
//           <Button
//             onPress={handleSubmit}
//             title="Submit"
//           // disabled={!isValid}
//           />
//         </>
//       }
//     </Formik>
//   )
// }

// export default Search;






// export default function Search() {
//   const SignupFormSchema = Yup.object().shape({
//     email: Yup.string().email().required('an email is required'),
//     username: Yup.string().required().min(2, 'a username is required'),
//     password: Yup.string().required().min(6, 'a password must be at least 6 characters'),
//   })
//   return (
//     <View style={styles.wrapper}>
//       <Formik
//         initialValues={{ email: '', username: '', password: '' }}
//         onSubmit={values => console.log(values)}
//         validationSchema={SignupFormSchema}
//         validateOnMount={true}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
//           <>
//             <View
//               style={[
//                 styles.inputField,
//                 {
//                   borderColor:
//                     values.email.length < 1 || Validator.validate(values.email)
//                       ? '#ccc'
//                       : 'red'
//                 }
//               ]}
//             >
//               <TextInput
//                 placeholder="Email"
//                 placeholdertTextColor="#444"
//                 autoCapitalize="none"
//                 keyboardType="email-address"
//                 autoFocus={true}
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//               >
//               </TextInput>

//             </View>
//           </>
//         )}

//       </Formik>
//     </View>
//   )
// }

// // const styles = StyleSheet.create({
// //   wrapper: {
// //     flex: 1,
// //   },
// //   inputField: {
// //     borderWidth: 1,
// //   },
// // })

