// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/10/08
//----------------------------------------------------------------------------------------
// atomicGLContext
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
atomicGLSceneGraph = function(stype, nname){
	// attributes
	// -------------------------------------------------
	// type; string - "root" | "transform" | "object3D"
	this.type = stype;
	this.name = nname ;
	
	// children
	this.children = [];
	
	// attributes  - WARNING:type dependent
	// type = root - camera
	this.camera = null ;
	this.skyBox = null ;
	
	// type= transform - translation & rotation
	this.translate = [0.0,0.0,0.0];
	this.rotAxis = [0.0,1.0,0.0];
	this.rotation = 0.0 ;
	
	// type = object3D - object3D & shaderId
	this.object3D  = null;
	this.shaderId = -1 ; // also used for skybox
	
	// methods
	// --------------------------------------------------
	// addChild
	this.addChild = function(o){
		switch (this.type){
			case "root": this.children.push(o); break;
			case "transform" : this.children.push(o); break;
			default: console.log("atomicGL:atomicGLSceneGraph("+this.name+"/"+this.type+"):can not add child to "+this.type);
		}
	}
	// setTransform
	this.setTransform = function(tr,ax,ro){
		switch (this.type){
			case "transform" : this.translate = tr; this.rotAxis = ax; this.rotation = ro ; break;
			default: console.log("atomicGL:atomicGLSceneGraph("+this.name+"/"+this.type+"):can not setTranform "+this.type);
		}		
	}
	// draw
	this.draw = function(agl,ams){
		// debug
		// console.log("atomicGLSceneGraph::draw("+this.type+","+this.name+", shaderId:"+this.shaderId+")");
		switch (this.type){
			case "root" : 
				// initDraw
				agl.initDraw();
				// push matrix
				ams.mvIdentity();
				ams.mvPushMatrix();
					// skyBox ----------------------------------------------------------------
					if (this.skyBox != null){
						ams.mvPushMatrix();
							// position & orientation
							ams.mvTranslate(0.0,0.0,0.0);
							ams.mvRotate(this.camera.phi,[1,0,0]);
							ams.mvRotate(this.camera.theta,[0,1,0]);
							// draw
							this.skyBox.draw(agl,ams,this.shaderId); 	
						// pop matrix
						ams.mvPopMatrix();
					}
					// camera -----------------------------------------------------------------
					if (this.camera != null){
						ams.mvRotate(this.camera.phi,[1,0,0]);
						ams.mvRotate(this.camera.theta,[0,1,0]);
						ams.mvTranslate(-this.camera.xc,-this.camera.yc,-this.camera.zc);
					}
					// children
					for (var i=0; i<this.children.length ; i++){this.children[i].draw(agl,ams);}
				// pop
				ams.mvPopMatrix();
			break;
			case "transform" :  
				// matrix
				ams.mvPushMatrix();
				// position & orientation
					ams.mvTranslate(this.translate[0],this.translate[1],this.translate[2]);		
					ams.mvRotate(this.rotation,this.rotAxis);	
					for (var i=0; i<this.children.length ; i++){this.children[i].draw(agl,ams);}
				// matrix
				ams.mvPopMatrix();
			break;
			case "object3D" : 
				this.object3D.draw(agl,ams,this.shaderId);
			break;
		}		
	}
	// setObject3D
	this.setObject3D = function(o,sid){
		switch (this.type){
			case "object3D" : 
				this.object3D = o;
				this.shaderId = sid ;
			break;
			default: console.log("atomicGL:atomicGLSceneGraph("+this.name+"/"+this.type+"):can not setObject3D "+this.type);
		}		
	}
	// setRootElt
	this.setRootElt = function(cam,sb,sid){
		switch (this.type){
			case "root" : 
				this.camera = cam;
				this.skyBox = sb ;
				this.shaderId = sid ;
			break;
			default: console.log("atomicGL:atomicGLSceneGraph("+this.name+"/"+this.type+"):can not setRootElt "+this.type);
		}			
	}
}