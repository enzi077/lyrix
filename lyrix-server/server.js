const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const bodyParser=require('body-parser')
const schema=require('./schema.js')
const cors = require('cors')
require('dotenv/config')
const app=express()

app.use(cors())
app.use (bodyParser.json())
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log("Server has started");
})