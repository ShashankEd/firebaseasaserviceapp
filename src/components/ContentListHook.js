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
import {
  storeWhetherUserLoggedIn
} from '../store/actions/action'
import database from '@react-native-firebase/database';
import CheckBox from '@react-native-community/checkbox';
import filter from 'lodash.filter';
const myDB = database().ref("item");
function ContentListHook(props) {
    const [navigation, setNavigation] = useState(props.navigation);
    const [isLoading, setLoading] = useState(true);
    const[items, setItem] = useState([]);
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = text => {
      const formattedQuery = text.toLowerCase();
      const filteredData = filter(items, item => {
        return contains(item.title, formattedQuery);
      });
      if(filteredData.length) {
        setItem(filteredData);
        setQuery(text);
      }
    };
    
    const contains = (title, query) => {
      if (title.includes(query)) {
        return true;
      }
      return false;
    };

    function renderHeader() {
      return (
        <View
          style={{
            backgroundColor: '#fff',
            padding: 10,
            marginVertical: 10,
            borderRadius: 20
          }}
        >
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={queryText => handleSearch(queryText)}
            placeholder="Search"
            style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
          />
        </View>
      );
    }

    function logout() {
      console.log("logout called....");
      let obj ={
        flag : false
      }
      dispatch(storeWhetherUserLoggedIn(obj));
      navigation.navigate('SignInHook');
    }

    function handleCheck(index){
      myDB.child(index+"").update(
        {ischecked: true}
      )
      myDB.off();
    }
    useEffect (async() => {
      try {
        myDB.on(
          "value", dbSnap => {
            console.log("dbSnap =>", dbSnap.val());
            setItem(dbSnap.val())
            setLoading(false)
          }
        )
      } catch(e) {
        console.log(e);
      }

    },[dispatch])
    return (
        <ScrollView style={{ flex: 1, padding: 24 }}>
          <View style={{flex:1, flexDirection:'column',alignItems:'flex-end',paddingBottom:20}}>
          <Text style={{fontSize:20, fontWeight:'bold', color:'black'}} onPress={() => logout()}>Logout</Text>
          </View>
        <Button 
          title="Add More"
          onPress = {() => navigation.navigate('AddContentHook')}/>
       {isLoading ? <Text>Loading.....</Text> 
       : <FlatList
          ListHeaderComponent={renderHeader}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item,index }) => (
            <View style={
              {
                flexDirection:'row',
                marginTop: 10,
                padding: 20,
                alignItems: 'center',
                backgroundColor: '#fff',
                width: '100%'
              }
            }>
              <Text style={{
          fontSize: 11
        }}>{item.title}</Text>
          <CheckBox
              value={item.ischecked}
              onValueChange={() => handleCheck(index)}
              style={{ alignSelf: "center",}}
            />
            </View>
          )}
        />}
      </ScrollView>
    )
}

export default ContentListHook;