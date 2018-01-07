window.domReady = function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

window.getVideoProgress = function getVideoProgress(onProgress) {
	let previousTime = Date.now();
	let time = 0;
	const duration = 5000;
	function loop() {
		const currentTime = Date.now();
		const delta = currentTime - previousTime;
		previousTime = currentTime;
		time += delta;
		if (time >= duration) {
			time = duration;
		}

		onProgress(time/duration);
		if (time < duration) {
			requestAnimationFrame(loop);
		}
	}
	loop();
}

window.logError = function logError(err) {
	document.querySelector('body').insertAdjacentHTML('beforebegin', `<div style="color:red">Error: ${err.message}</div>`);
}

window.startApp = function startApp(callback) {
	domReady(()=>{
		try{
			callback()
		}
		catch(err){
			logError(err)
		}
	})
}