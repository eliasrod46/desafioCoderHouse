//Ver documentacion de mongoose y firebase para configurar bss y ver clase de firebase

//---------------------------------------------------------------------------------------------------------
//------------------------Base de datos para productos y mensajes(mongoDB-mongoose)------------------------
//---------------------------------------------------------------------------------------------------------

const mongoose = require("mongoose");

const connectMG = async () => {
  const uri =
    "mongodb+srv://admin:admin1234@cluster0.7zdpwk8.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(uri);
};

//---------------------------------------------------------------------------------------------------------
//----------------------------------Base de datos para carritos (Firebase)---------------------------------
//---------------------------------------------------------------------------------------------------------

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const dbFirebase = admin.firestore();

module.exports = { connectMG, dbFirebase };
