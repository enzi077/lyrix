import {gql} from '@apollo/client'

export const CHART_ARTISTS=gql`
query ResChartArtists{
    resChartArtists{
        message{
            body{
                artist_list{
                    artist{
                        artist_name
                        artist_id
                    }
                }
            }
        }
    }
}
`

export const ARTIST_DETAIL=gql`
query ResArtistGet($artist_id: ID!){
    resArtistGet(artist_id: $artist_id){
        message{
            body{
                artist{
                    artist_id
                    artist_name
                    artist_rating
                }
            }
        }
    }
}
`

export const CHART_TRACKS=gql`
query ResChartTracks{
    resChartTracks{
        message{
            body{
                track_list{
                    track{
                        track_name
                        track_id
                        artist_name
                        has_lyrics
                    }
                }
            }
        }
    }
}
`
export const TRACK_LYRICS=gql`
query ResTrackLyrics($track_id: ID!){
    resTrackLyrics(track_id: $track_id){
        message{
            body{
                lyrics{
                    lyrics_id
                    lyrics_body
                    script_tracking_url
                    lyrics_copyright
                }
            }
        }
    }
}
`

export const TRACK_SEARCH=gql`
query ResTrackSearch($q: String){
    resTrackSearch(q: $q){
        message{
            body{
                track_list{
                    track{
                        track_id
                        track_name
                        artist_name
                        has_lyrics
                    }
                }
            }
        }
    }
}
`

export const LYRICS_MATCHER=gql`
query ResMatcherLyrics($q_track: String!,$q_artist: String!){
    resMatcherLyrics(q_track: $q_track, q_artist: $q_artist){
        message{
            body{
                lyrics{
                    lyrics_id
                    lyrics_body
                    script_tracking_url
                    lyrics_copyright
                }
            }
        }
    }
}
`