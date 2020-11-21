const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
}=require('graphql')
const mainType=require('./apiList/getArtistsChart')
const chartTrackType=require('./apiList/getTracksChart')
const trackLyricsType=require('./apiList/getLyricsTrack')
const trackSearchType=require('./apiList/getTrackSearch')
const matcherLyricsType=require('./apiList/getLyricsMatcher')
const artistGetType=require('./apiList/getArtist')
const axios=require('axios')
require('dotenv/config')


const RootQuery=new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        // get top 5 current artists
        resChartArtists:{
            type: mainType,
            resolve(parent,args){
                return axios.get(`http://api.musixmatch.com/ws/1.1/chart.artists.get?page_size=10&apikey=${process.env.API_KEY}`)
                            .then(res=>res.data)
            }
        },
        
        // get artists' details
        resArtistGet:{
            type: artistGetType,
            args:{
                artist_id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return axios.get(`http://api.musixmatch.com/ws/1.1/artist.get?artist_id=${args.artist_id}&apikey=${process.env.API_KEY}`)
                            .then(res=>res.data)
            }
        },
        
        // get top 5 current tracks 
        resChartTracks:{
            type: chartTrackType,
            resolve(parent,args){
                return axios.get(`http://api.musixmatch.com/ws/1.1/chart.tracks.get?page_size=10&apikey=${process.env.API_KEY}`)
                            .then(res=>res.data)
            }
        },
        
        // get track lyrics through track_id
        resTrackLyrics:{
            type: trackLyricsType,
            args:{
                track_id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return axios.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${args.track_id}&apikey=${process.env.API_KEY}`)
                            .then(res=>res.data)
            }
        },
        
        // get top 10 songs of an artist or any particular song with descending rating
        // (query possible thru particular lyrics words, or title or even artist)
        resTrackSearch: {
            type: trackSearchType,
            args:{
                q: {type: GraphQLString}
            },
            resolve(parent,args){
                if(args.q){
                    return axios.get(`http://api.musixmatch.com/ws/1.1/track.search?q=${args.q}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.API_KEY}`)
                                .then(res=>res.data)
                }
            }
        },
        
        // get track lyrics on the basis of lyrics keywords and artist name
        resMatcherLyrics:{
            type: matcherLyricsType,
            args:{
                q_track: {type: new GraphQLNonNull(GraphQLString)},
                q_artist: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                if(args.q_track && args.q_artist){
                    return axios.get(`http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${args.q_track}&q_artist=${args.q_artist}&apikey=${process.env.API_KEY}`)
                                .then(res=>res.data)
                }
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query: RootQuery
})
// sample track id: 15953433