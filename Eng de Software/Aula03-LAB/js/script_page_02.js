let dicionario = [0, 1, 2, 3, 4, 5, 6, 7];

// Função chamada na página 1
function verificarNumero() {
    let numero = parseInt(document.querySelector("#input-texto").value);

    // salva o valor digitado no localStorage
    localStorage.setItem("numeroDigitado", numero);

    // redireciona para a página de resultado
    window.location.href = "tela_3.html";
}

// Função chamada na página 2
function pullText() {
    let numero = parseInt(localStorage.getItem("numeroDigitado"));
    let campoTexto = document.getElementById("campo-texto");

    if (dicionario.includes(numero)) {
        campoTexto.innerText =
            "✅ O número existe no dicionário. Ele se encontra na posição " + dicionario.indexOf(numero) + ".";
    } else {
        campoTexto.innerText = "❌ O número não existe no dicionário.";
    }
}