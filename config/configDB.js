const {MONGO_URI} = require('./environmentConfig.js')

//---------------------------------------------------------------------------------------------------------
//------------------------Base de datos para productos y mensajes(mongoDB-mongoose)------------------------
//---------------------------------------------------------------------------------------------------------

const mongoose = require("mongoose");

const connectMG = async () => {
  await mongoose.connect(MONGO_URI);
};

//---------------------------------------------------------------------------------------------------------
//----------------------------------Base de datos para carritos (Firebase)---------------------------------
//---------------------------------------------------------------------------------------------------------

const admin = require("firebase-admin");

const serviceAccount = {
  type: process.env.FB_TYPE,
  projectId: process.env.FB_PROJECTID,
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY,
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: process.env.FB_AUTH_URI,
  token_uri: process.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const dbFirebase = admin.firestore();

module.exports = { connectMG, dbFirebase };

