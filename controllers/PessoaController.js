const { Pessoa } = require ('../models/');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

class PessoaController {

    /* CRUD */

    async myData(req,res) {
        //console.log(req.userId)
        /* ID do Usuário está em : req.userId */
        try {
            const pessoa_encontrada = await Pessoa.findByPk(req.userId);
            if (pessoa_encontrada)
                res.status(200).json(pessoa_encontrada)
            else 
                res.status(200).json({mensagem: "Pessoa não encontrada, erro"});
        }
        catch(e) {
            res.status(400).json({error: e.message});
        }
        res.status(200).json({req: req.headers});
    }

    async login(req,res) {
        let email = req.body.email;
        let senha = req.body.senha;

        try {
            const pessoa_encontrada = await Pessoa.findOne({
                attributes: ['id','nome', 'email','createdAt','updatedAt'],
                where: {
                    [Op.and]: [
                        { 
                            email: {
                            [Op.eq]: email,
                            }
                        }, 
                        {                       
                            senha: {
                                [Op.eq]: senha,
                            }                  
                        }      
                    ]
                }
            }); 

            if (pessoa_encontrada) {
                const token = jwt.sign(
                    {id: pessoa_encontrada.id},
                    process.env.ACCESS_SECRET, {
                    expiresIn: 1500
                });

                return res.status(200).json({
                    auth: true,
                    token: token,
                    nome: pessoa_encontrada.nome,
                    email,
                });  
            }                
            else 
                return res.status(200).json({mensagem: "Usuário ou senha inválido"})                     
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }
    }

    async create(req,res) { /* POST */
        try {
            console.log(req.body)
            const pessoa = await Pessoa.create(req.body);
            return res.status(200).json(pessoa);
        }
        catch (e) {
            return res.status(200).json({error: e});
        }
    }

    async readAll(req,res) { /* GET ALL */
        try {
            const pessoas = await Pessoa.findAll({
                attributes: ['id','nome', 'email','createdAt','updatedAt']
            }); /* SEQUELIZE findAll */
            return res.status(200).json(pessoas)            
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }
    }

    async readOne(req,res) { /* GET ONE */

    }

    async update(req,res) { /* PUT */

    }

    async delete(req,res) { /* DELETE */

    }
}

module.exports = new PessoaController();