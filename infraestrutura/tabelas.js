const { text } = require("body-parser")
const { status } = require("express/lib/response")
const { KEYBCS2_BIN } = require("mysql/lib/protocol/constants/charsets")
const { VARCHAR, NULL } = require("mysql/lib/protocol/constants/types")

class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXIST Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico VARCHAR(20) NOT NULL, data DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, status VARCHAR(20) NOT NULL, observacao text, PRIMARY KEY(id))'
        
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            }else{
                console.log('Tabela Atendimento criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas