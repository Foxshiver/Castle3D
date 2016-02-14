// AtomicWaterShader
//----------------------------------------------------------------------------------------
// author: AR
// contact:
// version: 0.1
// current version date: 23/01/2016
//----------------------------------------------------------------------------------------
// atomicGLWater
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------

// constructor
//------------------------
// inputs
//------------------------
// nname: 		shader name - string
// agl:			atomicGL context
// id_vs: 		vertex shader id - string
// id_fs: 		fragment shader id - string
// uuseTex: 		boolean
//				true: use texture aVertexTexCoord required in the shader
// nnbLight:	int - number of Lights in the shader
//					uPointLightPosition0|1|2 required per light in the shader
//					uPointLightColor0|1|2 required per light in the shader

atomicGLWaterShader = function(nname, agl,fragmentShaderID, vertexShaderID,nnbTex){
	// attributes
	// -------------------------------------------------
	// name
	this.name = nname ;
	// useTex
	this.nbTex = nnbTex ;

	// program shader
	this.program ;
	// attributes
    this.vertexPositionAttribute ;
	this.vertexNormalAttribute ;
	this.vertexColorAttribute ;
	this.texCoordAttribute ;
	// uniform Matrices
	this.pMatrixUniform ;
	this.mvMatrixUniform ;
	this.nMatrixUniform ;
	// light
	this.ambientColorUniform;
	this.dirLightDirectionUniform;
	this.dirLightColorUniform;

	// texture -sampler
	this.samplerUniform = [] ;

	// wave animation
	this.timeUniform ;

	// wave animation
	this.wTime = 0.0 ;


	// methods
	// --------------------------------------------------
	// getShader(gl, id)
	//---------------------------
	// inputs
	//------------------------
	// gl: GL context
	// id: shader id - string
	//---------------------------
	this.getShader = function getShader(agl, id) {
		// debug
		//console.log("atomicGLShader::getShader("+id+")");
		// shader
		var shader;
        // shader source
		var shaderScript = document.getElementById(id);
        if (!shaderScript) {
			alert("Could not find shader source:"+id);
			return null;
		}
		else {
			var str = "";
			var k = shaderScript.firstChild;
			while (k) {
				if (k.nodeType == 3) {str += k.textContent;}
				k = k.nextSibling;
			}

			// creation shader
			if (shaderScript.type == "x-shader/x-fragment") {
				shader = agl.gl.createShader(agl.gl.FRAGMENT_SHADER);
			} else if (shaderScript.type == "x-shader/x-vertex") {
				shader = agl.gl.createShader(agl.gl.VERTEX_SHADER);
			} else {
            return null;
        }

		// set source
        agl.gl.shaderSource(shader, str);
		// shader compilation
        agl.gl.compileShader(shader);
		// debug
		//console.log("atomicGLShader::getShader -> compile result: "+agl.gl.getShaderParameter(shader, agl.gl.COMPILE_STATUS));

		// check erreur de compilation
        if (!agl.gl.getShaderParameter(shader, agl.gl.COMPILE_STATUS)) {
            alert(agl.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
		}
	}

	// createProgram
	//---------------------------
	// inputs
	//------------------------
	// gl: GL context
	// fragmentShaderID: fragment shader id - string
	// vertexShaderID: fragment shader id - string
	//---------------------------
    this.createProgram =  function (agl,fragmentShaderID, vertexShaderID) {
		// debug
		//console.log("atomicGLwaveShader::createProgram ("+fragmentShaderID+","+vertexShaderID+")");
		// creation des shaders
        var fragmentShader = 	this.getShader(agl, fragmentShaderID);
        var vertexShader = 		this.getShader(agl, vertexShaderID);

		// creation program et link
        var program = agl.gl.createProgram();
        agl.gl.attachShader(program, vertexShader);
        agl.gl.attachShader(program, fragmentShader);
        agl.gl.linkProgram(program);

		// debug
		//console.log("atomicGLwaveShader::createProgram-> link result: "+agl.gl.getProgramParameter(program, agl.gl.LINK_STATUS));
        if (!agl.gl.getProgramParameter(program, agl.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

		// attributes
		//------------------------
		// aVertexPosition
		// aVertexNormal
		// aVertexColor
		// aVertexTexCoord

        this.vertexPositionAttribute = agl.gl.getAttribLocation(program, "aVertexPosition");
        agl.gl.enableVertexAttribArray(this.vertexPositionAttribute);

        this.vertexNormalAttribute = agl.gl.getAttribLocation(program, "aVertexNormal");
        agl.gl.enableVertexAttribArray(this.vertexNormalAttribute);

        this.vertexColorAttribute = agl.gl.getAttribLocation(program, "aVertexColor");
        agl.gl.enableVertexAttribArray(this.vertexColorAttribute);

		if(this.nbTex>0){
			this.texCoordAttribute = agl.gl.getAttribLocation(program, "aVertexTexCoord");
			agl.gl.enableVertexAttribArray(this.texCoordAttribute);
		}

		// uniforms
		//------------------------
		// uPMatrix: 	Projection matrix
		// uMVMatrix: 	ModelView matrix
		// uNMatrix:	Normal matrix
		//------------------------
		// debug
		//console.log("atomicGLwaveShader::createProgram - uniforms ");
		// matrix
        this.pMatrixUniform = agl.gl.getUniformLocation(program, "uPMatrix");
        this.mvMatrixUniform = agl.gl.getUniformLocation(program, "uMVMatrix");
        this.nMatrixUniform = agl.gl.getUniformLocation(program, "uNMatrix");

		// lights
		// uAmbientColor
		// uPointLightingPosition0|1|2 required per light in the shader
		// uPointLightingColor0|1|2 required per light in the shader

		this.ambientColorUniform = agl.gl.getUniformLocation(program, "uAmbientColor");

		this.dirLightDirectionUniform = agl.gl.getUniformLocation(program, "uDirLightDirection");
		this.dirLightColorUniform = agl.gl.getUniformLocation(program, "uDirLightColor");

		// textures
		for (i = 0; i < this.nbTex; i++) {
			// console.log("atomicGLShader::createProgram - getUniformLocation ->"+"uSampler"+i);
			this.samplerUniform[i] = agl.gl.getUniformLocation(program, "uSampler"+i);
		}

		this.timeUniform = agl.gl.getUniformLocation(program, "utime");

        return program;
    }

    // setUniforms
    //----------------------------------------
    // inputs
    //--------------
    // aGL: atomicGLContext
	// aMS: atomicGLMatrixStack
    //----------------------------------------
    this.setUniforms = function(aGL,aMS){
		// debug
		//console.log("atomicGLwaveShader::setUniforms ");
    	// set this shader as active shader
    	aGL.gl.useProgram(this.program);
    	// matrix
    	//		Projection
    	// 		Model->view
    	//		Normal built from Model->view
    	aGL.gl.uniformMatrix4fv(this.pMatrixUniform, false, aMS.pMatrix);
        aGL.gl.uniformMatrix4fv(this.mvMatrixUniform, false, aMS.mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(aMS.mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        aGL.gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);

        // Lights
        //		ambient
        aGL.gl.uniform3f(this.ambientColorUniform,aGL.ambientLightColor[0],aGL.ambientLightColor[1],aGL.ambientLightColor[2]);

		//		dir
		aGL.gl.uniform3f(this.dirLightDirectionUniform, aGL.dirLightDirection[0], aGL.dirLightDirection[1], aGL.dirLightDirection[2]);
		aGL.gl.uniform3f(this.dirLightColorUniform,aGL.dirLightColor[0],aGL.dirLightColor[1],aGL.dirLightColor[2]);

		aGL.gl.uniform1f(this.timeUniform,this.wTime) ;
    }

	// init
	this.program  = this.createProgram(agl,fragmentShaderID, vertexShaderID) ;
}
