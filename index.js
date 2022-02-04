const custonExpress = require('./config/custonExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    }else {
        console.log("Conectado com sucesso")
        Tabelas.init(conexao)

        const app = custonExpress()
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})

