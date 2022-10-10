//-----------------------------------------------------------------------------------------------------
// -----------------------------------------------Server-----------------------------------------------
//-----------------------------------------------------------------------------------------------------
const express = require("express");
const http = require("http");
const ioServer = (Server = require("socket.io"));
const app = express();
const serverHttp = http.createServer(app);
const io = ioServer(serverHttp);
module.exports = serverHttp;

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------Modules-----------------------------------------------
//-----------------------------------------------------------------------------------------------------
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require('dotenv').config()

const { connectMG } = require("./config/configDB.js");
const passPort = require("./utils/passport.js");
const {MONGO_URI, SECRET_KEY_SESSION} = require('./config/environmentConfig.js')

//-----------------------------------------------------------------------------------------------------
// -------------------------------------------Config Modules-------------------------------------------
//-----------------------------------------------------------------------------------------------------
connectMG().catch((err) => console.log(err));
passPort(passport);

//-----------------------------------------------------------------------------------------------------
//---------------------------------------------Middlewares---------------------------------------------
//-----------------------------------------------------------------------------------------------------
//--->Session

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:MONGO_URI,
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
const viewsRouter = (router = require("./routes/views.routes"));
const apiFakeProductsRoutes =
  (router = require("./routes/fakeProducts.routes.js"));
const apiProductsRoutes = ({ router } = require("./routes/products.routes.js"));
const apiCarritosRoutes = (router = require("./routes/carritos.routes.js"));

//--->routes use
app.use("/", viewsRouter);
app.use("/api/productos-test", apiFakeProductsRoutes);
app.use("/api/productos", apiProductsRoutes);
app.use("/api/carritos", apiCarritosRoutes);

//--->404 routes
app.get("*", (req, res) => {
  res.status(404).render("routing-error", {});
});

//--------------------------------------------------------------------------------------
//----------------------------------------Socket----------------------------------------
//--------------------------------------------------------------------------------------
const { socketModule } = require("./utils/sockets/socket");
socketModule(io);
