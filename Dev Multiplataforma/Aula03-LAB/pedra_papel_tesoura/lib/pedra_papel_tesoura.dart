import 'dart:io';
import 'dart:math';

enum OPCAO { pedra, papel, tesoura, sair }

// Função para exibir os resultados
void exibe(String texto) {
  print(texto);
}

// Entrada de Dados
int pegarOpcaoUsuario() {
  return int.parse(stdin.readLineSync()!);  // O '!' é usado para garantir que o valor não seja nulo
}

// Verificar se a opção é válida
bool opcaoEhValida(int opcao) {
  return opcao >= 1 && opcao <= 4;
}

// Mapeamento da escolha do usuário
OPCAO mapeiaOpcao(int opcao) {
  return OPCAO.values[opcao - 1];
}

// Decidir resultado do jogo
String decideResultado(OPCAO opcaoUsuario, OPCAO opComputador) {
  if (opcaoUsuario == opComputador) {
    return 'Empate!';
  } else if ((opcaoUsuario == OPCAO.pedra && opComputador == OPCAO.tesoura) ||
             (opcaoUsuario == OPCAO.papel && opComputador == OPCAO.pedra) ||
             (opcaoUsuario == OPCAO.tesoura && opComputador == OPCAO.papel)) {
    return 'Você ganhou do computador!';
  } else {
    return 'Você perdeu para o computador!';
  }
}

void jogo() {
  int opUsuario;
  do {
    do {
      exibe("1-Pedra\n2-Papel\n3-Tesoura\n4-Sair");
      opUsuario = pegarOpcaoUsuario();
    } while (!opcaoEhValida(opUsuario));

    if(opUsuario != 4) {
      int opComputador = Random().nextInt(3) + 1; // Gera um número aleatório entre 1 e 3

      OPCAO opcaoUsuario = mapeiaOpcao(opUsuario);
      OPCAO opcaoComputador = mapeiaOpcao(opComputador);

      exibe('Você escolheu: ${opcaoUsuario.name}');
      exibe('O computador escolheu: ${opcaoComputador.name}');

      String vencedor = decideResultado(opcaoUsuario, opcaoComputador);
      exibe(vencedor);
      exibe("-- Fim do jogo --");

      sleep(Duration(seconds: 3));
    }
  } while (opUsuario != 4);
}