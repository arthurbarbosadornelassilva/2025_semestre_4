// ENTRADA E SAÍDA DE DADOS - DART:

// - ENTRADA (stdin):
// - SAÍDA (stdout):

// *stdin & stdout fazem parte do pacote 'dart:io', e dependem de seu import

//  EXEMPLO 1:

import 'dart:io';
void main() {
	// Exibe o texto e pula uma linha
	stdout.writeln('Digite o seu nome: ');
	// Lê o que o usuário digitou
	//devolve uma string
	var nome = stdin.readLineSync();
	// Exibe o texto sem pular uma linha
	stdout.write('Olá, $nome!');
}