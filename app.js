//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
//Crie um array para armazenar os nomes
let jogadores = [];
//Implementa uma função para agregar amigos
function adicionarAmigo() {
    let nome = document.getElementById('amigo').value;
   jogadores.push(nome);
   //Verificar os nomes no console
   console.log(jogadores);

}