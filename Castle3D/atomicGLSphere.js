// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/05
//----------------------------------------------------------------------------------------
// atomicGLSphere
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
// inputs
//------------------------
// nname: 		name of the Sphere - string
// sphere size
// rthis.radius:			float
// lthis.latitudeBands: init
// lthis.longitudeBands: int
atomicGLSphere = function(nname,rradius, llatitudeBands,llongitudeBands,uu,vv){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	// size
	this.radius	= rradius ;
	this.latitudeBands 	= llatitudeBands ;
	this.longitudeBands	= llongitudeBands ;

	// textures
	this.scaleUV = [uu,vv] ;
	this.textures = [] ;
	
	// vertices array
	this.verticesArray 	= [];
	// normals array
	this.normalsArray  = [];
	// texture coordinates array
    this.textureCoordsArray = [];
	// color array
    this.colorsArray = [];
	// indexes
    this.SphereVertexIndices = [];		

	// buffers
	this.SphereVertexPositionBuffer	;
    this.SphereVertexNormalBuffer		;
    this.SphereVertexTexCoordBuffer 	;
    this.SphereVertexColorBuffer 		;
    this.SphereVertexIndexBuffer 		;
	
	this.SphereVertexPositionBufferItemSize	;
    this.SphereVertexNormalBufferItemSize		;
    this.SphereVertexTexCoordBufferItemSize 	;
    this.SphereVertexColorBufferItemSize 		;
    this.SphereVertexIndexBufferItemSize 		;
	
	this.SphereVertexPositionBufferNumItems		;
    this.SphereVertexNormalBufferNumItems		;
    this.SphereVertexTexCoordBufferNumItems 	;
    this.SphereVertexColorBufferNumItems 		;
    this.SphereVertexIndexBufferNumItems 		;
	

	// methods
	// --------------------------------------------------
	
	this.pushTexture = function(atomicTex){this.textures.push(atomicTex);}

	// setFaceColor(face, RGB)
	//---------------------------
	// inputs
	//---------------------------
	// face: 	"All" (String)
	// RBG: 	[float, float, float]
	//---------------------------
	this.setFaceColor = function ( face, RGB) {
		// debug
		//console.log("atomicGLSphere("+this.name+")::setFaceColor");
		var r = RGB[0];
		var g = RGB[1];
		var b = RGB[2];
		
		// switch face
		switch(face){
			case "All":
				this.colorsArray = [] ;
				for (var latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
            		for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
                		// color
                		this.colorsArray.push(r);
                		this.colorsArray.push(g);
                		this.colorsArray.push(b);            
            		}
        		}
			break;		
		}
	}
	//---------------------------
	// initGLBuffers
	//---------------------------
	// inputs
	//------------------------
	// agl: openGL context
	//---------------------------
	this.initGLBuffers = function(agl){
		// debug
		//console.log("atomicGLSphere("+this.name+")::initGLBuffers");
		var gl = agl.gl ;
		// SphereVertexPositionBuffer
		this.SphereVertexPositionBuffer	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.SphereVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesArray), gl.STATIC_DRAW);


		// SphereVertexNormalBuffer		
		this.SphereVertexNormalBuffer		= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.SphereVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray), gl.STATIC_DRAW);

		// SphereVertexColorBuffer		
		this.SphereVertexColorBuffer 	= gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.SphereVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);
		
		// SphereVertexTexCoordBuffer		
		this.SphereVertexTexCoordBuffer 	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.SphereVertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordsArray), gl.STATIC_DRAW);
 		
		// SphereVertexIndexBuffer	
		this.SphereVertexIndexBuffer 		= gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.SphereVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.SphereVertexIndices), gl.STATIC_DRAW);
	}
	//---------------------------
	// draw(aGL,aMS,idProg)
	//---------------------------
	// inputs
	//---------------------------
	// aGL: GL context 		- atomicGLContext
	// aMS: Matrix Stacks 	- atomicMatrixStack
	// idProg: Shader index - integer
	//---------------------------
	this.draw = function(aGL,aMS,idProg){
		// debug
		//console.log("atomicGLSphere("+this.name+")::draw(progId: "+idProg+")");
		
		// activate shader
		aGL.gl.useProgram(aGL.shaderPrograms[idProg].program);
		// setUniforms: matrices and lights
		aGL.shaderPrograms[idProg].setUniforms(aGL,aMS);
		
		// link buffer to attributes
		//positions
		aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.SphereVertexPositionBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexPositionAttribute, this.SphereVertexPositionBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		//normals
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.SphereVertexNormalBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexNormalAttribute, this.SphereVertexNormalBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// colors
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.SphereVertexColorBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexColorAttribute, this.SphereVertexColorBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// textures
		if(this.textures.length>0){
			aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.SphereVertexTexCoordBuffer);
			aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].texCoordAttribute, this.SphereVertexTexCoordBufferItemSize, aGL.gl.FLOAT, false, 0, 0);	
		}
		for (var i=0; i<this.textures.length; i++ ){
			// activate texture
			agl.gl.activeTexture(agl.GLtexture[i]);
			agl.gl.bindTexture(aGL.gl.TEXTURE_2D, this.textures[i].texture);
			agl.gl.uniform1i(aGL.shaderPrograms[idProg].samplerUniform[i], i);
		}
		// indexes
        aGL.gl.bindBuffer(aGL.gl.ELEMENT_ARRAY_BUFFER, this.SphereVertexIndexBuffer);
		
		// draw Sphere
        aGL.gl.drawElements(aGL.gl.TRIANGLES, this.SphereVertexIndexBufferNumItems, aGL.gl.UNSIGNED_SHORT, 0);

	}
	//-----------------------------------------------------
	
	// init
	//-----------------------------
	// vertices, normals, colors, texCoord
	for (var latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / this.latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / this.longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
				// normals
                this.normalsArray.push(x);
                this.normalsArray.push(y);
                this.normalsArray.push(z);
				// position
                this.verticesArray.push(this.radius * x);
                this.verticesArray.push(this.radius * y);
                this.verticesArray.push(this.radius * z);
                // color
                this.colorsArray.push(0.8);
                this.colorsArray.push(0.8);
                this.colorsArray.push(0.8);
                // uv
                this.textureCoordsArray.push(this.scaleUV[0]*longNumber/this.longitudeBands);
                this.textureCoordsArray.push(this.scaleUV[1]*latNumber/this.latitudeBands);              
            }
        }

	// index 
    for (var latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
            for (var longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
                var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
                var second = first + this.longitudeBands + 1;
                this.SphereVertexIndices.push(first);
                this.SphereVertexIndices.push(second);
                this.SphereVertexIndices.push(first + 1);

                this.SphereVertexIndices.push(second);
                this.SphereVertexIndices.push(second + 1);
                this.SphereVertexIndices.push(first + 1);
            }
        }
	
	this.SphereVertexPositionBufferItemSize 	= 3	;
  	this.SphereVertexNormalBufferItemSize		= 3	;
   	this.SphereVertexTexCoordBufferItemSize		= 2 ;
   	this.SphereVertexColorBufferItemSize		= 3 ;
   	this.SphereVertexIndexBufferItemSize 		= 1 ;
	
	this.SphereVertexPositionBufferNumItems		= this.verticesArray.length / 3 ;
    this.SphereVertexNormalBufferNumItems		= this.normalsArray.length / 3 ;
	this.SphereVertexTexCoordBufferNumItems 	= this.textureCoordsArray.length/2 ;
	this.SphereVertexColorBufferNumItems 		= this.colorsArray.length /3 ;
    this.SphereVertexIndexBufferNumItems 		= this.SphereVertexIndices.length; ;
}
