const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
}=require('graphql')

const artistType=new GraphQLObjectType({
    name: "ArtistGetDetails",
    fields:()=>({
        artist_id:{type: GraphQLID},
        artist_name: {type: GraphQLString},
        artist_rating: {type: GraphQLInt}
    })
})
const bodyType=new GraphQLObjectType({
    name: "BodyGetArtist",
    fields:()=>({
        artist:{type: artistType}
    })
})
const messageType=new GraphQLObjectType({
    name:"MessageGetArtist",
    fields:()=>({
        body:{type: bodyType}
    })
})
const artistGetType=new GraphQLObjectType({
    name:"ArtistGet",
    fields:()=>({
        message: {type: messageType}
    })
})
module.exports=artistGetType