// aula 29/outubro - consultas de recomendação
// 1 - filmes da Fernanda Torres
MATCH (f:Filme)-[e:Elenco]->(a:Artista)
WHERE a.nome =~ '(?i)^fernanda.*' AND a.nome =~ '(?i).*torres'
RETURN *

// 2 - elenco do Matrix
MATCH (f)-[e:Elenco]->(a)
WHERE f.titulo_original =~ '(?i).*matrix.*' 
RETURN * 

// 3 - filmes do Paulo Gustavo
MATCH (f:Filme)-[e:Elenco]->(a:Artista)
WHERE a.nome =~ '(?i)^paulo.*' AND a.nome =~ '(?i).*gustavo'
RETURN *

// 4 - quem trabalhou como ator/atriz nos filmes em qure atuou
// o Paulo Gustavo => 1o circulo 
MATCH (a1)<-[e1:Elenco]-(f:Filme)-[e2:Elenco]->(a2:Artista)
// WHERE a1.nome =~ '(?i)^paulo.*' AND a1.nome =~ '(?i).*gustavo'
// WHERE a1.nome =~ '(?i)^fernanda.*' AND a1.nome =~ '(?i).*torres'
WHERE a1.nome =~ '(?i)^robert.*' AND a1.nome =~ '(?i).*niro'
AND e2.tipo_participação =~ '(?i)act.*'
AND a1 <> a2
RETURN *

// 5 - Contagem quem trabalhou como ator/atriz nos filmes em que atuou
// o Paulo Gustavo => 1o circulo 
MATCH (a1)<-[e1:Elenco]-(f:Filme)-[e2:Elenco]->(a2:Artista)
WHERE a1.nome =~ '(?i)^paulo.*' AND a1.nome =~ '(?i).*gustavo'
// WHERE a1.nome =~ '(?i)^fernanda.*' AND a1.nome =~ '(?i).*torres'
// WHERE a1.nome =~ '(?i)^robert.*' AND a1.nome =~ '(?i).*niro'
AND e2.tipo_participação =~ '(?i)act.*'
AND a1 <> a2
RETURN a2.nome AS Trabalhou_junto, COUNT(*) AS Qtas_parcerias
ORDER BY Qtas_parcerias DESC

// 6 - quem trabalhou com os colegas do Paulo Gustavo ( amigos dos amigos)
//  segundo circulo
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2),
(a2)<-[e3:Elenco]-(f2:Filme)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^paulo gustavo'
// WHERE a1.nome =~ '(?i)^robert de niro'
AND e2.tipo_participação =~ '(?i)act.*'
AND e3.tipo_participação =~ '(?i)act.*'
AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN * 

// outra forma , usando a árvore completa
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f2:Filme)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^paulo gustavo'
// WHERE a1.nome =~ '(?i)^robert de niro'
AND e2.tipo_participação =~ '(?i)act.*'
AND e3.tipo_participação =~ '(?i)act.*'
AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN a1.nome, a2.nome AS Trabalhou_junto, a3.nome AS Trabalhou_comquem_trabalhou

// 7 - como o Paulo Gustavo chega no Fabio Porchat
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f2:Filme)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^paulo gustavo' AND 
a3.nome =~ '(?i)^f.bio porchat'
AND e2.tipo_participação =~ '(?i)act.*'
AND e3.tipo_participação =~ '(?i)act.*'
AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN a1.nome, a2.nome AS Trabalhou_junto, a3.nome AS Trabalhou_comquem_trabalhou

//8 - como o Wagner Moura  chega na Fernanda Montenegro
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f2:Filme)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^wagner moura' AND 
a3.nome =~ '(?i)^fernanda montenegro'
//AND e2.tipo_participação =~ '(?i)act.*'
//AND e3.tipo_participação =~ '(?i)act.*'
//AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN * 

// 9 - quantificar quem tem nais chances de apresentar Wagner Moura para
Fernanda Montenegro -> força do relacionamento
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f2:Filme)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^wagner moura' AND 
a3.nome =~ '(?i)^fernanda montenegro'
AND a1 <> a2 AND a1 <> a3
RETURN a2.nome AS Trabalhou_Montenegro,
COUNT(*) AS Força_relacionamento
ORDER BY Força_relacionamento DESC 

//10 - quantificar quem tem nais chances de apresentar Adam Sandler para
Robert de Niro -> força do relacionamento
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f2:Filme)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^adam sandler' AND 
a3.nome =~ '(?i)^robert de niro'
AND f1.generos =~'(?i).*comedy.*'
AND f2.generos =~'(?i).*comedy.*'
AND a1 <> a2 AND a1 <> a3
RETURN  a2.nome AS Trabalhou_DEniro,
COUNT(*) AS Força_relacionamento
ORDER BY Força_relacionamento DESC 