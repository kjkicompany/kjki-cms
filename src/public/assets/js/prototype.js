//  INFO:  PROTOTYPE

//  NOTE:  LOAD DOM
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
	//  NOTE:  MULTIPLE ADDEVENTLISTENER
	// ============================================================
	Node.prototype.addEventListeners = (eventNames, eventFunction) => {
		for (let eventName of eventNames.split(" ")) this.addEventListener(eventName, eventFunction)
	}
})
