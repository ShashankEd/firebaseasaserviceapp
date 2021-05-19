/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   View,
 } from 'react-native';
 

 import 'react-native-gesture-handler';
 import {Provider} from 'react-redux';
 import {PersistGate} from 'redux-persist/integration/react';
 import {get as _get} from 'lodash';
 import {store, persistor} from './src/store/configStore';
 import { LogBox } from 'react-native';
 LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
 LogBox.ignoreAllLogs();//Ignore all log notifications
 
import AddContentHook from './src/components/AddContentHook';
import ContentListHook from './src/components/ContentListHook';
import SignInHook from './src/components/SignInHook';
import SplashHook from './src/components/SplashHook';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
  function App() {
   return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.mainContainer}>
           <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashHook'>
              <Stack.Screen name="SplashHook" component={SplashHook} options={{header:  ()=> null}}/>
              <Stack.Screen name="SignInHook" component={SignInHook} options={{ title: 'Login' ,eaderLeft: ()=> null }}/>
              <Stack.Screen name="ContentListHook" component={ContentListHook}  options={{header:  ()=> null}}/>
              <Stack.Screen name="AddContentHook" component={AddContentHook} options={{ title: 'Add Item' }}/>
            </Stack.Navigator>
           </NavigationContainer>
           </SafeAreaView>
       </PersistGate>
     </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   mainContainer: {
    flex: 1,
    justifyContent: 'center',
   }
 });
 
 export default App;
 