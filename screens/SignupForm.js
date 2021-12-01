// import React from 'react'
// import { StyleSheet, TextInput, View } from 'react-native'
// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import Validator from 'email-validator'

// export default function SignupForm() {
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

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
//   inputField: {
//     borderWidth: 1,
//   },
// })
