var world, camera, gamePaused, jump,boxes,pointerBox;
var pause = function () {
    gamePaused = !gamePaused
}
window.setup = function () {
    setGL("agl");
    gamePaused = false
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
        color:[1.0,1.0,1.0],specularWeight:0.1,shininess:4.0,diffuse:Texture.fromImage("tex/wood1.png")
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
    boxMesh2 = Mesh.cube().scaleUniform(oneBoxSize)
    mats2 = new Material({
        color:[0.0,1.0,0.0],specularWeight:0.1,shininess:4.0
    })
//    boxMesh2.setParent(mats2)
//    editorGrid = new Group()
//    mats2.setParent(shaderdiff3)
//        miniBox = new Aex()
//        miniBox.setParent(boxMesh2)
//        for(var i=0;i<wSize;i++){
//        for(var j=0;j<wSize;j++){
//            for(var k=0;k<wSize;k++){
//                boxMesh2.combine(Mesh.cube().scaleUniform(oneBoxSize).move(i*(oneBoxSize*2.1),k*(oneBoxSize*2.1),j*(oneBoxSize*2.1)),1)
//            }
//        }
//    }
//    boxMesh2.compile()
    // endteren
    
    boxes = new BoxSolver()

	Mesh.obj("cube.obj",function(e){
		boxMesh = e.scaleUniform(0.1)
		boxMesh.setParent(mats)
		boxes.reparent(boxMesh)
	})
    boxMesh3 = Mesh.cube().scale(0.1,0.1,0.1)
    pointerShader = basicShader({})
    pointerShader.setParent(world)
    pointerMat = new Material({color:[1.0,0.7,0.65]})
    pointerMat.setParent(pointerShader)
    boxMesh3.setParent(pointerMat)
    pointerBox = new Aex()
    pointerBox.setParent(boxMesh3)
    agl.init();
    document.addEventListener("keypress",function(e){
         if(e.keyCode==53){
          console.log("ADDBOX")
            boxes.add(boxes.start.multiply(oneBoxSize),document.getElementById("color").color.rgb)
        }
        if (e.keyCode== 54) {
          if (confirm("Czy chcesz wczytac plik?"))
            wczytajObrazek("slon_glowa.json");
        }
        if (e.keyCode == 55) {
          if (confirm("Czy chcesz wyczyscic ekran?"))
            clearScreen()
        }
        var start = boxes.start
    })
    var start = boxes.start
    gl.canvas.addEventListener("mousemove",function(e){
    	var newX = -30+Math.floor(e.x/(window.innerWidth/30.0))*2
    	var newY = 30-Math.floor(e.y/(window.innerHeight/30.0))*2
    	start.x = newX
    	start.y = newY
    })
    document.addEventListener("keypress",function(e){
        
        console.log(e.keyCode)
        if(e.keyCode==116){
            start.z += 2
        }
        if(e.keyCode==103){
            start.z -= 2
        }
        if(e.keyCode==102){
            start.x -= 2
        }
        if(e.keyCode==104){
            start.x += 2
        }
        if(e.keyCode==121){
            start.y += 2
        }
        if(e.keyCode==114){
            start.y -= 2
        }
        if(e.keyCode==112){
            boxes.save()
        }
    })
    camera.position = new Vector(1.5,1.5,2.0);
    camera.rotation = new Vector(33.0,-33.0, 0);
    camera.on(0.1)
    camera.setScene(world);
}
window.logic = function () {
    if (!gamePaused) {
        pointerBox.position = (boxes.start.multiply(oneBoxSize))
        pointerBox.setModelView()
    }
}
window.draw = function () {
    if (!gamePaused) {
        world.draw(camera);
    }
}

wczytajObrazek = function(filename) {
  BoxSolver.load(filename,function(e){
    boxes = e;
    boxes.reparent(boxMesh)
  });
}

clearScreen = function() {
    boxes = new BoxSolver()
    boxes.reparent(boxMesh)
}


glStart(window.setup);

