const { resolveRequestDocument } = require('graphql-request');
const schema  = require ( './config/schema' );

const listingResolver = ( endpoint , data, qryName ) => {
    let resolvedData = data[schema[endpoint].query[qryName]].edges.map ( row => row.node )
    return resolvedData
}

const dataResolver = ( endpoint , data, qryName ) => {
    let resolvedData = data[schema[endpoint].query[qryName]]
    if ( schema[endpoint].query?.metadata ) {
        let reduceData = resolvedData[schema[endpoint].query.metadata]
        resolvedData[schema[endpoint].query.metadata] = reduceData.map(c=>c.metadata.map(m=>m.value)
            .map( v => v).join(';')
        )
        console.log ( resolvedData )//resolvedData[schema[endpoint].query[qryName]].map ( r => Object.values ( r.userCars ) ) )
    }
    return resolvedData
}

const errorResolver = ( endpoint , err , qryName ) => {
    let error = {}
    err?.response?.errors 
            ? error = err.response.data[schema[endpoint].mutation[qryName]] 
            : error = { error : err }
    return error
}


module.exports = { listingResolver , dataResolver , errorResolver }