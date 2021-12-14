const InstrucaoBotao = document.getElementById("botaoinstrucoes"); // botao de instrucoes
const iniciobotao = document.getElementById("botaoiniciar"); // botao que inicia o jogo
//botoes 

const Temporizador = document.getElementById("temporizador"); // temporizador
const Comentarios = document.getElementById("comentarios"); // comentarios no html
const ContadorDeVidas = document.querySelector(".contador-de-vidas"); // conta vidas
const Jogador = document.querySelector(".iconejogador"); // icone do jogador que ainda precisa ser implementado
const bodydojogo = document.querySelector(".bodydojogo"); // corpo do jogo, classe do css
const vidro = document.querySelectorAll(".vidro"); // opcoes, os "vidros" da serie
const PosicaoInicial = document.querySelector(".posicaoinicial"); // posicao inicial
const PosicaoFinal = document.querySelector(".posicaofinal"); // ultima posicao
const AsseguraPosicao = document.querySelector(".posicaosegurada"); // <-- segura a ultima posicao registrada

const telagameover = document.getElementById("displaygameover"); // tela de game over
const textogameover = document.getElementById("disptextogameover"); // texto de game over
const fim = document.getElementById("fim"); // fim do jogo


const perguntas = ['2+2', 
'9*9'
,'7*9'
,'6/3'
,'x^2*4x+9'
,'3x^2-18x+24 = 0'
,'(33+7x)x^2'
,'x^2-(44*3)7',
'Quantas soluções inteiras a inequação x² + x - 20 ≤ 0 admite?',
'A soma dos números inteiros x que satisfazem 2x + 1 ≤ x +3 ≤ 4x é',
'Sejam x e y números tais que os conjuntos {0, 7, 1} e {x, y, 1} são iguais. Então, podemos afirmar que:',
'x – y = 2 e x2 + y2 = 8, então x3 – y3 é igual a:','Se x + y = 13 e x · y = 1, então x2 + y2 é',
'Se cos 2θ = 7/25 e θ pertence ao primeiro quadrante, então cos θ é igual a:',
'João recebeu um aumento de 10% e com isso seu salário chegou a R$1.320,00. O salário de João antes do aumento era igual a?',
'Sendo A o ponto da reta 2x + y − 1 = 0 que equidista dos pontos B = (1,1) e C = (0,−1) , e sendo D = (0,1) , a área do triângulo ACD vale',
'O número de soluções da equação  , com x > 0, é igual a:',
'O número de soluções da equação x=√6-x , com x > 0, é igual a:',
'A soma dos inversos das raízes da equação x² -10x + 22 = 0 é igual a:',
'A soma de todas as frações da forma n/(n+1), onde n é um elemento do conjunto {1, 2, 3, 4, 5}, é ',
'Quatro moedas são lançadas simultaneamente. Qual é a probabilidade de ocorrer coroa em uma só moeda?',
'Jogamos dois dados comuns. Qual a probabilidade de que o total de pontos seja igual a 10?',
'A probabilidade de um casal com quatro filhos ter dois do sexo masculino e dois do sexo feminino é:',
'A probabilidade de um dos cem números 1, 2, 3, 4, ..., 100 ser múltiplo de 6 e de 10 ao mesmo tempo é:',
'Sendo x um arco do segundo quadrante tal que sen x = 3/7 , o valor de tgx é:',
'A soma de todos os números naturais ímpares de 3 algarismos é:',
'Quantos termos a soma 5+ 7+ 9+ 11+⋯ deve ter para que o total seja 2700 ?',
'A média aritmética das raízes da equação modular |2x – 4|  + |x + 1| = 4 é igual a:',
'Para que o polinômio P(x) = x5 - 2x4 + kx3 - 3x2 + 6 seja divisível pelo binômio -x + 1, o valor de k deve ser igual a:',
'Considerando-se os algarismos significativos dos números 28,7 e 1,03, podemos afirmar que a soma destes números é dada por:',
'Seja A uma matriz invertível de ordem 3 tal que a matriz A5+ 2A4 é a matriz nula. O determinante de A é: ',
'Considere a equação x² + 12x + k = 0. Para qual valor de k esta equação NÃO possui raízes inteiras?'];

const respostas = ['4','81','63','2','4x^3+9','6','33x^2+7x^3','x^2-924','10','3','X+Y = 7','20','167','4/5','1200 reais','1/2',
'1','1','5/11','3,55','2/9','1/12','37,5%','3%','-(3 √10)/20','247.500','50','5/3','-2','29,7','-8','34'];

const respostaserradas = ['6','67','83','4','2x^3+5','3','27x^2+5x^3','x^2-726','7','1','X+Y = 9','10','228','3/6','1500 reais','2','5','0',
'3/11','2,75','6/11','7/14','26,5%','7%','-(3 √9)/15','375.900','20','9/3','-4','31,6','-13','44'];

let Tempo = 300; // tempo para responder as pergunta
let iniciajogo = false; // boolean de inicio de jogo
let totaldevidas = 4; // numero total de vidas
let perdervidroaleatoriamente = []; ; // cria o array que ira receber os vidros que geram condicao de derrota
let perdervida = false; // boolean que se true ativa a perda de vida do jogador
let vidroanteriorlimpo = true; // se o vidro anterior foi limpado e liberado do jogador
let proximovidro; // proxima jogada
let iconejogador; // icone jpg do jogador
let i = 1; // a variavel i age como um index que mostra em qual coluna o jogador esta e atualiza as perguntas dependendo do estado do jogador
let gameover = false; // perda total de vidas ocasiona nisso
let intervalo; // intervalo do timer
let perguntatemporario; // variavel que na funcao perguntasselect aleatoriza qual sera a primeira questao a ser selecionada
let Telha = []; // array de vidros falsos, errados

let displayPerguntas = []; // na funcao perguntasselect, o codigo seleciona baseado na aleatorizacao da variavel perguntatemporario
                          // as perguntas que serao mostradas e insere elas nesse array

// CONFIGURANDO OS VIDROS
const vidroArray = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
  4: [7, 8],
  5: [9, 10],
  6: [11, 12],
  7: [13, 14],
};

// funcao que aleatoriza as questoes que serao mostradas na tela
function perguntasselect() {
  let contador = 0;
  
  perguntatemporario = parseInt(Math.random() * (24 - 0) + 0); // randomiza a questao inicial
  //console.log(perguntatemporario);
  while (contador < 8) {  // seleciona as perguntas para o array displayPerguntas baseado nas selecionadas aleatoriamente
    displayPerguntas[contador] = perguntas[contador + perguntatemporario]; 
    //console.log(displayPerguntas[contador]);
    contador++;
  }
  document.getElementById("pergunta").innerHTML = displayPerguntas[0]; // mostra a primeira pergunta selecionada
}

// funcao que mostra a pergunta atual, acionada toda vez que i for incrementado
function perguntaAtual(){
  document.getElementById("pergunta").innerHTML = displayPerguntas[i];
}


// funcao do botao de instrucoes
function instructions() {
  alert(
    "Os jogadores terão de cruzar duas pontes paralelas saltando sobre paineis de vidro, para que possam saber onde pular, calculos matematicos serão perguntados ao jogador e a resposta estará no vidro resistente onde o jogador proseguira para proxima fase, caso erre o jogador tem mais 3 vidas."
  );
}
InstrucaoBotao.addEventListener("click", instructions); // botao de instrucoes

//Controle de botão iniciar 
iniciobotao.addEventListener("click" ,() => {
  iniciajogo = true; // inicia o jogo na variavel
  atualizaRepostas(); // insere as respostas no jogo
  let diminuidor = 1;  // diminui o tempo
  intervalo = setInterval(() => { // inicia o timer
    if (Tempo > 0) {
      Tempo = Tempo - diminuidor; // diminui o tempo
      Temporizador.innerText = `Tempo : ${Tempo}sec`;
      if (Tempo == 0) {
        gameOver();
      }
    }
  }, 1000); // intervalo de 1000ms
}, perguntasselect());

// chama a funcao para gerar vidros aleatorios que acionam a condicao de perdervida, recebendo Telha da funcao abaixo
perdervidroaleatoriamente = geravidrosaleatorios(vidroArray);

// funcao que gera os vidros com as respostas erradas
function geravidrosaleatorios(vidroArray) {
  
  for (const set in vidroArray) { // randomizando os vidros errados
    Telha.push(getRandom(vidroArray[set][0], vidroArray[set][1]));

  } 
  //console.log(Telha);
  return Telha; // retornando um array com os vidros que terao respostas erradas
  
}
// funcao que atualiza as resposta na tela, botando as respostas certas e erradas no tabuleiro de jogo, nos "vidros"
function atualizaRepostas() {

  if (Telha[0] == 1) { // se a telha da primeira coluna de cima for a escolhida errada, mostrar a resposta errada
  document.getElementById("vidro-cima").innerHTML = respostaserradas[perguntatemporario];
  document.getElementById("vidro-baixo").innerHTML = respostas[perguntatemporario];
  } else if (Telha[0] == 2){  // se a telha da primeira coluna de baixo for a escolhida errada, mostrar a resposta errada
  document.getElementById("vidro-cima").innerHTML = respostas[perguntatemporario];
  document.getElementById("vidro-baixo").innerHTML = respostaserradas[perguntatemporario];
  }

  if (Telha[1] == 3) { // se a telha da segunda coluna de cima for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima1").innerHTML = respostaserradas[perguntatemporario + 1];
    document.getElementById("vidro-baixo1").innerHTML = respostas[perguntatemporario + 1];
  } else if (Telha[1] == 4){  // se a telha da segunda coluna de baixo for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima1").innerHTML = respostas[perguntatemporario + 1];
    document.getElementById("vidro-baixo1").innerHTML = respostaserradas[perguntatemporario + 1]; 
  }

  if (Telha[2] == 5) { // se a telha da terceira coluna de cima for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima2").innerHTML = respostaserradas[perguntatemporario + 2];
    document.getElementById("vidro-baixo2").innerHTML = respostas[perguntatemporario + 2];
  } else if (Telha[2] == 6){  // se a telha da terceira coluna de baixo for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima2").innerHTML = respostas[perguntatemporario + 2];
    document.getElementById("vidro-baixo2").innerHTML = respostaserradas[perguntatemporario + 2]; 
  }

  if (Telha[3] == 7) { // se a telha da quarta coluna de cima for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima3").innerHTML = respostaserradas[perguntatemporario + 3];
    document.getElementById("vidro-baixo3").innerHTML = respostas[perguntatemporario + 3];
  } else if (Telha[3] == 8){  // se a telha da quarta coluna de baixo for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima3").innerHTML = respostas[perguntatemporario + 3];
    document.getElementById("vidro-baixo3").innerHTML = respostaserradas[perguntatemporario + 3]; 
  }

  if (Telha[4] == 9) { // se a telha da quinta coluna de cima for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima4").innerHTML = respostaserradas[perguntatemporario + 4];
    document.getElementById("vidro-baixo4").innerHTML = respostas[perguntatemporario + 4];
  } else if (Telha[4] == 10){  // se a telha da quinta coluna de baixo for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima4").innerHTML = respostas[perguntatemporario + 4];
    document.getElementById("vidro-baixo4").innerHTML = respostaserradas[perguntatemporario + 4]; 
  }

  if (Telha[5] == 11) { // se a telha da sexta coluna de cima for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima5").innerHTML = respostaserradas[perguntatemporario + 5];
    document.getElementById("vidro-baixo5").innerHTML = respostas[perguntatemporario + 5];
  } else if (Telha[5] == 12){  // se a telha da sexta coluna de baixo for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima5").innerHTML = respostas[perguntatemporario + 5];
    document.getElementById("vidro-baixo5").innerHTML = respostaserradas[perguntatemporario + 5]; 
  }

  if (Telha[6] == 13) { // se a telha da ultima coluna de cima for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima6").innerHTML = respostaserradas[perguntatemporario + 6];
    document.getElementById("vidro-baixo6").innerHTML = respostas[perguntatemporario + 6];
  } else if (Telha[6] == 14){  // se a telha da ultima coluna de baixo for a escolhida errada, mostrar a resposta errada
    document.getElementById("vidro-cima6").innerHTML = respostas[perguntatemporario + 6];
    document.getElementById("vidro-baixo6").innerHTML = respostaserradas[perguntatemporario + 6]; 
  }
}

// adiciona um event listener para os botoes do tabuleiro
vidro.forEach((Telha) => {
  Telha.addEventListener("click", () => {
    // checando se o jogo foi iniciado
    if (!iniciajogo) {
      alert("Pressione primeiro o botao iniciar!");
      return;
    }
    // verificar se o conjunto de vidros anterior foi limpado
    if ( vidroArray[i][0] == Telha.dataset.value ||
         vidroArray[i][1] == Telha.dataset.value ) {
      // console.log("vidros anteriores limpos");

      vidroanteriorlimpo = true; // boolean para determinar se for limpo ou nao os vidros anteriores

      // removendo o ícone do Jogador do vidro anterior
      if (i != 1) proximovidro.removeChild(Jogador);
      // Checando se é um vidro errado
      perdervidroaleatoriamente.forEach((lostTelha) => {
        if (Telha.dataset.value == lostTelha) {
          perdervida = true;
          // console.log("vidas - 1");
        }
      }); perguntaAtual(); // <- atualiza a pergunta mostrada
      return;
    }
    // o if abaixo impede o jogador de jogar em vidros atras dele, paralelos a ele, e vidros ja "caidos"
    if (Telha.dataset.value) {
      alert("Selecione todas as respostas certas em sequencia!");
      vidroanteriorlimpo = false;
      return;
    }

    //
  });
});

vidro.forEach((Telha) => {
  Telha.addEventListener("click", () => {
    //verificando se o botão iniciajogo foi pressionado
    if (!iniciajogo) return;
    if (!vidroanteriorlimpo) return;
    /*if (i > 8) {
      venceu();
    }*/
    // vida perdida, if executado
    if (perdervida) {
      Comentarios.innerText = "Você perdeu uma vida!"; // declara para o jogador o que aconteceu
      Telha.style.backgroundColor = "black"; // escurece o vidro quebrado
      PosicaoInicial.appendChild(Jogador); // move o icone do jogador para a posicao inicial
      i = 1; // define a primeira posicao
      totaldevidas--; // reduz o total de vidas
      document.getElementById("pergunta").innerHTML = displayPerguntas[0];//como o jogador voltou para a posicao inicial, eh mostrada a primeira pergunta
      ContadorDeVidas.innerText = `Vidas restantes : ${totaldevidas}`; // display que a vida foi perdida

      perdervida = false; //Resetando o perdervida
      Telha.dataset.value = null; // anula os tiles anteriores

      //checando se o total de vidas é 0
      if (totaldevidas <= 0) {
        // console.log("gameover");
        gameOver();
      }
      //
    } else {
      //se o jogador pisa no vidro certo, então i++
      i++;
      //console.log("O I ta igual a " + i);
      moveJogador(Telha);
      //   console.log("ir em frente");
      Comentarios.innerText = "Siga em frente!";
    }
    // console.log(Telha);
  });
});

// randomizar cada conjunto de vidros
function getRandom(min, max) {
  max++; //uma vez que o valor máximo não está incluído
  return Math.floor(Math.random() * (max - min)) + min;
}
// console.log(getAleatorio());

// Jogador se movendo para o próximo conjunto de vidro
function moveJogador(Telha) {
  Telha.appendChild(Jogador); // move o jpg
  proximovidro = Telha;
}

// detecta condicao de vitoria de jogo
fim.addEventListener("click", () => {
  if (i >= 7) {
    venceu();
  } else { return; }
});

// funcao que aciona o game over caso alguma das condicoes para game over for verdadeira (Acabar o tempo e o numero de vidas chegar a zero)
function gameOver() {
  bodydojogo.classList.add("hide"); // esconde o jogo
  telagameover.classList.remove("hide"); // mostra a tela de game over
  disptextogameover.classList.remove("hide"); // mostra o texto de game over
  clearInterval(intervalo); // limpa o intervalo
}

// funcao que limpa a tela e aciona a tela de vitoria do jogador quando ele chega ate o final com vidas e tempo sobrando
function venceu() {
  bodydojogo.classList.add("hide"); // esconde o jogo
  telagameover.classList.remove("hide"); // mostra a tela de game over
  textogameover.classList.remove("hide"); // mostra o texto de game over
  textogameover.style.color = "white"; // fonte branca
  textogameover.innerText = "Você ganhou! Parabens!  Aperte F5 para jogar novamente!"; // muda o texto de game over do html
}