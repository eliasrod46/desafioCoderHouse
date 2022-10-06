//--------------------------------------------------------------------------------------
//----------------------------------------Server----------------------------------------
//--------------------------------------------------------------------------------------
const express = require("express");
const http = require("http");
const ioServer = (Server = require("socket.io"));
const app = express();
const serverHttp = http.createServer(app);
const io = ioServer(serverHttp);
module.exports = { serverHttp };

//--------------------------------------------------------------------------------------
//----------------------------------------Imports---------------------------------------
//--------------------------------------------------------------------------------------
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { connectMG } = require("./config/configDB.js");

//--------------------------------------------------------------------------------------
//-------------------------------------DDBB Connect-------------------------------------
//--------------------------------------------------------------------------------------
connectMG().catch((err) => console.log(err));

//--------------------------------------------------------------------------------------
//--------------------------------------Middlewares-------------------------------------
//--------------------------------------------------------------------------------------
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Secret = process.env.SECRET_COOKIES_KEY || "Codigo Secreto";
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:admin1234@cluster0.7zdpwk8.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      httpOnly: false,
      secure: false,
      // maxAge: 60000, // 1 minuto
      maxAge: 99960000,
    },
    secret: Secret,
    resave: false,
    saveUninitialized: false,
  })
);

//--------------------------------------------------------------------------------------
//----------------------------------Motor de Plantillas---------------------------------
//--------------------------------------------------------------------------------------
app.set("views", "./views");
app.set("view engine", "ejs");

//--------------------------------------------------------------------------------------
//-----------------------------------------Rutas----------------------------------------
//--------------------------------------------------------------------------------------

//--->Rutas Requires
const apiFakeProductsRoutes =
  (router = require("./routes/fakeProducts.routes.js"));
const viewsRoutes = ({ router } = require("./routes/views.routes.js"));
const apiProductsRoutes = ({ router } = require("./routes/products.routes.js"));
const apiCarritosRoutes = (router = require("./routes/carritos.routes.js"));

//--->Rutas use
app.use("/api/productos-test", apiFakeProductsRoutes);
app.use("/", viewsRoutes);
app.use("/api/productos", apiProductsRoutes);
app.use("/api/carritos", apiCarritosRoutes);

//--->ruta 404
app.all("*", (req, res) => {
  res.status(404).send("Ruta no encontrada");
});

//--------------------------------------------------------------------------------------
//----------------------------------------Socket----------------------------------------
//--------------------------------------------------------------------------------------
const { socketModule } = require("./utils/socket.js");
socketModule(io);
