const mongoose=require("mongoose")
const mongoAtlasUri ="mongodb+srv://admin:admin@cluster0.jvnw2.mongodb.net/ciclo4?retryWrites=true&w=majority";

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Estamos conectadisimos a Mongoose")
    );

  } catch (e) {
    console.log("Error en conexion :(");
  }
