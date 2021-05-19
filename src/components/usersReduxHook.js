import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
// import  {getUserList} from '../store/reducers/listUsers';
import auth from '@react-native-firebase/auth';
function UsersReduxHook() {
    
    const [isLoading, setLoading] = useState(true);

    authenticateByFirebase = async() => {
      auth()
      .createUserWithEmailAndPassword('test1@gmail.com', '123456')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });    }

    useEffect (async() => {
      authenticateByFirebase();
      setLoading(false)
    },[])
    return (
        <View style={{ flex: 1, padding: 24 }}>
          <Text>Hello there{isLoading}</Text>
      </View>
    )
}

export default UsersReduxHook;