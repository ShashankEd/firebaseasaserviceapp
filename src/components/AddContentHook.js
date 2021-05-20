import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert
} from 'react-native';
import database from '@react-native-firebase/database';
import CheckBox from '@react-native-community/checkbox';
const myDB = database().ref("item");
function AddContentHook(props) {

    const [navigation, setNavigation] = useState(props.navigation);
    const [title, setTitle] = useState('');
    const [ischecked, setIsChecked] = useState(false);
    const [numOfChildren, setNumberOfChild] = useState(0)

    function addItem() {
      console.log("numOfChildren" , numOfChildren);
      myDB.push(
        {
          title: title,
          ischecked: ischecked,
          uid: numOfChildren + 1
        }
      );
      myDB.off();
    }
    useEffect (async() => {
      try {
        myDB.on(
          "value", dbSnap => {
            console.log("dbSnap =>", dbSnap.numChildren());
            setNumberOfChild(dbSnap.numChildren())
          })
      } catch(e) {
        console.log("DB error");
      }
      myDB.off();
    },[])
    return (
        <View style={{ flex: 1, padding: 24 }}>
          <View style={{flexDirection:'column',alignItems:'center',paddingBottom:20}}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Add New Item</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={title}
            onChangeText={title => setTitle(title)}
            placeholder="Enter title"
            style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
          />
          <CheckBox
            value={ischecked}
            onValueChange={(value) => setIsChecked(value)}
            style={{ alignSelf: "center",}}
          />
          <Button 
            title="Add"
            onPress={() => addItem()}/>
      </View>
    )
}

export default AddContentHook;