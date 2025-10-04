// novo BD Inventário
use inventario_t1s1
// coleção empresa
db.empresa.insertOne(  { razao_social: "Microsoft do Brasil Ltda",
endereco: "Av. Engenheiro Berrini, 1000- Bloco Diamante - Brooklin- São Paulo", cnpj: 123456 , fones: [11998877654, 1136551000],
tipo_empresa: "Fabricante"    }   )
db.empresa.find()
// mais de um documento
db.empresa.insertMany(  [   {razao_social: "ABC Comércio de Equipamentos", cnpj: 789012, 
endereco: {logradouro: "Avenida Goiás", numero: 500, bairro: "Barcelona",
cidade: "São Caetano do Sul", uf: "SP"} }  ,  
{razao_social: "Meta Corporation do Brasil Ltda", 
tipo_empresa: "Fabricante", endereco_completo: "Avenida Brigadeiro Faria Lima, 2000 - Torre Platina - Pinheiros - São Paulo" , 
fones: [ {ddd:11, numero: 35651000} , {ddd:11, numero: 35652000}  ] }   ] ) 
// excluindo o docto a mais da Microsoft, duplicidade
db.empresa.deleteOne( { _id : ObjectId("68b03801c1765056392bc0d9") } )
// consultas simples
// empresas do tipo fabricante
db.empresa.find( { tipo_empresa: "Fabricante"  })
// empresas do tipo fabricante - busca inexata, similar ao LIKE 
db.empresa.find( { tipo_empresa: /fabrica/i  })
// empresas não fabricantes  $not só vale para string, qdo é numero é $ne - not equal
db.empresa.find( { tipo_empresa: {$not: /fabrica/i } })
// mais de um argumento de consulta AND e operadores de comparação
// $gt > greater than , $lt < lower than, $eq = equal , $ne != not equal
// $not diferente só para texto, $gte >= greater than or equal,
// $lte <= lower than or equal
db.empresa.find( { razao_social : /brasil/i , cnpj : {$gt: 100000} } )
// operador OR , empresas que são Ltda ou são Fabricantes
db.empresa.find( {$or : [   {razao_social: /ltda/i }  , 
                                         {tipo_empresa: /fabrica/i}  ]  }  )
                                         // operador AND - tem ltda e não é fornecedor
db.empresa.find( {$and : [   {razao_social: /ltda/i }  , 
                                         {tipo_empresa: {$not: /fornece/i}  }  ]  }  )
// mostrar as empresas com endereço em cidades com a palavra São
// problema : documentos com estrturas diferentes para endereço
// busca tem que atuar sobre cada estrutura diferente
db.empresa.find( { $or : [  {endereco: /são/i }, 
{ "endereco.cidade" : /são/i },   { endereco_completo: /são/i }    ]   } )
// atualizando ABC com o campo tipo empresa
db.empresa.updateOne({razao_social: /abc/i } , 
{$set: {tipo_empresa: "Fornecedor" }} )

// aula 04/setembro - Manipulação de vetores + Relacionamento entre Coleções
// criando vetor de fones para ABC Comércio, regex ^ palavra começa com
db.empresa.find( {razao_social: /^abc/i } )
db.empresa.updateOne( {razao_social: /^abc/i }  , 
{$set: {fones: [1142393000, 1142395050]  }  } )
// incluindo dois novos fones para ABC
db.empresa.updateOne( {razao_social: /^abc/i }  , 
{$push: {fones: {$each: [1142398899, 1142392223] }  }  } )
// atualizando um elemento do vetor fones
db.empresa.updateOne( {razao_social: /^abc/i  , "fones": 1142395050}  , 
{$set: {"fones.$" : 1142397777 } } ) 
// excluindo um elemento do vetor
db.empresa.updateOne( {razao_social: /^abc/i }  , 
{$pull : {"fones" : 1142393000 } } ) 
// nova coleção equipamento
db.equipamento.drop()
db.equipamento.find()
db.equipamento.insertOne({patrimonio: 100, marca: 'Dell', tipo_eqpto: 'Computador',
caracteristicas: {processador: "I7", memoria_GB: 16, armazenamento_GB: 512,
velocidade_GHZ: 3.3 , tipo_computador: "Notebook" }    } )
// periferico
db.equipamento.insertOne({patrimonio: 101, marca: 'Microsoft', tipo_eqpto: 'Periférico',
caracteristicas: {tipo_periferico: "Mouse Optico", resolucao_dpi: 800, botoes: 3,
conexao: "sem fio"} , fornecedor: 789012 } ) 
// atualizar o Computador com os dados do fornecedor
db.equipamento.updateOne( {patrimonio: 100}, 
{$set: {fornecedor: 789012, dt_aquisicao: ISODate("2025-02-07T10:45:23.999Z") ,
valor_aquisicao: 3979.75 } } ) 
// relacionar os dados de empresa x equipamento - aggregate + $lookup (junção)
// mostrar o fornecedor de cada equipamento -> empresa fornecedora
db.equipamento.aggregate( [
   {$match: {"fornecedor" : {$exists: true} } },
   // junção com o $lookup
   { $lookup: 
          { from: "empresa" ,
            localField: "fornecedor" ,
            foreignField: "cnpj" ,
            as : "Fornecedor_eqpto" 
           }  }  ] )

// mesma consulta mas mostrando somente alguns dados, não todos
db.equipamento.aggregate( [
   {$match: {"fornecedor" : {$exists: true} } },
   // junção com o $lookup
   { $lookup: 
          { from: "empresa" ,
            localField: "fornecedor" ,
            foreignField: "cnpj" ,
            as : "Fornecedor_eqpto"  }   } ,
    {$unwind: "$Fornecedor_eqpto" }, 
    {$project: { _id: 0 , marca: 1 , tipo_eqpto: 1, caracteristicas: 1, 
                      "Fornecedor_eqpto.razao_social"  : 1, "Fornecedor_eqpto.fones" : 1 } }  ]  )

// mesma consulta mas partindo de empresa para equipamento
// quais equipamentos cada fornecedor forneceu
db.empresa.aggregate( [
   {$match: {"cnpj" : {$exists: true} , tipo_empresa: /fornece/i }  },
   // junção com o $lookup
   { $lookup: 
          { from: "equipamento" ,
            localField: "cnpj" ,
            foreignField: "fornecedor" ,
            as : "Eqptos_fornecidos"  }   } ,
    {$unwind: "$Eqptos_fornecidos" } ,
   {$project: { _id: 0 , razao_social: 1 , endereco: 1 , "fones" : 1 ,
                    "Eqptos_fornecidos.marca": 1 ,  "Eqptos_fornecidos.tipo_eqpto": 1,
                     "Eqptos_fornecidos.caracteristicas" : 1 } } ] ) 



