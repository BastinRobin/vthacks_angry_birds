var game, createRenderer;

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
};      
        
Physics(game);