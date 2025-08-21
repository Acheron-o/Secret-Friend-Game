//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
//----------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------
//Crie um array para armazenar os nomes
let jogadores = [];
//Implementa uma função para agregar amigos
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    let nome = input.value.trim();
    //Verifica se o campo de entrada está vazio
    if (nome === "") { 
               exibirMensagemNaTela("h2", "Por favor, digite um nome válido!");

        return;
    } 
     exibirMensagemNaTela("h2", "Digite o nome dos seus amigos");

   jogadores.push(nome);
   
   //limpar o campo de entrada
   nome = document.querySelector("input");
    nome.value = "";
   // Atualiza a lista de amigos na tela
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ""; // Limpa a lista antes de atualizar
    jogadores.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);

    });
resultado.innerHTML = "";}

//Adiciona uma função para que o resultado seja totalmente aleatório
function amigoAleatorio(totalAmigos) {
  return Math.floor(Math.random() * totalAmigos);
}
//Função que sorteia o amigo após o clique no botão
function sortearAmigo() {
    if (jogadores.length < 2){
       
        exibirMensagemNaTela("h2", "É necessário pelo menos 2 amigos para realizar o sorteio.");
        return;
        
    }
   else {
        let resultadoSorteio = amigoAleatorio(jogadores.length);
    const resultados = jogadores[resultadoSorteio];

    // Mostra o resultado na tela
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ""; // Limpa resultados anteriores
    const li = document.createElement('li');
    li.textContent = resultados
    resultado.appendChild(li);

    // Limpa lista de amigos
    jogadores = [];
    document.getElementById('listaAmigos').innerHTML = "";

     exibirMensagemNaTela("h2", "Sorteio realizado com sucesso! Adicione mais um novo amigo para um novo sorteio.");    
        }
    
    
}


function exibirMensagemNaTela(tag , mensagem) {
    document.querySelector(tag).innerHTML = mensagem;
}