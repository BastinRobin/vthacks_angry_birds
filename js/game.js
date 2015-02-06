var createRenderer, createAngryBird, createPlanks;

createRenderer = function (Physics, width, height) {
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

createAngryBird = function (Physics) {
  //angry_bird = Physics.body('circle', { x: 80, y: 100, vx: 0.65, vy: 0.4, radius: 25 });
  angry_bird = Physics.body('circle', { x: 80, y: 600, vx: 0, vy: 0, radius: 25 });

  angry_bird.view = new Image();
  angry_bird.view.src = './images/angry_bird_50x50.png';

  return angry_bird;
};

createPlanks = function (Physics, screenWidth, screenHeight) {
  var plankConfigurations, hwidth, hheight, vwidth, vheight;

  hwidth = vheight = 10;
  hheight = 50;
  vwidth = 150;

  plankConfigurations = [
    { x: screenWidth/2, y: screenHeight, width: hwidth, height: hheight, vx: 0, vy: 0},
    { x: screenWidth/2 + 25, y: screenHeight - 70, width: hwidth, height: hheight, vx: 0, vy: 0 },
    { x: screenWidth/2 + 75, y: screenHeight - 70, width: hwidth, height: hheight, vx: 0, vy: 0 },
    { x: screenWidth/2 + 100, y: screenHeight, width: hwidth, height: hheight, vx: 0, vy: 0 },
    { x: screenWidth/2 + 50, y: screenHeight - 50, width: vwidth, height: vheight, vx: 0, vy: 0 },
    { x: screenWidth/2 + 50, y: screenHeight - 80, width: 100, height: vheight, vx: 0, vy: 0 }
  ];

  return plankConfigurations.map(function (plankConfig) {
    return Physics.body('rectangle', plankConfig);
  });
}

createPigs = function (Physics, screenWidth, screenHeight) {
  var pigConfigurations;

  pigConfigurations = [
    { x: screenWidth/2 + 50, y: screenHeight - 70, vx: 0, vy: 0, radius: 25 },
    { x: screenWidth/2 + 50, y: screenHeight - 140, vx: 0, vy: 0, radius: 25 }
  ];

  return pigConfigurations.map(function (pigConf) {
    var pig;

    pig = Physics.body('circle', pigConf);
    pig.view = new Image();
    pig.view.src = './images/Minion_50x47.png';

    return pig;
  });
};

Physics(function(world) {
  var width, height, planks;

  width = window.innerWidth;
  height = window.innerHeight/2;

  //Setup the rendering process
  world.add(createRenderer(Physics, width, height));
  world.on('step', function () {
    world.render();
  });

  //Add bodies
  angry_bird = createAngryBird(Physics);
  world.add(angry_bird);
  createPlanks(Physics, width, height).forEach(function (plank) {
    world.add(plank);
  });

  createPigs(Physics, width, height).forEach(function (pig) {
    world.add(pig);
  });

  world.add(
    Physics.behavior('edge-collision-detection', {
      aabb: Physics.aabb(0, 0, width, height),
      restitution: 0.4,
      cof: 0.99
    })
  );

  world.add(Physics.behavior('constant-acceleration'));

  world.add(Physics.behavior('body-collision-detection'));

  world.add( Physics.behavior('sweep-prune') );

  world.add(Physics.behavior('body-impulse-response'));

  world.add(Physics.behavior('interactive', {
    el: 'my-game',
    maxVel: {x: 1, y: -2}
  }).applyTo([angry_bird]));

  Physics.util.ticker.on(function (time) {
    world.step(time);
  });

  Physics.util.ticker.start();
});
