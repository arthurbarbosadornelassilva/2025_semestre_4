# basic_flutter

Projeto que fiz pra estudar os conceitos iniciais do framework Flutter

Nor arquivos da pasta 'lib' estão escritas anotações que buscam especificar a funcionalidade de cada comando abordado.
Já aqui em README, estarão especificados conceitos mais teoricos sobre o Flutter

Em resumo é isso, bons estudos!

--//--

Sobre Widgets:

- Widget: Um Widget é uma descrição imutável de parte de uma interface gráfica;
- StatelessWidget: Descreve parte de uma interface gráfica utilizando outros Widgets."Sem estado" significa que aquilo que ele exibe depende apenas de sua configuração própria e do objeto BuildContext que recebe no método build;
- StatefulWidget: Descreve parte de uma interface gráfica utilizando outros Widgets. "Com estado" significa que aquilo que ele exibe depende de informações que podem ser obtidas externamente quando ele é construído e que também podem ser alteradas enquanto ele está sendo exibido;

* Ao refatorar a aplicação, deixando de utilizar um StatelessWidget e passando a utilizar um StatefulWidget, 