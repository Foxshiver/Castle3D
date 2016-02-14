// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/21
//----------------------------------------------------------------------------------------
// atomicGLCylinder
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
// inputs
//------------------------
// nname: 		name of the Cylinder - string
// cylinder size
// radius:			float
// height:			float
// lthis.heightBands: init
// lthis.longitudeBands: int
atomicGLCylinder = function(nname,rradius, hheight, hheightBands,llongitudeBands,uu,vv){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	// size
	this.radius	= rradius ;
	this.height = hheight ;
	this.heightBands 	= hheightBands ;
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
    this.CylinderVertexIndices = [];		

	// buffers
	this.CylinderVertexPositionBuffer	;
    this.CylinderVertexNormalBuffer		;
    this.CylinderVertexTexCoordBuffer 	;
    this.CylinderVertexColorBuffer 		;
    this.CylinderVertexIndexBuffer 		;
	
	this.CylinderVertexPositionBufferItemSize	;
    this.CylinderVertexNormalBufferItemSize		;
    this.CylinderVertexTexCoordBufferItemSize 	;
    this.CylinderVertexColorBufferItemSize 		;
    this.CylinderVertexIndexBufferItemSize 		;
	
	this.CylinderVertexPositionBufferNumItems	;
    this.CylinderVertexNormalBufferNumItems		;
    this.CylinderVertexTexCoordBufferNumItems 	;
    this.CylinderVertexColorBufferNumItems 		;
    this.CylinderVertexIndexBufferNumItems 		;
	

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
		//console.log("atomicGLCylinder("+this.name+")::setFaceColor");
		var r = RGB[0];
		var g = RGB[1];
		var b = RGB[2];
		
		// switch face
		switch(face){
			case "All":
				var nbc = this.colorsArray.length / 3 ;
				this.colorsArray = [] ;
				for (var i=0; i <nbc; i++) {
                	this.colorsArray.push(r);
                	this.colorsArray.push(g);
                	this.colorsArray.push(b);            
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
		//console.log("atomicGLCylinder("+this.name+")::initGLBuffers");
		var gl = agl.gl ;
		// CylinderVertexPositionBuffer
		this.CylinderVertexPositionBuffer	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.CylinderVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesArray), gl.STATIC_DRAW);


		// CylinderVertexNormalBuffer		
		this.CylinderVertexNormalBuffer		= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.CylinderVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray), gl.STATIC_DRAW);

		// CylinderVertexColorBuffer		
		this.CylinderVertexColorBuffer 	= gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.CylinderVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);
		
		// CylinderVertexTexCoordBuffer		
		this.CylinderVertexTexCoordBuffer 	= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.CylinderVertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordsArray), gl.STATIC_DRAW);
 		
		// CylinderVertexIndexBuffer	
		this.CylinderVertexIndexBuffer 		= gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.CylinderVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.CylinderVertexIndices), gl.STATIC_DRAW);
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
		//console.log("atomicGLCylinder("+this.name+")::draw(progId: "+idProg+")");
		
		// activate shader
		aGL.gl.useProgram(aGL.shaderPrograms[idProg].program);
		// setUniforms: matrices and lights
		aGL.shaderPrograms[idProg].setUniforms(aGL,aMS);
		
		// link buffer to attributes
		//positions
		aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.CylinderVertexPositionBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexPositionAttribute, this.CylinderVertexPositionBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		//normals
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.CylinderVertexNormalBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexNormalAttribute, this.CylinderVertexNormalBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// colors
        aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.CylinderVertexColorBuffer);
        aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].vertexColorAttribute, this.CylinderVertexColorBufferItemSize, aGL.gl.FLOAT, false, 0, 0);
		// textures
		if(this.textures.length>0){
			aGL.gl.bindBuffer(aGL.gl.ARRAY_BUFFER, this.CylinderVertexTexCoordBuffer);
			aGL.gl.vertexAttribPointer(aGL.shaderPrograms[idProg].texCoordAttribute, this.CylinderVertexTexCoordBufferItemSize, aGL.gl.FLOAT, false, 0, 0);	
		}
		for (var i=0; i<this.textures.length; i++ ){
			// activate texture
			agl.gl.activeTexture(agl.GLtexture[i]);
			agl.gl.bindTexture(aGL.gl.TEXTURE_2D, this.textures[i].texture);
			agl.gl.uniform1i(aGL.shaderPrograms[idProg].samplerUniform[i], i);
		}
		// indexes
        aGL.gl.bindBuffer(aGL.gl.ELEMENT_ARRAY_BUFFER, this.CylinderVertexIndexBuffer);
		
		// draw Cylinder
        aGL.gl.drawElements(aGL.gl.TRIANGLES, this.CylinderVertexIndexBufferNumItems, aGL.gl.UNSIGNED_SHORT, 0);

	}
	//-----------------------------------------------------
	
	// init
	//-----------------------------
	// cylinder body
	// -------------
	// vertices, normals, colors, texCoord
	for (var i=0; i <= this.heightBands; i++) {
		var y = i*this.height/this.heightBands ;

        for (var j = 0; j <= this.longitudeBands; j++) {
            
            var theta = j * 2.0* Math.PI / this.longitudeBands;
            var x = Math.cos(theta);
            var y = i*this.height/this.heightBands;
			var z = Math.sin(theta);
            
			// normals
            this.normalsArray.push(x);
            this.normalsArray.push(0.0);
            this.normalsArray.push(z);
			// position
            this.verticesArray.push(this.radius * x);
            this.verticesArray.push(y);
            this.verticesArray.push(this.radius * z);
            // color
            this.colorsArray.push(0.8);
            this.colorsArray.push(0.8);
            this.colorsArray.push(0.8);
            // uv
            this.textureCoordsArray.push(this.scaleUV[1]*i/this.heightBands);              
            this.textureCoordsArray.push(this.scaleUV[0]*j/this.longitudeBands);
    	}
    }
    
    // cylinder cap
    // ------------
    // bottom
    // ------
    // center
	// texture coord
	this.textureCoordsArray.push(0.5); this.textureCoordsArray.push(0.5);
	// color
    this.colorsArray.push(0.8);this.colorsArray.push(0.8);this.colorsArray.push(0.8);
    // normals
	this.normalsArray.push(0.0);this.normalsArray.push(-1.0);this.normalsArray.push(0.0);
	// position
    this.verticesArray.push(0.0);this.verticesArray.push(0.0);this.verticesArray.push(0.0);
	var bottomcenterIndex = this.verticesArray.length/3 ;

    // cap edge
    for (var j = 0; j <= this.longitudeBands; j++) { 
            var theta = j * 2.0* Math.PI / this.longitudeBands;
            var x = Math.cos(theta);
            var y = 0.0
			var z = Math.sin(theta);
            
			// normals
            this.normalsArray.push(0.0); this.normalsArray.push(-1.0); this.normalsArray.push(0.0);
			// position
            this.verticesArray.push(this.radius * x);
            this.verticesArray.push(0.0);
            this.verticesArray.push(this.radius * z);
            // color
            this.colorsArray.push(0.8); this.colorsArray.push(0.8); this.colorsArray.push(0.8);
            // uv
            this.textureCoordsArray.push(0.5+x*.5);              
            this.textureCoordsArray.push(0.5+z*0.5);    
    }   
    // top cap
    // -------
    // center
	// texture coord
	this.textureCoordsArray.push(0.5); this.textureCoordsArray.push(0.5);
    // normals
	this.normalsArray.push(0.0);this.normalsArray.push(1.0);this.normalsArray.push(0.0);
	// position
    this.verticesArray.push(0.0);this.verticesArray.push(this.height);this.verticesArray.push(0.0);
    var topcenterIndex = this.verticesArray.length/3 ;
    // color
    this.colorsArray.push(0.8);
    this.colorsArray.push(0.8);
    this.colorsArray.push(0.8);
    // cap edge
    for (var j = 0; j <= this.longitudeBands; j++) { 
            var theta = j * 2.0* Math.PI / this.longitudeBands;
            var x = Math.cos(theta);
            var y = this.height ;
			var z = Math.sin(theta);
            
			// normals
            this.normalsArray.push(0.0); this.normalsArray.push(1.0); this.normalsArray.push(0.0);
			// position
            this.verticesArray.push(this.radius * x);
            this.verticesArray.push(this.height);
            this.verticesArray.push(this.radius * z);
            // color
            this.colorsArray.push(0.8); this.colorsArray.push(0.8); this.colorsArray.push(0.8);
            // uv
            this.textureCoordsArray.push(0.5+x*0.5);              
            this.textureCoordsArray.push(0.5+z*0.5);  
    }   

	// indexes
	// --------
	// body index 
	for (var i=0; i < this.heightBands; i++) {
        for (var j = 0; j < this.longitudeBands; j++) {
                var t0 = i*(this.longitudeBands+1) 	+ j ;
                var t1 = i*(this.longitudeBands+1) 	+ j+1 ;
                var t2 = (i+1)*(this.longitudeBands+1) + j ;
                var t3 = (i+1)*(this.longitudeBands+1) + j+1 ;
                // first triangle
                this.CylinderVertexIndices.push(t0);
                this.CylinderVertexIndices.push(t1);
                this.CylinderVertexIndices.push(t2);                
                
                // second triangle
                this.CylinderVertexIndices.push(t2);
                this.CylinderVertexIndices.push(t1);
                this.CylinderVertexIndices.push(t3);  
        }
    }
	// bottom cap index
	for (var j = 0; j < this.longitudeBands; j++) {
        this.CylinderVertexIndices.push(bottomcenterIndex);
        this.CylinderVertexIndices.push(bottomcenterIndex +j);
        this.CylinderVertexIndices.push(bottomcenterIndex +j +1);  
    }
	// top cap index
	for (var j = 0; j < this.longitudeBands; j++) {
        this.CylinderVertexIndices.push(topcenterIndex);
        this.CylinderVertexIndices.push(topcenterIndex +j);
        this.CylinderVertexIndices.push(topcenterIndex +j +1);  
    }	
	
	// buffer item size and num items
	this.CylinderVertexPositionBufferItemSize 	= 3	;
  	this.CylinderVertexNormalBufferItemSize		= 3	;
   	this.CylinderVertexTexCoordBufferItemSize	= 2 ;
   	this.CylinderVertexColorBufferItemSize		= 3 ;
   	this.CylinderVertexIndexBufferItemSize 		= 1 ;
	
	this.CylinderVertexPositionBufferNumItems	= this.verticesArray.length / 3 ;
    this.CylinderVertexNormalBufferNumItems		= this.normalsArray.length / 3 ;
	this.CylinderVertexTexCoordBufferNumItems 	= this.textureCoordsArray.length/2 ;
	this.CylinderVertexColorBufferNumItems 		= this.colorsArray.length /3 ;
    this.CylinderVertexIndexBufferNumItems 		= this.CylinderVertexIndices.length; ;
}
