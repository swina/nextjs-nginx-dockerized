/**
 * Main graphQL functions to proxy-call Pimcore GraphQL endpoints
 * 
 * clientQL     : create graphQL client automatic configuration see ./graphQLClient.js
 * endpoints    : retrieve available endpoints
 * config       : graphql queries configuration see ./config/schema.js
 * 
 * methods:
 * 
 * getListing   : get data for an endpoint
 * getItem      : get single record for an endpoint
 * 
 * 
 */
const { clientQL , endpoints } = require ( './graphQLClient' );
const schema  = require ( './config/schema' );
const { listingResolver , dataResolver, errorResolver } = require ('./resolver');
/**
 * getPostFields
 * get post fields required
 * 
 * @endpoint String (required)
 * 
 */

const getPostFields = (endpoint) => {
    return schema[endpoint].mutation.fields;
}

/** 
 * getListing
 * get data listing giving an endpoint
 * 
 * @enpoint String (required)
 * 
 * */ 
const getListing = async (endpoint)=>{
    console.log ( endpoint )
    try {

        const client = await clientQL( endpoint );
        const data = await client.request ( schema[endpoint].query.list );
        return await listingResolver ( endpoint , data , 'listName'  );

        //return await data[schema[endpoint].query.listName].edges.map(row=>row.node);
    } catch ( err ) {
        console.log ( err )
        return err;
    }
}

/**
 * getItem
 *  * get single record giving an endpoint and id
 * 
 * @enpoint String (required)   
 * @id Integer (required)
 * */ 
const getItem = async (endpoint,id) => {
    let params = {};
    params[schema[endpoint].query.params] = parseInt(id);
    try {
        let client = await clientQL( endpoint );
        const data = await client.request ( schema[endpoint].query.get ,  params  );
        return await dataResolver ( endpoint , data , 'getName' )
        //return await data[schema[endpoint].query.getName]
    } catch ( err ) {
        return err?.response?.errors 
                ? { error : err.response.errors[0].message } : err
    }
}

/** 
 * postItem
 * post data to endpoint
 * 
 * @enpoint String (required)
 * @formData Object (required)
 * */ 
const postItem = async (endpoint,formData) => {
    let params = formData;    
    let  key  = params[schema[endpoint].mutation.key]
    try {
        let client = await clientQL( endpoint );
        const data = await client.request ( schema[endpoint].mutation.create ,  { params: params , key: key } )
        //Pimcore GraphQL Data resolver
        return await Object.values(data)
    } catch ( err ) {
        let error = {}
        //Pimcore GraphQL Error resolver
        return { error: errorResolver ( endpoint , err , 'createName' ) }
    }
}




module.exports = { getPostFields , getListing , getItem , postItem }