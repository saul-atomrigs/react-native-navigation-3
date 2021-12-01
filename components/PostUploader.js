import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { db } from '../firebase'
import firebase from 'firebase'

const placeholder_img = require('../assets/icons/user-placeholder.png')

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().required('Image is required'),
  caption: Yup.string().max(2200, 'Caption has reached character limit')
})
export default function PostUploader({ navigation }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(placeholder_img)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

  const getUsername = () => {
    const unsubscribe = db
      .collection('users')
      // .where('owner_id', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profilePicture
          })
        })
      )
    return unsubscribe
  }

  useEffect(() => {
    getUsername()
  }, [])

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // likes: 0,
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack())

    return unsubscribe
  }

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption)
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View>
            {/* <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : placeholder_img
              }} /> */}
          </View>
          <TextInput
            onChange={e => setThumbnail(e.nativeEvent.text)}
            placeholder="Enter Image URL"
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({})
