// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/27
//----------------------------------------------------------------------------------------
// atomicGLObj
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
// inputs
//------------------------
// nname: 	name of the 3D Obj - string
// obj  :	obj object
// uu,vv:	text coord scale

atomicGLObj = function(nname, obj, uu, vv){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	
	// textures
	this.scaleUV = [uu,vv] ;
	this.textures = [] ;
	
	// vertices array
	this.verticesArray 	= obj.vertices;
	// normals array
	this.normalsArray  = obj.normals ;
	// texture coordinates array
    this.textureCoordsArray = obj.uv ;
	// apply scaling
	var uvs = this.textureCoordsArray.length / 2 ;
	for (var i=0; i<uvs; i++){
		this.textureCoordsArray[2*i] 	= uu*this.textureCoordsArray[2*i];
		this.textureCoordsArray[2*i+1] 	= vv*this.textureCoordsArray[2*i+1];
	}
	// indexes
    this.cubeVertexIndices = obj.index;		
	
	// buffers
	this.cubeVertexPositionBuffer	;
    this.cubeVertexNormalBuffer		;
    this.cubeVertexTexCoordBuffer 	;
    this.cubeVertexIndexBuffer 		;
	
	this.cubeVertexPositionBufferItemSize	;
    this.cubeVertexNormalBufferItemSize		;
    this.cubeVertexTexCoordBufferItemSize 	;
    this.cubeVertexIndexBufferItemSize 		;
	
	this.cubeVertexPositionBufferNumItems	;
    this.cubeVertexNormalBufferNumItems		;
    this.cubeVertexTexCoordBufferNumItems 	;
    this.cubeVertexIndexBufferNumItems 		;

	// methods
	// --------------------------------------------------
	// pushTexture
	// --------------------------
	// inputs
	// --------------------------
	// atomicTex: texture - atomicGLTexture
	// --------------------------
	this.pushTexture = function(atomicTex){this.textures.push(atomicTex);}
	
	//---------------------------
	// initGLBuffers
	//---------------------------
	// inputs
	//------------------------
	// agl: openGL context
	//---------------------------
	this.initGLBuffers = function(agl){
		// debug
		//console.log("atomicGLCube("+this.name+")::initGLBuffers");
		var gl = agl.gl ;
		// cubeVertexPositionBuffer
		this.cubeVertexPositionBuffer	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesArray), gl.STATIC_DRAW);
        this.cubeVertexPositionBufferItemSize = 3;
        this.cubeVertexPositionBufferNumItems = this.verticesArray.length/3;

		// cubeVertexNormalBuffer		
		this.cubeVertexNormalBuffer		= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray), gl.STATIC_DRAW);
        this.cubeVertexNormalBufferItemSize = 3;
        this.cubeVertexNormalBufferNumItems = this.normalsArray.length/3;
		
		// cubeVertexTexCoordBuffer		
		this.cubeVertexTexCoordBuffer 	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordsArray), gl.STATIC_DRAW);
        this.cubeVertexTexCoordBufferItemSize = 2;
        this.cubeVertexTexCoordBufferNumItems = this.textureCoordsArray.length/2;
		
		// cubeVertexIndexBuffer	
		this.cubeVertexIndexBuffer 		= gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.cubeVertexIndices), gl.STATIC_DRAW);
        this.cubeVertexIndexBufferItemSize = 1;
        this.cubeVertexIndexBufferNumItems = this.cubeVertexIndices.length ;
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
		//console.log("atomicGLCube("+this.name+")::draw(progId: "+idProg+")");

		// activate shader
		aGL.gl.useProgram(aGL.shaderPrograms[idProg].program);
		// setUniforms: matrices and lights
		aGL.shaderPrograms[idProg].setUniforms(aGL,aMS);
		
		// link buffer to attributes
		//positions
		aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexPositionAttribute, this.cubeVertexPositionBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		//normals
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexNormalAttribute, this.cubeVertexNormalBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// colors
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.cubeVertexColorBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexColorAttribute, this.cubeVertexColorBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// textures
		if(this.textures.length>0){
			// debug
			// console.log("atomicGLCube("+this.name+")::vertexAttribPointer: "+aGL.shaderPrograms[idProg].texCoordAttribute);
			aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.cubeVertexTexCoordBuffer);
			aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].texCoordAttribute, this.cubeVertexTexCoordBufferItemSize, aGL.gl.FLOAT, false, 0, 0);		
		}
		for (var i=0; i<this.textures.length; i++ ){
			// activate texture
			// debug
			// console.log("atomicGLCube("+this.name+")::activateTexture: "+agl.GLtexture[i]+"/"+agl.gl.TEXTURE0);
			agl.gl.activeTexture(agl.GLtexture[i]);
			// debug
			// console.log("atomicGLCube("+this.name+")::bindTexture: "+this.textures[i].texture);
			agl.gl.bindTexture(aGL.gl.TEXTURE_2D, this.textures[i].texture);
			// debug
			// console.log("atomicGLCube("+this.name+")::uniform: "+aGL.shaderPrograms[idProg].samplerUniform[i]+"->"+i);			
			agl.gl.uniform1i(aGL.shaderPrograms[idProg].samplerUniform[i], i);
		}
		// indexes
        aGL.gl.bindBuffer(aGL.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
		
		// draw cube
        aGL.gl.drawElements(aGL.gl.TRIANGLES, this.cubeVertexIndexBufferNumItems, aGL.gl.UNSIGNED_SHORT, 0);

	}
	//-----------------------------------------------------
}
