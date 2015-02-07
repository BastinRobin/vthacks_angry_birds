var game, createRenderer, createAngryBird, createPlanks, createPigs;

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

createPlanks = function (screenWidth, screenHeight) {
  var plankConfigurations;

  plankConfigurations = [
    { x: screenWidth/2, y: screenHeight - 25, width: 10, height: 50, vx: 0, vy: 0},
    { x: screenWidth/2 + 100, y: screenHeight - 25, width: 10, height: 50, vx: 0, vy: 0 },
    { x: screenWidth/2 + 50, y: screenHeight - 55, width: 150, height: 10, vx: 0, vy: 0 },
    { x: screenWidth/2 + 20, y: screenHeight - 85, width: 10, height: 50, vx: 0, vy: 0 },
    { x: screenWidth/2 + 80, y: screenHeight - 85, width: 10, height: 50, vx: 0, vy: 0 },
    { x: screenWidth/2 + 50, y: screenHeight - 115, width: 100, height: 10, vx: 0, vy: 0 }
  ];

  return plankConfigurations.map(function (plankConfig) {
    return Physics.body('rectangle', plankConfig);
  });
}

createPigs = function (screenWidth, screenHeight) {
  var pigConfigurations;

  pigConfigurations = [
    { x: screenWidth/2 + 50, y: screenHeight - 85, vx: 0, vy: 0, radius: 25 },
    { x: screenWidth/2 + 50, y: screenHeight - 145, vx: 0, vy: 0, radius: 25 }
  ];

  return pigConfigurations.map(function (pigConf) {
    var pig;

    pig = Physics.body('circle', pigConf);
    pig.view = new Image();
    pig.view.src = './images/Minion_50x47.png';

    return pig;
  });
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

  // Add the planks
  createPlanks(screenWidth, screenHeight).forEach(function (plank) {
    world.add(plank);
  });

  // Add the pigs
  createPigs(screenWidth, screenHeight).forEach(function (pig) {
    world.add(pig);
  });

  // Add behaviors (rules according to which bodies in the world act)

  // Add collision detection between bodies and edges of the world
  world.add(
    Physics.behavior('edge-collision-detection', {
      aabb: Physics.aabb(0, 0, screenWidth, screenHeight),
      restitution: 0.4,
      cof: 0.99
    })
  );

  // Add acceleration
  world.add(Physics.behavior('constant-acceleration'));

  // Add collision detection between bodies
  world.add(Physics.behavior('body-collision-detection'));

  // Optimal algorithm for collision detection
  world.add(Physics.behavior('sweep-prune'));

  // Add responses to collisions
  world.add(Physics.behavior('body-impulse-response'));

  // Make the angry bird grab-able and throw-able
  world.add(Physics.behavior('interactive', {
    el: 'my-game',
    maxVel: {x: 1, y: -2} //constraining the horizontal and vertical velocities
  }).applyTo([angry_bird]));

  //Call the step function at regular intervals
  Physics.util.ticker.on(function (time) {
    world.step(time);
  });

  //Start the game
  Physics.util.ticker.start();
};

Physics(game);