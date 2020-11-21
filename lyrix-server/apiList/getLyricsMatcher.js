const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
}=require('graphql')

const lyricsType=new GraphQLObjectType({
    name:"Lyrics",
    fields:()=>({
        lyrics_id: {type: new GraphQLNonNull(GraphQLID)},
        lyrics_body: {type: GraphQLString},
        script_tracking_url: {type: GraphQLString},
        lyrics_copyright: {type: GraphQLString}
    })
})

const bodyType=new GraphQLObjectType({
    name: "LyricsSearchType",
    fields:()=>({
        lyrics: {type: lyricsType}
    })
})

const messageType=new GraphQLObjectType({
    name:"BodyLyricsMatcher",
    fields:()=>({
        body:{type: bodyType}
    })
})
const matcherLyricsType=new GraphQLObjectType({
    name: "MessageLyricsMatcher",
    fields:()=>({
        message:{type: messageType}
    })
})

module.exports=matcherLyricsType