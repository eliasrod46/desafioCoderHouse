const { serverHttp } = require("./app.js");

//start Server
const port = 8080;
const server = serverHttp.listen(port, () => {
  console.log(`The server is listening in port: ${port}`);
});
