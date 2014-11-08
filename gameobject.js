shaderSky = basicShader({})
worldsphere = new GameObject(world,{
	shader:shaderSky,
	material: new Material({color:[0.9,0.91,1.0]}),
	mesh:Mesh.sphere().scaleUniform(100.0)
})