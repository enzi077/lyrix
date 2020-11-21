const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLBoolean
}=require('graphql')

const trackResultType=new GraphQLObjectType({
    name: "TrackSearch",
    fields:()=>({
        track_id:{type: new GraphQLNonNull(GraphQLID)},
        track_name: {type: GraphQLString},
        artist_name: {type: GraphQLString},
        has_lyrics: {type: GraphQLBoolean}
    })
})

const trackListType=new GraphQLObjectType({
    name: "TrackListSearch",
    fields:()=>({
        track:{type: trackResultType}
    })
})
const bodyType=new GraphQLObjectType({
    name: "TrackListType",
    fields:()=>({
        track_list: {type: new GraphQLList(trackListType)}
    })
})

const messageType=new GraphQLObjectType({
    name: "BodyTrackSearch",
    fields:()=>({
        body: {type: bodyType}
    })
})

const trackSearchType=new GraphQLObjectType({
    name:"MessageTrackSearch",
    fields:()=>({
        message:{type: messageType}
    })
})

module.exports=trackSearchType