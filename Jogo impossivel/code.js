var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//protagonista e seus obstaculos e eu destino
var marcos = createSprite(200,385,20,20);
marcos.shapeColor="blue";
var obstaculo1 = createSprite(5,285,100,20);
obstaculo1.shapeColor="red";
var obstaculo2 = createSprite(390,200,100,20);
obstaculo2.shapeColor="red";
var obstaculo3 = createSprite(5,100,100,20);
obstaculo3.shapeColor="red";
var destino = createSprite(200,5,200,20);
destino.shapeColor="yellow";

//pontuação
var playerScore=5;

function draw() {
background("white");
drawSprites();
createEdgeSprites(); 

//quique dos obstaculos além de interação do marcos com o destino
obstaculo1.bounceOff(leftEdge);obstaculo1.bounceOff(rightEdge);
obstaculo2.bounceOff(leftEdge);obstaculo2.bounceOff(rightEdge);
obstaculo3.bounceOff(leftEdge);obstaculo3.bounceOff(rightEdge);

//movimentação do marcos
if (keyDown("left")) {
  marcos.x=marcos.x-8;
}
if (keyDown("right")) {
  marcos.x=marcos.x+8;
}
if (keyDown("up")) {
  marcos.y=marcos.y-8;
}
if (keyDown("down")) {
  marcos.y=marcos.y+8;
}

//texto da pontuação
textSize(18);
fill("black");
text("Vidas:"+playerScore,25,25);

//começar o jogo
if (keyDown("space")) {
//velocidade dos obstaculos
obstaculo1.velocityX=25;
obstaculo2.velocityX=-25;
obstaculo3.velocityX=25;
}


//contagem de mortes
if (marcos.isTouching(obstaculo1)|| marcos.isTouching(obstaculo2) || marcos.isTouching(obstaculo3)) {
marcos.x=200;
marcos.y=385;
playerScore= playerScore-1;
}

//finalização do jogo
if (marcos.isTouching(destino)) {
  obstaculo1.velocityX=0;obstaculo2.velocityX=0;obstaculo3.velocityX=0;
  marcos.y=30;
  marcos.x=200;
textSize(18);
fill("black");
text("Parabens você chegou em casa",100,150);
  
}

if (playerScore==0) {
    obstaculo1.velocityX=0;obstaculo2.velocityX=0;obstaculo3.velocityX=0;
    textSize(18);
fill("black");
text("Você foi capturado pelos valentões",100,150);
  }
    
//Marcos é um nerd da escola. Como todo padraõ de nerds ele é constantemente
//perseguido por valentões. Ajude Marcos a chegar em casa para que seu pai
//dê uma lição nesses valentões mas cuidado eles vão tentar barrar seu caminho
  
  
  
  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
