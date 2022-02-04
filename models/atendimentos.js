const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimentos {
    adiciona(atendimento, res) {

        const dateCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dateCriacao)
        const clienteValido = atendimento.cliente.length >= 5

        const validacao = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual!'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'O nome do cliente precisa conter 5 ou mais caracteres!'
            }
        ]

        const erros = validacao.filter(campo => !campo.valido)
        const existemErros = erros.length
        if(existemErros){
            res.status(400).json(erros)
        }else{
            
            const atendimentoDatado = {...atendimento, dateCriacao, data}
        
            const sql = 'INSERT INTO Atendimentos SET ?'
            
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(resultados)
                }
            })
        }        
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultado)
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new Atendimentos