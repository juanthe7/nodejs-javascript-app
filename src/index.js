const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
//inicializations
const app = express();

//setings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views")); // le dice a node donde esta la carpeta views
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layauts"), //join une directorios// le estoy diciendo que layouts entra dentro de la carpeta views
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

//middlewares
app.use(morgan("dev")); //muestra mensaje por consola
app.use(express.urlencoded({ extended: false })); //aceptar datos desde los formulario los datos que mandan los usuarios
app.use(express.json()); //agregar json

//global variables
app.use((req, res, nest) => {
  next(); //toma la informacion del usuario y lo que el servidor quiera responder u toma una funcion para continuar con el resto del codigo
});

//routes // url del servidor
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));
//app.use(require("./routes/links"));

//public files// codigo que el navegador puede acceder
app.use(express.static);
//starting de server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
