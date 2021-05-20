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

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    authenticateByFirebase = async() => {
      if(validateEmail(email) && password!== '') {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          let obj = {
              flag : true
          }
          dispatch(storeWhetherUserLoggedIn(obj))
          navigation.navigate('ContentListHook');
        })
        .catch(error => {
          Alert.alert(error.code)
          setError(error.code)
          console.error(error);
        });  
      } else {
        Alert.alert("Please enter correct email/password");
      }
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
                <TextInput placeholder='Password' secureTextEntry={true} onChangeText={pass => setPassword(pass)}/>
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