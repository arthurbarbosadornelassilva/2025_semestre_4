import 'dart:io';
import 'dart:math';

void main(List<String> arguments) {
  List<int> lista = [];
  List<int> sorteio = [];

  // Numeros selecionados pelo jogador
  while(lista.length < 6) {
    print("Digite um dos números do seu jogo");
    // String? -> colocamos o !
    var numero = int.parse(stdin.readLineSync()!);

    if (numero < 1 || numero > 60) {
      print("Número inválido. Digite um número entre 1 e 60.");
    } else if (lista.contains(numero)) {
      print("Número já escolhido. Escolha outro.");
    } else {
      lista.add(numero);
    }
  }

  // Números sorteados
  var random = Random();
  while(sorteio.length < 6) {
    var numeroSorteado = random.nextInt(60) + 1;
    if (!sorteio.contains(numeroSorteado)) {
      sorteio.add(numeroSorteado);
    }
  }

  lista.sort();
  print("Números sorteados: $sorteio");
  sorteio.sort();
  print("Números escolhidos pelo jogador: $lista");

  if (lista.any((numero) => sorteio.contains(numero))) {
    print("Parabéns! Você acertou os seguintes números:");
    for (var numero in lista) {
      if (sorteio.contains(numero)) {
        print(numero);
      }
    }
  } else {
    print("Que pena! Você não acertou nenhum número.");
  }
}