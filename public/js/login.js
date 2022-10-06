//-------------------------------------------------------------------------------
//-----------------------------------formLogin-----------------------------------
//-------------------------------------------------------------------------------
//Boton send msg
const sendLogin = document.getElementById("sendLogin");

sendLogin.addEventListener("click", async (e) => {
  const username = document.getElementById("username").value;
  // datos mandados con la solicutud POST
  fetch("http://localhost:8080", {
    method: "POST",
    body: JSON.stringify({ username: username }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
});
