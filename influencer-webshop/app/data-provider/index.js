import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';
import ApolloClient from 'apollo-boost'
// import buildOpenCrudProvider, { buildQuery } from 'ra-data-opencrud';

const client = new ApolloClient({
  uri: "https://api-euwest.graphcms.com/v1/cjldl8gtb00qs01ciijssz1zr/master"
})

const myBuildQuery = introspection => (fetchType, resource, params) => {
    const builtQuery = buildQuery(introspection)(fetchType, resource, params);

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

export default buildGraphqlProvider({ buildQuery: myBuildQuery })
