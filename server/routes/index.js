const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const model = require ( '../helpers/model');
const apiRoute = `${process.env.API_ENDPOINT}/${process.env.API_VERSION}`;
const schema = require ( '../helpers/graphql/config/schema' )

const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const endpoints = Object.keys ( schema )
console.log ( 'Main route: ' , apiRoute )
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {

  //Verify if x-api-key is present
  if ( !req.headers["x-api-key"] ) {
    //not found return status code 403
    res.status(403).send({error: 'Not authorized or invalid API key'})
    return
  } else {
    if ( req.headers["x-api-key"] === process.env.API_KEY ){
      //wrong api status code 403
      console.log(new Date() , req.method , '-' , req.url , '-' , req.params || req.query  || req.body  );
      next()
    } else {
      res.status(403).send({error: 'Not authorized or invalid API key'})
    }
  }
});

// define the home page route
router.get('/', function(req, res) {
  res.send('Nothing useful here');
});


/** 
 * get data listing giving an endpoint
 * 
 * @endpoint String (required)
 * 
 * @return Array (li)
 * 
 * */ 
router.get(`${apiRoute}/:endpoint` , async (req,res) => {
    const { endpoint } = req.params
    
    if ( !endpoints.includes ( endpoint ) ) { 
      console.log(new Date() , req.method , '-' , req.url , '- 400 -' , 'Route not available ' + endpoint    );
      res.status(400).send({error: 'Cannot GET ' + endpoint})
      return
    } 
    const data = await model.getListing ( endpoint )
    res.send ( await data )
})



/** 
 * get item giving an endpoint and id
 * 
 * @endpoint String (required)
 * 
 * @return Array (li)
 * 
 * */ 
router.get(`${apiRoute}/:endpoint/:id` , async (req,res) => {
    const { endpoint , id } = req.params
    if ( !endpoints.includes ( endpoint ) ) { 
      console.log(new Date() , req.method , '-' , req.url , '- 400 -' , 'Route not available ' + endpoint    );
      res.status(400).send({error: 'Cannot GET ' + endpoint})
      return
    }
    const data = await model.getItem ( endpoint , id )
    await data?.error
            ? res.status(400).send ( data )
            : res.send ( await data )
})


/** 
 * post data to a given endpoint 
 * 
 * @endpoint String (required)
 * @formData Object (required) in the request body
 * @return Object =>
 *          success
 *          message
 *          output {
 *              id
 *              firstname
 *              lastname
 *              email
 *              birthDate
 *          }
 * 
 * */ 
router.post(`${apiRoute}/:endpoint` , jsonParser , async (req,res) => {
    const { endpoint } = req.params
    const { formData } = req.body
    if ( !endpoints.includes ( endpoint ) ) { 
      console.log(new Date() , req.method , '-' , req.url , '- 400 -' , 'Route not available ' + endpoint    );
      res.status(400).send({error: 'Cannot POST ' + endpoint})
      return
    }
    const data = await model.postItem ( endpoint , req.body )
    await data?.error 
      ? res.status(400).send ( data.error )
      : res.send ( data )
}) 

module.exports = router;