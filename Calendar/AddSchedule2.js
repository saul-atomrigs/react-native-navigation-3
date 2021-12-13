// import React, { useState } from 'react';
// import { Button, Text, View } from 'react-native';
// import { Formik } from 'formik';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import moment from 'moment';

// import Amplify from 'aws-amplify'
// import config from '../src/aws-exports'
// import { API, graphqlOperation } from 'aws-amplify'
// import { createEvent, updatePost, deletePost } from '../src/graphql/mutations'
// Amplify.configure(config)

// export default function Example() {
//   const initialValues = {
//     date: moment().format('YYYY-MM-DD'),
//     artist: '',
//     event: '',
//   }
//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={values => console.log(values)}
//     >
//       {({ handleSubmit, values, setFieldValue }) => (
//         <MyForm values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
//       )}
//     </Formik>
//   );
// }

// export const MyForm = props => {
//   const { handleSubmit, values, setFieldValue } = props;
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = date => {
//     setFieldValue('date', moment(date).format('YYYY-MM-DD'))
//     hideDatePicker();
//   };

//   return (
//     <View>
//       <Text onPress={showDatePicker}>{moment(values.date).format('YYYY-MM-DD')}</Text>
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//         date={moment(values.date).toDate()}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// }