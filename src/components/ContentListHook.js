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
function ContentListHook() {
    
    const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const storeWhetherUserLoggedInResponse = useSelector(state=> state.storeWhetherUserLoggedIn);
    const dispatch = useDispatch();

    authenticateByFirebase = async() => {
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let obj = {
            flag : true
        }
        dispatch(storeWhetherUserLoggedIn(obj))
        Alert.alert("Your are logged in")
      })
      .catch(error => {
        Alert.alert(error.code)
        setError(error.code)
        console.error(error);
      });   
    }

    useEffect (async() => {

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

export default ContentListHook;