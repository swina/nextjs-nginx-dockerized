const { gql } = require ( 'graphql-request' );

const schema = {
        customers : {
            parentId: 2,
            query: {
                listName: 'getCustomerListing',
                list: gql`
                {
                    getCustomerListing {
                      edges {
                        node {
                          id
                          firstname
                          lastname
                          email
                          birthDate
                          city
                          zip
                          country
                          jobPosition
                          company
                          carBrand
                          carModel
                          buyFerrari
                          mobility
                          userCars { 
                            metadata {
                                name
                                value
                            }
                        }	
                        }
                      }
                    }
                }`,
                getName : 'getCustomer',
                get :  gql`
                query getCustomer($id:Int!){
                    getCustomer(id:$id) {
                        id
                        firstname
                        lastname
                        email
                        birthDate
                        city
                        zip
                        country
                        jobPosition
                        company
                        carBrand
                        carModel
                        buyFerrari
                        mobility
                        userCars {
                            metadata {
                                name
                                value
                            }
                        }	
                    }
                }`,
                params: 'id',
                metadata: 'userCars'
            },
            mutation : {
                createName: 'createCustomer',
                create : gql`
                    mutation ($params: UpdateCustomerInput, $key:String!){
                        createCustomer(input: $params, key:$key, parentId:2){
                                success
                                message
                                output {
                                    id
                                    firstname
                                    lastname
                                    email
                                    birthDate
                                }
                            }
                    }`,
                params: 'formData',
                key: 'email',
                fields: {
                    firstname: {
                        required: true,
                        type: "string"
                    },
                    lastname: {
                        required: true,
                        type: "string"
                    }, 
                    email : {
                        required: true,
                        type: "boolean"
                    },
                    birthDate: {
                        required: true,
                        type: "date"
                    },
                    phone: {
                        required: true,
                        type: "string"
                    },
                    zip: {
                        required: true,
                        type: "string"
                    },
                    jobPosition: {
                        required: false,
                        type: "string"
                    },
                    company: {
                        required: false,
                        type: "string"
                    },
                    revenue: {
                        required: false,
                        type: "string"
                    },
                    carBrand: {
                        required: false,
                        type: "string"
                    },
                    carModel: {
                        required: false,
                        type: "string"
                    },
                    mobility: {
                        required: false,
                        type: "string"
                    },
                    buyFerrari: {
                        required: false,
                        type: "boolean"
                    },
                    privacy: {
                        required: true,
                        type: "boolean"
                    },
                    active: {
                        required: false,
                        type: "boolean",
                        hidden: true
                    }
                }
            }
        },
        brands : {
            query: {
                listName: 'getBrandListing',
                list: gql`
                {
                    getBrandListing {
                      edges {
                        node {
                            id
                            brand
                            code
                            enabled
                        }
                      }
                    }
                }`,
            }
        },
        registrations : {
            parentId: 6,
            query: {
                name: 'getRegistrationsListing',
                list: gql`
                {
                    getRegistrationsListing  {
                        edges {
                            node {
                            id
                            firstname
                            lastname
                            city
                            zip
                            country
                            dob
                            jobposition
                            company
                            carBrand
                            carModel
                            buyFerrari
                            mobility
                  
                        }      
                      }
                    }
                }`,
                get :  gql`
                query getRegistrations($id:Int!){
                    getRegistrations(id:$id) {
                      firstname
                      lastname
                      dob
                      city
                      zip
                      country
                      
                    }
                }`,
                params: 'id'
            },
            mutation : {
                add : gql`
                    mutation ($params: UpdateRegistrationsInput, $key:String!){
                        createRegistrations(input: $params, key:$key, parentId:6){
                                success
                                message
                                output {
                                    id
                                    firstname
                                    lastname
                                    email
                                    dob
                                }
                            }
                    }`,
                params: 'formData',
                key: 'email',
                fields: ['firstname','lastname','dob','phone','city','zip','country','jobposition','company','revenue','carbrand','carmodel','mobility','buyferrari','privacy'],
                hidden: [ { field: 'active' , default: true }]
            }
        }
}

module.exports = schema;

//all endpoints configured
//export const endpoints = Object.keys(config.schema);