import 'dart:io';

void main(List<String> arguments) {
  var filmes = <Map<String, dynamic>>[];
  print("Título?");
  String? titulo = stdin.readLineSync();
  print("Gênero");
  String? genero = stdin.readLineSync();
  var notas = [5, 5];
  filmes.add({'titulo': titulo, 'genero': genero, 'notas': notas});
}
