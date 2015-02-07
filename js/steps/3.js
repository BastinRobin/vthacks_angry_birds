var game, createRenderer, createAngryBird;

createRenderer = function (width, height) {
  return Physics.renderer('canvas', {
    el: 'my-game',
    width: width,
    height: height,
    meta: false,
    autoResize: false,
    styles: {
      'rectangle': {
        strokeStyle: '#000000',
        lineWidth: 1,
        fillStyle: '#000000'
      }
    }
  });
};

createAngryBird = function (screenWidth, screenHeight) {
  var angry_bird;

  angry_bird = Physics.body('circle', { x: 80, y: screenHeight - 25, vx: 0, vy: 0, radius: 25 });

  angry_bird.view = new Image();
  angry_bird.view.src = './images/angry_bird_50x50.png';

  return angry_bird;
};

game = function (world) {
  var screenWidth, screenHeight;

  // Get the dimensions of the screen
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight/2;

  // Setup the rendering process
  world.add(createRenderer(screenWidth, screenHeight));

  // On every step of the world, render the new state of the world
  world.on('step', function () {
    world.render();
  });

  // Add an angry bird
  angry_bird = createAngryBird(screenWidth, screenHeight);
  world.add(angry_bird);
};

Physics(game);
