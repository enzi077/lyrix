import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import SearchLyrics from './SearchLyrics'
import SearchFocus from './SearchFocus'
import SearchChart from './SearchChart'

const SearchStack=createStackNavigator()

const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen 
                name="SearchLyrics" 
                component={SearchLyrics}  
                options={{ title: "Search" },{ headerShown: false }}
            />
            <SearchStack.Screen 
                name="SearchFocus" 
                component={SearchFocus}  
                options={{ title: "Focused Search" },{ headerShown: false }}
            />
            <SearchStack.Screen 
                name="SearchChart"
                component={SearchChart}
                options={{ title: "Lyrics" },{headerShown:false}}
            />
        </SearchStack.Navigator>
    )
}

export default SearchStackScreen