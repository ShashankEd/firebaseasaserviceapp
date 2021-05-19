import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TextInput
} from 'react-native';

function PropsHook(props) {
    const { data } = props;
    const [flag, setFlag]= useState(false)
    /**
    * Below effect is being called as componentDidMount, and componentDidUpdate
    */
    useEffect(
        () => {
            console.warn("props in Prop Hook", props)
            //if data is 10, then set flag to true, which will display one Text component in this hook
            if(data === 10) {
                setFlag(true)
            } else {
                setFlag(false)
            }
        }
    )
    return (
        <View>
            <Text style={{ fontSize: 50 }}> {data}</Text>
            {
                flag && <Text style={{fontSize : 20}}>Hi Shashank, you are set to true!</Text>
            }
        </View>
    )
}

export default PropsHook;