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
    // teren
    worldboxes = []
    wSize = 5
    oneBoxSize = 0.1
    mats2 = new Material({
        color:[0.0,1.0,0.0],specularWeight:0.1,shininess:4.0
    })
    boxes = new BoxSolver()
	zajac = {}
	zajac.stan = "stoi"
	zajac.loaded = 0

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
	Mesh.obj("cube.obj",function(e){
		boxMesh = e.scaleUniform(0.1)
		boxMesh.setParent(mats)
		BoxSolver.load("zajac_glowa.json",function(e){
			zajac["glowa"] = e.reparent(boxMesh)
			zajac["glowa"].object.move(new Vector(0.0,0,-0.0))
			calyzajac.items.push(zajac["glowa"].object)
			zajac.loaded += 1
		})
		BoxSolver.load("zajac_cialo.json",function(e){
			zajac["cialo"] = e.reparent(boxMesh)
			zajac["cialo"].object.move(new Vector(0.13,0,-0.23))
			calyzajac.items.push(zajac["cialo"].object)
			zajac.loaded += 1
		})
		BoxSolver.load("zajac_noga.json",function(e){
			zajac["noga1"] = e.reparent(boxMesh)
			zajac["noga1"].object.move(new Vector(0.55,-0.3,-0.1))
			calyzajac.items.push(zajac["noga1"].object)
			zajac.loaded += 1

		})
		BoxSolver.load("zajac_noga.json",function(e){
			zajac["noga2"] = e.reparent(boxMesh)
			zajac["noga2"].object.move(new Vector(0.55,-0.3,-0.8))
			calyzajac.items.push(zajac["noga2"].object)
			zajac.loaded += 1

		})
		BoxSolver.load("zajac_noga.json",function(e){
			zajac["noga3"] = e.reparent(boxMesh)
			zajac["noga3"].object.move(new Vector(-0.25,-0.3,-0.1))
			calyzajac.items.push(zajac["noga3"].object)
			zajac.loaded += 1

		})
		BoxSolver.load("zajac_noga.json",function(e){
			zajac["noga4"] = e.reparent(boxMesh)
			zajac["noga4"].object.move(new Vector(-0.25,-0.3,-0.8))
			calyzajac.items.push(zajac["noga4"].object)
			zajac.loaded += 1

		})
	})

    document.addEventListener("keypress",function(e){
      var start = boxes.start
      console.log(e.keyCode)
      if(e.keyCode==49){
        zajac.stan = 'biegnie'
      }
      if(e.keyCode==50){
        zajac.stan = 'stoi'
      }
    });
    agl.init();
    camera.position = new Vector(1.5,1.5,2.0);
    camera.rotation = new Vector(33.0,-33.0, 0);
    camera.on(0.1)
    camera.setScene(world);
    classCreated = false
    objectList = [];
    objectList.push({go:zajac,})
    LoadObjects(objectList);
    console.log("SETUP");
    lastTime = gl.frame;
    gamePaused = false

}
LoadObject = function(name,position)
{
gObject = {}
    gObject.stan = "ob"
    gObject.loaded = 0
        Mesh.obj("cube.obj",function(e){
        boxMesh = e.scaleUniform(0.1)
        boxMesh.setParent(mats)
        BoxSolver.load(name+".json",function(e){
            gObject["body"] = e.reparent(boxMesh)
            gObject["body"].object.move(position)
            gObject.loaded += 1
        })
    })
        return gObject
}
LoadObjects = function(objectList)
{
objectList.push({go:LoadObject("Data/tree",new Vector(2.0,0.5,0.0)),})
objectList.push({go:LoadObject("Data/island1",new Vector(-5,0.0,0.0)),})
objectList.push({go:LoadObject("Data/island2",new Vector(2.0,0.0,0.0)),})
}

testPointCollision = function(boundingBox, point) {
	return point.x < boundingBox.max.x &&
	point.z < boundingBox.max.z &&
	point.x > boundingBox.min.x &&
	point.z > boundingBox.min.z
}

testAABBCollision = function(item, camera) {
	return !(item.max.x <  camera.min.x ||
		item.max.y < camera.min.y ||
		item.min.x > camera.max.x ||
		item.min.y > camera.max.y);
}

createCameraAABB = function(camera) {
	var result = 
			{max: new Vector(camera.x + 0.05, camera.y + 0.05, camera.z + 0.05),
			min: new Vector(camera.x - 0.05, camera.y - 0.05, camera.z - 0.05)}
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
    updateAi(object, timeDiff);
  })
		
		performGravity()
}
window.draw = function () {
    world.draw(camera);
}
glStart(window.setup);
