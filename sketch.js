//Pong - JavaScript - Sem biblioteca - Com placar e vencedor

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variáveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis raquete player
let xRaquete = 5;
let yRaquete = 165;
let raqueteComp = 5;
let raqueteAlt = 70;

//variáveis raquete oponente
let xRaqueteOpo = 590;
let yRaqueteOpo = 165;
let velocidadeXOpo;
let velocidadeYOpo;

//placar do jogo
let meusPontos = 0;
let pontosDoOpo = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(50, 50, 205); //código RGB de cores 'azul'
  meioDeCampo();
  raqueteOponente(xRaqueteOpo, yRaqueteOpo);
  mostraBolinha();
  movimentoBolinha();
  raquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  movimentaRaqueteOpo();
  verificaColisaoBorda (); 
  verificaColisaoRaquete();
  verificaColisaoRaqueteOpo();
  incluirPlacar();
  contador();
  vencedor();
}

function raquete(){
  stroke(255);
  rect(xRaquete, yRaquete, raqueteComp, raqueteAlt)
}

function raqueteOponente(){
  stroke(255);
  rect(xRaqueteOpo, yRaqueteOpo, raqueteComp, raqueteAlt)
}
  
function meioDeCampo(){
  stroke(255);
  fill(255);
  rect (300,0,2, 400)
}

function mostraBolinha (){
  fill (color(255,255,255))
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;  
}

function verificaColisaoBorda (){
   if (xBolinha + raio > width || xBolinha - raio < 0){ //'width'limite borda horizontal
    velocidadeXBolinha *= -1;
    
   }
  if (yBolinha + raio > height || yBolinha - raio < 0){ //'width'limite borda vertical
    velocidadeYBolinha *= -1;
    
  }  
}

function movimentaMinhaRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 5, 325);
}

function movimentaRaqueteOpo (){
  velocidadeYOpo = yBolinha - yRaqueteOpo - raqueteComp/2 - 75;
  yRaqueteOpo += velocidadeYOpo;
  yRaqueteOpo = constrain(yRaqueteOpo, 5, 325);
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete && yBolinha - raio < yRaquete + raqueteAlt && yBolinha + raio > yRaquete){
      velocidadeXBolinha *= -1;
      raquetada.play();
      }
}

function verificaColisaoRaqueteOpo(){
  if (xBolinha + raio > xRaqueteOpo + raqueteComp && yBolinha - raio < yRaqueteOpo + raqueteAlt && yBolinha + raio > yRaqueteOpo){
      velocidadeXBolinha *= -1;
      raquetada.play();
      }
}

function incluirPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,165,0));
  rect(130, 9, 40,20,20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255,165,0));
  rect(430,9,40,20,20);
  fill(255);
  text(pontosDoOpo, 450, 26);
}

function contador (){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play() ;
  }
  if (xBolinha < 10){
    pontosDoOpo += 1;
    ponto.play();
  }
}

function vencedor(){
  if (meusPontos > pontosDoOpo && meusPontos >= 10){ 
    stroke(255,255,0);
    fill(255,255,0);
    text("Você Venceu", 140, 200);
    text(meusPontos, 120,230);
    text(" X ", 134, 230);
    text(pontosDoOpo, 155, 230);
  }
  if (meusPontos < pontosDoOpo && pontosDoOpo >= 10) {
    stroke(255,0,0);
    fill(255,0,0);
    text("Você Perdeu", 140, 200);
    text(meusPontos, 120,230);
    text(" X ", 134, 230);
    text(pontosDoOpo, 155, 230);
  }
}