// atomicGL
//----------------------------------------------------------------------------------------
// author: IG
// contact:
// version: 0.1
// current version date: 2016/01/24
//----------------------------------------------------------------------------------------
// atomicGLShadow
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
atomicGLShadow = function(nname, agl,fragmentShaderID, vertexShaderID,){

  // attributes
  // -------------------------------------------------
  // name
  this.name = nname ;

  // program shader
  this.program ;
  // attributes
  // --------------------------
  this.vertexPositionAttribute ;
  this.vertexNormalAttribute ;
  this.vertexColorAttribute ;
  this.texCoordAttribute ;
  // uniforms
  // --------------------------
  // uniform Matrices
  this.pMatrixUniform ;
  this.mvMatrixUniform ;
  this.nMatrixUniform ;
  this.dMatrixUniform ;
  // light
  this.ambientColorUniform ;
  this.pointLightLocationUniform = [] ;
  this.pointLightColorUniform = [] ;
  // texture -sampler
  this.samplerUniform = [] ;

  this.initShadow = function initShadow(){
    // The framebuffer, which regroups 0, 1, or more textures, and 0 or 1 depth buffer.
    GLuint FramebufferName = 0;
    glGenFramebuffers(1, &FramebufferName);
    glBindFramebuffer(GL_FRAMEBUFFER, FramebufferName);

    // Depth texture. Slower than a depth buffer, but you can sample it later in your shader
    GLuint depthTexture;
    glGenTextures(1, &depthTexture);
    glBindTexture(GL_TEXTURE_2D, depthTexture);
    glTexImage2D(GL_TEXTURE_2D, 0,GL_DEPTH_COMPONENT16, 1024, 1024, 0,GL_DEPTH_COMPONENT, GL_FLOAT, 0);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

    glFramebufferTexture(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, depthTexture, 0);

    glDrawBuffer(GL_NONE); // No color buffer is drawn to.

    // Always check that our framebuffer is ok
    if(glCheckFramebufferStatus(GL_FRAMEBUFFER) != GL_FRAMEBUFFER_COMPLETE)
      return false;


    vec3 lightInvDir = vec3(0.5,2.0,2.0);

    // Compute the MVP matrix from the light's point of view
    mat4 depthProjectionMatrix = ortho<float>(-10,10,-10,10,-10,20);
    mat4 depthViewMatrix = lookAt(lightInvDir, vec3(0,0,0), vec3(0,1,0));
    mat4 depthModelMatrix = mat4(1.0);
    mat4 depthMVP = depthProjectionMatrix * depthViewMatrix * depthModelMatrix;

    // Send our transformation to the currently bound shader,
    // in the "MVP" uniform
    glUniformMatrix4fv(depthMatrixID, 1, GL_FALSE, &depthMVP[0][0])
    this.dMatrixUniform = agl.gl.getUniformLocation(program, "uDMatrix");
    // Render to our framebuffer
    glBindFramebuffer(GL_FRAMEBUFFER, FramebufferName);
    glViewport(0,0,1024,768); // Render on the whole framebuffer, complete from the lower left corner to the upper right
  }

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
      //console.log("atomicGLShader::createProgram ("+fragmentShaderID+","+vertexShaderID+")");
      // creation des shaders
      var fragmentShader = 	this.getShader(agl, fragmentShaderID);
      var vertexShader = 		this.getShader(agl, vertexShaderID);

      // creation program et link
      var program = agl.gl.createProgram();
      agl.gl.attachShader(program, vertexShader);
      agl.gl.attachShader(program, fragmentShader);
      agl.gl.linkProgram(program);

      // debug
      //console.log("atomicGLShader::createProgram-> link result: "+agl.gl.getProgramParameter(program, agl.gl.LINK_STATUS));
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


      // uniforms
      //------------------------
      // uPMatrix: 	Projection matrix
      // uMVMatrix: 	ModelView matrix
      // uNMatrix:	Normal matrix
      //------------------------
      // debug
      //console.log("atomicGLShader::createProgram - uniforms ");
      // matrix
      this.pMatrixUniform = agl.gl.getUniformLocation(program, "uPMatrix");
      this.mvMatrixUniform = agl.gl.getUniformLocation(program, "uMVMatrix");
      this.nMatrixUniform = agl.gl.getUniformLocation(program, "uNMatrix");

      // lights
      // uAmbientColor
      // uPointLightingPosition0|1|2 required per light in the shader
      // uPointLightingColor0|1|2 required per light in the shader

      this.ambientColorUniform = agl.gl.getUniformLocation(program, "uAmbientColor");

      // this.initShadow();

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
	    //console.log("atomicGLShader::setUniforms ");
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
		  //		Omni
		  for (var i=0; i < this.nbLight ; i++){
			  // debug
			  //console.log("-- atomicGLShader::setUniforms - Light number ("+i+")");
			  //console.log("-- LightLocation @"+this.pointLightLocationUniform[i]+"::" +aGL.omniLightLocation[i*3+0] +","+ aGL.omniLightLocation[i*3+1]+","+ aGL.omniLightLocation[i*3+2] );
			  //console.log("-- LightColor @"+this.pointLightColorUniform[i]+"::" +aGL.omniLightColor[i*3+0] +","+ aGL.omniLightColor[i*3+1]+","+ aGL.omniLightColor[i*3+2] );

			  aGL.gl.uniform3f(this.pointLightLocationUniform[i], aGL.omniLightLocation[i*3+0], aGL.omniLightLocation[i*3+1], aGL.omniLightLocation[i*3+2]);
			  aGL.gl.uniform3f(this.pointLightColorUniform[i],aGL.omniLightColor[i*3+0],aGL.omniLightColor[i*3+1],aGL.omniLightColor[i*3+2]);
		  }

		  // textures
    }

  // init
	this.program  = this.createProgram(agl,fragmentShaderID, vertexShaderID) ;

}
