const { ApolloServer, gql } = require('apollo-server');
const dotenv=require("dotenv")
dotenv.config();
const { MongoClient } = require('mongodb');
const {BD_URI,BD_NAME}= process.env;
const bcrypt=require("bcryptjs");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

type Query{
  misProyectos: [proyectos!]!
}

type user{
  id: ID!
  mail: String!
  identificacion: String!
  nombre: String!
  password: String!
  rol: String!
}

type proyectos{
  id: ID!
  nombreProy: String!
  objGneral: String!
  objEspe: String!
  presupuesto: String!
  fechain: String!
  fechafin: String!
  user: [user!]!
  estadoPro: String!  
  fase: String!
}

type inscripciones{
  id:ID!
  proyectos: [proyectos!]!
  user: [user!]!
  estadoIns: String!
  fechaIng: String!
  fechaEg: String!
}

type avances{
  id:ID!
  proyectos: [proyectos!]!
  fechaAv: String!
  descrip: String!
  ObserLider: String!
}

type Mutation{
  signUp(input:SignUpInput):AutUser!
  signIn(input:SignInInput):AutUser!

}

input SignUpInput{

  mail: String!
  identificacion: String!
  nombre: String!
  password: String!
  rol: String!
}
input SignInInput{

  mail: String!
  identificacion: String!
  nombre: String!
  password: String!
  rol: String!
}

type AutUser{
  user:user!
  token: String!
}
 
`;


  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      misProyectos: () => []
    },

  //Mutaciones
  Mutation: {
    signUp: async(root,{input},{db})=>{
        const hashedPassword=bcrypt.hashSync(input.password)
        const newUser={
          ...input,
          password:hashedPassword,
        }
    const result= await db.collection("user").insertOne(newUser);
    //Funcion asincrona que puede recibir 3 argumentos y regresar un objeto
    const user=result.ops[0]
    return{
      user,
      token:"token",
     }
  }
  },
  user:{
    id:(root)=>{
      return root.id;
    }
  }
}

  
  
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const start = async()=>{
    const client = new MongoClient(BD_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db=client.db(BD_NAME)

    const context={
      db,
    }

    const server = new ApolloServer({ typeDefs, resolvers,context });

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    });
}
start();