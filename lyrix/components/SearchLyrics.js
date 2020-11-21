import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { View } from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
import {TRACK_SEARCH} from '../utils/apolloQueries'
import { Appbar, Text, TextInput, Button, Card, Avatar, ActivityIndicator, Snackbar} from 'react-native-paper'
import {styles} from '../styles/searchLyricsStyles'

const LeftContent=(props)=> <Avatar.Icon {...props} icon="music-clef-treble"/>
const SearchLyrics = ({navigation}) => {
    const [searchText,setSearchText]=useState('')
    const [query,setQuery]=useState()
    const [trackList,setTrackList]=useState()
    const [visible,setVisible]=useState(false)
    const [notifyUpd,setNotifyUpd]=useState(false)
    const {loading: loadingTrackSearch,error: errorTrackSearch, data: dataTrackSearch}=useQuery(TRACK_SEARCH,
        {
            skip: !query || query===null || query===undefined,
            variables:{q:query}
        }
    )
    
    const searchLyrics=()=>{
        if(searchText!==undefined || searchText!==null || searchText!==''){
            setQuery(searchText)
        }
        setVisible(true)
        setNotifyUpd(true)
        setSearchText('')
    }
    
    if(loadingTrackSearch) return <ActivityIndicator style={{top:'50%'}}/>
    if(errorTrackSearch) return <Text>{`${errorTrackSearch}`}</Text>
    
    if(dataTrackSearch && notifyUpd){
        const {resTrackSearch:{message:{body:{track_list}}}}=dataTrackSearch
        setTrackList(track_list)
        setNotifyUpd(false)
    }
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Search"/>
            </Appbar.Header>
            <ScrollView
                style={styles.searchLyrics__scrollView}
                overScrollMode='always'
            >
                <TextInput
                    onChangeText={(text)=>setSearchText(text)}
                    placeholder="Search lyrics"
                    label="Search lyrics"
                    mode="outlined"
                    style={styles.searchLyrics__input}
                />
                <Button
                    disabled={!searchText}
                    mode="contained"
                    dark={true}
                    onPress={searchLyrics}
                    style={styles.searchLyrics__btnSearch}
                >
                    Search
                </Button>
                <Button
                    color="#4C0AD1"
                    mode="contained"
                    dark={true}
                    onPress={()=>navigation.navigate('Search',{
                        screen:'SearchFocus'
                    })}
                    style={styles.searchLyrics__btnSearchFocus}
                >
                    Focused Search
                </Button>
                <View style={styles.searchLyrics__view}>
                {
                    dataTrackSearch && trackList &&
                    trackList.map(trackObj=>{
                        const {track}=trackObj
                        const {track_id,track_name,has_lyrics,artist_name}=track
                        if(has_lyrics){
                            return(
                                    <Card
                                        style={styles.searchLyrics__card}
                                        onPress={()=>navigation.navigate('Search',{
                                            screen:'SearchChart',
                                            params:{
                                                trackId: track_id, 
                                                trackName: track_name, 
                                                artist: artist_name
                                            }
                                        })}
                                        key={track_id}
                                    >
                                        <Card.Title
                                            title={track_name}
                                            subtitle={`by ${artist_name}`}
                                            left={LeftContent}
                                        />
                                    </Card>
                            )
                        }
                    })
                }
                {
                    visible && !dataTrackSearch &&
                    <Snackbar
                        visible={visible}
                        onDismiss={()=>setVisible(false)}
                        duration={3000}
                    >
                        No lyrics available
                    </Snackbar>
                }
                </View>
            </ScrollView>
        </>
    )
}

export default SearchLyrics
