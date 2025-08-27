use inventario_si
// mostrando os databases
show databases
// criando coleção empresa
db.empresa.drop()
db.empresa.insertOne({razao_social: 'Microsoft do Brasil Ltda', cnpj: 123456,
 endereco: {rua: 'Engenheiro Beerini', numero: 1000, bairro : 'Broklin', 
            cidade: 'Sao Paulo' } , fones: [1156564444, 1156562222] } )
			// digitei errado Berini para atualizar depois
// consultar
db.empresa.find({})
// inserindo mais de uma empresa
db.empresa.insertMany([{razao_social : 'Apple Corporation Brasil Ltda', 
    tipo_empresa: 'Fabricante', endereco: 'Av Brigadeiro Faria Lima, 100',
    bairro : 'Itaim Bibi', cidade: 'São Paulo', 
    fones: [{ddd:11, numero: 34567890}, {ddd:11, numero: 34569000}] },
{razao_social: 'ABC Equipamentos Ltda',
endereco: 'Av Goias, 1000 - Centro - São Caetano do Sul',
tipo_empresa: 'Fornecedor', tipo_produto: 'Hardware'}])
// atualizando um documento 
db.empresa.find({razao_social : 'Microsoft do Brasil Ltda' })
// uso do LIKE 
db.empresa.find({razao_social : /microsoft/i })
// update  - consertando o endereço da microsoft
db.empresa.updateOne({razao_social : /microsoft/i }, 
{$set: {"endereco.rua": 'Engenheiro Berrini'} })
// criando sem querer um dado repetido
// executando a linha 6 novamente -> 2 microsofts
db.empresa.deleteOne({_id : ObjectId("66bf741baca4170e93bfbefe")})
// incluindo o tipo de empresa na Microsoft
db.empresa.updateOne({razao_social : /microsoft/i }, 
{$set: {Tipo_empresa: 'Fabricante'}} )

// adicionar o ano de fundação das empresas
db.empresa.updateOne({razao_social: /microsoft/i}, {$set: {ano_fundacao:1975}})
db.empresa.updateOne({razao_social: /apple/i}, {$set: {ano_fundacao:1976}})
db.empresa.find()
// consultas com operadores numericos 
db.empresa.find({ano_fundacao: 1976})
db.empresa.find({ano_fundacao: {$eq: 1976}} )
// diferente 
db.empresa.find({ano_fundacao: {$ne: 1976}} )
// maior $gt , menor $lt , maior ou igual $gte , menor ou igual $lte
db.empresa.find({ano_fundacao: {$gt: 1976}} )
db.empresa.find({ano_fundacao: {$gte: 1975}} )
db.empresa.find({ano_fundacao: {$lte: 1975}} )
db.empresa.find({ano_fundacao: {$lt: 2000}} )
// usando o regex, expressão regular , forma antiga
db.empresa.find ({razao_social: {$regex: /brasil/i}})
db.empresa.find ({razao_social: /brasil/i}) // atualmente não precisa do regex 
// uso do OR ou AND 
// empresas Ltda ou ano fundação > 1970 ou fabricante 
db.empresa.find({$or: [{razao_social: {$not: /ltda/i}}, 
                       {ano_fundacao: {$gt: 1970}},
                       {tipo_empresa: /fabrica/i}]})
db.empresa.find({$and: [{razao_social: {$not: /ltda/i}}, 
                       {ano_fundacao: {$gt: 1970}},
                       {tipo_empresa: /fabrica/i}]})
 // outra forma de consulta com AND                     
db.empresa.find({razao_social:  /ltda/i , ano_fundacao: {$gt: 1970},
                 tipo_empresa: /fabrica/i})
// CRUD em vetores
db.empresa.find({razao_social: /abc/i})
db.empresa.updateOne({razao_social: /abc/i} , 
                     {$set: {fones: [1132001000, 1132002000]}})
// novo fone em ABC -> $push
db.empresa.updateOne({razao_social: /abc/i} , 
      {$push: {fones: {$each: [1134508000] } } } )
// atualizando o 2o fone da ABC 
db.empresa.find({razao_social: /abc/i, "fones": 1132002000} )
db.empresa.updateOne ({razao_social: /abc/i, "fones": 1132002000} , 
       {$set: {"fones.$": 1133003500} } ) 
// apagando um numero de telefone -> $pull 
db.empresa.updateOne ({razao_social: /abc/i, "fones" : 1132001000  } , 
 {$pull: {"fones" :1132001000 } } )
// consultas $regex conforme a posição do caracter
// string termina com caracter $ , termina com ponto , termina com tda 
db.empresa.find({razao_social: /tda$/i})
db.empresa.find({endereco: /sul$/i})
// string começa ^
db.empresa.find({endereco: /^av/i})
db.empresa.find({razao_social: /^m/i })
// caractere específico .*  -- empresas que tem comercio na razao 
db.empresa.find({razao_social: /corpo.*tion/i }) 
// sem usar os caracteres especiais
db.empresa.find({razao_social: /^a.*/i })
// consultando pelo endereço 
db.empresa.find({$or: [{endereco: /s.*o/i},{"endereco.cidade": /s.*o/i} ]})
db.empresa.find()












