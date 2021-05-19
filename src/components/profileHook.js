import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
import PropsHook from './propsHook';
function Counter() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState("test")
    /**
     * Below effect is being called as componentDidMount, and componentDidUpdate
     */
    // useEffect (
    //     () => {
    //         console.warn("eseEffect called upon UI reload", count, name)
    //     }
    // )
    return (
        <View>
            <Text style={{ fontSize: 100 }}> {count}</Text>
            <Button title="Increment Count" onPress={() => setCount(count + 1)}></Button>
            <Button title="Decrement Count" onPress={() => setCount(count - 1)}></Button>
            <Text style={{ fontSize: 20 }}> {name}</Text>
            <TextInput placeholder="Enter your name" onChangeText={(name) => setName(name)}></TextInput>
            <PropsHook data={count} />
        </View>
    )
}

export default Counter;