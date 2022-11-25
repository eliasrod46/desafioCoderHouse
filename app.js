//-----------------------------------------------------------------------------------------------------
// -----------------------------------------------Server-----------------------------------------------
//-----------------------------------------------------------------------------------------------------
const express = require("express"); //-->servidorExpress
const http = require("http"); //-->servidorHTTP
const ioServer = (Server = require("socket.io")); //-->socketServer
const app = express(); //-->creoExpressServer
const serverHttp = http.createServer(app); //-->creoHttpServerConExpress
const io = ioServer(serverHttp); //-->creoSocketApp
module.exports = serverHttp; //-->exportoHttpServerConExpress

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------Modules-----------------------------------------------
//-----------------------------------------------------------------------------------------------------
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();

const { connectMG } = require("./config/configDB.js"); //-->importoConfigBBDD
const passPort = require("./utils/passport.js"); //-->importoConfigPassport
const {
  MONGO_URI,
  SECRET_KEY_SESSION,
} = require("./config/environmentConfig.js");
const { loggInfo, loggWarn, logger } = require("./middlewares/logger.js"); //-->importoConfigBBDD

//-----------------------------------------------------------------------------------------------------
// -------------------------------------------Config Modules-------------------------------------------
//-----------------------------------------------------------------------------------------------------
connectMG().catch((err) => logger.error(err));
passPort(passport);

//-----------------------------------------------------------------------------------------------------
//---------------------------------------------Middlewares---------------------------------------------
//-----------------------------------------------------------------------------------------------------
//--->Session

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: SECRET_KEY_SESSION,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000, // 10 min
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);
//--->Passport
app.use(passport.initialize());
app.use(passport.session());
//--->jsonEntry
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//--->otros
app.use("/public", express.static(__dirname + "/public"));

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------Motor de plantillas-----------------------------------------
//-----------------------------------------------------------------------------------------------------
app.set("views", "./views");
app.set("view engine", "ejs");

//-----------------------------------------------------------------------------------------------------
//------------------------------------------------Rutas------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//--->routes modules
const viewsRoutes = (router = require("./routes/views.routes"));
const apiFakeProductsRoutes =
  (router = require("./routes/fakeProducts.routes.js"));
const apiProductsRoutes = ({ router } = require("./routes/products.routes.js"));
const apiCarritosRoutes = (router = require("./routes/carritos.routes.js"));
const apiRandomsRoutes = (router = require("./routes/randoms.routes.js"));

//--->routes use
app.use(compression());
app.use("/", loggInfo, viewsRoutes);
app.use("/api/productos-test", loggInfo, apiFakeProductsRoutes);
app.use("/api/productos", loggInfo, apiProductsRoutes);
app.use("/api/carritos", loggInfo, apiCarritosRoutes);
app.use("/api/randoms", loggInfo, apiRandomsRoutes);

//--->404 routes
app.get("*", loggWarn, (req, res) => {
  res.status(404).render("routing-error", {});
});

//--------------------------------------------------------------------------------------
//----------------------------------------Socket----------------------------------------
//--------------------------------------------------------------------------------------
const { socketModule } = require("./utils/sockets/socket");
socketModule(io);
