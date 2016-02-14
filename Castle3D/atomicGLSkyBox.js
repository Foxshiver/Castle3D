// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/10/07
//----------------------------------------------------------------------------------------
// atomicGLSkyBox
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
// inputs
//------------------------
// gl: openGL context
// nname: 		name of the skyBox - string
// skyBox size
// ssize:		float
atomicGLSkyBox = function(nname,ssize){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	// size
	this.size = ssize ;
	
	// textures
	this.textures = [] ;
	
	// vertices array
	this.verticesArray 	= [
        // Front face
        +this.size/2.0, 	-this.size/2.0,  	+this.size/2.0,		// 0
		-this.size/2.0,		-this.size/2.0,  	+this.size/2.0,		// 1
		-this.size/2.0,		this.size/2.0, 		+this.size/2.0,		// 2
		+this.size/2.0, 	this.size/2.0,  	+this.size/2.0,		// 3
		// Back face
		-this.size/2.0, 	-this.size/2.0,  	-this.size/2.0,		// 4
		+this.size/2.0,		-this.size/2.0,  	-this.size/2.0,		// 5
		+this.size/2.0,		this.size/2.0, 		-this.size/2.0,		// 6
		-this.size/2.0, 	this.size/2.0,  	-this.size/2.0,		// 7
		// Top face
		-this.size/2.0,  	this.size/2.0, 		-this.size/2.0,		// 8
		+this.size/2.0,  	this.size/2.0,  	-this.size/2.0,		// 9
		+this.size/2.0,  	this.size/2.0,  	+this.size/2.0,		// 10
		-this.size/2.0,  	this.size/2.0, 		+this.size/2.0,		// 11
		// Bottom face
		-this.size/2.0,  	-this.size/2.0, 	+this.size/2.0,		// 12
		+this.size/2.0,  	-this.size/2.0,  	+this.size/2.0,		// 13
		+this.size/2.0,  	-this.size/2.0,  	-this.size/2.0,		// 14
		-this.size/2.0,  	-this.size/2.0, 	-this.size/2.0,		// 15
		// Left face
		-this.size/2.0, 	-this.size/2.0, 	+this.size/2.0,		// 16
		-this.size/2.0,  	-this.size/2.0, 	-this.size/2.0,		// 17
		-this.size/2.0,  	this.size/2.0,  	-this.size/2.0,		// 18
		-this.size/2.0, 	this.size/2.0,  	+this.size/2.0,		// 19
		// Right face
		+this.size/2.0, 	-this.size/2.0, 	-this.size/2.0,		// 20
		+this.size/2.0, 	-this.size/2.0,  	+this.size/2.0,		// 21
		+this.size/2.0,  	this.size/2.0,  	+this.size/2.0,		// 22
		+this.size/2.0,  	this.size/2.0, 		-this.size/2.0		// 23
    ];
	// normals array
	this.normalsArray  = [
		// Front face
		 0.0,  0.0,  -1.0, 0.0,  0.0,  -1.0, 0.0,  0.0,  -1.0, 0.0,  0.0,  -1.0,
		// Back face
		 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0,
		// Top face
		 0.0,  -1.0,  0.0, 0.0,  -1.0,  0.0, 0.0,  -1.0,  0.0, 0.0,  -1.0,  0.0,
		// Bottom face
		 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0,
		// Left face
		1.0,  0.0,  0.0, 1.0,  0.0,  0.0, 1.0,  0.0,  0.0, 1.0,  0.0,  0.0,
		// Right face
 		 -1.0,  0.0,  0.0, -1.0,  0.0,  0.0, -1.0,  0.0,  0.0, -1.0,  0.0,  0.0   ];
	// texture coordinates array
    this.textureCoordsArray = [
		// Front face
		0.75, 0.333,		1.0, 0.333,			1.0, 0.666,			0.75, 0.666,
		// Back face
		 0.25, 0.333,		0.50, 0.333,		0.50, 0.666,		0.25, 0.666,
		// Top face 
		 0.25, 0.666,		0.50, 0.666,		0.50, 1.0,			0.25, 1.0,
		// Bottom face : floor
		 0.25, 0.0,			0.50, 0.0,			0.50, 0.333,		0.25, 0.333,
		// Left face
		 0.0, 0.333,		0.25, 0.333,		0.25, 0.666,		0.0, 0.666,		
		// Right face
		 0.50, 0.333,		0.75, 0.333,		0.75, 0.666,		0.50, 0.666
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
    this.skyBoxVertexIndices = [
		0, 1, 2,      0, 2, 3,    // Front face
		4, 5, 6,      4, 6, 7,    // Back face
		8, 9, 10,     8, 10, 11,  // Top face
		12, 13, 14,   12, 14, 15, // Bottom face
		16, 17, 18,   16, 18, 19, // Right face
		20, 21, 22,   20, 22, 23  // Left face
	];		
	// buffers
	this.skyBoxVertexPositionBuffer	;
    this.skyBoxVertexNormalBuffer		;
    this.skyBoxVertexTexCoordBuffer 	;
    this.skyBoxVertexColorBuffer 		;
    this.skyBoxVertexIndexBuffer 		;
	
	this.skyBoxVertexPositionBufferItemSize	;
    this.skyBoxVertexNormalBufferItemSize		;
    this.skyBoxVertexTexCoordBufferItemSize 	;
    this.skyBoxVertexColorBufferItemSize 		;
    this.skyBoxVertexIndexBufferItemSize 		;
	
	this.skyBoxVertexPositionBufferNumItems	;
    this.skyBoxVertexNormalBufferNumItems		;
    this.skyBoxVertexTexCoordBufferNumItems 	;
    this.skyBoxVertexColorBufferNumItems 		;
    this.skyBoxVertexIndexBufferNumItems 		;
	
	

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
		//console.log("atomicGLskyBox("+this.name+")::setFaceColor");
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
		//console.log("atomicGLskyBox("+this.name+")::initGLBuffers");
		var gl = agl.gl ;
		// skyBoxVertexPositionBuffer
		this.skyBoxVertexPositionBuffer	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.skyBoxVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesArray), gl.STATIC_DRAW);
        this.skyBoxVertexPositionBufferItemSize = 3;
        this.skyBoxVertexPositionBufferNumItems = 24;

		// skyBoxVertexNormalBuffer		
		this.skyBoxVertexNormalBuffer		= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.skyBoxVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray), gl.STATIC_DRAW);
        this.skyBoxVertexNormalBufferItemSize = 3;
        this.skyBoxVertexNormalBufferNumItems = 24;

		// skyBoxVertexColorBuffer		
		this.skyBoxVertexColorBuffer 	= gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.skyBoxVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);
        this.skyBoxVertexColorBufferItemSize = 3;
        this.skyBoxVertexColorBufferNumItems = 24;
		
		// skyBoxVertexTexCoordBuffer		
		this.skyBoxVertexTexCoordBuffer 	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.skyBoxVertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordsArray), gl.STATIC_DRAW);
        this.skyBoxVertexTexCoordBufferItemSize = 2;
        this.skyBoxVertexTexCoordBufferNumItems = 24;
		
		// skyBoxVertexIndexBuffer	
		this.skyBoxVertexIndexBuffer 		= gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.skyBoxVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.skyBoxVertexIndices), gl.STATIC_DRAW);
        this.skyBoxVertexIndexBufferItemSize = 1;
        this.skyBoxVertexIndexBufferNumItems = 36;
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
		//console.log("atomicGLskyBox("+this.name+")::draw(progId: "+idProg+")");

		// activate shader
		aGL.gl.useProgram(aGL.shaderPrograms[idProg].program);
		// setUniforms: matrices and lights
		aGL.shaderPrograms[idProg].setUniforms(aGL,aMS);
		
		// link buffer to attributes
		//positions
		aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.skyBoxVertexPositionBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexPositionAttribute, this.skyBoxVertexPositionBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		//normals
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.skyBoxVertexNormalBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexNormalAttribute, this.skyBoxVertexNormalBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// colors
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.skyBoxVertexColorBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexColorAttribute, this.skyBoxVertexColorBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// textures
		if(this.textures.length>0){
			// debug
			// console.log("atomicGLskyBox("+this.name+")::vertexAttribPointer: "+aGL.shaderPrograms[idProg].texCoordAttribute);
			aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.skyBoxVertexTexCoordBuffer);
			aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].texCoordAttribute, this.skyBoxVertexTexCoordBufferItemSize, aGL.gl.FLOAT, false, 0, 0);		
		}
		for (var i=0; i<this.textures.length; i++ ){
			// activate texture
			// debug
			// console.log("atomicGLskyBox("+this.name+")::activateTexture: "+agl.GLtexture[i]+"/"+agl.gl.TEXTURE0);
			agl.gl.activeTexture(agl.GLtexture[i]);
			// debug
			// console.log("atomicGLskyBox("+this.name+")::bindTexture: "+this.textures[i].texture);
			agl.gl.bindTexture(aGL.gl.TEXTURE_2D, this.textures[i].texture);
			// debug
			// console.log("atomicGLskyBox("+this.name+")::uniform: "+aGL.shaderPrograms[idProg].samplerUniform[i]+"->"+i);			
			agl.gl.uniform1i(aGL.shaderPrograms[idProg].samplerUniform[i], i);
		}
		// indexes
        aGL.gl.bindBuffer(aGL.gl.ELEMENT_ARRAY_BUFFER, this.skyBoxVertexIndexBuffer);
		
		// draw skyBox
        aGL.gl.drawElements(aGL.gl.TRIANGLES, this.skyBoxVertexIndexBufferNumItems, aGL.gl.UNSIGNED_SHORT, 0);

	}
	//-----------------------------------------------------
}
