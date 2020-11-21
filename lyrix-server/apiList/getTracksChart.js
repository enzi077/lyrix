const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLBoolean,
    GraphQLNonNull
}=require('graphql')

const trackType=new GraphQLObjectType({
    name: "Track",
    fields:()=>({
        track_name:{type: GraphQLString},
        track_id: {type: new GraphQLNonNull(GraphQLID)},
        has_lyrics: {type: GraphQLBoolean},
        artist_name: {type: GraphQLString}
    }),
})
const trackListType=new GraphQLObjectType({
    name:"TrackList",
    fields:()=>({
        track:{type: trackType}
    })
})
const bodyType=new GraphQLObjectType({
    name: "BodyChartTracks",
    fields:()=>({
        track_list: {type: new GraphQLList(trackListType)}
    })
})
const messageType=new GraphQLObjectType({
    name: "MessageChartTracks",
    fields:()=>({
        body:{type: bodyType}
    })
})
const chartTrackType=new GraphQLObjectType({
    name: "ChartTrackType",
    fields:()=>({
        message: {type: messageType}
    })
})

module.exports=chartTrackType