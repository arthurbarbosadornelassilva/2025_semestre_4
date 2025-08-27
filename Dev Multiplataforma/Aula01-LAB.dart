void main() {
  // Explorando os tipos de dados do Dart:

  String nome = "Arthur";
  String endereco = "Rua das Flores, 123";
  int idade = 19;
  double altura = 1.7;
  num peso = 65;  // 'num' é uma sintaxe específica do dart, e pode ser int ou double
  bool estudante = true;

  String saudacao = '''Olá, 
  meu nome é $nome, 
  tenho $idade anos e moro em $endereco.''';

  print(saudacao);
  print(altura.runtimeType);
  print(peso.runtimeType);

  // Concatenação de Strings:
  String sobrenome = "Silva";
  String nomeCompleto = nome + " " + sobrenome;
  print(nomeCompleto);

  String mensagemFinal = "Meu nome é $nomeCompleto, tenho " + idade.toString() + " anos, peso " + peso.toString() + "kg e minha altura é " + altura.toString() + "m."; // uso de .toString pra transformar valores numéricos em strings
  print(mensagemFinal);

  // Conversão de tipos (com toString ou parse):

  //de string para int
  String idadeTextual = "25";
  int parseIdade = int.parse(idadeTextual);
  print(parseIdade);
  //de string para double
  String pesoTextual = '85.2';
  double parsePeso = double.parse(pesoTextual);
  print(parsePeso);
  //de string para num
  String alturaTextual = '1.8';
  num parseAltura = num.parse(alturaTextual);
  print(parseAltura);

  double a = 1.2;
  //mas podemos usar métodos
  //arredonda
  int b = a.round();
  print(b);
  //teto
  b = a.ceil();
  print(b);
  //chão
  b = a.floor();
  print(b);

  // Operadores Aritméticos
  int x = 10;
  int y = 5;

  print(x + y); // Adição
  print(x - y); // Subtração
  print(x * y); // Multiplicação
  print(x / y); // Divisão
  print(x ~/ y); // Divisão inteira
  print(x % y); // Módulo

  print (++y); // Incremento
  print (--x); // Decremento

  // Operadores Relacionais
  print(x > y); // Maior que
  print(x < y); // Menor que
  print(x >= y); // Maior ou igual a
  print(x <= y); // Menor ou igual a
  print(x == y); // Igual a
  print(x != y); // Diferente de

  //Operadores Lógicos
  print(x > y && y > 0); // E
  print(x > y || y > 0); // OU
  print(!(x > y)); // NÃO
}