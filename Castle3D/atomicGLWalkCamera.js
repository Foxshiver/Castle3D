// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/10/07
//----------------------------------------------------------------------------------------
// atomicGLClock
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
atomicGLWalkCamera = function(){
	// attributes
	// -------------------------------------------------
	// camera position
	this.xc = 0.0 ;
	this.yc = 2.0 ;
	this.zc = 0.0 ;
	// camera orientation
	this.theta = 0.0 ;
	this.phi = 0.0 ;
	var tampon = 0.0;
	// step
	this.step = 0.10 ;
	// rot
	this.rot = 0.5 ;


	// pabo
	this.xMax = 300;
	this.xMin = -300;
	this.zMax = 300.0;
	this.zMin = -300.0;
	
	// methods
	// --------------------------------------------------
	// up/right/left/down
	//---------------------------
	this.up = function () {

		xtemp =	this.xc+this.step*Math.sin(this.theta*3.14/180.0);
		ztemp= 	this.zc-this.step*Math.cos(this.theta*3.14/180.0);

			if ((this.xMin<xtemp)&&(xtemp<this.xMax)){this.xc = xtemp;}else{console.log("bloqué");}
			if ((this.zMin<ztemp)&&(ztemp<this.zMax)){this.zc = ztemp;}else{console.log("bloqué");}
	}
	this.down = function () {
		xtemp =	this.xc	-this.step*Math.sin(this.theta*3.14/180.0);
		ztemp = 	this.zc	+this.step*Math.cos(this.theta*3.14/180.0);
			
			if ((this.xMin<xtemp)&&(xtemp<this.xMax)){this.xc = xtemp;}else{console.log("bloqué");}
			if ((this.zMin<ztemp)&&(ztemp<this.zMax)){this.zc = ztemp;}else{console.log("bloqué");}
	}
	this.right = function () {
		xtemp =	this.xc	+this.step*Math.cos(this.theta*3.14/180.0);
		ztemp = 	this.zc 	+this.step*Math.sin(this.theta*3.14/180.0);
			
			if ((this.xMin<xtemp)&&(xtemp<this.xMax)){this.xc = xtemp;}else{console.log("bloqué");}
			if ((this.zMin<ztemp)&&(ztemp<this.zMax)){this.zc = ztemp;}else{console.log("bloqué");}
	}
	this.left = function () {
		xtemp =	this.xc	-this.step*Math.cos(this.theta*3.14/180.0);
		ztemp = 	this.zc 	-this.step*Math.sin(this.theta*3.14/180.0);
			
			if ((this.xMin<xtemp)&&(xtemp<this.xMax)){this.xc = xtemp;}else{console.log("bloqué");}
			if ((this.zMin<ztemp)&&(ztemp<this.zMax)){this.zc = ztemp;}else{console.log("bloqué");}
	}

	this.turnright = function(a)
	{
		if(a < 2.5 && a > -2.5)
		{
			tampon = a;
			this.theta += a;
		}	
		else 
		{
			this.theta += tampon;
		}
	}
	this.turnleft = function(a) 
	{this.theta += a ;}

	this.turnup = function(a)
	{this.phi = a;}

	this.jump = function(a)
	{this.yc = a;}

	this.kneeDown = function()
	{this.yc = 1.7;
	 this.step = 0.05;}
	this.kneeUp = function()
	{this.yc = 2;
	 this.step = 0.1;}

	this.run = function()
	{this.step = 0.2;}
	this.walk = function()
	{this.step = 0.1;}
}