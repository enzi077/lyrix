import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import Home from './Home'
import SearchChart from './SearchChart'

const HomeStack=createStackNavigator()

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="HomeScreen"
                component={Home}
                options={{title:"Home"},{ headerShown: false }}
            />
            <HomeStack.Screen 
                name="SearchChart"
                component={SearchChart}
                options={{ title: "Lyrics" },{headerShown:false}}
            />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen