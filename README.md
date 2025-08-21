# 🎁 Secret Friend Game (Amigo Secreto)

O principal objetivo deste desafio é **fortalecer as habilidades em lógica de programação**.  
Aqui você deverá desenvolver a lógica para resolver o problema do sorteio do **Amigo Secreto**.

---

## 🧩 Descrição do Projeto
O usuário deve inserir nomes de amigos em uma lista através de um campo de texto.  
Após adicionar os nomes, será possível sortear um **amigo secreto** de forma totalmente aleatória.

---

## 🎯 Funcionalidades
- ✅ **Adicionar nomes** à lista de amigos.  
- ✅ **Visualizar lista** com todos os amigos adicionados.  
- ✅ **Sortear aleatoriamente** um nome da lista.    
- ✅ **Limpar a lista** automaticamente após o sorteio.  

---

## 🛠️ Tecnologias Utilizadas
- **HTML5** → estrutura da página.  
- **CSS3** → estilização da interface.  
- **JavaScript (DOM e lógica)** → manipulação da lista, validações e sorteio.  

---

## 🚀 Como Rodar Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Acheron-o/challenge-secret-friend-pt.git
2.**Entre na pasta do projeto**:
```` cd secret-friend-game ````

3.**Abra o arquivo index.html diretamente no navegador.**:
**Clique duas vezes no arquivo
ou
Use a extensão Live Server no VS Code para rodar o projeto.**


## 🎲 Algoritmo Fisher–Yates (Breve Explicação)

O sorteio de nomes neste projeto utiliza o algoritmo Fisher–Yates shuffle.
Esse algoritmo é usado para embaralhar arrays de forma justa, garantindo que cada elemento tenha a mesma probabilidade de aparecer em qualquer posição.

Como funciona:

Começa pelo último elemento do array.

Sorteia um índice aleatório entre 0 e a posição atual.

Troca os elementos de posição.

Repete o processo até o primeiro elemento.
````
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // troca
    }
    return array;
}
 ````



