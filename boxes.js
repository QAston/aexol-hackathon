	BoxCraft = function(){
        this.aex = new Aex()
        this.velocity = new Vector()
    }
    BoxSolver = function(){
        this.boxes = []
        this.object = new Group()
        this.start = new Vector()
        this.locations = []
    }
    BoxSolver.prototype.reparent = function(parent){
    	this.parent = parent || this.parent
		for(var box in this.boxes){
			var b = this.boxes[box]
			b.aex.setParent(this.parent)
		}
    	return this
    }
    BoxSolver.prototype.add = function(v,c){
        var box = new BoxCraft()
        box.aex.position = v
        box.aex.setModelView()
        this.boxes.push(box)
        box.aex.uniforms.color = c
        box.color = c
        this.object.add(box.aex)
        this.reparent()
    }
    BoxSolver.prototype.addFromCamera = function(v,v2){
        var vn = v2.multiply(Math.PI).divide(180.0)
        vn = vn.add(Math.PI)
        vn = new Vector(Math.sin(vn.y-Math.PI)*Math.cos(vn.x+Math.PI),Math.sin(vn.x), Math.cos(vn.y)*Math.cos(vn.x+Math.PI))
        var factor = 0.5
        var nX = -v.x+factor*vn.x
        var nY = -v.y+factor*vn.y
        var nZ = -v.z+factor*vn.z
        var size = 0.2
        var newPosition = new Vector(Math.floor(nX/size)*size, Math.floor(nY/size)*size,Math.floor(nZ/size)*size)
        this.add(newPosition)
    }
    BoxSolver.prototype.save = function(){
        var dataBox = {}
        dataBox.data = {
            position:[],
            color:[]
        }
        for (var b in this.boxes){
            var box = this.boxes[b]
            dataBox.data.position.push(box.aex.position)
            dataBox.data.color.push(box.color)
        }
        saveObjectOnTheFly(dataBox)
    }
    BoxSolver.load = function(filePath,callback){
    	var client = new XMLHttpRequest();
		var bs = new BoxSolver()
		bs.isLoaded = false
		client.open('GET', filePath);
		client.onreadystatechange = function() {
			if (client.readyState == 4 && client.status == "200") {
				console.log(client.response)
				var objectData = JSON.parse(client.response);
				var o = objectData.data.position
				var colors = objectData.data.color
				for(var i in o){
					var io = o[i]
					var cc = colors[i]
					bs.add(new Vector(io.x,io.y,io.z),cc)
				}
				bs.isLoaded = true
				callback(bs)
			}
		}
		client.send();
    }
    BoxSolver.prototype.solve = function(){
        for (var b in this.boxes){
            var box = this.boxes[b]
        }
    }