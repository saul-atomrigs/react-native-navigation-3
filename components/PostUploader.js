import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { db } from '../firebase'
import firebase from 'firebase'

const placeholderImage = require('../assets/icons/user-placeholder.png')

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().required('Image is required'),
  caption: Yup.string().max(2200, 'Caption has reached character limit')
})
export default function PostUploader({ navigation }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(placeholderImage)
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
      // .doc(firebase.auth().currentUser.email)
      .doc('7uwRc5ln29ZhcSJhyTTg')
      .collection('posts')
      .add({
        imageUrl: imageUrl,
        // user: currentLoggedInUser.profilePicture,
        // owner_uid: firebase.auth().currentUser.uid,
        // owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // likes: 0,
        likes_by_users: [],
        comments: [],
      })
    // .then(() => navigation.goBack())

    return unsubscribe
  }

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption)
        navigation.goBack()
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.textInputContainer}>
            {/* <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : placeholderImage
              }} /> */}
            <TextInput
              onChange={e => setThumbnailUrl(e.nativeEvent.text)}
              placeholder="Enter email"
              onChangeText={handleChange('imageUrl')}
              onBlur={handleBlur('imageUrl')}
              value={values.imageUrl}
              style={styles.titleInput}
            />
            <TextInput
              onChange={e => setThumbnailUrl(e.nativeEvent.text)}
              placeholder="Enter caption"
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
              value={values.caption}
              style={styles.contentInput}
              multiline
              numberOfLines={4}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: "auto",
    borderWidth: 1,
    borderColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  titleInput: {
    marginHorizontal: 5,
    marginVertical: 10,
    width: "90%",
    fontSize: 15,
    color: '#000',
    borderRadius: 10,
    backgroundColor: "#eee",
    padding: 10,
    // position: "relative", 
    // bottom: 0
  },
  contentInput: {
    marginHorizontal: 5,
    marginVertical: 10,
    width: "90%",
    fontSize: 15,
    color: '#000',
    borderRadius: 10,
    backgroundColor: "#eee",
    padding: 10,
  },
})
