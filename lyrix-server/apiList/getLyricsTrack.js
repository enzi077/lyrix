const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
}=require('graphql')

const lyricsType=new GraphQLObjectType({
    name: "LyricsType",
    fields:()=>({
        lyrics_id: {type: new GraphQLNonNull(GraphQLID)},
        lyrics_body: {type: GraphQLString},
        script_tracking_url: {type: GraphQLString},
        lyrics_copyright: {type: GraphQLString}
    })
})

const bodyType=new GraphQLObjectType({
    name: "BodyTrackLyrics",
    fields:()=>({
        lyrics: {type: lyricsType}
    })
})

const messageType=new GraphQLObjectType({
    name: "MessageTrackLyrics",
    fields:()=>({
        body: {type: bodyType}
    })
})

const trackLyricsType=new GraphQLObjectType({
    name:"TrackLyrics",
    fields:()=>({
        message: {type: messageType}
    })
})

module.exports=trackLyricsType