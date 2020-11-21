import React, { useEffect } from 'react';
import {
    StatusBar,
  StyleSheet,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import HomeStackScreen from './components/HomeStackScreen'
import SearchStackScreen from './components/SearchStackScreen'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import SplashScreen from 'react-native-splash-screen'

const Tab=createBottomTabNavigator()

const App=() => {
    useEffect(()=>{
        SplashScreen.hide()
    },[])
  return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor="#2d0679"
            />
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route})=>({
                        tabBarIcon:({focused, color, size})=>{
                            let iconName
                            
                            if(route.name==="Home"){
                                iconName=focused ? "home" : "home-outline"
                            }else if(route.name==="Search"){
                                iconName=focused ? "search" : "search-outline"
                            }
                            return <Icon name={iconName} color={color} size={size}/>
                        }
                    })}
                    tabBarOptions={{
                        activeTintColor:'#101656',
                        inactiveTintColor:'grey'
                    }}
                    initialRouteName="Home"
                    style={{position: 'absolute', bottom:'0'}}
                >
                    <Tab.Screen name="Home" component={HomeStackScreen}/>
                    <Tab.Screen name="Search" component={SearchStackScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;