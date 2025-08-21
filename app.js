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
               document.querySelector("h2").innerHTML = "Digite um nome válido"

        return;
    } 
        document.querySelector("h2").innerHTML = "Digite o nome dos seus amigos";

   jogadores.push(nome);
   //Verificar os nomes no console
   console.log(jogadores);
   //limpar o campo de entrada
   nome = document.querySelector("input");
    nome.value = "";
   //Colocara os nomes na tela
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
       
        document.querySelector("h2").innerHTML = "É necessário ao menos 2 participantes"
        
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

     document.querySelector("h2").innerHTML = "Sorteio realizado com sucesso!";    
        }
    
    
}


