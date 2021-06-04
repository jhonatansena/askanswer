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
    Pergunta.findAll({raw:true, order:[
        ['id', 'DESC']
    ]}).then(perguntas => {
        console.log(perguntas)
        res.render("index", {
            perguntas: perguntas
        }) ;
    });
    
})
app.get("/perguntar", (req, res) => {
    
    res.render("perguntar")
})

app.get("/perguntar/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("pergunta", {
                pergunta: pergunta
            })

        }else{
            res.redirect("/")
        }
    })
});

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