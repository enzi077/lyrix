import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery} from '@apollo/client'
import {CHART_ARTISTS, CHART_TRACKS, ARTIST_DETAIL} from '../utils/apolloQueries'
import { Appbar, Portal, Text, Title, Subheading, List, Divider,Card, Avatar, Modal, ActivityIndicator, Snackbar} from 'react-native-paper'
import {styles} from '../styles/homeStyles'

const LeftContent=(props)=> <Avatar.Icon {...props} icon="music-clef-treble"/>

const Home = ({navigation}) => {
    const [artistName,setArtistName]=useState('')
    const [artistRating,setArtistRating]=useState()
    const [id,setId]=useState()
    const [visible,setVisible]=useState(false)
    const [modal,setModal]=useState(false)
    const {
        loading: loadingChartArtists, 
        error: errorChartArtists, 
        data: dataChartArtists
    }=useQuery(CHART_ARTISTS)
    const {
        loading: loadingChartTracks, 
        error: errorChartTracks, 
        data: dataChartTracks
    }=useQuery(CHART_TRACKS)
    const {
        error:errorArtist,
        data:dataArtist
    }=useQuery(ARTIST_DETAIL,{
        skip:!id,
        variables:{artist_id: id}
    })
    
    // loaders and errors
    if(loadingChartArtists) return <ActivityIndicator style={{top:'50%'}}/>
    if(errorChartArtists) return(
        <Snackbar
            visible={visible}
            onDismiss={()=>setVisible(false)}
            duration={3000}
        >
            Error loading chart artists
        </Snackbar>
    )
    if(loadingChartTracks) return <ActivityIndicator style={{top:'50%'}}/>
    if(errorChartTracks) return(
        <Snackbar
            visible={visible}
            onDismiss={()=>setVisible(false)}
            duration={3000}
        >
            Error loading chart tracks
        </Snackbar>
    )
    if(errorArtist) return(
        <Snackbar
            visible={visible}
            onDismiss={()=>setVisible(false)}
            duration={3000}
        >
            Error loading artists details
        </Snackbar>
    )
    
    //functions
    const showModal=(id)=>{
        setId(id)
        setVisible(true)
    }
    const hideModal=()=>{
        setModal(false)
        setArtistName('')
        setArtistRating()
        setId()
    }
    
    // destructuring
    const {resChartArtists:{message:{body:{artist_list}}}}=dataChartArtists
    const {resChartTracks:{message:{body:{track_list}}}}=dataChartTracks
    
    if(visible && dataArtist){
        const {resArtistGet:{message:{body:{artist:{artist_name,artist_rating}}}}}=dataArtist
        setArtistName(artist_name)
        setArtistRating(artist_rating)
        setModal(true)
        setVisible(false)
    }
    
    //return
    return (
        <SafeAreaView>
            <Appbar.Header>
                <Appbar.Content title="Lyrix"/>
            </Appbar.Header>
            <ScrollView 
                style={styles.home__scrollView}
                overScrollMode='always'
                keyboardShouldPersistTaps='always'
            >
                <View style={styles.home__viewMain}>
                    <View style={styles.home__viewArtist}>
                        <Title>Top Chart Artists this week</Title>
                        <View>
                        {
                            artist_list.map(artistObj=>{
                                const {artist}=artistObj
                                return (
                                    <TouchableOpacity
                                        accessibilityRole="link"
                                        key={artist.artist_id}
                                        onPress={()=>showModal(artist.artist_id)}
                                    >
                                        <List.Item 
                                            title={artist.artist_name}
                                            left={props => <List.Icon {...props} icon="star"/>}
                                        />
                                        <Divider/>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                    </View>
                    {
                        modal &&
                        <Portal>
                            <Modal visible={modal} onDismiss={hideModal} contentContainerStyle={styles.home__modalStyle}>
                                <View style={styles.home__modalName}>
                                    <Title>Name: </Title> 
                                    <Subheading>{artistName}</Subheading>
                                </View>
                                <View style={styles.home__modalName}>
                                    <Title>Rating: </Title> 
                                    <Subheading>{artistRating}</Subheading>
                                </View>
                            </Modal>
                        </Portal>
                    }
                    <View style={styles.home__viewTrack}>
                        <Title>Top Chart Songs this week</Title>
                        {
                            track_list.map(trackObj=>{
                                const {track}=trackObj
                                const {track_name,track_id,artist_name}=track
                                return (
                                    <View style={styles.home__viewChartTrack} key={track_id}>
                                            <Card 
                                                key={track_id}
                                                onPress={()=>navigation.navigate('Home',{
                                                    screen: 'SearchChart',
                                                    params:{
                                                        trackId: track_id, 
                                                        trackName: track_name, 
                                                        artist: artist_name
                                                    }
                                                })}
                                                style={styles.home__card}
                                            >
                                                <Card.Title
                                                    title={track_name}
                                                    subtitle={`by ${artist_name}`}
                                                    left={LeftContent}
                                                />
                                            </Card>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home


