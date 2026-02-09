import 'package:flutter/material.dart';

//void retorna a aplicação MainApp através de 'runApp'. Aplicações Flutter devem ser colocadas em execução de um jeito especial: utilizando a função runApp
void main() {
  runApp(const MainApp());
}



// class App extends StatefulWidget {
//   @override
//   State<App> createState() {
//     return MainApp();
//   }
// }

// classe MainApp (stateless) que retorna, nesse caso, a interface da apliação. É declarada em "runApp(const MainApp())", permitindo que a aplicação funcione
class MainApp extends StatelessWidget {
  // o parâmetro é do tipo Key. Esse parâmetro está associado à atualização de estado da aplicação
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
  const blue = Color.fromARGB(255, 6, 6, 206);

    // 'MaterialApp' 
    return MaterialApp(
      //um Scaffold permite especificarmos os elementos da tela, como menus ou botoes
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Imagens"),
          backgroundColor: blue,
        ),
        body: Center(
          child: Text('Hello World!'),
        ),
        floatingActionButton: FloatingActionButton(
          // child: const Text('+'),
          child: const Icon(Icons.add),
          onPressed: () {
            print('pressed!!');
          },
        ),
      ),
    );
  }
}
