const express = require("express");
const app = express();
const port = 3000;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta')

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
app.get("/pergunta", (req, res) => {
    
    res.render("perguntar")
})

app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                    
                })
    
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

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId);
    })
})

app.listen(port, () => {
    console.log("App rodando na porta: "+port);
})