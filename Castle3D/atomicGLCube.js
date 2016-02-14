// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/05
//----------------------------------------------------------------------------------------
// atomicGLCube
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
// inputs
//------------------------
// gl: openGL context
// nname: 		name of the cube - string
// cube size
// hheight:		float
// wwidth:		float
// ddepth:		float
atomicGLCube = function(nname,hheight, wwidth,ddepth,uu,vv){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	// size
	this.height	= hheight ;
	this.width 	= wwidth ;
	this.depth 	= ddepth ;
	
	// textures
	this.scaleUV = [uu,vv] ;
	this.textures = [] ;
	
	// vertices array
	this.verticesArray 	= [
        // Front face
        -this.width/2.0, 	0.0,  			+this.depth/2.0,		// 0
		+this.width/2.0,	0.0,  			+this.depth/2.0,		// 1
		+this.width/2.0,	this.height, 	+this.depth/2.0,		// 2
		-this.width/2.0, 	this.height,  	+this.depth/2.0,		// 3
		// Back face
		-this.width/2.0, 	0.0,  			-this.depth/2.0,		// 4
		+this.width/2.0,	0.0,  			-this.depth/2.0,		// 5
		+this.width/2.0,	this.height, 	-this.depth/2.0,		// 6
		-this.width/2.0, 	this.height,  	-this.depth/2.0,		// 7
		// Top face
		-this.width/2.0,  	this.height, 	+this.depth/2.0,		// 8
		+this.width/2.0,  	this.height,  	+this.depth/2.0,		// 9
		+this.width/2.0,  	this.height,  	-this.depth/2.0,		// 10
		-this.width/2.0,  	this.height, 	-this.depth/2.0,		// 11
		// Bottom face
		-this.width/2.0,  	0.0, 			+this.depth/2.0,		// 12
		+this.width/2.0,  	0.0,  			+this.depth/2.0,		// 13
		+this.width/2.0,  	0.0,  			-this.depth/2.0,		// 14
		-this.width/2.0,  	0.0, 			-this.depth/2.0,		// 15
		// Left face
		+this.width/2.0, 	0.0, 			+this.depth/2.0,		// 16
		+this.width/2.0,  	0.0, 			-this.depth/2.0,		// 17
		+this.width/2.0,  	this.height,  	-this.depth/2.0,		// 18
		+this.width/2.0, 	this.height,  	+this.depth/2.0,		// 19
		// Right face
		-this.width/2.0, 	0.0, 			-this.depth/2.0,		// 20
		-this.width/2.0, 	0.0,  			+this.depth/2.0,		// 21
		-this.width/2.0,  	this.height,  	+this.depth/2.0,		// 22
		-this.width/2.0,  	this.height, 	-this.depth/2.0			// 23
    ];
	// normals array
	this.normalsArray  = [
		// Front face
		 0.0,  0.0,  1.0, 0.0,  0.0,  1.0, 0.0,  0.0,  1.0, 0.0,  0.0,  1.0,
		// Back face
		 0.0,  0.0, -1.0, 0.0,  0.0, -1.0, 0.0,  0.0, -1.0, 0.0,  0.0, -1.0,
		// Top face
		 0.0,  1.0,  0.0, 0.0,  1.0,  0.0, 0.0,  1.0,  0.0, 0.0,  1.0,  0.0,
		// Bottom face
		 0.0, -1.0,  0.0, 0.0, -1.0,  0.0, 0.0, -1.0,  0.0, 0.0, -1.0,  0.0,
		// Left face
		 1.0,  0.0,  0.0, 1.0,  0.0,  0.0, 1.0,  0.0,  0.0, 1.0,  0.0,  0.0,
		// Right face
		-1.0,  0.0,  0.0, -1.0,  0.0,  0.0, -1.0,  0.0,  0.0, -1.0,  0.0,  0.0
    ];
	// texture coordinates array
    this.textureCoordsArray = [
		// Front face
		 uu*0.0, vv*0.0,		uu*1.0, vv*0.0,		uu*1.0, vv*1.0,		uu*0.0, vv*1.0,
		// Back face
		 uu*0.0, vv*0.0,		uu*1.0, vv*0.0,		uu*1.0, vv*1.0,		uu*0.0, vv*1.0,
		// Top face 
		 uu*0.0, vv*0.0,		uu*1.0, vv*0.0,		uu*1.0, vv*1.0,		uu*0.0, vv*1.0,
		// Bottom face : floor
		 uu*0.0, vv*0.0,		uu*1.0, vv*0.0,		uu*1.0, vv*1.0,		uu*0.0, vv*1.0,
		// Left face
		 uu*0.0, vv*0.0,		uu*1.0, vv*0.0,		uu*1.0, vv*1.0,		uu*0.0, vv*1.0,		
		// Right face
		 uu*0.0, vv*0.0,		uu*1.0, vv*0.0,		uu*1.0, vv*1.0,		uu*0.0, vv*1.0
	];
	// color array
    this.colorsArray = [
		// Front face
		 0.8,0.8, 0.8,		0.8,0.8, 0.8,		0.8,0.8,0.8,		0.8,0.8, 0.8,
		// Back face
		 0.8,0.8, 0.8,		0.8,0.8, 0.8,		0.8,0.8,0.8,		0.8,0.8, 0.8,
		// Top face 
		  0.8,0.8, 0.8,		0.8,0.8, 0.8,		0.8,0.8,0.8,		0.8,0.8, 0.8,
		// Bottom face : floor
		  0.8,0.8, 0.8,		0.8,0.8, 0.8,		0.8,0.8,0.8,		0.8,0.8, 0.8,
	   // Left face
		 0.8,0.8, 0.8,		0.8,0.8, 0.8,		0.8,0.8,0.8,		0.8,0.8, 0.8,
		// Right face
		  0.8,0.8, 0.8,		0.8,0.8, 0.8,		0.8,0.8,0.8,		0.8,0.8, 0.8
	];
	// indexes
    this.cubeVertexIndices = [
		0, 1, 2,      0, 2, 3,    // Front face
		4, 5, 6,      4, 6, 7,    // Back face
		8, 9, 10,     8, 10, 11,  // Top face
		12, 13, 14,   12, 14, 15, // Bottom face
		16, 17, 18,   16, 18, 19, // Right face
		20, 21, 22,   20, 22, 23  // Left face
	];		
	// buffers
	this.cubeVertexPositionBuffer	;
    this.cubeVertexNormalBuffer		;
    this.cubeVertexTexCoordBuffer 	;
    this.cubeVertexColorBuffer 		;
    this.cubeVertexIndexBuffer 		;
	
	this.cubeVertexPositionBufferItemSize	;
    this.cubeVertexNormalBufferItemSize		;
    this.cubeVertexTexCoordBufferItemSize 	;
    this.cubeVertexColorBufferItemSize 		;
    this.cubeVertexIndexBufferItemSize 		;
	
	this.cubeVertexPositionBufferNumItems	;
    this.cubeVertexNormalBufferNumItems		;
    this.cubeVertexTexCoordBufferNumItems 	;
    this.cubeVertexColorBufferNumItems 		;
    this.cubeVertexIndexBufferNumItems 		;
	
	

	// methods
	// --------------------------------------------------
	
	this.pushTexture = function(atomicTex){this.textures.push(atomicTex);}
	// setFaceColor(face, RGB)
	//---------------------------
	// inputs
	//---------------------------
	// face: 	"Front" | "Back" | "Top" | "Bottom" |"Left"| "Right"| "All" (String)
	// RBG: 	[float, float, float]
	//---------------------------
	this.setFaceColor = function ( face, RGB) {
		// debug
		//console.log("atomicGLCube("+this.name+")::setFaceColor");
		var r = RGB[0];
		var g = RGB[1];
		var b = RGB[2];
		
		// switch face
		switch(face){
			case "Front":
				this.colorsArray[0] =r;
				this.colorsArray[1] =g;
				this.colorsArray[2] =b;
			
				this.colorsArray[3] =r;
				this.colorsArray[4] =g;
				this.colorsArray[5] =b;
			
				this.colorsArray[6] =r;
				this.colorsArray[7] =g;
				this.colorsArray[8] =b;
			
				this.colorsArray[9]  =r;
				this.colorsArray[10] =g;
				this.colorsArray[11] =b;			
			break;

			case "Back":
				this.colorsArray[12+0] =r;
				this.colorsArray[12+1] =g;
				this.colorsArray[12+2] =b;
			
				this.colorsArray[12+3] =r;
				this.colorsArray[12+4] =g;
				this.colorsArray[12+5] =b;
			
				this.colorsArray[12+6] =r;
				this.colorsArray[12+7] =g;
				this.colorsArray[12+8] =b;
			
				this.colorsArray[12+9]  =r;
				this.colorsArray[12+10] =g;
				this.colorsArray[12+11] =b;
			break;			
			case "Top":
				this.colorsArray[24+0] =r;
				this.colorsArray[24+1] =g;
				this.colorsArray[24+2] =b;
			
				this.colorsArray[24+3] =r;
				this.colorsArray[24+4] =g;
				this.colorsArray[24+5] =b;
			
				this.colorsArray[24+6] =r;
				this.colorsArray[24+7] =g;
				this.colorsArray[24+8] =b;
			
				this.colorsArray[24+9]  =r;
				this.colorsArray[24+10] =g;
				this.colorsArray[24+11] =b;
			break;			
			case "Bottom":
				this.colorsArray[36+0] =r;
				this.colorsArray[36+1] =g;
				this.colorsArray[36+2] =b;
			
				this.colorsArray[36+3] =r;
				this.colorsArray[36+4] =g;
				this.colorsArray[36+5] =b;
			
				this.colorsArray[36+6] =r;
				this.colorsArray[36+7] =g;
				this.colorsArray[36+8] =b;
			
				this.colorsArray[36+9]  =r;
				this.colorsArray[36+10] =g;
				this.colorsArray[36+11] =b;
			break;			
			case "Left":
				this.colorsArray[48+0] =r;
				this.colorsArray[48+1] =g;
				this.colorsArray[48+2] =b;
			
				this.colorsArray[48+3] =r;
				this.colorsArray[48+4] =g;
				this.colorsArray[48+5] =b;
			
				this.colorsArray[48+6] =r;
				this.colorsArray[48+7] =g;
				this.colorsArray[48+8] =b;
			
				this.colorsArray[48+9]  =r;
				this.colorsArray[48+10] =g;
				this.colorsArray[48+11] =b;
			break;				
			case "Right":
				this.colorsArray[60+0] =r;
				this.colorsArray[60+1] =g;
				this.colorsArray[60+2] =b;
			
				this.colorsArray[60+3] =r;
				this.colorsArray[60+4] =g;
				this.colorsArray[60+5] =b;
			
				this.colorsArray[60+6] =r;
				this.colorsArray[60+7] =g;
				this.colorsArray[60+8] =b;
			
				this.colorsArray[60+9]  =r;
				this.colorsArray[60+10] =g;
				this.colorsArray[60+11] =b;
			break;	
			case "All":
				this.colorsArray = [
					// Front face
					r, g, b,		r, g, b,		r, g, b,		r, g, b,
					// Back face
					r, g, b,		r, g, b,		r, g, b,		r, g, b,
					// Top face 
					r, g, b,		r, g, b,		r, g, b,		r, g, b,
					// Bottom face : floor
					r, g, b,		r, g, b,		r, g, b,		r, g, b,
					// Left face
					r, g, b,		r, g, b,		r, g, b,		r, g, b,
					// Right face
					r, g, b,		r, g, b,		r, g, b,		r, g, b,
				];	
			break;		
		}
	};
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
        this.cubeVertexPositionBufferNumItems = 24;

		// cubeVertexNormalBuffer		
		this.cubeVertexNormalBuffer		= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray), gl.STATIC_DRAW);
        this.cubeVertexNormalBufferItemSize = 3;
        this.cubeVertexNormalBufferNumItems = 24;

		// cubeVertexColorBuffer		
		this.cubeVertexColorBuffer 	= gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);
        this.cubeVertexColorBufferItemSize = 3;
        this.cubeVertexColorBufferNumItems = 24;
		
		// cubeVertexTexCoordBuffer		
		this.cubeVertexTexCoordBuffer 	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordsArray), gl.STATIC_DRAW);
        this.cubeVertexTexCoordBufferItemSize = 2;
        this.cubeVertexTexCoordBufferNumItems = 24;
		
		// cubeVertexIndexBuffer	
		this.cubeVertexIndexBuffer 		= gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.cubeVertexIndices), gl.STATIC_DRAW);
        this.cubeVertexIndexBufferItemSize = 1;
        this.cubeVertexIndexBufferNumItems = 36;
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
