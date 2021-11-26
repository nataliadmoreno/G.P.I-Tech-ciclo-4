const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv=require("dotenv")
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config();

const {DB_URI, DB_NAME, JWT_SECRET} = process.env;

const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn:'30 days' });
const getUserFromToken = async (token, db) => {
  if (!token) {return null}
  const tokenData = jwt.verify(token, JWT_SECRET);
  if(!tokenData.id){
    return null;
  }
  return await db.collection('user').findOne({ _id: ObjectId(tokenData.id ) });
}


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const resolvers = {
    Query: {
      misProyectos: async(_, __, {db, user}) => {
        if(!user){throw new Error("No esta autenticado, por favor inicie sesion");}
        return await db.collection('proyectos').find({ userIds: user._id }).toArray();
      },

      getproyectos: async(_, { id }, { db, user }) => {  
        if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
        return await db.collection('proyectos').findOne({ _id: ObjectId(id) });
      }
    },

  //Mutaciones
  Mutation: {
      signUp: async(root,{input},{db}) => {      
          const hashedPassword=bcrypt.hashSync(input.password)
          const newUser={
            ...input,
            password:hashedPassword,
          }

      const result = await db.collection("user").insertOne(newUser);

      //Funcion asincrona que puede recibir 3 argumentos y regresar un objeto    
      return{
        user:newUser,
        token: getToken(newUser),
      }
    },

    signIn: async(root,{input},{db})=>{
      const user = await db.collection('user').findOne({ mail: input.mail });
      const isPasswordCorrect = user && bcrypt.compareSync(input.password, user.password);

      if (!user || !isPasswordCorrect) {
        throw new Error('Credenciales erroneas :(');
      }

      return {
        user,
        token: getToken(user),
      }
    },

    createproyecto: async (root, {nombreProy},{db, user}) =>{
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}

      const newproyecto={
        nombreProy,
        createdAt: new Date().toISOString(),
        userIds: [user._id,user.nombre,user.rol]
      }
      const result = await db.collection("proyectos").insertOne(newproyecto);
      return newproyecto
    },
    updateproyecto: async(root,{id,nombreProy},{db, user}) =>{
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      const result= await db.collection("proyectos").updateOne({_id:ObjectId(id)
      },{ $set:{nombreProy}
    })
    },

    deleteproyecto: async(root, {id}, {db, user}) =>{
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      await db.collection("proyectos").remove({_id:ObjectId(id)});
      console.log("Tarea Eliminada Correctamente")
      return true;
    }
  },  

  //Parametroinmutable del user, id:_id
  user:{
    id:(root)=>{
      return root._id;
    }
  },

  proyectos:{
    id:({_id, id})=> _id||id,

    user: async ({userIds}, root, {db}) => Promise.all(
      userIds.map(() => (
        db.collection("user").findOne({_id:userIds[0]}))
      )
    ),
  },

}



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const start = async () => {
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME)


  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async ({ req }) => {
      const user = await getUserFromToken(req.headers.authorization, db);
      console.log(user)
      return {
        db,
        user,
      }
    }, 
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  });
}
start();





  // A schema is a collection of type definitions (hence "typeDefs")
  // that together define the "shape" of queries that are executed against
  // your data.
  const typeDefs = gql`

  type Query{
    misProyectos: [proyectos!]!
    getproyectos(id:ID!):proyectos
  }

  type user{
    id: ID!
    mail: String!
    identificacion: String!
    nombre: String!
    apellido: String!
    password: String!
    rol: String!
    status: String!
  }

  type proyectos{
    id: ID!
    nombreProy: String!
    objGneral: String!
    objEspe: String!
    presupuesto: Float!
    createdAt: String!
    fechafin: String!
    user: [user!]!
    estadoPro: String!  
    fase: String!
  }

  type Mutation{
    signUp(input:SignUpInput):AutUser!
    signIn(input:SignInInput):AutUser!

    createproyecto(nombreProy:String!):proyectos!
    updateproyecto(id:ID!, nombreProy:String!):proyectos!
    deleteproyecto(id:ID!):Boolean!
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
    password: String!
  }

  type AutUser{
    user:user!
    token: String!
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
    createdAt: String!
    descrip: String!
    user:[user!]!
    ObserLider: String!
  }
 
`;
