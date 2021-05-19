import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TextInput,
    Button,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import auth from '@react-native-firebase/auth';
import {
    storeWhetherUserLoggedIn
} from '../store/actions/action'
function SignInHook(props) {
    
    const [isLoading, setLoading] = useState(true);
    const [navigation, setNavigation] = useState(props.navigation);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const storeWhetherUserLoggedInResponse = useSelector(state=> state.storeWhetherUserLoggedIn);
    const dispatch = useDispatch();

    // registerUser = async(email, password) => {
    //     auth()
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(() => {
    //         console.log('User account created & signed in!');
    //     })
    //     .catch(error => {
    //         if (error.code === 'auth/email-already-in-use') {
    //         console.log('That email address is already in use!');
    //         }

    //         if (error.code === 'auth/invalid-email') {
    //         console.log('That email address is invalid!');
    //         }

    //         console.error(error);
    //     });
    // }

    authenticateByFirebase = async() => {
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let obj = {
            flag : true
        }
        dispatch(storeWhetherUserLoggedIn(obj))
        // Alert.alert("Your are logged in")
        navigation.navigate('ContentListHook');
      })
      .catch(error => {
        Alert.alert(error.code)
        setError(error.code)
        console.error(error);
      });   
    }

    useEffect (async() => {
    console.log("props", props, navigation)
    },[dispatch])
    return (
        <View style={{ flex: 1, padding: 24 }}>
           <ScrollView style={{padding: 100, paddingTop: 100}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Email' onChangeText={email => setEmail(email)} />
                <TextInput placeholder='Password' onChangeText={pass => setPassword(pass)}/>
                <View style={{margin:7}} />
                <Button 
                          onPress={() => authenticateByFirebase()}
                          title="Submit"
                    />
                  </ScrollView>
      </View>
    )
}

export default SignInHook;