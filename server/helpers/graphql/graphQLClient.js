const { GraphQLClient , gql } = require ( 'graphql-request' );
const schema = require ( './config/schema' );

//set graphQL URL based on NODE_ENV
let uri
process.env.NODE_ENV === 'production' ? uri = process.env.PIMCORE_GRAPHQL_URL : uri = process.env.PIMCORE_GRAPHQL_URL

//graphQL client configuration
const graphQLConfig = {
    url: uri,
    headers: {
        'X-Api-Key' : process.env.PIMCORE_API_KEY,
    }
}

//all endpoints availables
const endpoints = Object.keys(schema);


/**
 * Create a graphQLClient based on general client configuration (graphQLConfig) + endpoint
 * 
 * @param {string} endpoint (required): must be one of available endpoints
 * @returns graphqlClient
 * 
 */
const clientQL = async ( endpoint ) => {
    //compose endpoint url
    let url = `${graphQLConfig.url}${endpoint}`;
    //require headers X-API-KEY
    if ( graphQLConfig.headers ){
        try {
            return new GraphQLClient( url , { headers : graphQLConfig.headers })
        } catch ( err ) {
            console.log ( err );
            return false
        }
    } else {
        return false
    }
};

module.exports =  { clientQL , endpoints }
