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

//aula 30/agosto - relacionamento com outras coleções - join 
// nova coleção equipamento
db.equipamento.drop()
db.equipamento.insertOne({patrimonio: 100, marca: "Dell" , tipo: "Computador",
    caracteristicas : {processador: "I7", memoriaGB: 16, armazenamentoGB: 500,
                       tipo_computador : 'Notebook' } } )
db.equipamento.find()
db.equipamento.insertOne({patrimonio: 101 , marca : "Samsung", tipo: "Periferico",
    caracteristicas: {tipo_periferico: "Monitor LED", resolucao: "1900x1200",
                      tamanho_pol: 27 } } ) 
db.empresa.find({tipo_empresa: /fornec/i})
db.empresa.updateOne({razao_social: /abc/i}, 
{$set : {cnpj: 98765 } } ) 
// relacionar equipamento com fornecedor 
db.equipamento.updateOne({patrimonio: 100}, {$set: {cnpj_forn: 98765 } } )
// colocando a data de aquisição 
db.equipamento.updateOne({patrimonio: 100} , 
 {$set : {dt_aquisicao : ISODate("2024-04-10T15:35:45.000Z"} } )
db.equipamento.find({patrimonio: 100})
// relacionando as duas coleções eqpto e fornecedor - cnpj em comum 
// equipamentos dos fornecedores 
db.empresa.aggregate([
    {$lookup:   // equivale ao join
      {from : "equipamento",  // coleção que vai relacionar
       localField: "cnpj",    // campo em comum da empresa
       foreignField: "cnpj_forn",  // campo em comum do equipamento 
       as : "fornecimento" } } ] )  // resultado é um vetor com os eqptos 
// filtrando somente quem tem cnpj 
db.empresa.aggregate([
    {$match :{"cnpj": {$exists: true}, tipo_empresa : /fornec/i}} , // where
    {$lookup:   
      {from : "equipamento",  
       localField: "cnpj",    
       foreignField: "cnpj_forn",  
       as : "fornecimento" } } ] )
// atualizando o fornecedor para o periferico 101
db.equipamento.updateOne({patrimonio: 101}, 
{$set: {cnpj_forn: 98765, dt_aquisicao : ISODate("2024-05-15T20:35:45.000Z"} } )
db.equipamento.find()
// exibindo somente os campos que interessam, $project 
db.empresa.aggregate([
    {$match :{"cnpj": {$exists: true}, tipo_empresa : /fornec/i}} , // where
    {$lookup:   
      {from : "equipamento",  
       localField: "cnpj",    
       foreignField: "cnpj_forn",  
       as : "fornecimento" } } , 
    {$unwind: "$fornecimento"} , 
    {$project: {razao_social: 1, cnpj:1, fones: 1 ,
        "fornecimento.tipo": 1, "fornecimento.marca": 1, _id: 0 } } ] )
// where também para os equipamentos 
db.empresa.aggregate([
    {$match :{"cnpj": {$exists: true}, tipo_empresa : /fornec/i}} , // where
    {$lookup:   
      {from : "equipamento",  
       localField: "cnpj",    
       foreignField: "cnpj_forn",  
       as : "fornecimento" } } , 
    {$unwind: "$fornecimento"} ,
    {$match: {"fornecimento.tipo" : /comput/i}} ,
    {$project: {razao_social: 1, cnpj:1, fones: 1 ,
        "fornecimento.tipo": 1, "fornecimento.marca": 1, 
        "fornecimento.caracteristicas.processador" : 1 , _id: 0 } } ] )
// fornecedor a partir do equipamento
db.equipamento.aggregate([  // equipamento JOIN empresa
    {$lookup:  
      {from : "empresa",  
       localField: "cnpj_forn",  
       foreignField: "cnpj", 
       as : "fornecedor" } } ] )
// alocação do periferico 101 ao computador 100
db.equipamento.updateOne ({patrimonio:100} , 
{$set: { perifericos_alocados: [{patrimonio_perif: 101,
                              dt_alocacao: new Date() }] } } ) 
db.equipamento.find ({patrimonio:100} )
// exibindo o equipamento e os perifericos instalados 
db.equipamento.aggregate([
    {$match: {"perifericos_alocados.patrimonio_perif": {$exists:true} } },
    {$lookup:
      {from: "equipamento" ,
       localField: "perifericos_alocados.patrimonio_perif" ,
       foreignField: "patrimonio" ,
       as: "perifericos_instalados"    } } ] )






                              




                       













