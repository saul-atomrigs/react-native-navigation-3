import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommentInput from '../Components/CommentInput'
// import ImagePicker from 'react-native-image-picker'
// import { withFirebaseHOC } from '../src/utils/FirebaseContext'


// class AddPost extends Component {
//     state = { image: null, title: '', description: '' }

//     onChangeTitle = title => {
//         this.setState({ title })
//     }
//     onChangeDescription = description => {
//         this.setState({ description })
//     }

//     onSubmit = async () => {
//         try {
//             const post = {
//                 photo: this.state.image,
//                 title: this.state.title,
//                 description: this.state.description
//             }
//             this.props.firebase.uploadPost(post)

//             this.setState({
//                 image: null,
//                 title: '',
//                 description: ''
//             })
//         } catch (e) {
//             console.error(e)
//         }
//     }

//     selectImage = () => {
//         const options = {
//             noData: true
//         }
//         ImagePicker.launchImageLibrary(options, response => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker')
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error)
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton)
//             } else {
//                 const source = { uri: response.uri }
//                 console.log(source)
//                 this.setState({
//                     image: source
//                 })
//             }
//         })
//     }

//     render() {
//         return (
//             <View style={{ backgroundColor: '#fff', marginTop: 5 }}>
//                 <View>
//                     {this.state.image ? (
//                         <Image
//                             source={this.state.image}
//                             style={{ width: '100%', height: 300 }}
//                         />
//                     ) : (
//                         <Button
//                             onPress={this.selectImage}
//                             style={{ backgroundColor: '#eee' }}
//                             color='#000'
//                         >
//                             Add an image
//                         </Button>
//                     )}
//                 </View>
//                 <View style={{ marginTop: 5, alignItems: 'center' }}>
//                     <Input
//                         placeholder='title...'
//                         style={{ margin: 5 }}
//                         value={this.state.title}
//                         onChangeText={title => this.onChangeTitle(title)}
//                     />
//                     <Input
//                         placeholder='description...'
//                         style={{ margin: 5 }}
//                         value={this.state.description}
//                         onChangeText={description => this.onChangeDescription(description)}
//                     />
//                     <Button style={{ backgroundColor: '#eee' }} onPress={this.onSubmit}>
//                         Add post
//                     </Button>
//                 </View>
//             </View>
//         )
//     }
// }

// export default withFirebaseHOC(AddPost)


export default function AddPost() {
    return (
        <KeyboardAwareScrollView>
            <View style={container}>
                <Text>AddPost!</Text>
                <CommentInput />
            </View>
        </KeyboardAwareScrollView>
    )
}

const container = {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5
}