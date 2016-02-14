// atomicGLxzPlane
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/05
//----------------------------------------------------------------------------------------
// atomicGLxzPlane
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
// inputs
//------------------------
// nname: 		name of the xzPlane - string
// plane size
// hheight:		float
// wwidth:		float
// xxrow:		int - number of rowdivision
// yyrow:		int - number of rowdivision
atomicGLxzPlane = function(nname,hheight, wwidth,xxrow,zzrow,uu,vv){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	// size
	this.height	= hheight ;
	this.width 	= wwidth ;
	this.xrow 	= xxrow ;
	this.zrow	= zzrow ;
	
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
    this.xzPlaneVertexIndices = [];		
	// buffers
	this.xzPlaneVertexPositionBuffer	;
    this.xzPlaneVertexNormalBuffer		;
    this.xzPlaneVertexTexCoordBuffer 	;
    this.xzPlaneVertexColorBuffer 		;
    this.xzPlaneVertexIndexBuffer 		;
	
	this.xzPlaneVertexPositionBufferItemSize	;
    this.xzPlaneVertexNormalBufferItemSize		;
    this.xzPlaneVertexTexCoordBufferItemSize 	;
    this.xzPlaneVertexColorBufferItemSize 		;
    this.xzPlaneVertexIndexBufferItemSize 		;
	
	this.xzPlaneVertexPositionBufferNumItems	;
    this.xzPlaneVertexNormalBufferNumItems		;
    this.xzPlaneVertexTexCoordBufferNumItems 	;
    this.xzPlaneVertexColorBufferNumItems 		;
    this.xzPlaneVertexIndexBufferNumItems 		;
	

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
		var r = RGB[0];
		var g = RGB[1];
		var b = RGB[2];
		
		// switch face
		switch(face){
			case "All":
				this.colorsArray = [] ;
				for(var j=0;j<= this.zrow;j++){
					for(var i=0;i<=this.xrow;i++){
						this.colorsArray.push(r);
						this.colorsArray.push(g);
						this.colorsArray.push(b);
					}
				}
			break;		
		}
	};	//---------------------------
	// initGLBuffers
	//---------------------------
	// inputs
	//------------------------
	// agl: openGL context
	//---------------------------
	this.initGLBuffers = function(agl){
		var gl = agl.gl ;
		// xzPlaneVertexPositionBuffer
		this.xzPlaneVertexPositionBuffer	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.xzPlaneVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesArray), gl.STATIC_DRAW);


		// xzPlaneVertexNormalBuffer		
		this.xzPlaneVertexNormalBuffer		= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.xzPlaneVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray), gl.STATIC_DRAW);

		// xzPlaneVertexColorBuffer		
		this.xzPlaneVertexColorBuffer 	= gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.xzPlaneVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);
		
		// xzPlaneVertexTexCoordBuffer		
		this.xzPlaneVertexTexCoordBuffer 	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.xzPlaneVertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordsArray), gl.STATIC_DRAW);
 		
		// xzPlaneVertexIndexBuffer	
		this.xzPlaneVertexIndexBuffer 		= gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.xzPlaneVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.xzPlaneVertexIndices), gl.STATIC_DRAW);
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
		//console.log("atomicGLxzPlane("+this.name+")::draw(progId: "+idProg+")");
		
		// activate shader
		aGL.gl.useProgram(aGL.shaderPrograms[idProg].program);
		// setUniforms: matrices and lights
		aGL.shaderPrograms[idProg].setUniforms(aGL,aMS);
		
		// link buffer to attributes
		//positions
		aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xzPlaneVertexPositionBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexPositionAttribute, this.xzPlaneVertexPositionBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		//normals
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xzPlaneVertexNormalBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexNormalAttribute, this.xzPlaneVertexNormalBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// colors
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xzPlaneVertexColorBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexColorAttribute, this.xzPlaneVertexColorBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		if(this.textures.length>0){
			aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.xzPlaneVertexTexCoordBuffer);
			aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].texCoordAttribute, this.xzPlaneVertexTexCoordBufferItemSize, aGL.gl.FLOAT, false, 0, 0);		
		}
		for (var i=0; i<this.textures.length; i++ ){
			// activate texture
			agl.gl.activeTexture(agl.GLtexture[i]);
			agl.gl.bindTexture(aGL.gl.TEXTURE_2D, this.textures[i].texture);
			agl.gl.uniform1i(aGL.shaderPrograms[idProg].samplerUniform[i], i);
		}
		// indexes
        aGL.gl.bindBuffer(aGL.gl.ELEMENT_ARRAY_BUFFER, this.xzPlaneVertexIndexBuffer);
		
		// draw xzPlane
        aGL.gl.drawElements(aGL.gl.TRIANGLES, this.xzPlaneVertexIndexBufferNumItems, aGL.gl.UNSIGNED_SHORT, 0);

	}
	//-----------------------------------------------------
	
	// init
	//-----------------------------
	// vertices, normals, colors
	for(var j=0;j<= this.zrow;j++){
		for(var i=0;i<=this.xrow;i++){
			// vertices
			var x = - 0.5*this.width + i*this.width/this.xrow;
			var y = 0.0 ;
			var z = - 0.5*this.height + j*this.height/this.zrow;
			// normals
			var nx = 0.0 ;
			var ny = 1.0 ;
			var nz = 0.0 ;
			// color
			var r = 0.8 ;
			var g = 0.8 ;
			var b = 0.8 ;
			// texture coordinates
			var tu = this.scaleUV[0]*i/this.xrow ; 
			var tv = this.scaleUV[1]*j/this.zrow ;
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
	for(var jj=0;jj<this.zrow;jj++){
		for(var ii=0;ii<this.xrow;ii++){
			// triangles indexes
			// first
			this.xzPlaneVertexIndices.push(jj*(this.xrow+1)+ii);
			this.xzPlaneVertexIndices.push(jj*(this.xrow+1)+ii+1);
			this.xzPlaneVertexIndices.push((jj+1)*(this.xrow+1)+ii);
			// second
			this.xzPlaneVertexIndices.push((jj+1)*(this.xrow+1)+ii);
			this.xzPlaneVertexIndices.push(jj*(this.xrow+1)+ii+1);
			this.xzPlaneVertexIndices.push((jj+1)*(this.xrow+1)+ii+1);		
		}
	}

	
	this.xzPlaneVertexPositionBufferItemSize 	= 3	;
    this.xzPlaneVertexNormalBufferItemSize		= 3	;
    this.xzPlaneVertexTexCoordBufferItemSize	= 2 ;
    this.xzPlaneVertexColorBufferItemSize		= 3 ;
    this.xzPlaneVertexIndexBufferItemSize 		= 1 ;
	
	this.xzPlaneVertexPositionBufferNumItems	= (this.xrow+1)*(this.zrow+1) ;
    this.xzPlaneVertexNormalBufferNumItems		= (this.xrow+1)*(this.zrow+1) ;
    this.xzPlaneVertexTexCoordBufferNumItems 	= (this.xrow+1)*(this.zrow+1) ;
    this.xzPlaneVertexColorBufferNumItems 		= (this.xrow+1)*(this.zrow+1) ;
    this.xzPlaneVertexIndexBufferNumItems 		= (this.xrow)*(this.zrow)*2*3 ;
}
