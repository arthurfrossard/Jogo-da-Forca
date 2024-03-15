const palavras = [
  "macaco", "elefante", "baleia", "cachorro"
];

let jogo = {
  palavraSort: null,
  arrayPalavraSort: [],
  letrasJogadas: [],
  erros: 0,
  exibi: null,
  indices: [],
  respUsu: null,
}
btnVerificarPalavra.disabled = true;

btnNovaPalavra.addEventListener('click', () => {
  btnVerificarPalavra.disabled = false;
  reiniciar();
  sortearEOrganizar();
  exibiNova();
  botoes(false);
});//Função refatorada com 5 sentenças

btnVerificarPalavra.addEventListener('click', () => {
  verificacoes();
  ipPalavraResposta.value = "";
  let idx = 0;
  idx = jogo.arrayPalavraSort.indexOf(jogo.respUsu, idx);
  atualizarPalavraForca(idx);
});//Função refatorada com 5 sentenças

function atualizarPalavraForca(idx) {
  spPalavraSecreta.innerText = '';
  verificarLetra(idx);
  verificarVitoria();
  spPalavraSecreta.innerText = jogo.exibi.join(' ');
}//Função refatorada com 5 sentenças

function verificarLetra(idx) {
  if (jogo.palavraSort.includes(jogo.respUsu)) {
    while (idx != -1) {
      jogo.indices.push(idx);
      idx = jogo.arrayPalavraSort.indexOf(jogo.respUsu, idx + 1);
      jogo.exibi[jogo.palavraSort.indexOf(jogo.respUsu, idx)] = jogo.respUsu;
    }
  }
}

function botoes(param) {
  btnVerificarPalavra.disabled = param;
  ipPalavraResposta.disabled = param;
}

function sortearEOrganizar () {
  const index = Math.floor(Math.random() * palavras.length);
  jogo.palavraSort = palavras[index];
  jogo.letrasJogadas = [];
  jogo.arrayPalavraSort = [...jogo.palavraSort]
}

function exibiNova() {
  jogo.exibi = jogo.arrayPalavraSort.map(letra => letra.replace(letra, '_'));
  spPalavraSecreta.innerText = jogo.exibi.join(' ');
}

function reiniciar() {
  jogo.erros = 0;
  imgForca.src = `img/Forca0${jogo.erros}.png`
  spLetrasJogadas.innerText = '';
}

function tratamentoVerificar() {
  jogo.respUsu = ipPalavraResposta.value.toLowerCase();
  jogo.letrasJogadas.push(jogo.respUsu);
  spLetrasJogadas.innerText = jogo.letrasJogadas.join(' - ');
}

function verificarErros() {
  if (!jogo.palavraSort.includes(jogo.respUsu)) {
    jogo.erros++;
    imgForca.src = `img/Forca0${jogo.erros}.png`
  }
}

function verificarFimChances() {
  if (jogo.erros >= 6) { 
    botoes(true); 
    spLetrasJogadas.innerHTML += "<br>Você perdeu!";
  }
}



function verificarVitoria(){
  if (!jogo.exibi.includes('_')) {
    botoes(true);
    spLetrasJogadas.innerHTML += "<br>Você venceu!"
  }
}

function verificacoes() {
  tratamentoVerificar();
  verificarErros();
  verificarFimChances();
}