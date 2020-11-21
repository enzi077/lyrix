const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
}=require('graphql')

const artistType=new GraphQLObjectType({
    name: "ArtistDetails",
    fields:()=>({
        artist_name:{type: GraphQLString},
        artist_id: {type: GraphQLID}
    })
})

const artistListType=new GraphQLObjectType({
    name: "Artist",
    fields:()=>({
        artist:{type: artistType}
    })
})

const bodyType=new GraphQLObjectType({
    name: "Body",
    fields:()=> ({
        artist_list:{type: new GraphQLList(artistListType)}
    })
})

const messageType=new GraphQLObjectType({
    name: "Message",
    fields:()=> ({
        body: {type: bodyType}
    })
})

const mainType=new GraphQLObjectType({
    name: "Main",
    fields:()=>({
        message: {type: messageType}
    })
})

module.exports=mainType