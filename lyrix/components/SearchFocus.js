import React, { useEffect, useState } from 'react'
import { ScrollView} from 'react-native-gesture-handler'
import LyricsMatcher from './LyricsMatcher'
import {Appbar,TextInput, Button} from 'react-native-paper'
import {styles} from '../styles/searchFocusStyles'
import { Keyboard, View } from 'react-native'

const SearchFocus = ({navigation}) => {
    const [searchTrack,setSearchTrack]=useState('')
    const [searchArtist,setSearchArtist]=useState('')
    const [queryTrack,setQueryTrack]=useState('')
    const [queryArtist,setQueryArtist]=useState('')
    const [ticker,setTicker]=useState(false)
    
    const loadLyricsMatcher=()=>{
        setQueryArtist(searchArtist)
        setQueryTrack(searchTrack)
        setSearchTrack('')
        setSearchArtist('')
        setTicker(true)
        Keyboard.dismiss()
    }
    
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction 
                    icon="arrow-back"
                    onPress={()=>navigation.navigate('Search',{
                        screen: "SearchLyrics"
                    })}
                />
            </Appbar.Header>
            <ScrollView
                style={styles.searchFocus__scrollView}
                overScrollMode='always'
                keyboardShouldPersistTaps='always'
            >
                <TextInput
                    onChangeText={(text)=>setSearchTrack(text)}
                    placeholder="Track name"
                    label="Track name"
                    mode="outlined"
                    style={styles.searchFocus__input}
                />
                <TextInput
                    onChangeText={(text)=>setSearchArtist(text)}
                    placeholder="Artist name"
                    label="Artist name"
                    mode="outlined"
                    style={styles.searchFocus__input}
                />
                <Button
                    disabled={!searchTrack || !searchArtist}
                    onPress={loadLyricsMatcher}
                    mode="contained"
                    dark={true}
                    style={styles.searchFocus__btnSearch}
                >
                    Search
                </Button>
                <View style={styles.searchFocus__viewLyrics}>
                {
                    ticker &&
                    <LyricsMatcher track={queryTrack} artist={queryArtist}/>
                }
                </View>
            </ScrollView>
        </>
    )
}

export default SearchFocus