const mysql = require("mysql");
const { promisify } = require("util");
const { database } = require("./keys");

const pool = mysql.createPool(database); //genera la conexion a la base de datos

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONECCTION WAS CLOSES");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("DATABASE HAS TOO MANY CONNECTIONS");
    }
    if (err.code === "ECONNREFUSED") {
      console.log("DATABASE CONNECTION WAS REFUSED");
    }
  }
  if (connection) connection.release();
  console.log("BD is connected");
  return;
});
pool.query = promisify(pool.query); // cada vez que haga una consulta uso promesas
module.exports = pool;
