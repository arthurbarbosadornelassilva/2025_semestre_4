//Atividade 04: Banco NO-SQL – MongoDB
//Utilizando o comando aggregate e group na base importada do IMDB , responda às seguintes consultas:
//a) Faça a conversão na coleção movie para o campo votes (votos). Tente “limpar” a maior parte dos dados.
use movie
db.movie.aggregate ( [
    {$match: {movie: {$ne : null}}},
    {$group : {_id: null,
              contagem : {$count: {} }])
db.movie.updateMany({}, {$rename : {"movie":"votes"}})
db.movie.find({votes: {$ne: ""}}).forEach( function(x){
  x._id = x._id ;
  x.votes = parseInt(x.votes) ;
db.movie.replaceOne({_id:x._id}, x ) } ) ;
db.movie.find({votes: NaN}).count()
db.movie.updateMany({votes: NaN}, {$set: {votes: null}})
db.movie.find()

//b) Mostre o total de votos por Gênero de filme com mais de 10 mil votos
db.movie.aggregate ([
    {$match: {total_votos: { $gt: 10000 }}},
    {$unwind: "$genre"},
    { $group : { _id: {genero: "$genre"},
              contagem_votos : {$sum: "$votes"} } },
    {$sort: { total_votos: -1 }}
])
//db.movie.find()

//c) Mostre o filme com a maior votação.
db.movie.aggregate ([
  { $match: {directors: {$ne: null}}},
  {$unwind: "$directors"},
  { $group : { _id: {direcao: "$directors"},  
              contagem_direcao : {$count : {} } } },
{$match: {contagem_direcao: {$lte: 2} }}, 
{$sort : { contagem_direcao: -1 , _id : 1}]) // ordena pela contagem depois nome do diretor


//d) Mostre o total de votos por país e idioma.
db.movie.aggregate ([
    {$unwind: "$countries"},
    {$unwind: "$languages"},
  { $group : { _id: {país: "$countries",idioma: "$languages"}
              contagem_pais_idioma : {$count : {} } } },
             {$sort : { contagem_pais_idioma: -1  } },
{$project :{País: "$_id.país", Idioma: "$_id.idioma", contagem_pais_idioma: 1, _id: 0} } ]) 

//e) Mostre a média da duração dos filmes por ano de lançamento.
db.actor.find()
db.actor.updateMany({}, {$rename: {"reason_of_death": "motivo_obito"}})
db.actor.updateMany({}, {$rename: {"date_of_death": "data_obito"}})
db.actor.aggregate([
{$match: { data_obito: {$ne: null}, motivo_obito: {$ne: null}}},
{$group: {_id: {motivo_obito:  "$motivo_obito" },
          contagem: {$count: {} } } },
    {$match: { contagem : {$gte: 100}}},      
    {$sort: {contagem: -1}} ] )