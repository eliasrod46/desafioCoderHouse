const serverHttp = require("./app.js");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs
  .default({
    p: 8080,
  })
  .alias({
    p: "port",
  }).argv;

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------Levanto el servidor-----------------------------------------
//-----------------------------------------------------------------------------------------------------

const PORT = args.port;
serverHttp.listen(PORT, () => {
  console.log(`Server escucnado en el puerto http://localhost:${PORT}`);
});
