import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import {LYRICS_MATCHER} from '../utils/apolloQueries'
import {Paragraph,Text, ActivityIndicator} from 'react-native-paper'

const LyricsMatcher = ({track,artist}) => {
    const {loading: loadingLyricsMatcher,error: errorLyricsMatcher,data: dataLyricsMatcher}=useQuery(LYRICS_MATCHER,{
        variables:{q_track: track,q_artist: artist}
    })

    if(loadingLyricsMatcher) return <ActivityIndicator style={{top:'50%'}}/>
    if(errorLyricsMatcher) return <Text>{`${errorLyricsMatcher}`}</Text>
    
    const {resMatcherLyrics:{message:{body:{lyrics:{lyrics_copyright,lyrics_body}}}}}=dataLyricsMatcher
    return (
        <>
            {
                lyrics_body && lyrics_copyright &&
                <ScrollView overScrollMode='always'>
                    <Paragraph style={{opacity:0.8}}>{lyrics_body.split('...')[0]}</Paragraph>
                    <Paragraph style={{fontWeight: "bold"}}>{lyrics_copyright}</Paragraph>
                </ScrollView>
            }
        </>
    )
}

export default LyricsMatcher