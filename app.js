// O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação.
// Aqui você deve desenvolver a lógica para resolver o problema do Amigo Secreto.

// Cria um array para armazenar os nomes
let jogadores = [];

// Função para adicionar amigos
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    let nome = input.value.trim();

    // Verifica se o campo está vazio
    if (nome === "") { 
        exibirMensagemNaTela("h2", "Por favor, digite um nome válido!");
        return;
    } 

    exibirMensagemNaTela("h2", "Digite o nome dos seus amigos");

    jogadores.push(nome);
   
    // Limpa o campo de entrada
    input.value = "";

    // Atualiza a lista na tela
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ""; // Limpa antes de atualizar
    jogadores.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });

    document.getElementById("resultado").innerHTML = "";
}

// Função de embaralhamento (Fisher–Yates)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // troca de posições
    }
    return array;
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    if (jogadores.length < 2) {
        exibirMensagemNaTela("h2", "É necessário pelo menos 2 amigos para realizar o sorteio.");
        return;
    }

    // Embaralha o array para garantir igualdade de chances
    let embaralhados = embaralhar([...jogadores]); // copia e embaralha
    const amigoSorteado = embaralhados[0]; // pega o primeiro após embaralhar

    // Mostra o resultado na tela
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";
    const li = document.createElement('li');
    li.textContent = amigoSorteado;
    resultado.appendChild(li);

    // Limpa a lista de amigos
    jogadores = [];
    document.getElementById('listaAmigos').innerHTML = "";

    exibirMensagemNaTela("h2", "Sorteio realizado com sucesso! Adicione novos amigos para um novo sorteio.");
}

// Função para exibir mensagens dinamicamente
function exibirMensagemNaTela(tag, mensagem) {
    document.querySelector(tag).innerHTML = mensagem;
}
