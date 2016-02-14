// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/05
//----------------------------------------------------------------------------------------
// atomicGLxyPlane
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
// inputs
//------------------------
// nname: 		name of the xyPlane - string
// plane size
// hheight:		float
// wwidth:		float
// xxrow:		int - number of rowdivision
// yyrow:		int - number of rowdivision
atomicGLxyPlane = function(nname,hheight, wwidth,xxrow,yyrow,uu,vv){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	// size
	this.height	= hheight ;
	this.width 	= wwidth ;
	this.xrow 	= xxrow ;
	this.yrow	= yyrow ;

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
    this.xyPlaneVertexIndices = [];		
	// buffers
	this.xyPlaneVertexPositionBuffer	;
    this.xyPlaneVertexNormalBuffer		;
    this.xyPlaneVertexTexCoordBuffer 	;
    this.xyPlaneVertexColorBuffer 		;
    this.xyPlaneVertexIndexBuffer 		;
	
	this.xyPlaneVertexPositionBufferItemSize	;
    this.xyPlaneVertexNormalBufferItemSize		;
    this.xyPlaneVertexTexCoordBufferItemSize 	;
    this.xyPlaneVertexColorBufferItemSize 		;
    this.xyPlaneVertexIndexBufferItemSize 		;
	
	this.xyPlaneVertexPositionBufferNumItems	;
    this.xyPlaneVertexNormalBufferNumItems		;
    this.xyPlaneVertexTexCoordBufferNumItems 	;
    this.xyPlaneVertexColorBufferNumItems 		;
    this.xyPlaneVertexIndexBufferNumItems 		;
	

	// methods
	// --------------------------------------------------


	// pushTexture
	// ---------------------------
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
		//console.log("atomicGLxyPlane("+this.name+")::setFaceColor");
		var r = RGB[0];
		var g = RGB[1];
		var b = RGB[2];
		
		// switch face
		switch(face){
			case "All":
				this.colorsArray = [] ;
				for(var j=0;j<= this.yrow;j++){
					for(var i=0;i<=this.xrow;i++){
						this.colorsArray.push(r);
						this.colorsArray.push(g);
						this.colorsArray.push(b);
					}
				}
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
		//console.log("atomicGLSphere("+this.name+")::initGLBuffers");
		
		var gl = agl.gl ;
		// xyPlaneVertexPositionBuffer
		this.xyPlaneVertexPositionBuffer	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.xyPlaneVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesArray), gl.STATIC_DRAW);


		// xyPlaneVertexNormalBuffer		
		this.xyPlaneVertexNormalBuffer		= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.xyPlaneVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray), gl.STATIC_DRAW);

		// xyPlaneVertexColorBuffer		
		this.xyPlaneVertexColorBuffer 	= gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.xyPlaneVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);
		
		// xyPlaneVertexTexCoordBuffer		
		this.xyPlaneVertexTexCoordBuffer 	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.xyPlaneVertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordsArray), gl.STATIC_DRAW);
 		
		// xyPlaneVertexIndexBuffer	
		this.xyPlaneVertexIndexBuffer 		= gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.xyPlaneVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.xyPlaneVertexIndices), gl.STATIC_DRAW);
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
		//console.log("atomicGLxyPlane("+this.name+")::draw(progId: "+idProg+")");
		
		// activate shader
		aGL.gl.useProgram(aGL.shaderPrograms[idProg].program);
		// setUniforms: matrices and lights
		aGL.shaderPrograms[idProg].setUniforms(aGL,aMS);
		
		// link buffer to attributes
		//positions
		aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xyPlaneVertexPositionBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexPositionAttribute, this.xyPlaneVertexPositionBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		//normals
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xyPlaneVertexNormalBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexNormalAttribute, this.xyPlaneVertexNormalBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// colors
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xyPlaneVertexColorBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexColorAttribute, this.xyPlaneVertexColorBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// textures
		if(this.textures.length>0){
			aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xyPlaneVertexTexCoordBuffer);
			aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].texCoordAttribute, this.xyPlaneVertexTexCoordBufferItemSize, aGL.gl.FLOAT, false, 0, 0);		
		}
		for (var i=0; i<this.textures.length; i++ ){
			// activate texture
			agl.gl.activeTexture(agl.GLtexture[i]);
			agl.gl.bindTexture(aGL.gl.TEXTURE_2D, this.textures[i].texture);
			agl.gl.uniform1i(aGL.shaderPrograms[idProg].samplerUniform[i], i);
		}
		// indexes
        aGL.gl.bindBuffer(aGL.gl.ELEMENT_ARRAY_BUFFER, this.xyPlaneVertexIndexBuffer);
		
		// draw xyPlane
        aGL.gl.drawElements(aGL.gl.TRIANGLES, this.xyPlaneVertexIndexBufferNumItems, aGL.gl.UNSIGNED_SHORT, 0);

	}
	//-----------------------------------------------------
	
	// init
	//-----------------------------
	// vertices, normals, colors
	for(var j=0;j<= this.yrow;j++){
		for(var i=0;i<=this.xrow;i++){
			// vertices
			var x = - 0.5*this.width + i*this.width/this.xrow;
			var y = j*this.height/this.yrow
			var z = 0.0;
			// normals
			var nx = 0.0 ;
			var ny = 0.0 ;
			var nz = 1.0 ;
			// color
			var r = 0.8 ;
			var g = 0.8 ;
			var b = 0.8 ;
			// texture coordinates
			var tu = this.scaleUV[0]*i/this.xrow ; 
			var tv = this.scaleUV[1]*j/this.yrow ;
			// push vertices, normals, colors and textures coordinates
			this.verticesArray.push(x) ;
			this.verticesArray.push(y) ;
			this.verticesArray.push(z) ;
			this.normalsArray.push(nx);
			this.normalsArray.push(ny);
			this.normalsArray.push(nz);
    		this.textureCoordsArray.push(tu);
    		this.textureCoordsArray.push(tv);
			this.colorsArray.push(r);
			this.colorsArray.push(g);
			this.colorsArray.push(b);	
		}
	}
	for(var jj=0;jj<this.yrow;jj++){
		for(var ii=0;ii<this.xrow;ii++){
			// triangles indexes
			// first
			this.xyPlaneVertexIndices.push(jj*(this.xrow+1)+ii);
			this.xyPlaneVertexIndices.push(jj*(this.xrow+1)+ii+1);
			this.xyPlaneVertexIndices.push((jj+1)*(this.xrow+1)+ii);
			// second
			this.xyPlaneVertexIndices.push((jj+1)*(this.xrow+1)+ii);
			this.xyPlaneVertexIndices.push(jj*(this.xrow+1)+ii+1);
			this.xyPlaneVertexIndices.push((jj+1)*(this.xrow+1)+ii+1);	
			// debug 	
		}
	}

	
	this.xyPlaneVertexPositionBufferItemSize 	= 3	;
    this.xyPlaneVertexNormalBufferItemSize		= 3	;
    this.xyPlaneVertexTexCoordBufferItemSize	= 2 ;
    this.xyPlaneVertexColorBufferItemSize		= 3 ;
    this.xyPlaneVertexIndexBufferItemSize 		= 1 ;
	
	this.xyPlaneVertexPositionBufferNumItems	= (this.xrow+1)*(this.yrow+1) ;
    this.xyPlaneVertexNormalBufferNumItems		= (this.xrow+1)*(this.yrow+1) ;
    this.xyPlaneVertexTexCoordBufferNumItems 	= (this.xrow+1)*(this.yrow+1) ;
    this.xyPlaneVertexColorBufferNumItems 		= (this.xrow+1)*(this.yrow+1) ;
    this.xyPlaneVertexIndexBufferNumItems 		= (this.xrow)*(this.yrow)*2*3 ;
}
