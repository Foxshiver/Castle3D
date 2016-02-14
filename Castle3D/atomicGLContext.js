// atomicGL
//----------------------------------------------------------------------------------------
// author: RC
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/06
//----------------------------------------------------------------------------------------
// atomicGLContext
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
atomicGLContext = function(){
	// attributes
	// -------------------------------------------------
	// GL context
	this.gl ;
	// GL context size
	this.viewportWidth ;
	this.viewportHeight ;
	// shaders
	this.shaderPrograms = [];
	// lights
	//		ambient
	this.ambientLightColor = [0.01,0.01,0.1];
	//		omniDirLight
	this.omniLightColor = [] ;
	this.omniLightLocation = [] ;
	this.omniLightNumber = 0;

	//		directional Light
	this.dirLightDirection   = [];
	this.dirLightColor = [];

	// GLtexture
	this.GLtexture = [] ;

	// methods
	// --------------------------------------------------
	// initGL(canvas)
	//---------------------------
	// inputs
	//------------------------
	// canvas: html canvas
	// backgroundColor: [float, float, float]
	//---------------------------
	this.initGL = function(canvas,backgroundColor) {
		// debug
		//console.log("atomicGLContext::initGL");
		// recover canvas openGL
        try {
            this.gl = canvas.getContext("webgl");
            this.viewportWidth = canvas.width;
            this.viewportHeight = canvas.height;
        } catch (e) {}
        if (!this.gl) { // error in the initialisation of GL context
            alert("Could not initialise WebGL");
        }
		else { // GL context initialised -> first init (background color, DEPTH_TEST)
			this.gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1.0);
			this.gl.enable(this.gl.DEPTH_TEST);
		}

		// GLtexture
		this.GLtexture.push(this.gl.TEXTURE0);
		this.GLtexture.push(this.gl.TEXTURE1);
		this.GLtexture.push(this.gl.TEXTURE2);
		this.GLtexture.push(this.gl.TEXTURE3);
		this.GLtexture.push(this.gl.TEXTURE4);
		this.GLtexture.push(this.gl.TEXTURE5);
		this.GLtexture.push(this.gl.TEXTURE6);
		this.GLtexture.push(this.gl.TEXTURE7);
    }
	// initDraw()
	//---------------------------
	this.initDraw = function() {
		// debug
		//console.log("atomicGLContext::initDraw");
		this.gl.viewport(0, 0, this.viewportWidth, this.viewportHeight);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	// pushLight(lightPos,lightColor)
	// ---------------------------
	// inputs
	// -------------
	// lightPos : float3 - light position
	// lightColor: float3 - light color
	// -------------
	this.pushLight = function(lightPos,lightColor){
		// debug
		//console.log("atomicGLContext::pushLight");
		// increase Light number
		this.omniLightNumber = this.omniLightNumber + 1;
		// set data
		this.omniLightLocation.push(lightPos[0]) ;
		this.omniLightLocation.push(lightPos[1]) ;
		this.omniLightLocation.push(lightPos[2]) ;
		this.omniLightColor.push(lightColor[0]) ;
		this.omniLightColor.push(lightColor[1]) ;
		this.omniLightColor.push(lightColor[2]) ;
		}

	this.pushDirectionalLight = function(lightDirection,lightColor)
	{
		this.dirLightDirection.push(lightDirection[0]);
		this.dirLightDirection.push(lightDirection[1]);
		this.dirLightDirection.push(lightDirection[2]);

		this.dirLightColor.push(lightColor[0]);
		this.dirLightColor.push(lightColor[1]);
		this.dirLightColor.push(lightColor[2]);
	}

	// pushProgram(prog)
	// ---------------------------
	// inputs
	// -------------
	// prog: atomicGLShader
	// -------------
	this.pushProgram = function(prog){
		// debug
		//console.log("atomicGLContext::pushProgram");
		this.shaderPrograms.push(prog);
		var id =  this.shaderPrograms.length -1
		// debug
		//console.log("-- atomicGLContext::pushProgram("+prog.name+")-> index:"+id);
		return  id ;
	}
}
