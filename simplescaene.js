var world, camera, gamePaused, jump,boxes,pointerBox, zajac;
var pause = function () {
    gamePaused = !gamePaused
}
window.setup = function () {
    setGL("agl");
    gamePaused = false
    var agl = new aexolGL();
    world = new Scene();
    camera = new Camera(1)
    agl.init();
    camera.position = new Vector(1.5,1.5,2.0);
    camera.rotation = new Vector(33.0,-33.0, 0);
    camera.on(0.1)
    camera.setScene(world);
}
window.logic = function () {
    if (!gamePaused) {
    	if(zajac.glowa){
    		zajac.glowa.object.rotate(Math.sin(gl.frame*0.004)*45,0,1,0)
    	}
    }
}
window.draw = function () {
    if (!gamePaused) {
        world.draw(camera);
    }
}
glStart(window.setup);

