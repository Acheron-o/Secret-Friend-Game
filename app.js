//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
//----------------------------------------------------------------------------------------------------------------------------------------------------------
//VALIDAÇÕES A SEREM FEITAS :
//Garantir que seja adicionado ao menos 1 caractere, caso seja adicionado um numero ou um texto em branco, um aviso será feito

//----------------------------------------------------------------------------------------------------------------------------------------------------------
//Crie um array para armazenar os nomes
let jogadores = [];
//Implementa uma função para agregar amigos
function adicionarAmigo() {
    let nome = document.getElementById('amigo').value;
   jogadores.push(nome);
   //Verificar os nomes no console
   console.log(jogadores);
   //limpar o campo de entrada
   nome = document.querySelector("input");
    nome.value = "";

}
//Adiciona uma função para que o resultado seja totalmente aleatório
function amigoAleatorio(totalAmigos) {
  return Math.floor(Math.random() * totalAmigos);
}
//Função que sorteia o amigo após o clique no botão
function sortearAmigo() {
    if (jogadores.length < 2){
       
        document.querySelector("h2").innerHTML = "É necessário ao menos 2 participantes"
        
    }
   else {
        let resultado = amigoAleatorio(jogadores.length);
         document.querySelector("h2").innerHTML = "Digite o nome dos seus amigos"
    alert(jogadores[resultado]); // um alerta inicial para teste
        }
    
    
}
