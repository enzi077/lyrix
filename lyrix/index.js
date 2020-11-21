import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {Provider as PaperProvider} from 'react-native-paper'
import {theme} from './utils/theme'


const client=new ApolloClient({
    uri: 'https://powerful-plateau-43624.herokuapp.com/graphql',
    cache: new InMemoryCache()
})

const Root=()=>(
    <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
            <App/>
        </PaperProvider>
    </ApolloProvider>
)
AppRegistry.registerComponent(appName, () => Root);
