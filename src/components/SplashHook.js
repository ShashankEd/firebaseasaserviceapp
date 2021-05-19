import React, {useEffect, useState } from 'react';
import {
    View,
} from 'react-native';
import { useSelector } from "react-redux";
function SplashHook(props) {
    const storeWhetherUserLoggedInResponse = useSelector(state=> state.storeWhetherUserLoggedIn);
    const [navigation, setNavigation] = useState(props.navigation);
    useEffect (async() => {
        // console.log("storeWhetherUserLoggedInResponse : ",storeWhetherUserLoggedInResponse);
        if(storeWhetherUserLoggedInResponse.flag) {
            navigation.navigate('ContentListHook')
        }
    },[])
    return (
        <View style={{ flex: 1, padding: 24}}></View>
    )
}

export default SplashHook;