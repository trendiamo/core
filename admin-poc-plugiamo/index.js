import App from './app'
import React from 'react';
import ReactDOM from 'react-dom';
import { GraphQLClient } from 'graphql-request'
import { Admin } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server';
import gql from 'graphql-tag'
import { compose, withProps, withState, lifecycle, branch, renderNothing } from 'recompose'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "react-apollo"
import { graphql, withApollo } from 'react-apollo'
// import graphql from 'graphql'
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';

const RootContainer = document.getElementById("root");

const myClient = new ApolloClient('https://api-euwest.graphcms.com/v1/cjldl8gtb00qs01ciijssz1zr/master');

const dataProvider = buildGraphQLProvider({ clientOptions: myClient })

const RootComponent = () => (
    // <ApolloProvider client={client}>
      <App dataProvider={dataProvider}/>
    // </ApolloProvider>
)

ReactDOM.render(<RootComponent />, RootContainer)
