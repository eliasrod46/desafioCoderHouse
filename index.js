const serverHttp = require("./app.js");

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------Levanto el servidor-----------------------------------------
//-----------------------------------------------------------------------------------------------------

serverHttp.listen(8080, () => {
  console.log(`Server escucnado en el puerto http://localhost:8080`);
});
