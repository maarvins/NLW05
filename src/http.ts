
import express from "express";
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import path from "path";



//importar database = vai importar o index.ts, mesmo só colocando o nome da pasta...
import "./database";

import {routes} from "./routes";

const app = express();

//gerando caminho da pasta PUBLIC, onde estarão os arquivos publicos 
//(mais especificamente os files do front-end)
app.use(express.static(path.join(__dirname,"..","public"))); //__dirname: acessar a pasta atual , "..": retornar uma pasta, diretamenta para a RAIZ, "public": acessar a pasta public
app.set("views", path.join(__dirname,"..", "public"));
app.engine("html", require("ejs").renderFile); 
app.set("view engine"," hmtl");

app.get("/pages/client", (request, response) => {
  return response.render("html/client.html")
})


const http = createServer(app); //Criando protocolo HTTP 
const io  = new Server(http);// Criando protocolo WEBSOCKET (WS)

io.on("connection", (socket:Socket) => { 
  console.log("Se conetcou", socket.id);
});

app.use(express.json());

app.use(routes);

export {http,io}; 