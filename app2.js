var world, camera, gamePaused, jump,boxes,pointerBox, zajac,calyzajac,calyzajacMove, mina;

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
    boxMesh2 = Mesh.cube().scale(0.1,0.1,0.1)
    mats = new Material({
        color:[1.0,1.0,1.0],specularWeight:0.1,shininess:4.0,diffuse:Texture.fromImage("tex/grass.png")
    })

    mats3 = new Material({
        color:[1.0,1.0,1.0],specularWeight:0.1,shininess:4.0,diffuse:Texture.fromImage("tex/wood1.png")
    })
    mats3.setParent(shaderdiff2)
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
	zajac.stan = "biegnie2"
	zajac.loaded = 0

    mina = {}
    mina.stan="ok"
    mina.loaded=0;
calyzajac = {
        items:  []
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
document.addEventListener("keypress",function(e){
      var start = boxes.start
      console.log(e.keyCode)
      if(e.keyCode==49){
        zajac.stan = 'biegnie'
      }
      if(e.keyCode==50){
        zajac.stan = 'stoi'
      }
      if(e.keyCode==51){
        zajac.stan = 'biegnie2'
      }
      if(e.keyCode==52){
        calyzajacMove(new Vector(0.0,0.0,0.1),1)
      }
      if(e.keyCode==53){
        calyzajacMove(new Vector(0.0,0.0,-0.1),1)
      }
    });
	Mesh.obj("cube.obj",function(e){
		boxMesh = e.scaleUniform(0.1)
		boxMesh.setParent(mats)
		BoxSolver.load("zajac_glowa.json",function(e){
			zajac["glowa"] = e.reparent(boxMesh)
            zajac["glowa"].object.pivot = (new Vector(1,1,1))
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
            zajac["noga1"].object.pivot = (new Vector(0.55,0.1,-0.3))
			calyzajac.items.push(zajac["noga1"].object)
            zajac.loaded += 1
			
		})
		BoxSolver.load("zajac_noga.json",function(e){
			zajac["noga2"] = e.reparent(boxMesh)
			zajac["noga2"].object.move(new Vector(0.55,-0.3,-0.8))
            zajac["noga2"].object.pivot = (new Vector(0.55,0.1,-1.1))
			calyzajac.items.push(zajac["noga2"].object)
            zajac.loaded += 1
			
		})
		BoxSolver.load("zajac_noga.json",function(e){
			zajac["noga3"] = e.reparent(boxMesh)
			zajac["noga3"].object.move(new Vector(-0.25,-0.3,-0.1))
            zajac["noga3"].object.pivot = (new Vector(-0.25,0.1,-0.3))
			calyzajac.items.push(zajac["noga3"].object)
            zajac.loaded += 1
			
		})
		BoxSolver.load("zajac_noga.json",function(e){
			zajac["noga4"] = e.reparent(boxMesh)
			zajac["noga4"].object.move(new Vector(-0.25,-0.3,-0.8))
			zajac["noga4"].object.pivot = (new Vector(-0.25,0.1,-1.1))
            calyzajac.items.push(zajac["noga4"].object)
            zajac.loaded += 1
			
		})


	})
Mesh.obj("cube.obj",function(e){
        boxMesh2 = e.scaleUniform(0.1)
        boxMesh2.setParent(mats3)
         BoxSolver.load("mina.json",function(e){
            mina["cialo"] = e.reparent(boxMesh2)
            mina["cialo"].object.move(new Vector(0.5,-0.3,0.8))
            mina.loaded += 1
        })

    })
    agl.init();
    camera.position = new Vector(1.5,1.5,2.0);
    camera.rotation = new Vector(33.0,-33.0, 0);
    camera.on(0.1)
    camera.setScene(world);
    classCreated = false
}

window.logic = function () {
    if (!gamePaused) {
    	// Zając stoi
    	if(zajac.loaded == 6){
            if(!classCreated){
                classCreated = true
            }
    		if(zajac.stan == "stoi"){
    			zajac.glowa.object.rotate(Math.sin(gl.frame*0.004)*15,0,1,0)
    		}
    		if(zajac.stan == "biegnie"){
    			zajac.glowa.object.rotate(Math.sin(gl.frame*0.008)*15,1,0,0)
    		}
            if(zajac.stan == "biegnie2"){
            zajac.noga1.object.rotate(Math.sin(gl.frame*0.008)*15,1,0,0)
            zajac.noga2.object.rotate(Math.sin(gl.frame*0.008)*15,1,0,0)
            zajac.noga3.object.rotate(Math.sin(gl.frame*0.008)*15,1,0,0)
            zajac.noga4.object.rotate(Math.sin(gl.frame*0.008)*15,1,0,0)
            //calyzajacMove(new Vector(0.0,0.0,Math.sin(gl.frame*0.008)*0.1),1)
           
            }

    	}
        if(mina.loaded==1)
        mina.cialo.object.rotate(Math.sin(gl.frame*0.008)*15,1,0,0)
    	
    	// Zając stoi
    }
}
window.draw = function () {
    if (!gamePaused) {
        world.draw(camera);
    }
}
glStart(window.setup);

