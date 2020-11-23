import { useQuery } from '@apollo/client'
import React from 'react'
import { ScrollView,View } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TRACK_LYRICS} from '../utils/apolloQueries'
import { Appbar,Text,Title, Paragraph,Subheading,Divider, ActivityIndicator, Snackbar} from 'react-native-paper'
import {styles} from '../styles/searchChartStyles'

function SearchChart({route,navigation:{goBack}}) {
    let {trackId,trackName,artist}=route.params
    const {loading: loadingTrackLyrics, error: errorTrackLyrics, data: dataTrackLyrics}=useQuery(TRACK_LYRICS,
        {
            variables:{track_id: trackId}
        }
    )
    
    if(loadingTrackLyrics) return <ActivityIndicator style={{top:'50%'}}/>
    if(errorTrackLyrics) return(
        <Snackbar
            visible={visible}
            onDismiss={()=>setVisible(false)}
            duration={3000}
        >
            No lyrics available
        </Snackbar>
    )
    
    const {resTrackLyrics:{message:{body:{lyrics}}}}=dataTrackLyrics
  return (
        <SafeAreaView>
            <Appbar.Header>
                <Appbar.BackAction 
                    icon="arrow-back"
                    onPress={()=>goBack()}
                />
            </Appbar.Header>
            <ScrollView
                style={styles.searchChart__scrollView}
                overScrollMode='always'
                keyboardShouldPersistTaps='always'
            >
                <View key={lyrics.lyrics_id}>
                    <Title>{trackName}</Title>
                    <Subheading style={styles.searchChart__subheading}>{artist}</Subheading>
                    <Divider/>
                    <Paragraph style={styles.searchChart__para}>{lyrics.lyrics_body.split('...')[0]}</Paragraph>
                </View>
                <View>
                    <Text style={styles.searchChart__text}>{lyrics.lyrics_copyright}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
  );
}

export default SearchChart
