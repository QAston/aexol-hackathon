var world, camera, gamePaused = true, jump,boxes,pointerBox, zajac,calyzajac,calyzajacMove, objectList, lastTime;
var pause = function () {
    gamePaused = !gamePaused
}

window.setup = function () {
    setGL("agl");

    var agl = new aexolGL();
    world = new Scene();
    camera = new Camera(1)
    sceneGroup = new Group()
    shaderdiff2 = basicShader({useLights:true,useDiffuse:true})
    shaderdiff3 = basicShader({useLights:true})
    shaderSky = basicShader({})
    lights = new Light([
    {
        lightPosition: new Vector(3.0,4.0,10.0),
        attenuation: 30.0,
        intensity: 1.5,
        color: [1.0,0.7,0.2]
    },
    {
        lightType:2.0,
        intensity: 0.4,
        color: [0.4,0.4,0.8]
    }
    ])

    lights.setParent(world)
    shaderdiff2.setParent(lights)

    shaderdiff3.setParent(lights)
    boxMesh = Mesh.cube().scale(0.1,0.1,0.1)
    mats = new Material({
        color:[1.0,0.0,0.0],specularWeight:0.1,shininess:4.0,diffuse:Texture.fromImage("tex/stone.png")
    })
    mats.setParent(shaderdiff2)
    boxMesh.setParent(mats)
    worldsphere = new GameObject(world,{
        shader:shaderSky,
        material: new Material({color:[0.9,0.91,1.0]}),
        mesh:Mesh.sphere().scaleUniform(100.0)
    })
	var lastPosition = {x: 0, y: 0}
	var sensitivity = 0.7
	gl.canvas.addEventListener("mousemove", function(a) {
		var x = a.movementX * sensitivity,
			y = a.movementY * sensitivity
		camera.yawStep = x;
		camera.pitchStep = y;
	})
    // teren
    worldboxes = []
    wSize = 5
    oneBoxSize = 0.1
    mats2 = new Material({
        color:[0.0,1.0,0.0],specularWeight:0.1,shininess:4.0
    })
    boxes = new BoxSolver()
	calyzajac = {
		items:	[]
	}
	calyzajacMove = function(v,r){
		for(var i in calyzajac.items){
			calyzajac.items[i].move(v,r)
			calyzajac.items[i].pivot = calyzajac.items[i].pivot.add(v)
			for(var d in calyzajac.items[i].items){
				console.log(calyzajac.items[i].items)
				if(calyzajac.items[i].items[d].originPosition){
					calyzajac.items[i].items[d].originPosition = calyzajac.items[i].items[d].originPosition.add(v)

				}else{
					calyzajac.items[i].items[d].originPosition = v
				}
			}
		}
	}

    agl.init();
    camera.position = new Vector(1.5,1.5,2.0);
    camera.rotation = new Vector(33.0,-33.0, 0);
    camera.setScene(world);
    classCreated = false
    objectList = [];
    loadObjects(objectList);
    console.log("SETUP");
    lastTime = gl.frame;
    gamePaused = false

}

loadObject = function(name,position,rotation)
{
    gObject = {}
    gObject.stan = "ob"
    gObject.enabled = 0
        Mesh.obj("cube.obj",function(e){
        boxMesh = e.scaleUniform(0.1)
        boxMesh.setParent(mats)
        BoxSolver.load(name+".json",function(e){
            gObject["mesh"] = e.reparent(boxMesh)
            gObject["mesh"].object.move(position)
            gObject["mesh"].object.pivot = position
            gObject["mesh"].object.rotate(rotation,0,1,0)
            gObject.enabled += 1
        })
    })
        return gObject
}
loadObjects = function(objectList)
{
objectList.push(loadObject("Data/tree",new Vector(2.0,0.5,0.0),90))
objectList.push(loadObject("Data/island1",new Vector(-5,0.0,0.0),0))
objectList.push(loadObject("Data/island2",new Vector(2.0,0.0,0.0),90))
}

testPointCollision = function(boundingBox, point) {
	return point.x < boundingBox.max.x &&
	point.z < boundingBox.max.z &&
	point.x > boundingBox.min.x &&
	point.z > boundingBox.min.z
}

moveByVector = function(vector) {
	var futurePosition = new Vector(vector.x + camera.position.x, vector.y + camera.position.y,
						vector.z + camera.position.z);
	if(testFalling(futurePosition))
		return
	if(vector.z != 0)
		camera.sideStep = camera.factor
	camera.side(vector.x)
}

handleDownKeyboard = function(sign) {
	console.log(sign)
	if(sign == 87)
		camera.forwardStep = camera.factor
	if(sign == 83)
		camera.forwardStep = -camera.factor
	if(sign == 65)
		camera.sideStep = camera.factor
	if(sign == 68)
		camera.sideStep = -camera.factor
}

handleUpKeyboard = function(sign) {
	console.log(sign)
	if(sign == 87)
		camera.forwardStep = 0
	if(sign == 83)
		camera.forwardStep = 0
	if(sign == 65)
		camera.sideStep = 0	
	if(sign == 68)
		camera.sideStep = 0;
}

handleMouse = function(mouse) {
	alert();
}

testAABBCollision = function(item, camera) {
	return !(item.max.x <  camera.min.x ||
		item.max.y < camera.min.y ||
		item.min.x > camera.max.x ||
		item.min.y > camera.max.y);
}

var cameraWidth = 0.05
createCameraAABB = function(camera) {
	var result = 
			{max: new Vector(camera.x + cameraWidth, camera.y + cameraWidth, camera.z + cameraWidth),
			min: new Vector(camera.x - cameraWidth, camera.y - cameraWidth, camera.z - cameraWidth)}
	return result
}

testFalling = function(cameraPosition) {
	var result = false;
	boxMesh.children.forEach(function(item) {
				if(testAABBCollision(item.aabb, createCameraAABB(cameraPosition)))
					result = true;
			})
	return !result;
}

window.onkeydown = function(e) {
	handleDownKeyboard(e.which)
}

window.onkeyup = function(e) {
	handleUpKeyboard(e.which)
}

dropVector = new Vector(0,-0.01,0)
performGravity = function() {
	if(testFalling(camera.position)) {
		camera.position = camera.position.add(dropVector);
	}
}

window.logic = function () {
  if (gamePaused)
    return;
  // main game loop
  var newTime = gl.frame;
  var timeDiff = newTime-lastTime;
  lastTime = newTime;
  objectList.forEach(function(object, index, array){
    if (!object.enabled)
      return;
    updateAi(object, timeDiff);

  })

		performGravity()
}
window.draw = function () {
    world.draw(camera);
}
glStart(window.setup);
