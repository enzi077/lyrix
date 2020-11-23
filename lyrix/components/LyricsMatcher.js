import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import {LYRICS_MATCHER} from '../utils/apolloQueries'
import {Paragraph,Text, ActivityIndicator, Title, Subheading, Divider, Snackbar} from 'react-native-paper'
import {styles} from '../styles/lyricsMatcherStyles'

const LyricsMatcher = ({track,artist}) => {
    const {loading: loadingLyricsMatcher,error: errorLyricsMatcher,data: dataLyricsMatcher}=useQuery(LYRICS_MATCHER,{
        variables:{q_track: track,q_artist: artist}
    })

    if(loadingLyricsMatcher) return <ActivityIndicator style={{top:'50%'}}/>
    if(errorLyricsMatcher) return (
        <Snackbar
            visible={visible}
            onDismiss={()=>setVisible(false)}
            duration={3000}
        >
            No lyrics available
        </Snackbar>
    )
    
    
    const {resMatcherLyrics:{message:{body:{lyrics:{lyrics_copyright,lyrics_body}}}}}=dataLyricsMatcher
    return (
        <>
            {
                lyrics_body && lyrics_copyright &&
                <ScrollView overScrollMode='always'>
                    <Title style={styles.lyricsMatcher__title}>{track}</Title>
                    <Subheading style={styles.lyricsMatcher__subheading}>{artist}</Subheading>
                    <Divider/>
                    <Paragraph style={styles.lyricsMatcher__lyricsBody}>{lyrics_body.split('...')[0]}</Paragraph>
                    <Paragraph style={styles.lyricsMatcher__lyricsCopyright}>{lyrics_copyright}</Paragraph>
                </ScrollView>
            }
        </>
    )
}

export default LyricsMatcher