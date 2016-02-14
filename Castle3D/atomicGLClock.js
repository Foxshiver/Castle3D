// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/06
//----------------------------------------------------------------------------------------
// atomicGLClock
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
atomicGLClock = function(){
	// attributes
	// -------------------------------------------------
	// time of last tick
    this.lastTime = 0.0 ;
	// elapsed time
	this.elapsed = 0.0 ;	
	
	// methods
	// --------------------------------------------------
	// tick
	//---------------------------
	this.tick = function () {
		// debug
		//console.log("atomicGLClock::tick");	
        var timeNow = new Date().getTime();
        if (this.lastTime != 0) {this.elapsed = timeNow - this.lastTime;}
        this.lastTime = timeNow;
    }
	// get()
	//---------------------------
	// output
	//------------------------
	// elapsed time - float
	//---------------------------
	this.get = function (){
		// debug
		//console.log("atomicGLClock::get");	
		return this.elapsed;
	}
}