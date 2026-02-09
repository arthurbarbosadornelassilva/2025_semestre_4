// aula 29/outubro - consultas de recomendação
// 1- filmes da Fernanda Torres
MATCH (f)-[e:Elenco]->(a)
WHERE a.nome =~ '(?i)^fernanda.*' AND a.nome =~ '(?i).*torres'
RETURN * 

// 2 - elenco do matrix
MATCH (f)-[e:Elenco]->(a)
WHERE f.titulo_original =~ '(?i).*matrix.*' 
RETURN f, e, a 

// 3 - filmes do Paulo Gustavo
MATCH (f)-[e:Elenco]->(a)
WHERE a.nome =~ '(?i)^paulo.*' AND a.nome =~ '(?i).*gustavo'
RETURN * 

// 4 - quem trabalhou como ator nos filmes do Paulo Gustavo
MATCH (a1:Artista)<-[e1:Elenco]-(f:Filme)-[e2:Elenco]->(a2:Artista)
WHERE a1.nome =~ '(?i)^paulo.*' AND a1.nome =~ '(?i).*gustavo'
// WHERE a1.nome =~ '(?i).*fernanda.*' AND a1.nome =~ '(?i).*torres.*'
// WHERE a1.nome =~ '(?i).*robert.*' AND a1.nome =~ '(?i).*niro.*'    
AND e1.tipo_participação =~ '(?i)act.*'
AND e2.tipo_participação =~ '(?i)act.*'
AND a1 <> a2
RETURN *

// 5 - quantos trabalharam
MATCH (a1:Artista)<-[e1:Elenco]-(f:Filme)-[e2:Elenco]->(a2:Artista)
WHERE a1.nome =~ '(?i)^paulo.*' AND a1.nome =~ '(?i).*gustavo'
// WHERE a1.nome =~ '(?i).*fernanda.*' AND a1.nome =~ '(?i).*torres.*'
// WHERE a1.nome =~ '(?i).*robert.*' AND a1.nome =~ '(?i).*niro.*'    
AND e1.tipo_participação =~ '(?i)act.*'
AND e2.tipo_participação =~ '(?i)act.*'
AND a1 <> a2
RETURN a2.nome , COUNT(*) AS Qtas_parcerias
ORDER BY Qtas_parcerias DESC 

// 6 - segundo circulo
// quem trabalhou com os colegas do Paulo Gustavo ( amigos dos amigos)
MATCH (a1:Artista)<-[e1:Elenco]-(f1:Filme)-[e2:Elenco]->(a2:Artista),
(a2:Artista)<-[e3:Elenco]-(f3)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^paulo.*' AND a1.nome =~ '(?i).*gustavo'
AND e1.tipo_participação =~ '(?i)act.*'
AND e2.tipo_participação =~ '(?i)act.*'
AND e3.tipo_participação =~ '(?i)act.*'
AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN *
// outra forma é escrever a árvore completa
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f3)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^paulo gustavo.*'
AND e1.tipo_participação =~ '(?i)act.*'
AND e2.tipo_participação =~ '(?i)act.*'
AND e3.tipo_participação =~ '(?i)act.*'
AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN *


// 7 - caminho para um ator chegar a outro ator - caminho da recomendação
// como Paulo Gustavo pode ser apresentado ao Fabio Porchat
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f3)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^paulo gustavo.*'
AND a3.nome =~ '(?i).*f.bio porchat.*' 
AND e1.tipo_participação =~ '(?i)act.*'
AND e2.tipo_participação =~ '(?i)act.*'
AND e3.tipo_participação =~ '(?i)act.*'
AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN *

// 8 - caminho para um ator chegar a outro ator - caminho da recomendação
// como Wagner Moura pode ser apresentado a Fernanda Montenegro
// os artistas intermediários com qualquer tipo participação
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f3)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^wagner moura.*'
AND a3.nome =~ '(?i).*fernanda montenegro.*' 
AND e1.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
RETURN a2.nome , COUNT(*) AS Força_Relacionamento
ORDER BY Força_Relacionamento DESC 

// 9 - caminho para um ator chegar a outro ator - caminho da recomendação
// como Robert de Niro pode ser apresentado a Tarantino
// os artistas intermediários com qualquer tipo participação
MATCH (a1)<-[e1:Elenco]-(f1)-[e2:Elenco]->(a2)<-[e3:Elenco]-(f3)-[e4:Elenco]->(a3)
WHERE a1.nome =~ '(?i)^robert de niro.*'
// AND a3.nome =~ '(?i).*quentin tarantino.*' 
AND a3.nome =~ '(?i).*adam sandler.*' 
AND e1.tipo_participação =~ '(?i)act.*'
AND e2.tipo_participação =~ '(?i)act.*'
AND e3.tipo_participação =~ '(?i)act.*'
AND e4.tipo_participação =~ '(?i)act.*'
AND a1 <> a2 AND a1 <> a3
// RETURN * 
RETURN a2.nome , COUNT(*) AS Força_Relacionamento
ORDER BY Força_Relacionamento DESC 