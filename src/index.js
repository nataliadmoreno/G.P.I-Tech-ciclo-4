const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv=require("dotenv")
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config();

const {DB_URI, DB_NAME, JWT_SECRET} = process.env;

const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' });
const getUserFromToken = async (token, db) => {
  if (!token) {return null}
  const tokenData = jwt.verify(token, JWT_SECRET);
  if(!tokenData?.id){
    return null;  
  }
  return await db.collection('user').findOne({ _id: ObjectId(tokenData.id ) });
}


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const resolvers = {
    Query: {

      
      misProyectos: async(_, __, { db,  user }) => {            //ver lista de proyectos
        if ( !user ) { throw new Error('No esta autenticado, por favor inicie sesion'); }
        const rol = user.rol
        if ( rol=="Lider") {
            return await db.collection('proyectos')
                                    .find({ userIds: user._id })
                                    .toArray();
        }

        if ( rol=="Estudiante") {
          return await db.collection('proyectos')
                                  .find({ userIds: user._id })
                                  .toArray();
        }

        if ( rol=="Administrador") {
            return await db.collection('proyectos')
                                    .find()
                                    .toArray();
        }
      },
      
      getproyectos: async(_, { id }, { db, user }) => {         //ver proyectos por ID
        if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión');}
        return await db.collection('proyectos').findOne({ _id: ObjectId(id) });
      },

      misUsuarios: async(_, __, { db, user  }) => {              // ver lista de user
        if( !user ) { throw new Error('No esta autenticado, por favor inicie sesion'); }

        const rol = user.rol
        if ( rol=="Lider" )  {

          return await db.collection('user').find( {rol: "Estudiante"} ).toArray();
          
        }
        if (rol == "Administrador"){
         return await db.collection('user')
                                  .find()
                                  .toArray(); 
        }                             
      }, 

      getUsuarios: async(_, { id }, { db, user }) => {  //ver proyectos por ID
        if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión');}
        return await db.collection('user').findOne({ _id: ObjectId(id) });
      }

    },

  //Mutaciones
  Mutation: {
    signUp: async(root,{input},{db}) => {      //Registrarse
          const hashedPassword=bcrypt.hashSync(input.password)
          const newUser={  // creamos nuevo usuario
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

    signIn: async(root,{input},{db})=>{  //inicia sesion
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

    updateUsuarioAdmin: async(_,{id,status},{db, user }) =>{ // Actualizamos un usuario
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      const rol = user.rol
      if ( rol=="Administrador")  { 
        
        const result= await db.collection('user').updateOne({_id:ObjectId(id)
        },{ $set:{status} // se setea el nuevo nombre del proyecto
      })
      console.log("Usuario Actulizado correctamente")
      return await db.collection("user").findOne({_id:ObjectId(id)});//regresa los valores del proyecto Ingresado
      }
    },

    updateUsuarioLider: async(_,{id,status},{db, user }) =>{ // Actualizamos un usuario
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      const rol = user.rol
      if ( rol=="Lider")  { 
        
        const result= await db.collection('user').updateOne({_id:ObjectId(id)
        },{ $set:{status} // se setea el nuevo nombre del proyecto
      })
      console.log("Usuario Actulizado correctamente")
      return await db.collection("user").findOne({_id:ObjectId(id)});//regresa los valores del proyecto Ingresado
      }
    },


    updateUsuario: async(_,{id,nombre,apellido,identificacion,password},{db, user}) =>{ // Actualizamos un usuario
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
        const result= await db.collection("user").updateOne({_id:ObjectId(id)
        },{ $set:{nombre,apellido,identificacion,password} // se setea el nuevo nombre del proyecto
      })
      console.log("Usuario Actulizado correctamente")
      return await db.collection("user").findOne({_id:ObjectId(id)});//regresa los valores del proyecto Ingresado
    }, 


    createproyecto: async (root, {nombreProy,objGneral,objEspe,presupuesto,estadoPro,fase},{db, user}) =>{   //Registra un proyecto
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      const rol = user.rol
      if ( rol=="Lider") {
        const newproyecto={
          nombreProy,
          objGneral,
          objEspe,
          presupuesto,
          createdAt: new Date().toISOString(),
          estadoPro,
          fase,
          userIds: [user._id],
          userNames:[user.nombre],
          userApe:[user.apellido],
          userRol:[user.rol]
        }
        console.log("Proyecto creado correctamente")
        const result = await db.collection("proyectos").insertOne(newproyecto);
        return newproyecto
      }
    },
    
    updateproyectoAdmin: async(root,{id,estadoPro,fase}, {db, user}) =>{ // Actualizamos un proyecto
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      const rol = user.rol
      if ( rol=="Administrador") {
        const result= await db.collection("proyectos").updateOne({_id:ObjectId(id)
        },{ $set:{estadoPro,fase}, // se setea el nuevo nombre del proyecto
          
        })
        console.log("Proyecto Actulizado correctamente")
        return await db.collection("proyectos").findOne({_id:ObjectId(id)});//regresa los valores del proyecto Ingresado
      } 
    },


    updateproyectoLider: async(root,{id,nombreProy,objGneral,objEspe,presupuesto}, {db, user}) =>{ // Actualizamos un proyecto
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      const result= await db.collection("proyectos").updateOne({_id:ObjectId(id)
      },{ $set:{nombreProy,objGneral,objEspe,presupuesto}, // se setea el nuevo nombre del proyecto
          
    })
    console.log("Proyecto Actulizado correctamente")
    return await db.collection("proyectos").findOne({_id:ObjectId(id)});//regresa los valores del proyecto Ingresado
    },

    deleteproyecto: async(root, {id}, {db, user}) =>{ // elimina un proyecto
      if(!user){console.log("No esta autenticado, por favor inicie sesion")}
      await db.collection("proyectos").remove({_id:ObjectId(id)});
      console.log("Tarea Eliminada Correctamente")
      return true;
    },
    
     addUserProyecto: async(root,{proyectosId, userId}, {db,user}) =>{
      if(!user){console.log("No esta autenticado favor iniciar sesion")}
      const proyectos = await db.collection(proyectos).findOne({_id:ObjectId(proyectosId)});
      const usuario = await db.collection("user").findOne({_id:ObjectId(userId)});

      if(!proyectos){
        return null;
      }
      if(proyectos.userIds.find((dbId) => dbId.toString()===userId.toString())){
        return proyectos;
      }
      await db.collection("proyectos").updateOne({_id:ObjectId(proyectosId)
      },{
        $push:{
          userIds:ObjectId(userId),
          userNames:usuario.nombre,
          userRol:user.rol,
        }
      })
      proyectos.userIds.push(ObjectId(userId))
      proyectos.userNames.push(usuario.nombre)
      proyectos.userRol.push(usuario.rol)
      return proyectos;      
      } 

    },  

  //Parametroinmutable del user, id:_id

   user:{
    id:(root)=>{
      return root._id;
    }
  }, 


  proyectos:{
    id:({ _id, id })=> _id || id,

    user: async ({ userIds }, _, { db }) => Promise.all(
      userIds.map((userId) => (
        db.collection("user").findOne({ _id: userId }))
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
    misUsuarios: [user!]
    getUsuarios(id:ID!):user
  }
 


  type Mutation{
    signUp(input:SignUpInput):AutUser!
    signIn(input:SignInInput):AutUser!
    updateUsuarioAdmin(id:ID!, status:String):user!
    updateUsuarioLider(id:ID!, status:String):user!
    updateUsuario(id:ID!, nombre:String!, apellido:String!, identificacion:String!,password:String!):user!

    createproyecto(nombreProy:String!,objGneral:String!,objEspe:String!,presupuesto:Float!,estadoPro:String!,fase:String! ):proyectos!
    updateproyectoAdmin(id:ID!,estadoPro:String!,fase:String!):proyectos!
    updateproyectoLider(id:ID!, nombreProy:String!,objGneral:String!,objEspe:String!,presupuesto:Float!):proyectos!
    deleteproyecto(id:ID!):Boolean!

    addUserProyecto(proyectosId:ID!, userId:ID!):proyectos
  }


  input SignUpInput{

    mail: String!
    identificacion: String!
    nombre: String!
    apellido:String!
    password: String!
    rol: String!
    status:String!
  }
  input SignInInput{

    mail: String!
    password: String!
  }

  type AutUser{
    user:user!
    token: String!
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
