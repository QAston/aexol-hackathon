var world, camera, gamePaused = true, jump,boxes,pointerBox,camera, zajac,calyzajac,calyzajacMove, objectList, lastTime,playerTurn,info;
var pause = function () {
    gamePaused = !gamePaused
}

window.setup = function () {
    setGL("agl");

    var agl = new aexolGL();
    world = new Scene();
    camera = new Camera(1)
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
        material: new Material({color:[0.7,0.7,1.0]}),
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
    playerTurn =1
    info = new Label(world, "W - move forward, A - turn Left, D - turn Right","Helvetica", 120)
    info.move(new Vector(0,3,0))
}

loadObject = function(name,position,rotation)
{
  var gObject = {}
  gObject.stan = "ob"
  gObject.enabled = 0

  BoxSolver.load(name+".json",function(e){
    gObject.boxSolver = e.reparent(boxMesh)
    gObject.boxSolver.object.move(position)
    gObject.boxSolver.object.pivot = position
    gObject.boxSolver.object.rotate(rotation,0,1,0)
    gObject.enabled += 1
  })

  return gObject
}
loadObjects = function(objectList)
{
  Mesh.obj("cube.obj",function(e){
    boxMesh = e.scaleUniform(0.1)
    boxMesh.setParent(mats)
    objectList.push(loadObject("Data/tree",new Vector(2.0,0.5,0.0),90))
    objectList.push(loadObject("Data/island1",new Vector(-5,0.5,0.0),0))
    objectList.push(loadObject("Data/island2",new Vector(2.0,0.0,0.0),90))
    objectList.push(loadObject("Data/island2",new Vector(1.0,0.0,-1.0),90))
    objectList.push(loadObject("Data/island2",new Vector(-0.5,0.0,2.0),90))
    objectList.push(loadObject("Data/bridge",new Vector(-0.5,0.0,2.0),0))
    objectList.push(loadObject("Data/island1",new Vector(-5.5,-0.7,3.2),0))
    objectList.push(loadObject("Data/stairs",new Vector(-5.0,-0.5,2.1),-90))

    objectList.push(loadObject("Data/bridge",new Vector(-2.2,0.0,2.5),90))
    objectList.push(loadObject("Data/tree",new Vector(1.0,0.5,-1.0),0))
    objectList.push(loadObject("Data/tree",new Vector(1.5,0.5,-1.0),0))
    objectList.push(loadObject("Data/rock_medium",new Vector(0.3,0.2,-1.0),0))
    objectList.push(loadObject("Data/rock_large",new Vector(-5,0.7,-0.5),0))
    objectList.push(loadObject("Data/tree",new Vector(-4,1,-1.0),0))

    objectList.push(loadObject("Data/bridge",new Vector(-5.5,-0.7,5.2),0))
    objectList.push(loadObject("Data/island1",new Vector(-5.5,-0.7,7.2),0))
    objectList.push(loadObject("Data/island1",new Vector(-6.5,-0.7,7.2),0))
    objectList.push(loadObject("Data/house",new Vector(-5.5,-0.5,7.2),0))
    objectList.push(loadObject("Data/tree",new Vector(-5.5,-0.0,5.6),0))
  })
}

testPointCollision = function(boundingBox, point) {
	return point.x < boundingBox.max.x &&
	point.z < boundingBox.max.z &&
	point.x > boundingBox.min.x &&
	point.z > boundingBox.min.z
}

moveByVector = function(vector) {
	var oldPosition = new Vector(camera.position.x, camera.position.y, camera.position.z)
	camera.position = camera.position.add(vector)
	if(!testCollision(camera.position)) {
		camera.position = oldPosition
	}
}

handleDownKeyboard = function(sign) {
	console.log(sign)
	if(sign == 119)//w
    {
        switch(playerTurn)
        {
            case 1: moveByVector(new Vector(0,0,-0.1))
            break;
            case 2: moveByVector(new Vector(0.1,0,0))
            break;
            case 3: moveByVector(new Vector(0,0,0.1))
            break;
            case 4: moveByVector(new Vector(-0.1,0,0))
            break;
        }
		
    }
	if(sign == 115)//s
		{

        }
	if(sign == 100)//d
    {
        playerTurn++
        if(playerTurn>4) playerTurn=1
    }
	if(sign == 97)//a
		{
            playerTurn--
            if(playerTurn<1) playerTurn=4
        }
    if(sign == 32)//space
        {
                moveByVector(new Vector(0,0.1,0))
        }



}

testAABBCollision = function(item, camera) {
	return !(item.max.x <  camera.min.x ||
		item.max.y < camera.min.y ||
		item.min.x > camera.max.x ||
		item.min.y > camera.max.y);
}

var cameraWidth = 0.07
createCameraAABB = function(camera, cameraWidth) {
	var result = 
			{max: new Vector(camera.x + cameraWidth, camera.y + cameraWidth, camera.z + cameraWidth),
			min: new Vector(camera.x - cameraWidth, camera.y - cameraWidth, camera.z - cameraWidth)}
	return result
}

testCollision = function(cameraPosition, gravity) {
	var result = false;
	boxMesh.children.forEach(function(item) {
				if(testAABBCollision(item.aabb, createCameraAABB(cameraPosition, gravity ? 0.15 : 0.05)))
					result = true;
			})
	return !result;
}

window.onkeypress = function(key) {
	handleDownKeyboard(key.which)
}

dropVector = new Vector(0,-0.01,0)
performGravity = function() {
	if(testCollision(camera.position, true)) {
		camera.position = camera.position.add(dropVector)
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
