import App from './app'
import React from 'react';
import ReactDOM from 'react-dom';
import { GraphQLClient } from 'graphql-request'
import { Admin } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server';
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "react-apollo"
import { graphql, withApollo } from 'react-apollo'
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';

const myBuildQuery = introspection => (fetchType, resource) => {
    const builtQuery = buildQuery(introspection)(fetchType, resource);
    if (resource === 'expositions' && fetchType === 'GET_LIST') {
        return {
            // Use the default query variables and parseResponse
            ...builtQuery,
            // Override the query
            query: gql`
                query {
                    data: {
                      expositions {
                        domain
                        id
                        ctaText
                        ctaUrl
                        description
                        influencer {
                          name
                          profilePic {
                            url
                          }
                        }
                        videos {
                          videoUrl
                        }
                        instagramPosts {
                          url
                        }
                      }
                    }
                }`,
        };
    }
    return builtQuery;
};

const RootContainer = document.getElementById("root");

// const client = new ApolloClient({
//   uri: "https://api-euwest.graphcms.com/v1/cjldl8gtb00qs01ciijssz1zr/master"
// })

const fetchType = 'GET_LIST'
const resource = 'expositions'

const dataProvider = buildGraphQLProvider({
  client: "https://api-euwest.graphcms.com/v1/cjldl8gtb00qs01ciijssz1zr/master",
  buildQuery: myBuildQuery(fetchType, resource)
})

// const dataProvider = buildGraphQLProvider({ clientOptions: client })
// console.log(dataProvider)
// const client = new GraphQLClient("https://api-euwest.graphcms.com/v1/cjldl8gtb00qs01ciijssz1zr/master")
// const dataProvider = jsonServerProvider('https://api-euwest.graphcms.com/v1/cjldl8gtb00qs01ciijssz1zr/master');

const RootComponent = () => (
    // <ApolloProvider client={client}>
      <App dataProvider={dataProvider}/>
    // </ApolloProvider>
)

ReactDOM.render(<RootComponent />, RootContainer)
