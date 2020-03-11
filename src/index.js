const express = require("express");
const morgan = require("morgan");
//inicializations
const app = express();

//setings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev")); //muestra mensaje por consola

//global variables

//routes // url del servidor
app.use(require("./routes/index"));
//public files// codigo que el navegador puede acceder

//starting de server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
