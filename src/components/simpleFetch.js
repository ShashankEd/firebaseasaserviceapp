import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
function SimpleFetchHook() {
    
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    
    getUsers = async() => {
        try {
            let response = await fetch(
                'https://reqres.in/api/users?page=2'
            );
            let responseJson = await response.json();
            if(responseJson) {
                const {data} = responseJson
                setUsers(data)
                setLoading(false)
            }
        } catch(e) {
            console.log("Error ", e);
        }
    }
    useEffect (async() => {
        getUsers()
    },[])
    return (
        <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <Text>Loading...</Text> : 
        ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
           <FlatList
              data={users}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>User : {item.email}</Text>
              )}
            />
          </View>
        )}
      </View>
    )
}

export default SimpleFetchHook;