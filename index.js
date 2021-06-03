const express = require("express");
const app = express();
const port = 3000;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

connection.authenticate()
.then(() => {
    console.log("Autenticação feita com sucesso no banco de dados!")
})
.catch((msgErro) => {
    console.log(msgErro)
})

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use (express.urlencoded ({ extended: true }))
app.use (express.json())


app.get("/", (req, res) => {
    
    res.render("index")
})
app.get("/perguntar", (req, res) => {
    
    res.render("perguntar")
})

app.post("/salvarpergunta" ,(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricacao: descricao
    }).then(() => {
        res.redirect("/");
    })
        
})

app.listen(port, () => {
    console.log("App rodando na porta: "+port);
})